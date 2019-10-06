require 'rails_helper'

RSpec.describe 'rake feedback:request', type: :task do
  it 'preloads the Rails environment' do
    expect(task.prerequisites).to include 'environment'
  end

  it 'calls SendFeedbackRequests' do
    expect(SendFeedbackRequests).to receive(:call)
    task.execute
  end
end
