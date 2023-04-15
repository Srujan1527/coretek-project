import { db } from "../index";

export const getAllPostsByQuery = async (): Promise<any> => {
  try {
    const query = `SELECT * FROM posts  `;

    return new Promise((resolve, reject) => {
      db?.all(query, (err, data) => {
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

export const createPostByQuery = async (
  post: any,
  user_id: any
): Promise<any> => {
  try {
    const query = `INSERT INTO posts (post,user_id) VALUES (?,?)`;
    const params = [post, user_id];
    return new Promise((resolve, reject) => {
      db?.run(query, params, (err: any, data: any) => {
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

export const getUserPostByQuery = async (user_id: any): Promise<any> => {
  try {
    const query = `SELECT * FROM posts WHERE user_id=${user_id}  `;

    return new Promise((resolve, reject) => {
      db?.all(query, (err, data) => {
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
