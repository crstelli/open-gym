export interface UserData {
  email: string;
  full_name: string;

  password: string;
  confirm_password: string;
}

export interface UserDBEntry {
  email: string;
  full_name: string;
  password_hash: string;
}
