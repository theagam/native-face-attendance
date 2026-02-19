import { getDBConnection } from '../db';
import { TN_USERS } from '../model/user';
import uuid from 'react-native-uuid';

export interface User {
  uuid: string;
  name: string;
  embedding: string; // JSON string
  created_at?: string;
  updated_at?: string;
  is_active?: boolean;
}

// CREATE USER
export const createUser = async (
  name: string,
  embedding: number[]
): Promise<boolean> => {
  try {
    const db = await getDBConnection();
    const userUuid = uuid.v4() as string;

    await db.executeSql(
      `INSERT INTO ${TN_USERS} (uuid, name, embedding) VALUES (?, ?, ?)`,
      [userUuid, name, JSON.stringify(embedding)]
    );

    return true;
  } catch (error) {
    console.log('createUser error:', error);
    return false;
  }
};

// GET ALL USERS
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const db = await getDBConnection();
    const results = await db.executeSql(
      `SELECT * FROM ${TN_USERS} WHERE is_active = 1 ORDER BY created_at DESC`
    );

    const users: User[] = [];
    results.forEach((r:any) => {
      for (let i = 0; i < r.rows.length; i++) {
        users.push(r.rows.item(i));
      }
    });

    return users;
  } catch (error) {
    console.error('getAllUsers error:', error);
    return [];
  }
};

// GET USER BY UUID
export const getUserByUuid = async (uuid: string): Promise<User | null> => {
  try {
    const db = await getDBConnection();
    const res = await db.executeSql(
      `SELECT * FROM ${TN_USERS} WHERE uuid = ? AND is_active = 1`,
      [uuid]
    );

    if (res[0].rows.length > 0) {
      return res[0].rows.item(0);
    }

    return null;
  } catch (error) {
    console.error('getUserByUuid error:', error);
    return null;
  }
};

// UPDATE USER
export const updateUser = async (
  userUuid: string,
  name?: string,
  embedding?: number[]
): Promise<boolean> => {
  try {
    const db = await getDBConnection();

    const updates: string[] = [];
    const values: any[] = [];

    if (name) {
      updates.push('name = ?');
      values.push(name);
    }

    if (embedding) {
      updates.push('embedding = ?');
      values.push(JSON.stringify(embedding));
    }

    if (!updates.length) return false;

    values.push(userUuid);

    await db.executeSql(
      `UPDATE ${TN_USERS} SET ${updates.join(', ')} WHERE uuid = ?`,
      values
    );

    return true;
  } catch (error) {
    console.error('updateUser error:', error);
    return false;
  }
};

// SOFT DELETE USER
export const deleteUser = async (uuid: string): Promise<boolean> => {
  try {
    const db = await getDBConnection();

    await db.executeSql(
      `UPDATE ${TN_USERS} SET is_active = 0 WHERE uuid = ?`,
      [uuid]
    );

    return true;
  } catch (error) {
    console.error('deleteUser error:', error);
    return false;
  }
};
