import passport from "passport";

// Login Success Handler
export const loginSuccess = (req, res) => {
  console.log("User:", req.user);
  console.log("Session:", req.session);

  if (req.user) {
    res.cookie("token",session.cookie)
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  }
   else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
};

// Login Failed Handler
export const loginFailed = (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
};

// Google Authentication Route
export const googleAuth = passport.authenticate("google", ["profile", "email"]);

// Google Authentication Callback
export const googleCallback = passport.authenticate("google", {
  successRedirect: process.env.CLIENT_URL, 
  failureRedirect: "/login/failed", 
});

// GitHub Authentication Route
export const githubAuth = passport.authenticate("github", ["profile", "email"]);

// GitHub Authentication Callback
export const githubCallback = passport.authenticate("github", {
  successRedirect: process.env.CLIENT_URL, 
  failureRedirect: "/login/failed", 
});

// Logout Handler
export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to log out" });
    }
    
    res.clearCookie("connect.sid"); 
    res.redirect(process.env.CLIENT_URL); 
  });
};
