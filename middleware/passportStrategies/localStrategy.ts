import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById } from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    try {
      const user = getUserByEmailIdAndPassword(email, password);
      if (user) {
        done(null, user);
      } else {
        done(null, false, { message: "Your login details are not valid. Please try again" });
      }
    } catch (error) {
      done(error);
    }
  }
);
/*
done
*/
passport.serializeUser((user: Express.User, done: (err: Error | null, id?: string) => void) => {
  done(null, user.id.toString());
});

/*
done
*/
passport.deserializeUser((id: string, done: (err: Error | null, user?: Express.User) => void) => {
  const user = getUserById(Number(id));
  if (user) {
    done(null, user);
  } else {
    done(new Error("User not found"), null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
