const fs = require("fs");

// GetData
module.exports = () => {
  try {
    return JSON.parse(
      fs.readFileSync(`${__dirname}/../data/data.json`, "utf-8")
    );
  } catch (err) {
    console.error("Error reading data.json:", err);
  }
};
