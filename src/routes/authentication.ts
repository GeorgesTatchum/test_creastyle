import { Router } from "express";
import { login, register } from "../controllers/authentication";

export default (router: Router) => {
  router.post('/auth/register', (req, res) => {register(req, res)});
  router.post('/auth/login', (req, res) => {login(req, res)});
};