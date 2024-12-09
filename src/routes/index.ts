import express from "express";
import authentication from "./authentication"
import users from "./users";
import contacts from "./contacts";

const router = express.Router();

export default (): express.Router => {
  authentication(router)
  users(router)
  contacts(router)
  return router;
};