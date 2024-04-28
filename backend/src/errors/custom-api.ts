class CustomAPIError extends Error {
  declare statusCode: number
  constructor(message: string) {
    super(message)
  }
}

export default CustomAPIError
