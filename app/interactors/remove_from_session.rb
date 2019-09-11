class RemoveFromSession < Interaction
  include Transactional

  def call
    if placement
      placement.destroy
      bump_up_waitlist
    else
      context.fail!
    end
  end

  delegate :registration, :session, to: :context

  private

  def placement
    @placement ||= registration.placements.detect { |p| p.session_id == session.id }
  end

  def bump_up_waitlist
    room = [0, session.capacity - session.placements.count].max
    if room > 0
      session.waitlists.all[0, room].each do |waitlist|
        PromoteFromWaitlist.call(waitlist: waitlist)
      end
    end
  end
end
