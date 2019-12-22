export interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export interface UserInput {
  login: string;
  password: string;
  age: number;
}

export let users: User[] = [];

export function createUser({ login, password, age }: UserInput): User {
  const user = users.find(({ login: userLogin }) => userLogin === login);
  if (user) { throw new Error("User with this login already exists.") }

  const newUser = {
    id: `f${(~~(Math.random()*1e8)).toString(16)}`,
    login,
    password,
    age,
    isDeleted: false,
  };
  users = [...users, newUser];

  return newUser;
}

export function getUser(id: string): User|undefined {
  const user = users.find(({ id: userId }) => userId === id);

  if (!user) { throw new Error(`User with id ${id} is not found`); }

  return user;
}

export function getAutoSuggestUsers(limit: number, loginSubstring = ""): User[] {
  return users
    .filter(({ login }) => login.startsWith(loginSubstring))
    .sort(( user1, user2 ) => user1.login > user2.login ? 1 : 0)
    .slice(0, limit || users.length)
}

export function updateUser(id: string, { login, password, age }: UserInput): User {
  const userIndex = users.findIndex(({ id: userId }) => userId === id);

  if (userIndex === -1) {
    throw new Error(`User with id ${id} is not found`);
  }

  const updatedUser = {
    ...users[userIndex],
    login: login,
    password: password,
    age: age,
  }
  users = [...users.slice(0, userIndex), updatedUser, ...users.slice(userIndex + 1)];

  return updatedUser;
}

export function deleteUser(id: string): User {
  const userIndex = users.findIndex(({ id: userId }) => userId === id);

  if (userIndex === -1) {
    throw new Error(`User with id ${id} is not found`);
  }

  const deletedUser = { ...users[userIndex], isDeleted: true };
  users = [...users.slice(0, userIndex), deletedUser, ...users.slice(userIndex + 1)];

  return deletedUser;
}
