export interface UserAddInput {
  login: string;
  password: string;
  age?: number;
}

export interface UserUpdateInput {
  login?: string;
  password?: string;
  age?: number;
}
