class ExecuteGraphql < Interaction
  def call
    context.response = response
    context.status = :ok
  rescue => e
    handle_error(e)
  end

  private

  delegate :schema, :query, :operation_name, to: :context

  def variables
    @variables ||= ensure_hash(context.variables)
  end

  def execution_context
    @execution_context ||= {
      environment: context.environment,
    }
  end

  def response
    @response ||= schema.execute(
      query,
      variables: variables,
      context: execution_context,
      operation_name: operation_name
    )
  end

  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      if ambiguous_param.present?
        ensure_hash(JSON.parse(ambiguous_param))
      else
        {}
      end
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end

  def handle_error(e)
    case e
    when ActiveRecord::RecordNotFound
      return_error(
        message: e.message,
        status: :not_found,
        detail: {
          model: e.model.name,
          id: e.primary_key,
        }
      )
    when ActiveRecord::RecordInvalid, ActiveModel::ValidationError
      return_error(
        message: 'Validation failed',
        status: :unprocessable_entity,
        detail: format_validation_errors(model_from_exception(e).errors)
      )
    else
      raise e unless Rails.env.development?
      return_error(message: e.message, detail: { backtrace: e.backtrace })
    end
  end

  def return_error(message:, detail: {}, status: :internal_server_error)
    context.status = status
    context.response = {
      data: {},
      errors: [
        {
          message: message,
          status: status.to_s.upcase,
          detail: detail,
        },
      ],
    }
    context.fail!
  end

  def model_from_exception(exception)
    exception.respond_to?(:model) ? exception.model : exception.record
  end

  def format_validation_errors(errors)
    errors.keys.
      reject { |key| key.to_s.include?('.') }.
      inject({}) do |hash, key|
        hash.merge(key.to_s.camelize(:lower).to_sym => errors.full_messages_for(key))
      end
  end
end
