const User = require("../models/user.mongo");

async function checkDuplicateUsernameOrEmail(req, res, next) {
  try {
    const username = await User.findOne({
      username: req.body.username,
    });
    const email = await User.findOne({ email: req.body.email });

    if (username) {
      res.status(400).send({ message: "Username already used" });
      return;
    }
    if (email) {
      res.status(400).send({ message: "Email is already in use!" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
