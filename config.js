fs = require('fs');
require("dotenv").config();

const path = './frontend/src/src/config.json';

function writeConfig(){
  if (fs.existsSync(path)) {
    const m = JSON.parse(fs.readFileSync(path));
    m.API_Base_Url = process.env.API_Base_Url;
    m.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    fs.writeFileSync(path, JSON.stringify(m));
  } else {
    const param = JSON.stringify({
      API_Base_Url:process.env.API_Base_Url,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
    });
    fs.writeFile(path, param, function (err) {
      if (err) throw err;
    });
  }
  
}

writeConfig();