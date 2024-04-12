import jwtDecode from 'jwt-decode';
import Log from './Log';
export interface TToken {
  exp: number;
  version: string;
  id: string;
  username: string;
  site: string;
  email: string;
  userCorrelationId: string;
  user_correlation_id: string;
  loggedUser: LoggedUser;
  modeMasquerade: boolean;
  ip: string;
  authorizations: Authorizations;
  iat: number;
}

export interface LoggedUser {
  username: string;
  xClientSource: string;
  correlationId: string;
  authOrigin: string;
  refreshTokenTTL: number;
}
export interface Authorizations {
  version: string;
  statements: Statement[];
}

export interface Statement {
  sid: string;
  effect: string;
  actions: string[];
  resources: string[];
}
export const decodeToken = (token: string): TToken | undefined => {
  try {
    const decode: TToken = jwtDecode(token);
    return decode;
  } catch (error) {
    Log.error('Token::decodeToken', error);
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    // Décode le token pour obtenir les informations, y compris la date d'expiration
    const decodedExpiration: any = jwtDecode(token);

    if (decodedExpiration && decodedExpiration.exp) {
      const currentTimestamp: number = Math.floor(Date.now() / 1000);

      // Comparez la date d'expiration du token avec la date actuelle
      return decodedExpiration.exp < currentTimestamp;
    } else {
      // Si la date d'expiration n'est pas présente, considérez le token comme expiré
      return true;
    }
  } catch (error) {
    if (error.toString().includes('Invalid token specified:')) {
      return false;
    }
    return true;
  }
};
