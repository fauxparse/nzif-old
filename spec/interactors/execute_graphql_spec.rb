require 'rails_helper'
require 'support/pretend_environment'

RSpec.describe ExecuteGraphql, type: :interactor do
  extend PretendEnvironment

  describe '.call' do
    subject(:result) do
      ExecuteGraphql.call(
        schema: schema,
        query: query,
        variables: variables,
        environment: environment,
        operation_name: operation_name
      )
    end

    let(:query) { '[query]' }
    let(:variables) { {} }
    let(:parsed_variables) { variables }
    let(:graphql_result) { '[result]' }
    let(:schema) { double(:schema) }
    let(:environment) { double(:environment) }
    let(:operation_name) { '[operation]' }

    context 'for a valid GraphQL query' do
      before do
        allow(schema).
          to receive(:execute).
          with(
            query,
            variables: parsed_variables,
            context: a_hash_including(environment: environment),
            operation_name: operation_name
          ).
          and_return graphql_result
      end

      it { is_expected.to be_a_success }

      context 'with bad variables' do
        let(:variables) { '123' }

        it 'raises an exception' do
          expect { result }.to raise_error(ArgumentError)
        end
      end

      context 'with controller params as variables' do
        let(:variables) { ActionController::Parameters.new }

        it { is_expected.to be_a_success }
      end

      context 'with an empty string as variables' do
        let(:variables) { '' }
        let(:parsed_variables) { {} }

        it { is_expected.to be_a_success }
      end

      context 'with nil variables' do
        let(:variables) { nil }
        let(:parsed_variables) { {} }

        it { is_expected.to be_a_success }
      end
    end

    context 'for a non-existent record' do
      before do
        allow(schema).to receive(:execute).with(
          query,
          variables: variables,
          context: a_hash_including(environment: environment),
          operation_name: operation_name
        ) { raise ActiveRecord::RecordNotFound.new('[message]', Object, 123) }
      end

      it { is_expected.to be_a_failure }

      it 'returns no data' do
        expect(result.response[:data]).to be_blank
      end

      it 'returns an error' do
        expect(result.response[:errors]).to have_exactly(1).item
        expect(result.response[:errors].first).
          to match a_hash_including(
            message: '[message]',
            status: 'NOT_FOUND',
            detail: a_hash_including(
              model: 'Object',
              id: 123
            )
          )
      end
    end

    context 'for a validation error' do
      class Examples::Validatable
        include ActiveModel::Validations
        attr_accessor :name
        validates :name, presence: true
      end

      before do
        allow(schema).to receive(:execute).with(
          query,
          variables: variables,
          context: a_hash_including(environment: environment),
          operation_name: operation_name
        ) { Examples::Validatable.new.validate! }
      end

      it { is_expected.to be_a_failure }

      it 'returns no data' do
        expect(result.response[:data]).to be_blank
      end

      it 'returns an error' do
        expect(result.response[:errors]).to have_exactly(1).item
        expect(result.response[:errors].first).
          to match a_hash_including(
            message: 'Validation failed',
            status: 'UNPROCESSABLE_ENTITY',
            detail: {
              name: ['Name can’t be blank'],
            }
          )
      end
    end

    context 'for a miscellaneous error' do
      before do
        allow(schema).to receive(:execute).with(
          query,
          variables: variables,
          context: a_hash_including(environment: environment),
          operation_name: operation_name
        ) { raise GraphQL::ExecutionError, '[message]' }
      end

      it 'raises the exception' do
        expect { result }.to raise_error(GraphQL::ExecutionError, '[message]')
      end

      context 'in development' do
        pretend_environment(:development)

        it 'returns the exception' do
          expect { result }.not_to raise_error
          expect(result.response.dig(:errors, 0, :detail, :backtrace)).to be_present
        end
      end
    end
  end
end
