import { createUser, getUserByEmail, createToken } from "./service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

// tommorrow  write error handling for login
