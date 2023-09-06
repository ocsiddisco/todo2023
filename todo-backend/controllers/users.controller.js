// const { client } = require("../services/mongo");

// const { createUser } = require("../models/user.model");

// // fetch user
// // create user
// async function httpCreateUser(req, res) {
//   console.log("create controller", req.body);
//   const newUser = req.body;
//   console.log("create User controller", newUser);

//   if (!newUser) {
//     return res.status(400).json({ error: "Missing user information" });
//   }

//   const success = await createUser(client, newUser);
//   if (!success) {
//     return res.status(500).json({ Error: "Failed to add todo" });
//   } else {
//     return res.status(201).json(newUser);
//   }
// }
// // delete user

// module.exports = {
//   // httpFindUser,
//   httpCreateUser,
//   // httpDeleteUser,
// };
