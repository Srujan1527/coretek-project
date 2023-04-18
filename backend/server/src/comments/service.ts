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
  user_name: any,
  comment: any
): Promise<any> => {
  const query = `INSERT INTO comments (user_id,post_id,user_name,comment) VALUES(?,?,?,?)`;
  const params = [user_id, post_id, user_name, comment];

  return new Promise((resolve, reject) => {
    try {
      db?.run(query, params, (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve("Comment created");
        }
      });
    } catch (err) {
      return err;
    }
  });
};

export const getCommentsOfEachPostByQuery = async (
  post_id: any
): Promise<any> => {
  const query = `SELECT * from comments WHERE post_id=${post_id}`;

  return new Promise((resolve, reject) => {
    try {
      db?.all(query, (err: any, data: any) => {
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
