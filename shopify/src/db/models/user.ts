import { ObjectId } from 'mongodb';
// import { getMongoDbInstance } from '../config';
import { database } from '../config';
import { encryptPass } from '@/utils/bcrypt';
import { Tuser, TuserLogin } from '@/validators/user.validator';

export type User = Tuser;

export const getUsers = async () => {
  // const db = await getDb();
  return database
    .collection<User>('users')
    .find()
    .project({ password: 0 })
    .toArray();
};

export const getUsersById = async (id: string | ObjectId) => {
  // const db = await getDb();

  const objectId = typeof id === 'string' ? new ObjectId(id) : id;

  return database
    .collection<User>('users')
    .findOne({ _id: objectId }, { projection: { password: 0 } });
};

export const getUserByEmail = async (email: string) => {
  // const db = await getDb();
  return database.collection<User>('users').findOne({ email: email });
};

export const getUserByUsername = async (username: string) => {
  // const db = await getDb();
  return database
    .collection<User>('users')
    .findOne({ username: username }, { projection: { password: 0 } });
};

export const createUser = async (newUser: User) => {
  // const db = await getDb();

  newUser.password = encryptPass(newUser.password);

  const { insertedId } = await database
    .collection<User>('users')
    .insertOne(newUser);

  return await getUsersById(insertedId);
};

export type UserLogin = TuserLogin;
