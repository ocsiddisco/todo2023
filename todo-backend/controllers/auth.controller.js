const config = require("../config/auth.config");
const { signUp, signIn } = require("../models/auth.model");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// SIGN UP

async function httpSignUp(req, res) {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const response = await signUp(username, email, hashedPassword);

    if (!response) {
      return res.status(500).json({ Error: "Failed to update todo" });
    }
    const token = jwt.sign({ id: response.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    return res.status(201).send({ token: token });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

// SIGN IN

async function httpSignIn(req, res) {
  console.log("getting here httpsignin");
  try {
    const username = req.body.username;
    const password = req.body.password;

    const userInfo = await signIn(username, password);

    if (!userInfo) {
      return res.status(404).send({ message: "Incorrect Credentials!" });
    }

    const token = jwt.sign({ id: userInfo.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({ ok: true, token: token });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

// SIGN OUT

async function httpSignOut(req, res) {
  console.log("startingsign out back end");
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

module.exports = { httpSignUp, httpSignIn, httpSignOut };
