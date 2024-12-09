import express from 'express';
import {get, merge} from 'lodash';
import { getUserBySessionToken } from '../models/user';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.cookies['AUTHENTICATION'];
    console.log(sessionToken);
    
    if(!sessionToken){
        return res.sendStatus(400);
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if(!existingUser){
        return res.sendStatus(403);
    }
    next()
  }
  catch (e) {
    console.log(e);
    return res.sendStatus(500)

  }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const sessionToken = req.cookies['AUTHENTICATION'];
    const existingUser = await getUserBySessionToken(sessionToken);
    if (existingUser && existingUser._id.toString() === id.toString()) {
      return res.sendStatus(403);
    }
    next()
  }
  catch (e) {
    console.log(e);
    return res.sendStatus(500)

  }
}

export const validateContact = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { name, email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email) {
    return res.status(400).json({ error: "Les champs 'name' et 'email' sont obligatoires." });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Le format de l'adresse email est invalide." });
  }

  next();
}