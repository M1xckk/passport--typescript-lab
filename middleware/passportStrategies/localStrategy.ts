import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  getUserByEmailIdAndPassword,
  getUserById,
} from "../../controllers/userController";
import { PassportStrategy } from "../../interfaces/index";

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    try {
      const user = getUserByEmailIdAndPassword(email, password);
      return user 
        ? done(null, user)
        : done(null, false, {
            message: "password is incorrect",
        }); 
    } catch (error) {
       done(null, false, {
        message: "Couldn't find user with email: " + email,
      });
    }
  }
);

/*
FIX ME (types) 😭
*/
passport.serializeUser(function (user: any, done: any) {
  done(null, user.id);
});
/*
FIX ME (types) 😭
*/
passport.deserializeUser(function (id: any, done: any) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: "local",
  strategy: localStrategy,
};

export default passportLocalStrategy;