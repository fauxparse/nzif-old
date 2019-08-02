module Types
  class Pitch
    class PitchPresenter < Types::BaseObject
      field :user_id, ID, null: true
      field :name, String, null: true
      field :email, String, null: true
      field :city, String, null: true
      field :country, String, null: true
      field :image, Types::UserImage, null: true

      def image
        real_user&.image&.attached? ? real_user.image : nil
      end

      private

      def real_user
        @real_user ||= ::User.find_by_email(object.email.downcase)
      end
    end
  end
end
