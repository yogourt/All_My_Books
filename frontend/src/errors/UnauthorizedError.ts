class UnauthorizedError extends Error {
  constructor() {
    super()
    this.name = 'UnauthorizedError'
  }
}

export default UnauthorizedError
