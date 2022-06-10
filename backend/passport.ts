import passport from "passport";
import { User as UserModel } from "./database/db-models";
import { validatePassword } from "./passwordUtils";
import { Strategy as LocalStrategy } from "passport-local";
import express from "express";
import { connect } from "./database/db-config";

interface IVerifyOptions {
  message: string;
}

declare global {
  namespace Express {
    interface User {
      _id?: number;
      username: string;
      password: string;
      hash: string;
      salt: string;
    }
  }
}

export class PassportAuth {
  static initPassport() {
    passport.use(PassportAuth.strategy());

    passport.serializeUser((user, done) => done(null, user._id));

    passport.deserializeUser(async (userId: string, done) => {
      console.log("user id", userId);
      UserModel.findById(userId)
        .then((user: any) => done(null, user))
        .catch((err: any) => done(err));
    });
  }
  static initMiddleware(app: express.Express) {
    PassportAuth.initPassport();
    app.use(passport.initialize());
    app.use(passport.session());
  }
  static strategy() {
    const verifyCallback = async (
      username: string,
      password: string,
      done: (error: any, user?: any, options?: IVerifyOptions) => void
    ) => {
      try {
        const user = await UserModel.findOne({ username });
        console.log("user", user);

        if (user && validatePassword(password, user.hash, user.salt)) {
          //console.log(JSON.stringify(user));
          console.log("correct!");
          return done(null, user);
        }
        return done(null, false);
      } catch (err: any) {
        done(err);
      }
    };

    return new LocalStrategy(verifyCallback);
  }
}
