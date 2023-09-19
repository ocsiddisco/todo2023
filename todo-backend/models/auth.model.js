const User = require("./user.mongo");
var bcrypt = require("bcryptjs");

// SIGN UP
async function signUp(username, email, password) {
  try {
    const user = new User({ username, email, password });
    console.log("user auth.controller", user);
    const result = await user.save();
    if (!result) {
      return false;
    }
    console.log("user.ID in auth model", user.id);
    return { id: user.id };
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
}

// SIGN IN
async function signIn(userName, password) {
  try {
    const user = await User.findOne({
      username: userName,
    });
    if (!user) {
      return false;
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return false;
    }

    return {
      id: user._id,
      username: user.username,
      email: user.email,
      todos: user.todos,
    };
  } catch (error) {
    console.error("Error signing in user:", error);
    throw error;
  }
}

module.exports = { signUp, signIn };
