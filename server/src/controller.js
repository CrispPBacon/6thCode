import { User } from "./models/user.js";
import { Login } from "./services/auth.js";

/* POST http://localhost:3000/api/user 

  User Data E.G:
  {
    "data": {
        "email": 123email@mail.com,
        "username": "alsoriano",
        "password": "Blacks132",
        "first_name": "Allan",
        "last_name": "Soriano"
    }
  }
*/
export async function createUser(req, res) {
  try {
    const user = req.body.data;
    const data = await new User(user).save();
    return res.status(201).json(data);
  } catch (e) {
    next(e);
  }
}

/* POST http://localhost:3000/api/login 
  {
    "data": {
        "username": "alsoriano",
        "password": "Blacks132"
    }
  }
*/
export async function login(req, res) {
  try {
    const { username, password } = req.body.data || {};
    const userId = await Login(username, password);
    req.session.user_id = userId;
    return res.status(200).json(userId);
  } catch (e) {
    next(e);
  }
}

/* DELETE http://localhost:3000/api/logout */
export async function logout(req, res, next) {
  try {
    req.session.destroy();
    res.clearCookie("connect.sid");
    return res.status(200).json({ msg: "You have logged out" });
  } catch (error) {
    next(error);
  }
}

/* GET http://localhost:3000/api/topic */
export async function getTopic(req, res, next) {
  try {
    return res.status(200);
  } catch (e) {
    next(e);
  }
}

/* POST http://localhost:3000/api/topic */
export async function createTopic(req, res, next) {
  try {
    return res.status(200);
  } catch (e) {
    next(e);
  }
}
