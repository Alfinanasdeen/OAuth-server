import passport from "passport";

export const loginSuccess = (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
};

export const loginFailed = (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
};

export const googleAuth = passport.authenticate("google", ["profile", "email"]);

export const googleCallback = passport.authenticate("google", {
  successRedirect: "https://darling-licorice-946ff7.netlify.app",
  failureRedirect: "/login/failed",
});

export const githubAuth = passport.authenticate("github", ["profile", "email"]);

export const githubCallback = passport.authenticate("github", {
  successRedirect: "https://darling-licorice-946ff7.netlify.app",
  failureRedirect: "/login/failed",
});

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err); 
      return res.status(500).json({ message: "Failed to log out" });
    }
    res.redirect("https://darling-licorice-946ff7.netlify.app"); 
  });
};
