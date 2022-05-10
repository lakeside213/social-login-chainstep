export interface AuthIdentity {
  id: string;
  provider: AuthProvider;
}

export enum AuthProvider {
  GOOGLE = 'Google',
  GITHUB = 'Github',
  TWITTER = 'Twitter',
}
