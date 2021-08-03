/* eslint-disable max-classes-per-file */

export class DomainError<E = Record<string, unknown>> extends Error {
  constructor(message: string, public code: string, public extensions?: E) {
    super(message)
  }
}

export class NotFoundError extends DomainError {
  constructor(protected readonly resource: string = 'resource') {
    super(`The requested ${resource} was not found`, 'not_found')
  }
}

export class AuthenticationError extends DomainError {
  constructor(message = 'You must sign in to continue') {
    super(message, 'authentication')
  }
}

export class AuthorizationError extends DomainError {
  constructor() {
    super('You are not authorized to complete this action', '')
  }
}
