import { UserInfo } from "os";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    try {
      // Try to find a user with the given email and password
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
passport.serializeUser((user: Express.User, done: (err:{message:string} | null, id?: number) => void) => {
  done(null, user.id);
});

/*
done
*/
passport.deserializeUser((id: number, done: (err: {message:string} | null, user?: Express.User) => void) => {
  const user = getUserById(id);
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
