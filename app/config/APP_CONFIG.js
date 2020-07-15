module.exports = {
  database: {
    host: "cluster0-0mjj1.mongodb.net",
    port: 27017,
    db: "starmyagent",
    username: "childschool",
    password: "YbsBGKftwKpciEEJ"
  },
  mail: {
    service: "gmail",
    auth: {
      user: "info@starmyagent.com",
      pass: "rslguioniyspbcrj"
    }
  },
  adminEmail: "info@starmyagent.com",
  firebase: {
    apiKey: "AIzaSyDNzZis7J30BJSm479iLYAvDKh_co4EFOs",
    authDomain: "https://accounts.google.com/o/oauth2/auth",
    databaseURL: "https://childschool-webapp.firebaseio.com",
    projectId: "childschool-webapp"
  },
  site_url: "https://www.starmyagent.com",
  registerWebAppUrl: "https://www.starmyagent.com/register",
  uploadUrl: "http://127.0.0.1:8081/",
  resetPasswordUrl: "https://www.starmyagent.com/reset-password/",
  token: "token_starmyurget",
  discount: (numberAgent) => {
    if(numberAgent >= 2 && numberAgent <= 5) {
      return 10
    }
    if(numberAgent >= 6 && numberAgent <= 12) {
      return 15
    }
    if(numberAgent >= 13 && numberAgent <= 50) {
      return 20
    }
    if(numberAgent > 50) {
      return 25
    }
    return 0
  }
};
