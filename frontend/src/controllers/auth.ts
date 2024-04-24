import { clientId, userPoolId } from '../hooks/consts'
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js'
import type {
  CognitoIdToken,
  CognitoUserSession,
  IAuthenticationCallback,
  ISignUpResult,
  NodeCallback,
} from 'amazon-cognito-identity-js'
import UnauthorizedError from '../errors/UnauthorizedError'

export function register(
  username: string,
  email: string,
  password: string,
  callback: NodeCallback<Error, ISignUpResult>
): void {
  const userPool = new CognitoUserPool({
    ClientId: clientId,
    UserPoolId: userPoolId,
  })
  const userAttributes = [
    new CognitoUserAttribute({ Name: 'email', Value: email }),
  ]
  userPool.signUp(username, password, userAttributes, null as any, callback)
}

export function login(
  username: string,
  password: string,
  callback: IAuthenticationCallback
): void {
  const userPool = new CognitoUserPool({
    ClientId: clientId,
    UserPoolId: userPoolId,
  })
  const user = new CognitoUser({ Pool: userPool, Username: username })
  user.authenticateUser(
    new AuthenticationDetails({ Username: username, Password: password }),
    callback
  )
}

export async function getToken(): Promise<string> {
  const expiration = localStorage.getItem('sessionExpiration')
  if (!expiration) throw new UnauthorizedError()
  const minExpiration = Math.floor(Date.now() / 1000) + 2 * 60
  if (Number(expiration) < minExpiration) {
    const idToken = await refreshToken()
    localStorage.setItem(
      'sessionExpiration',
      idToken.getExpiration().toString()
    )
    localStorage.setItem('idToken', idToken.getJwtToken())
  }
  const idToken = localStorage.getItem('idToken')
  if (!idToken) throw new UnauthorizedError()
  return idToken
}

export async function refreshToken(): Promise<CognitoIdToken> {
  return await new Promise((resolve, reject) => {
    const userPool = new CognitoUserPool({
      ClientId: clientId,
      UserPoolId: userPoolId,
    })
    const user = userPool.getCurrentUser()
    if (!user) {
      localStorage.removeItem('idToken')
      reject(new UnauthorizedError())
      return
    }

    user.getSession((err: null, session: CognitoUserSession) => {
      if (err) {
        reject(new UnauthorizedError())
        return
      }

      user.refreshSession(session.getRefreshToken(), (err, newSession) => {
        if (err) {
          reject(new UnauthorizedError())
          return
        }
        localStorage.setItem(
          'refreshToken',
          newSession.getRefreshToken().getToken()
        )
        resolve(newSession.getIdToken())
      })
    })
  })
}
