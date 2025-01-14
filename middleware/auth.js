const jwt = require("jsonwebtoken");
const con =require("../config/db");
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    jwt.verify(token, "p-lyheng secret", (err, decoded) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, "p-lyheng secret", (err, decoded) => {
        if (err) {
            res.locals.user =null;
          res.redirect("/login");
        } else {
            const sql = "SELECT * FROM `tbl_user` WHERE id =?";
            con.query(sql, decoded.id, (err, data) => {
              if (err) {
                console.log(err);
              } else {
                res.locals.user = data[0];
                next();
              }
            });
        }
      });
    } else {
    res.locals.user =null;
      next();
    }
  };

module.exports = { requireAuth ,checkUser};
