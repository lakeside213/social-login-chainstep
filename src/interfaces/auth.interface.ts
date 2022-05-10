export interface AuthIdentity {
  id: string;
  name: string;
}

export enum AuthProvider {
  GOOGLE = 'Google',
  GITHUB = 'Github',
  TWITTER = 'Twitter',
}
