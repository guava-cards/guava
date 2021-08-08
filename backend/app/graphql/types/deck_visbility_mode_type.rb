module Types
  class DeckVisbilityModeType < Types::BaseEnum
    description 'Controls the visiblity of a user-create deck'

    value 'PUBLIC', 'A public deck that is accessible by anyone, and can be found in searches', value: 'public'
    value 'PRIVATE', 'A private deck that is only visible to the current user', value: 'hidden'
    value 'UNLISTED', 'A deck that can only be accessed by a unique link', value: 'unlisted'
    value 'INVITE_ONLY', 'A deck that can only be accessed by the owner, and people who they invite',
          value: 'invite_only'
  end
end
