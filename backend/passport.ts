import passport from "passport";
import { userModel } from "./database";
const LocalStrategy = require("passport-local").Strategy;

interface IVerifyOptions {
  message: string;
}

interface VerifyFunction {
  username: string;
  password: string;
}

interface Done {
  done: any;
}

const verifyCallback = async (
  username: VerifyFunction,
  password: VerifyFunction,
  done: any
) => {
  const user = await userModel.find({ name: username });
  if (!user) {
    return done(null, false);
  }

  const isValid = Validate(username, user.hash, user.salt);

  if (isValid) {
    return done(null, user);
  } else {
    return done(null, false);
  }
};

const strategy = new LocalStrategy();

//passport.use();
