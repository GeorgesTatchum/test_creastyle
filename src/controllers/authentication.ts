import { Request, Response } from 'express';
import { createUser, getUserByEmail, getUserBySessionToken } from '../models/user';
import { authentication, random } from "../helpers"

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existing_user = await getUserByEmail(email);
    if (existing_user) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      }
    });

    return res.status(200).json(user).end();
  }
  catch (e) {
    console.log(e);
    return res.sendStatus(500)

  }
}

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select('+authentication.password +authentication.salt'); // the select to be ble to get salt and password
    if (!user) {
      return res.sendStatus(404);
    }

    if (!user.authentication || !user.authentication.salt) {
      return res.sendStatus(400);
    }

    const expected_password = authentication(user.authentication.salt, password);
    if (expected_password !== user.authentication.password) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());
    await user.save();

    res.cookie('AUTHENTICATION', user.authentication.sessionToken, {
      domain: 'localhost', path: '/'
    })

    return res.status(200).json(user).end();
  }
  catch (e) {
    console.log(e);
    return res.sendStatus(500)

  }
}

export const logout = async (req: Request, res: Response): Promise<Response> => {
  try {
    const sessionToken = req.cookies['AUTHENTICATION'];
    if (!sessionToken) {
      return res.sendStatus(400);
    }

    const user = await getUserBySessionToken(sessionToken);
    if (!user) {
      return res.sendStatus(404);
    }

    if (user.authentication) {
      user.authentication.sessionToken = null;
    }
    await user.save();

    res.clearCookie('AUTHENTICATION', {
      domain: 'localhost', path: '/'
    });

    return res.sendStatus(200);
  }
  catch (e) {
    console.log(e);
    return res.sendStatus(500)

  }
}