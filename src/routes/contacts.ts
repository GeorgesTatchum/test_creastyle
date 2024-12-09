
import express from 'express';
import { createContat, deleteContatById, getContatById, getContats, updateContat } from '../controllers/contact';
import { validateContact } from '../middlewares';

export default (router: express.Router) => {
    router.get('/contacts', (req, res) => { getContats(req, res) });
    router.get('/contacts/:id', (req, res) => { getContatById(req, res) });
    router.post('/contacts', (req, res, next) => {validateContact(req, res, next)}, (req, res) => { createContat(req, res) });
    router.patch('/contacts', (req, res, next) => {validateContact(req, res, next)}, (req, res) => { updateContat(req, res) });
    router.delete('/contacts/:id', (req, res) => { deleteContatById(req, res) });
  }