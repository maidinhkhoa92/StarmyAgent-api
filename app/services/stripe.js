const APP_CONFIG = require('../config/APP_CONFIG');
const stripe = require('stripe')(APP_CONFIG.stripe_key);

// Get prices
module.exports.get_prices = () => {
  return new Promise((resolve, reject) => {
    stripe.prices.list({})
      .then(response => {
        resolve(response)
      }).catch(err => {
        reject(err);
      });
  })
}

// Get coupons
module.exports.get_coupons = () => {
  return new Promise((resolve, reject) => {
    stripe.coupons.list({})
      .then(response => {
        resolve(response)
      }).catch(err => {
        reject(err);
      });
  })
}

// Create customer
module.exports.create_customers = (email, token) => {
  return new Promise((resolve, reject) => {
    stripe.customers.create({
      email,
      source: token
    })
      .then(response => {
        resolve(response)
      }).catch(err => {
        reject(err);
      });
  })
}

// Update customer
module.exports.update_customers = (id, token) => {
  return new Promise((resolve, reject) => {
    stripe.customers.update(id, {
      source: token
    })
      .then(response => {
        resolve(response)
      }).catch(err => {
        reject(err);
      });
  })
}

// Update customer
module.exports.delete_customers = (id) => {
  return new Promise((resolve, reject) => {
    stripe.customers.del(id)
      .then(response => {
        resolve(response)
      }).catch(err => {
        reject(err);
      });
  })
}

// Create subscription
module.exports.create_subscriptions = (customer, items, coupon) => {
  return new Promise((resolve, reject) => {
    const data = {
      customer,
      items,
    };
    if (coupon) {
      data.coupon = coupon
    }
    stripe.subscriptions.create(data)
      .then(response => {
        resolve(response)
      }).catch(err => {
        reject(err);
      });
  })
}

// Update subscription
module.exports.update_subscriptions = (id, items, coupon) => {
  return new Promise((resolve, reject) => {
    const data = {
      items,
    };
    if (coupon) {
      data.coupon = coupon
    }
    stripe.subscriptions.update(id, data)
      .then(response => {
        resolve(response)
      }).catch(err => {
        reject(err);
      });
  })
}

// Cancel subscription
module.exports.delete_subscriptions = (id) => {
  return new Promise((resolve, reject) => {
    stripe.subscriptions.del(id)
      .then(response => {
        resolve(response)
      }).catch(err => {
        reject(err);
      });
  })
}

// Get subscription by id
module.exports.retrieve_subscriptions = (id) => {
  return new Promise((resolve, reject) => {
    stripe.subscriptions.retrieve(id)
      .then(response => {
        resolve(response)
      }).catch(err => {
        reject(err);
      });
  })
}