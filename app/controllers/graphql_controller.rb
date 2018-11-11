class GraphqlController < ApplicationController
  def execute
    result = ExecuteGraphql.call(
      schema: NzifSchema,
      query: params[:query],
      variables: params[:variables],
      operation_name: params[:operationName],
      controller: self
    )
    render json: result.response, status: forward_status(result.status)
  end

  private

  def forward_status(status)
    status == :internal_server_error ? status : :ok
  end
end
