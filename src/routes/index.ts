// Module Import with Import
import express from "express";

// Module Initialize
export const router = express.Router();

router.get('/', function(req, res, next) {
  res.json({message: 'Hello Aha!'});
});

