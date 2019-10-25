class ReportsController < ApplicationController
  def self.formatters
    @formatters ||= {}
  end

  def self.register_formatter(format, formatter)
    formatters[format] = formatter
  end

  register_formatter :csv, Report::Formatters::CSV
  register_formatter :xlsx, Report::Formatters::Excel

  rescue_from AccessGranted::AccessDenied do
    head :forbidden
  end

  def show
    authorize! :view, report

    respond_to do |format|
      self.class.formatters.each_pair do |extension, formatter|
        format.send(extension) { format_with(formatter) }
      end
    end
  rescue NameError
    head :not_found
  rescue ActionController::UnknownFormat
    head :not_acceptable
  end

  private

  def report
    @report ||=
      begin
        klass = "#{params[:report]}_report".camelize.constantize
        raise NameError, "No report named #{params[:report]}" unless klass < Report::Base
        klass.new(festival)
      end
  end

  def festival
    @festival ||= Festival.by_year(params[:year]).first
  end

  def format_with(formatter)
    send_data formatter.new(report).generate,
      filename: filename, 
      disposition: :attachment
  end

  def filename
    "#{report.class.name.underscore}_#{timestamp}.#{params[:format]}"
  end

  def timestamp
    Time.zone.now.to_s(:db)[0...10]
  end
end
