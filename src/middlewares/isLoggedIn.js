import jwt from "jsonwebtoken";
async function isLoggedIn(request, response, next) {
  try {
    const { SECRET } = process.env;
    const token = request.headers?.authorization?.split(" ")[1];
    const { uuid } = await jwt.verify(token, SECRET);
    if (uuid) request.user = { uuid };
    next();
  } catch (error) {
    console.log(error);
    response.status(401).json({ message: "You need to login again" });
  }
}

export default isLoggedIn;
