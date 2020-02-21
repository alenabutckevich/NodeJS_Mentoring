export interface UserAddInput {
  login: string;
  password: string;
  age: number;
}

export interface UserUpdateInput {
  login?: string;
  password?: string;
  age: number;
}

export type Permission = "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";

export interface GroupAddInput {
  name: string;
  permissions: Permission[];
}

export interface GroupUpdateInput {
  name?: string;
  permissions?: Permission[];
}
