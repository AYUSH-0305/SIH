export type UserRole = 'public' | 'institution' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institutionId?: string;
  institutionName?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}