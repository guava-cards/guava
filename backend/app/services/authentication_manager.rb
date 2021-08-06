class AuthenticationManager
  attr_reader :token

  def initialize(token)
    @token = AuthenticationManager.parse_token(token)
  end

  def viewer
    return nil if token.blank?

    @viewer ||= User.find_by(
      email: token['email'],
      firebase_uid: token['sub']
    )
  end

  def viewer?
    @viewer.present?
  end

  def self.parse_token(token)
    FirebaseIdToken::Signature.verify(token)
  end
end
