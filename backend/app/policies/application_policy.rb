# Base class for application policies
class ApplicationPolicy < ActionPolicy::Base
  authorize :user, optional: true

  protected

  def owner?
    record.user_id == user.id
  end

  def user?
    record.id == user.id && record.is_a?(User)
  end

  def role?(role, object = nil)
    user&.has_role? role.to_sym, object
  end

  def admin?
    user&.has_role? :admin
  end
end
