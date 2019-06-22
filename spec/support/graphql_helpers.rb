module GraphqlHelpers
  def execute_query(query, variables: {}, context: nil, as: nil)
    if as.present?
      context ||= {}
      context[:environment] ||= double
      allow(context[:environment]).to receive(:current_user).and_return(as)
    end

    NzifSchema
      .execute(query, variables: variables, context: context)
      .deep_transform_keys { |key| key.underscore.to_sym }
  end
end
