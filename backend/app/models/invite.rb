# == Schema Information
#
# Table name: invites
#
#  id             :bigint           not null, primary key
#  email          :string
#  email_sent_at  :datetime
#  expires_at     :datetime
#  invitable_type :string           not null
#  status         :enum             default("sent"), not null
#  token          :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  invitable_id   :bigint           not null
#  recipient_id   :bigint
#  sender_id      :bigint           not null
#
# Indexes
#
#  index_invites_on_invitable  (invitable_type,invitable_id)
#
# Foreign Keys
#
#  fk_rails_...  (recipient_id => users.id)
#  fk_rails_...  (sender_id => users.id)
#
class Invite < ApplicationRecord
  belongs_to :invitable, polymorphic: true
  belongs_to :sender, class_name: 'User', optional: false
  belongs_to :recipient, class_name: 'User', optional: true

  enum status: {
    sent: 'sent',
    rejected: 'rejected',
    accepted: 'accepted'
  }

  before_save :generated_token, if: :token_blank?

  def generated_token
    self.token = SecureRandom.hex(20)
  end
end
