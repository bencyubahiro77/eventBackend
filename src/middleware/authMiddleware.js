import jwt from 'jsonwebtoken';

const maxPeriod = 24 * 60 * 60;

export const createToken = (id) => {
  return jwt.sign({ id }, "amat victoria curam", {
    expiresIn: maxPeriod,
  });
};

export const authMiddleware = (req, res, next) => {
  let token = req.get("authorization");

  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, "amat victoria curam", (err, decodedToken) => {
      if (err) {
        res.status(400).json({ status: 400, message: err.message });
      } else {
        // Check if the user has admin role
        if (decodedToken.id.user.role === 'Admin') {
          next(); // Allow access to the route
        } else {
          res.status(403).json({ status: 403, message: "You don't have permission to access this resource"});
        }
      }
    });
  } else {
    res.status(400).json({ status: 400, message: "You're not logged in" });
  }
};
