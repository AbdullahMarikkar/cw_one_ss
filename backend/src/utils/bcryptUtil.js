const bcrypt = require("bcrypt");
const crypto = require("crypto");

const generateHash = async (string) => {
  const saltRounds = 10; //$2aod!234[hash][salt]
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedpassword = await bcrypt.hash(string, salt);
  return hashedpassword;
};

const verify = async (formpassword, dbpassword) => {
  try {
    const isMatch = await bcrypt.compare(formpassword, dbpassword);
    return isMatch;
  } catch (ex) {
    console.error(ex);
  }
};

const generateHashedKey = (apiKey) => {
  const hashedKey = crypto.createHash("sha256").update(apiKey).digest("hex");
  return hashedKey;
};

module.exports = { generateHash, verify, generateHashedKey };
