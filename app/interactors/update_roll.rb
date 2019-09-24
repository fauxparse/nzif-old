class UpdateRoll < Interaction
  def call
    access_denied! unless can? :update, session

    remove_old_placements
    add_new_placements
    update_waitlist
  end

  delegate :session, :placement_ids, :waitlist_ids, to: :context

  private

  def remove_old_placements
    session.placements.each do |existing|
      if placement_ids.exclude?(existing.registration.to_param)
        RemoveFromSession.call(
          registration: existing.registration,
          session: session,
          current_user: current_user,
          bump_waitlist: false,
        )
      end
    end
  end

  def add_new_placements
    placement_ids.each do |id|
      next if placed?(id)

      if waiting?(id)
        PromoteFromWaitlist.call(
          registration: Registration.find(id),
          waitlist: session.waitlists.detect { |w| w.registration.to_param == id }
        )
      else
        ConfirmPlacement.call(
          registration: registration,
          session: session,
          current_user: current_user
        )
      end
    end
  end

  def update_waitlist
    Waitlist.acts_as_list_no_update do
      waitlist_ids.each do |id|
        next if waiting?(id)
        AddToWaitlist.call(
          registration: Registration.find(id),
          session: session,
          current_user: current_user
        )
      end

      session.waitlists.each do |w|
        if waitlist_ids.exclude?(w.registration.to_param)
          RemoveFromWaitlist.call(
            registration: w.registration,
            session: session,
            current_user: current_user
          )
        end
      end

      session.waitlists.reload.each do |w|
        w.update!(position: waitlist_ids.index(Registration.encode_id(w.registration_id)))
      end
    end
  end

  def placed?(id)
    session.placements.any? { |p| p.registration.to_param == id }
  end

  def waiting?(id)
    session.waitlists.any? { |w| w.registration.to_param == id }
  end
end
