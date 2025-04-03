const db = require("../config/database");
const createResponse = require("../utils/createResponse");

async function createKey(userId, key) {
  return new Promise((resolve, reject) => {
    db.run(
      "insert into api_keys (user_id,api_key) values (?,?)",
      [userId, key],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(createResponse(true, key));
      }
    );
  });
}

async function getByKey(key) {
  return new Promise((resolve, reject) => {
    db.run(
      "select is_active from api_keys where api_key = ? and is_active = 1",
      [key],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        if (!rows) {
          resolve(createResponse(false, null));
        }
        resolve(createResponse(true, rows));
      }
    );
  });
}

module.exports = { createKey, getByKey };
