require 'rails_helper'

RSpec.describe GraphqlController, type: :request do
  subject { response }

  describe 'GET /graphql' do
    let(:query) { '[query]' }
    let(:variables) { { year: 2018 } }
    let(:operation_name) { '[operation]' }
    let(:context) do
      {
        schema: NzifSchema,
        query: query,
        variables: kind_of(ActionController::Parameters),
        operation_name: operation_name,
        environment: kind_of(ApplicationController),
      }
    end

    before do
      allow(ExecuteGraphql).
        to receive(:call).
        with(a_hash_including(context)).
        and_return(graphql_response)

      post graphql_path,
        params: { graphql: { query: query, variables: variables, operationName: operation_name } }
    end

    context 'with a successful response' do
      let(:graphql_response) do
        Interactor::Context.build(data: {}, status: :ok)
      end

      it { is_expected.to be_successful }
    end

    context 'with a failed response' do
      let(:graphql_response) do
        Interactor::Context.build(data: {}, status: :internal_server_error)
      end

      it { is_expected.not_to be_successful }
    end
  end
end
