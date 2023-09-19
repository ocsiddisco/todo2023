const User = require("./user.mongo");

async function deleteUser(userId) {
  try {
    const result = await User.findOneAndDelete({ _id: userId });
    if (!result) {
      // User not deleted
      return false;
    }

    console.log({ result });
    console.log("User has been deleted");

    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

module.exports = { deleteUser };
