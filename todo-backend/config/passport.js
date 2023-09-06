const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const { findUser, createUser } = require("../models/user.model");

//google console
const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

//info needed by google
const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

// used when user is authenticated
async function verifyCallback(req, accessToken, refreshToken, profile, done) {
  console.log("google profile", profile);
  console.log("---------");
  console.log("accessToken", accessToken);

  try {
    const email = profile._json.email;
    const user = await findUser({ email: email });
    if (user) {
      console.log("user in auth router", user);
      return done(null, user);
    } else {
      console.log("no user in auth router", user);

      const newUser = await createUser({
        email: email,
      });
      if (newUser) {
        return done(null, newUser);
      }
    }
  } catch (verifyErr) {
    console.log("it is getting here too fast");
    done(verifyErr);
  }
  // if accestoken and refresh token are valids. they will call the done() to supply passport
  // with the user that authenticated
  // incorrect credential: we can pass an error as first option(here used null so there is no error)
  // TODO: change null if error during log in + add users to database
}
const passportConfig = {
  passport: passport, // Export the Passport instance
  strategy: new Strategy(AUTH_OPTIONS, verifyCallback), // Export the strategy instance

  // Export the serialize and deserialize functions
  serializeUser: function (user, done) {
    process.nextTick(function () {
      console.log("serialize", user.email, user.userId);
      done(null, user);
    });
  },
  deserializeUser: async function (user, done) {
    process.nextTick(async function () {
      console.log("deserialize", user);
      try {
        const foundUser = await findUser({
          email: user.email,
          userId: user.userId,
        });
        console.log("deserialize n2", foundUser.email, foundUser.userId);
        done(null, foundUser);
      } catch (err) {
        console.error("Error in deserializeUser:", err);
        done(err, null);
      }
    });
  },
};

// Export the passportConfig object
module.exports = passportConfig;

// // passport strategy: how passport authenticate users
// passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// // Serialize function tells Passportjs what to store inside the user sessions.
// // Deserialize function attaches the result to the request.user.
// passport.serializeUser((user, done) => {
//   process.nextTick(function () {
//     console.log("serialize", user.email, user.userId);
//     done(null, user);
//   });
// });
// passport.deserializeUser((user, done) => {
//   process.nextTick(async function () {
//     console.log("deserialize", user);
//     try {
//       const foundUser = await findUser({
//         email: user.email,
//         userId: user.userId,
//       });
//       console.log("deserialize n2", foundUser.email, foundUser.userId);
//       done(null, foundUser);
//     } catch (err) {
//       console.error("Error in deserializeUser:", err);
//       done(err, null);
//     }
//   });
// });
