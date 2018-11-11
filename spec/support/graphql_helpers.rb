module GraphqlHelpers
  def execute_query(query)
    NzifSchema.execute(query).deep_transform_keys { |key| key.underscore.to_sym }
  end
end
