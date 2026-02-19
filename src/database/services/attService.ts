import { getDBConnection } from '../db';
import { TN_ATTENDANCE } from '../model/attendance';
import { TN_USERS } from '../model/user';
import uuid from 'react-native-uuid';

export interface Attendance {
  id: string;
  user_id: string;
  user_name?: string;
  created_at?: string;
  synced?: number;
}

// CREATE ATTENDANCE
export const createAttendance = async (
  userId: string
): Promise<boolean> => {
  try {
    const db = await getDBConnection();
    const id = uuid.v4() as string;

    await db.executeSql(
      `INSERT INTO ${TN_ATTENDANCE} (id, user_id, synced) VALUES (?, ?, 0)`,
      [id, userId]
    );

    return true;
  } catch (error) {
    console.error('createAttendance error:', error);
    return false;
  }
};

// GET ALL ATTENDANCE WITH USER NAME
export const getAllAttendance = async (): Promise<Attendance[]> => {
  try {
    const db = await getDBConnection();

    const res = await db.executeSql(`
      SELECT a.id, a.user_id, a.created_at, a.synced, u.name as user_name
      FROM ${TN_ATTENDANCE} a
      INNER JOIN ${TN_USERS} u ON a.user_id = u.uuid
      WHERE u.is_active = 1
      ORDER BY a.created_at DESC
    `);

    const list: Attendance[] = [];
    res.forEach((r:any) => {
      for (let i = 0; i < r.rows.length; i++) {
        list.push(r.rows.item(i));
      }
    });

    return list;
  } catch (error) {
    console.error('getAllAttendance error:', error);
    return [];
  }
};

// GET BY USER
export const getAttendanceByUser = async (
  userId: string
): Promise<Attendance[]> => {
  try {
    const db = await getDBConnection();

    const res = await db.executeSql(
      `SELECT * FROM ${TN_ATTENDANCE} WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );

    const list: Attendance[] = [];
    res.forEach(r => {
      for (let i = 0; i < r.rows.length; i++) {
        list.push(r.rows.item(i));
      }
    });

    return list;
  } catch (error) {
    console.error('getAttendanceByUser error:', error);
    return [];
  }
};

// DELETE ATTENDANCE
export const deleteAttendance = async (id: string): Promise<boolean> => {
  try {
    const db = await getDBConnection();

    await db.executeSql(
      `DELETE FROM ${TN_ATTENDANCE} WHERE id = ?`,
      [id]
    );

    return true;
  } catch (error) {
    console.error('deleteAttendance error:', error);
    return false;
  }
};
