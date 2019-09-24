class MatchWorkshops < Interaction
  include Interactor

  def call
    srand(seed)
    context.matches = match_all
  end

  def seed
    context.seed ||= rand(2**32)
  end

  delegate :festival, to: :context

  private

  def sessions
    @sessions ||=
      festival
        .workshops
        .includes(sessions: { preferences: :registration })
        .flat_map(&:sessions)
  end

  def timeslots
    @timeslots ||= sessions.sort_by(&:starts_at).group_by(&:starts_at)
  end

  def match_all
    timeslots.transform_values do |sessions|
      match_timeslot(sessions)
    end
  end

  def match_timeslot(sessions)
    targets = session_targets(sessions).to_h
    candidates = session_candidates(sessions).to_h
    results = MatchyMatchy::MatchMaker.new(targets: targets, candidates: candidates).perform
    results.by_target.merge('unallocated' => unallocated(results))
  end

  def session_targets(sessions)
    sessions.map do |s|
      [
        s.id,
        [
          s.preferences.select { |p| p.registration.complete? }.map(&:registration_id).shuffle,
          s.capacity,
        ],
      ]
    end
  end

  def session_candidates(sessions)
    sessions
      .flat_map(&:preferences)
      .select { |p| p.registration.complete? }
      .group_by(&:registration_id)
      .transform_values do |preferences|
        preferences.sort_by(&:position).map(&:session_id)
      end
  end

  def unallocated(results)
    results.by_candidate.select { |_, v| v.nil? }.keys
  end
end
