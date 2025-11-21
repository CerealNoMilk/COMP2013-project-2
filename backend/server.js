const express = require("express");
const server = express();
const port = 3000;
const mongoose = require ("mongoose");//import mongoose
require("dotenv").config(); //import dotenv
const DB_URI = process.env; //grab variable form dotenv file
const cors = require("cors");
