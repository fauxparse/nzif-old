module GraphqlHelpers
  def execute_query(query, variables: {}, context: nil)
    NzifSchema.
      execute(query, variables: variables, context: context).
      deep_transform_keys { |key| key.underscore.to_sym }
  end
end
