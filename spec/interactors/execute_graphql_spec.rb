require 'spec_helper'

RSpec.describe ExecuteGraphql, type: :interactor do
  describe '.call' do
    subject(:result) do
      ExecuteGraphql.call(
        schema: schema,
        query: query,
        environment: environment,
        operation_name: operation_name
      )
    end

    let(:query) { '[query]' }
    let(:variables) { {} }
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
            variables: variables,
            context: a_hash_including(environment: environment),
            operation_name: operation_name
          ).
          and_return graphql_result
      end

      it { is_expected.to be_a_success }
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
              name: ['Name can\'t be blank'],
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
    end
  end
end
