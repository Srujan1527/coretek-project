import { db } from "../index";

export const getAllCommentsByQuery = async (): Promise<any> => {
  const query = `SELECT * FROM comments `;

  return new Promise((resolve, reject) => {
    try {
      db?.all(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    } catch (err) {
      return err;
    }
  });
};

export const createCommentByQuery = async (
  user_id: any,
  post_id: any,
  comment: any
): Promise<any> => {
  const query = `INSERT INTO comments (user_id,post_id,comment) VALUES(?,?,?)`;
  const params = [user_id, post_id, comment];

  return new Promise((resolve, reject) => {
    try {
      db?.run(query, params, (err: any, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    } catch (err) {
      return err;
    }
  });
};
