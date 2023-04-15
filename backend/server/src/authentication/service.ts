
import bcrypt from "bcrypt";
import { resolve } from "path";
import { db } from "../index";
import jwt from "jsonwebtoken";
export const createUser = async (user: any): Promise<string> => {
  try {
    const { name, email, password } = user;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const query = `INSERT INTO users (user_name,email,user_password) VALUES (?,?,?)`;
    const params = [name, email, hashedPassword];
    return new Promise((resolve, reject) => {
      db.run(query, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Object Created");
        }
      });
    });
  } catch (err) {
    return err as string;
  }
};

export const getUserByEmail = async (email: string): Promise<any> => {
  try {
    const query = `SELECT * FROM users WHERE email= ?`;
    const params = [email];
    return new Promise((resolve, reject) => {
      db?.get(query, params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  } catch (err: any) {
    return err;
  }
};

export const createToken = (user: any) => {
  const { user_id } = user;
  const myVariable = process.env.JWT_SECRET;

  const token = jwt.sign({ id: user_id }, myVariable!);
  return token;
};

export const getCurrentUser = async (decoded: any): Promise<any> => {
  const { id } = decoded;
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
