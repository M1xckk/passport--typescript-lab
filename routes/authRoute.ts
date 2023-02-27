import express from "express";
import passport from "passport";
import { forwardAuthenticated } from "../middleware/checkAuth";
import * as dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    /* FIX ME: done*/
  })
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user: email"] })
);

router.get("/login/github/callback", (req, res) => {
  passport.authenticate("github", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});
export default router;
