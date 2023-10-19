const router = require("express").Router();
const admin = require("firebase-admin");
let data = [];

router.get("/", (req, res) => {
  return res.send("Inside the user router");
});

router.get("/jwtVerification", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ msg: "Token Not Found" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      return res
        .status(500)
        .json({ success: false, msg: "Unauthorized access" });
    }
    return res.status(200).json({ success: true, data: decodedValue });
  } catch (err) {
    return res.send({
      success: false,
      msg: `Error in extracting the token: ${err}`
    });
  }
});

const listAllUsers = nextPageToken => {
  // List batch of users, 1000 at a time.
  admin
    .auth()
    .listUsers(1000, nextPageToken)
    .then(listUsersResult => {
      listUsersResult.users.forEach(userRecord => {
        // console.log('user', userRecord.toJSON());
        data.push(userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch(error => {
      console.log("Error listing users:", error);
    });
};
// Start listing users from the beginning, 1000 at a time.
listAllUsers();

router.get("/all", (req, res) => {
  listAllUsers();
  try {
    return res
      .status(200)
      .send({ success: true, data: data, dataCount: data.length });
  } catch (error) {
    return res.send({
      success: false,
      message: `Error in listing users :, ${error}`
    });
  }
});

module.exports = router;
