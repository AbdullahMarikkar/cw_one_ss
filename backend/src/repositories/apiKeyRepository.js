const db = require("../config/database");
const createResponse = require("../utils/createResponse");
const { generateHashedKey } = require("../utils/bcryptUtil");

async function createKey(userId, key) {
  const hashedKey = generateHashedKey(key);
  return new Promise((resolve, reject) => {
    db.run(
      "insert into api_keys (user_id,api_key) values (?,?)",
      [userId, hashedKey],
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
    db.get(
      "select id, is_active from api_keys where api_key = ? and is_active = 1",
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

async function updateLastUsedById(id) {
  return new Promise((resolve, reject) => {
    db.run(
      "update api_keys SET last_used = CURRENT_TIMESTAMP, times_used = times_used + 1 WHERE id = ?",
      [id],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(createResponse(true, `${id} Key Last Used State Updated`));
      }
    );
  });
}

module.exports = { createKey, getByKey, updateLastUsedById };
