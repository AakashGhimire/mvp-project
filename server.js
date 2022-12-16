import express from "express";
import nodemon from "nodemon";
import postgres from "postgres";

const sql = postgres({database:"dealership"});
const app = express();
const port = 3000;

app.get()

app.listen(port);