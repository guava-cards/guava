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
FactoryBot.define do
  factory :invite do
    invitable { nil }
    sender { nil }
    recipient { nil }
    token { 'MyString' }
    email_sent_at { '2021-08-07 17:23:02' }
    expires_at { '2021-08-07 17:23:02' }
  end
end
