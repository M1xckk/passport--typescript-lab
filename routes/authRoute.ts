import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

declare module "express-session" {
interface SessionData {
message: { [key:string]: any}}}

router.get("/login", forwardAuthenticated, (req, res) => {
  const message = req.session.message ? req.session.message[0] : "";
 req.session.message = [];
  res.render("login", {message});
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
