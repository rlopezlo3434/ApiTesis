const firebaseAuth = require("firebase/auth");

exports.verifyJwt = (req, res, next) => {
    const auth = firebaseAuth.getAuth();
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      console.log(uid);
      next();
    } else {
      console.log(user)
      return res.status(500).send("Error de autenticación");
    }
  };