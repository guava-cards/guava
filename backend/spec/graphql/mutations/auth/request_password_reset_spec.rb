RSpec.describe Mutations::Auth::RequestPasswordReset, type: :request do
  context 'when the user exists' do
  end

  context "when the user doesn't exist" do
    let(:email) { Faker::Internet.email }
    before { do_graphql_request(variables: { email: email }) }

    it 'should not send anything' do
      p data
      expect(data[:sent]).to be_falsey
    end
  end

  def query
    <<-GQL
      mutation RequestPasswordReset($email: String!) {
        requestPasswordReset(input: {
          email: $email
        }) {
          sent
        }
      }
    GQL
  end
end
