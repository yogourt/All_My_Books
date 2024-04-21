import { clientId, userPoolId } from '../hooks/consts'
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js'
import type {IAuthenticationCallback, ISignUpResult, NodeCallback} from 'amazon-cognito-identity-js'

export function register(username: string, email: string,  password: string, callback: NodeCallback<Error, ISignUpResult>): void {
  const userPool = new CognitoUserPool({ClientId: clientId, UserPoolId: userPoolId})
  const userAttributes = [new CognitoUserAttribute({Name: 'email', Value: email})]
  userPool.signUp(username, password, userAttributes, null as any, callback)
}

export function login(username: string, password: string, callback: IAuthenticationCallback): void {
  const userPool = new CognitoUserPool({ClientId: clientId, UserPoolId: userPoolId})
  const user = new CognitoUser({Pool: userPool, Username: username})
  user.authenticateUser(new AuthenticationDetails({Username: username, Password: password}), callback)
}

export function refreshToken(): void {

}
