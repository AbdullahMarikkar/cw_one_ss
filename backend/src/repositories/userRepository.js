const db = require("../config/database");
const createResponse = require("../utils/createResponse");

async function createUser(req) {
  return new Promise((resolve, reject) => {
    db.run(
      "insert into users (name, email, password) values (?,?,?)",
      [...Object.values(req.body)],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(createResponse(true, "Record Inserted"));
      }
    );
  });
}
async function getByEmail(req) {
  try {
    return new Promise((resolve, reject) => {
      db.get(
        "select * from users where email = (?)",
        [req.body.email],
        (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(createResponse(true, rows));
        }
      );
    });
  } catch (ex) {
    console.error(ex);
  }
}

module.exports = { createUser, getByEmail };
