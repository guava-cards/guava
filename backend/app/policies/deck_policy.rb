class DeckPolicy < ApplicationPolicy
  def view?
    case record.visibility_mode.to_sym
    when :hidden
      owner? or admin?
    when :invite_only
      owner? or admin? or role?(:collaborator, record)
    when :unlisted, :public
      true
    end
  end

  def create?
    owner?
  end

  def update?
    owner? or admin? or role?(:editor, record)
  end

  def destroy?
    owner? or admin?
  end
end
