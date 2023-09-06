const { client } = require("../services/mongo");

// validation schema user for mongo db

// db.createCollection("user-list", {
//   validator: {
//     $jsonSchema: {
//       bsonType: "object",
//       title: "User Object Validation",
//       required: [userID, email, ??],
//       properties: {
//         email: {
//           bsonType: "string",
//         },
//         userID: {
//           bsonType: "Int",
//         },
//         password: {
//           bsonType: 'string'
//       },
//     },
//   },
// });

// // get last user id in DB
const DEFAULT_USER_ID = 10;

async function getLatestUserId() {
  const latestUserId = await client
    .db("todos-app")
    .collection("user-list")
    //we pass an empty filter {} as the first argument to findOne to match all documents in the collection.
    // We then provide the sort option { id: -1 } to sort the documents based on the "id" field in descending order.
    .findOne({}, { sort: { id: -1 } });

  if (!latestUserId) {
    // if there is currently no user in DB
    return DEFAULT_USER_ID;
  }
  console.log("latestUserId", latestUserId);
  return latestUserId.userId;
}

// Create new user
async function createUser(newUser) {
  console.log("user.model - create user newUSer", newUser);
  const getId = await getLatestUserId();
  const newId = getId + 1;
  const addNewUser = Object.assign(newUser, {
    userId: newId,
  });
  console.log("add new user here", addNewUser);
  const result = await client
    .db("todos-app")
    .collection("user-list")
    .insertOne(addNewUser);
  console.log("result create user model", result);
  if (result) {
    return addNewUser;
  } else err;
  console.log("could not register user", err);
}

// find one user
async function findUser(email) {
  const result = await client
    .db("todos-app")
    .collection("user-list")
    .findOne(email);
  console.log("result user.model - findUser", result);
  return result;
}

module.exports = {
  createUser,
  findUser,
  // deleteUser,
};
