import express from 'express';
import { deleteUserC, getAllUsers } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  router.get('/users',  (req, res, next) => {isAuthenticated(req, res, next)}, (req, res) => { getAllUsers(req, res) });
  router.delete('/users/:id',  (req, res, next) => {isOwner(req, res, next)}, (req, res) => { deleteUserC(req, res) });
  router.patch('/users/:id',  (req, res, next) => {isAuthenticated(req, res, next)}, (req, res) => { deleteUserC(req, res) });
}