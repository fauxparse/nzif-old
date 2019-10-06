FactoryBot.define do
  factory :survey_response do
    registration
    session
    expectations { 1 }
    difficulty { 1 }
    good { 'Everything was great' }
    bad { 'Everything was terrible' }
    testimonial { 'Hire them now' }
  end
end
