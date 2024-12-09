import express from 'express';
import { getUsers, deleteUser, getUserById } from '../models/user';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try{
        const users = await getUsers()
        return res.status(200).json(users).end()
    }
    catch(e){
        console.log(e);
        return res.sendStatus(500)
    }
}

export const deleteUserC = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params;
        const deletedUser = await deleteUser(id)

        return res.status(204).json(deletedUser).end()
    }
    catch(e){
        console.log(e);
        return res.sendStatus(500)
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try{
        const { username } = req.body;
        const { id } = req.params;

        if(!username || !id){
            return res.sendStatus(400)
        }

        const user = await getUserById(id)
        if(!user){
            return res.sendStatus(404)
        }
        user.username = username;
        await user.save();

        return res.status(200).json(user).end()
    }
    catch(e){
        console.log(e);
        return res.sendStatus(500)
    }
}