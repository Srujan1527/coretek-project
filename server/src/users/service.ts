import { error } from "console";
import { db } from "../index";

export const getUser = async (id: any): Promise<any> => {
  const query = `SELECT * FROM users WHERE user_id = ?`;
  const params = [id];
  return new Promise((resolve, reject) => {
    try {
      db?.get(query, params, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    } catch (err) {
      return err;
    }
  });
};

export const getAllUsersFromDB = (): Promise<any | unknown> => {
  const query = `SELECT * FROM users`;
  return new Promise((resolve, reject) => {
    db?.all(query, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

export const getSingleUserFromDB = (id: any): Promise<any | unknown> => {
  const query = `SELECT * FROM users WHERE user_id=?`;
  const params = [id];
  return new Promise((resolve, reject) => {
    db?.all(query, params, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};
