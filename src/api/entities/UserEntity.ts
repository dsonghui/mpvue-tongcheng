export interface TokenResponse {
  token: string;
  user: User;
  ttl: number;
  refresh_ttl: number;
}

export interface User {
  id: number;
  name: string;
  bio: null;
  sex: number;
  location: null;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  avatar: null;
  bg: null;
  verified: null;
  extra: null;
  roles: Role[];
  phone: null;
  email: null;
  wallet: Wallet;
  new_wallet: NewWallet;
  initial_password: boolean;
}

export interface NewWallet {
  owner_id: number;
  balance: number;
  total_income: number;
  total_expenses: number;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: number;
  name: string;
  display_name: string;
  description: string;
  non_delete: number;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface Pivot {
  user_id: number;
  role_id: number;
}

export interface Wallet {
  id: number;
  user_id: number;
  balance: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}
