import User from "../models/user.js";
import { NotFoundError, UnauthorizedError } from "../utils/errors.js";

export async function loginUser(username, password) {
  const userData = await User.findOne({ username });
  const userExists = Boolean(userData);

  if (!userExists) throw new NotFoundError("User does not exist");
  if (userData.password !== password)
    throw new UnauthorizedError("Incorrect Password");

  return userData._id;
}

// ! CHECK IF THE USER [IS] LOGGED IN
export async function isValidSession(session) {
  if (!session || !session.user_id) return false;

  const userData = await User.findById(session.user_id);
  if (!userData) {
    session.destroy();
    return false;
  }
  return true;
}
