export interface JwtPayload {
  sub: number;
  email: string;
}

interface JwtGuardUser {
  id: number;
  email: string;
}

export interface JwtGuardReturn {
  user: JwtGuardUser;
}
