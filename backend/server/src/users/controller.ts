import { AppError } from "../utils/appError";
import { getUser, getAllUsersFromDB, getSingleUserFromDB } from "./service";

export const getMe = async (req: any, res: any, next: any) => {
  req.params.id = req.user.user_id;
  try {
    const { id } = req.params;
    const user = await getUser(id);
    if (!user) {
      return next(new AppError("No user found", 404));
    }

    res.status(200).json({
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      message: `Unable to get User ${err}`,
    });
  }
};

export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await getAllUsersFromDB();

    res.status(200).json({
      data: users,
    });
  } catch (err) {
    res.status(404).json({
      message: `Unable to fetch users ${err}`,
    });
  }
};
export const getUserById = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const singleUser = await getSingleUserFromDB(id);
    res.status(200).json({
      data: singleUser,
    });
  } catch (err) {
    res.status(404).json({
      message: `Unable to fetch user based on Id ${err}`,
    });
  }
};
