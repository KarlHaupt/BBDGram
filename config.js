fs = require('fs');
require("dotenv").config();

const path = './frontend/src/config.json';

function writeConfig(){
  if (fs.existsSync(path)) {
    const m = JSON.parse(fs.readFileSync(path));
    m.Identity_Server_Base_Url = process.env.API_Base_Url;
    fs.writeFileSync(path, JSON.stringify(m));
  } else {
    const param = JSON.stringify({
      Identity_Server_Base_Url:process.env.API_Base_Url
    });
    fs.writeFile(path, param, function (err) {
      if (err) throw err;
    });
  }
  
}

writeConfig();