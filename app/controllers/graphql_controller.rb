class GraphqlController < ApplicationController
  def execute
    result = ExecuteGraphql.call(
      schema: NzifSchema,
      query: graphql_params[:query],
      variables: graphql_params[:variables],
      operation_name: graphql_params[:operationName],
      environment: self
    )
    render json: result.response, status: forward_status(result.status)
  end

  private

  def graphql_params
    @graphql_params ||= params.require(:graphql).permit(:query, :operationName, variables: {})
  end

  def forward_status(status)
    status == :internal_server_error ? status : :ok
  end
end
