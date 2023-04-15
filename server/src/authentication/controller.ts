import {
  createUser,
  getUserByEmail,
  createToken,
  getCurrentUser,
} from "./service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";
import { decode } from "punycode";

export const signUp = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;
    const userDetails = { name, email, password };
    const abc = await createUser(userDetails);

    res.status(200).json({
      message: abc,
    });
  } catch (err) {
    res.status(404).json({
      error: err,
    });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return res.status(400).json({ msg: "User Does not Exists" });
    const isMatch = await bcrypt.compare(password, user.user_password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });
    const token = createToken(user);
    res.status(200).json({
      data: user,
      token: token,
    });
  } catch (err) {
    res.status(404).json({
      message: `Error Occurred ${err}`,
    });
  }
};

export const verifyToken = async (req: any, res: any, next: any) => {
  let token: any;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET!);
 
  const currentUser = await getCurrentUser(decoded);
  if (!currentUser) {
    return next(
      new AppError(
        "The USer belonging to this token does no longer exists",
        401
      )
    );
  }
  req.user = currentUser;
  next();
};
// tommorrow  write error handling for login
