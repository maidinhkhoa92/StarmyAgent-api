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
      user: 'info@starmyagent.com',
      clientId: '627802836661-osvvchcokr5ttrsbdga7264nnaucbbja.apps.googleusercontent.com',
      clientSecret: 'OPjxa7gSDZiNDmOwfLl7st59',
      refreshToken: '1//04z-PjyD_DpG0CgYIARAAGAQSNwF-L9IrdNoJ42u7KwkkRr1l1HCzP_69ta9LXRZTySz1WJgGPzbVA8E4OxNkwQbuPqbCw8uivww',
      accessToken: 'ya29.a0AfH6SMA3WNACAcLIX7kNZOs-CGOjTauwk4_LD-1h7h2LRpjNyhd9TDVgl43WAcv0pzQ1CIxJ_nyquUi5XOgFOzone8xZrLrmAQJwtSsggZuAPvOGQmTQAGQvhGdX0bso8Sjlm4oZiGptzYU3EChZq77mbz3s6J7szZKbm_szfQc'
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
