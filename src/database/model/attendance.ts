import { TN_USERS } from './user';

export const TN_ATTENDANCE = 'attendance';

export const createTableQueryAttendance = `
CREATE TABLE IF NOT EXISTS ${TN_ATTENDANCE} (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  synced INTEGER DEFAULT 0,
  device_time TEXT,
  FOREIGN KEY (user_id) REFERENCES ${TN_USERS}(uuid)
);
`;
