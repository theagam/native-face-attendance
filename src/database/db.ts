import SQLite from 'react-native-sqlite-storage';
import { createTableQueryUsers } from './model/user';
import { createTableQueryAttendance } from './model/attendance';

// Enable promise API
SQLite.enablePromise(true);

let dbInstance: SQLite.SQLiteDatabase | null = null;

// Get or create database connection
export const getDBConnection = async (): Promise<SQLite.SQLiteDatabase> => {
  if (dbInstance) return dbInstance;

  dbInstance = await SQLite.openDatabase({
    name: 'face_attendance.db',
    location: 'default',
  });

  return dbInstance;
};

// Create necessary tables
export const createTables = async (): Promise<void> => {
  try {
    const db = await getDBConnection();

    // Enable foreign keys
    await db.executeSql('PRAGMA foreign_keys = ON');

    // Create Users table
    await db.executeSql(createTableQueryUsers);

    // Create Attendance table
    await db.executeSql(createTableQueryAttendance);

    console.log('Database tables created successfully');
  } catch (error) {
    console.error('DB init error:', error);
    throw error;
  }
};
