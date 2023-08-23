const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();

export async function ensureAuthenticated(req: any, res: any, next:any) {
  const token: string = req.headers["jwt-token"];
  let payload: any;

  if (!token) {
    return res.status(403).send("No Token Found");
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log(payload);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  res.setHeader("email", payload['email']);
  res.setHeader("Access-Control-Expose-Headers", "email");
  return next();

  }
