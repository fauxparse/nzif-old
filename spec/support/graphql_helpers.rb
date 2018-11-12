module GraphqlHelpers
  def execute_query(query, variables: {})
    NzifSchema.
      execute(query, variables: variables).
      deep_transform_keys { |key| key.underscore.to_sym }
  end
end
