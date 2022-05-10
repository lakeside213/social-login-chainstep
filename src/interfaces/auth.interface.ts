export interface AuthIdentity {
  id: string;
  provider: AuthProvider;
}

export enum AuthProvider {
  GOOGLE = 'google',
  GITHUB = 'github',
  TWITTER = 'twitter',
}
