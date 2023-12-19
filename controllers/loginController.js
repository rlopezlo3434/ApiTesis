const firebaseAuth = require("firebase/auth");
exports.postServidor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const auth = firebaseAuth.getAuth();

    firebaseAuth
      .signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        
        const user = userCredential.user;
        const token = user.stsTokenManager.accessToken;
        const verify = user.providerData;
        
        console.log(token);
        //res.json({Login: true, token, verify});
        res.json({ user,token });
        // ...
      })
  } catch (error) {
    console.log(error);
    res.json(error)
  }
};


