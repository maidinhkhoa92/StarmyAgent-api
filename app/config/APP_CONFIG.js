module.exports = {
  database: {
    host: "85.208.20.53",
    port: 27017,
    db: "starmyagent",
    username: "alexAdmin",
    password: "H7JSJNaGysrhRX59"
  },
  // database: {
  //   host: "cluster0-0mjj1.mongodb.net",
  //   port: 27017,
  //   db: "starmyagent",
  //   username: "childschool",
  //   password: "YbsBGKftwKpciEEJ"
  // },
  mail: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'maidinhkhoa92@gmail.com',
      clientId: '989923814210-30g3gb6vf0iln2fsrn4sushmjumt6t0j.apps.googleusercontent.com',
      clientSecret: '0eBNigMBcoR3GoJmDqKQxzK8',
      refreshToken: '1//04-mYLqZX6e9nCgYIARAAGAQSNwF-L9IrtJ9YiA6MzFdUHyKsvAzSGoQofEjR2LI721WH9u9uml1HhvvZLk5x5vQhfRmT_i8SXC4',
      accessToken: 'ya29.a0AfH6SMCONoTmvOcaHZEUh6gfeGrZ_yq0IIDvUXcG5QuiAMaU4IChlM6ujOryVDeE1EUzwsSVjrR-iWljFIDEn09HGYkJl0fWsRC6uu99BeU1y02nK11F9vcYyL0cjXYgEwB7kH8VzkBz1QXkO3gC-pFpzDvnUvKCDQo'
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
  },
  stripe_key: 'sk_test_51HfjfmGFRjF05vupobsZG5Wp9VXTyqBejWsYyerbIH4FlmHINpdvGdOBfdXS2pDUNyqIatAnEq8QEQb3PH6XrKUo00eFugpim0',
  monthly_agent: 'price_1Hg5BDGFRjF05vupuauwrA7f',
  yearly_agent: 'price_1Hg5R2GFRjF05vupaPVg2Hc2',
  yearly_agency: 'price_1Hg5PzGFRjF05vupuywiydxQ',
  monthly_agency: 'price_1Hg5CEGFRjF05vupHSce5LZm',
  monthly_coupon_agency: '6bD3zXVJ',
  yearly_coupon_agency: 'Dm5bSmBW',
  currency: 'EUR'
};
