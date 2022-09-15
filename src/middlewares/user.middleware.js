import db from "../database/db.js";

async function isUser(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  const session = await db.collection("sessions").findOne({ token });
  if (!session) {
    res.sendStatus(401);
  }

  res.locals.session = session;
  next();
}

export default isUser;
