import express from "express";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pg from "pg";
import dotenv from "dotenv";
import { socialLogin } from "./authController.js";
import  pool  from "./db.js";

// Load your env file.
dotenv.config();

// make an instance of your Express app and set the backend port number.
const APP = express();
const PORT = process.env.BACK_END_PORT;

// Configure CORS(for the NETWORK LAYER).
const CORS_OPTION = {
  origin: process.env.FRONT_END_URL, // Specifies the URL that can send a request towards your backend.
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400,
};
APP.use(cors(CORS_OPTION));
// Automatic body parser
APP.use(express.json());

// Automated POSTGRE session storage(for the session table).
const PG_SESSION_STORE = connectPgSimple(session);
APP.use(
  session({
    store: new PG_SESSION_STORE({
      pool: pool,
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: false,
    },
  }),
);

//ROUTING
APP.post("/api/auth/social-login", socialLogin);
// ROUTING
APP.post("/api/auth/social-login", socialLogin);


APP.post("/api/cart/checkout", (req, res) => {
  if (!req.session || !req.session.isLoggedIn) {
    return res.status(401).json({ error: "Unauthorized: Mangyaring mag-login muna." });
  }

  return res.status(200).json({
    message: "Authorized",
    user: {
      id: req.session.userId,
      email: req.session.email,
    }
  });
});

//SIMPLE ERROR HANDLING
APP.use((req, res) => {
  res.status(404).json({ message: "ERROR: PATH NOT FOUND" })
});
  
APP.listen(PORT, () =>
{
  console.log(`${PORT}`)
}
)
