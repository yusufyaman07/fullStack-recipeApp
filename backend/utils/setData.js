const fs = require("fs");

// GetData
module.exports = (data) => {
  try {
    return JSON.parse(
      fs.writeFileSync(`${__dirname}/../data/data.json`, JSON.stringify(data))
    );
  } catch (err) {
    console.error("Error writing data.json:", err);
  }
};
