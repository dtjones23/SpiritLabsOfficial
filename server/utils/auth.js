const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "shhhhhhspiritsecret";
const expiration = "2h";

module.exports = {
  authMiddleware({ req }) {
    let token = req.headers.authorization || req.query.token || req.body.token;

    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    if (!token) return req;

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      console.error("Invalid token", err);
    }

    return req;
  },

  signToken({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
