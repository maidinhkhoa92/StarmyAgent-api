const user = require("../../services/user");
const stripe = require("../../services/stripe");
const APP_CONFIG = require("../../config/APP_CONFIG");
const { validationResult } = require("express-validator");
const _ = require("lodash");

module.exports.up_premium_level = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { id, email, type } = req.decoded;
    const { token, time } = req.body;
    let stripe_customer_id = '';
    const User = await user.detail(id);

    // Generate stripe customer id
    // check if customer has stripe customer id
    if (User.stripe_customer_id && User.stripe_customer_id !== '') {
      stripe_customer_id = User.stripe_customer_id
    } else {
      // create new customer
      const customer = await stripe.create_customers(email, token);
      await user.update(id, { stripe_customer_id: customer.id });
      stripe_customer_id = customer.id
    }

    // generate items
    const hash = `${time}_${type}`;
    let items = [{ price: APP_CONFIG[hash], quantity: 1 }];
    if (type === 'agency') {
      const agentLength = await user.count(id);
      items = [
        ...items,
        { price: APP_CONFIG[`${time}_agent`], quantity: agentLength }
      ]
    }

    // generate coupon
    let coupon;
    if (type === 'agency') {
      coupon = APP_CONFIG.monthly_coupon_agency;
      if (time === 'yearly') {
        coupon = APP_CONFIG.yearly_coupon_agency;
      }
    }

    // generate subscription
    let response;
    if (User.stripe_subscription_id && User.stripe_subscription_id !== '') {
      response = await stripe.update_subscriptions(User.stripe_subscription_id, items, coupon);
    } else {
      response = await stripe.create_subscriptions(stripe_customer_id, items, coupon);
    }

    res.status(200).send(response);
  } catch (err) {
    console.log(err)
    next(err);
  }
};

module.exports.down_premium_level = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { id } = req.decoded;

    const User = await user.detail(id);
    const response = await stripe.delete_subscriptions(User.stripe_subscription_id);
    await user.update(id, { stripe_subscription_id: '', level: 'basic' })

    res.status(200).send(response);
  } catch (err) {
    console.log(err)
    next(err);
  }
};

module.exports.update_subscriptions = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const { id } = req.decoded;
    const User = await user.detail(id);

    if (User.stripe_subscription_id && User.stripe_subscription_id === '') {
      res.status(200).send({});
    } else {
      const Subscription = await stripe.retrieve_subscriptions(User.stripe_subscription_id)
      const agentLength = await user.count(id);
      items = _.map(
        Subscription.items.data, eq => ({ 
          price: eq.price.id,
          quantity: eq.price.id === APP_CONFIG.monthly_agent || eq.price.id === APP_CONFIG.yearly_agent ? agentLength : eq.quantity
        })
      );
      await stripe.update_subscriptions(User.stripe_subscription_id, items)

      res.status(200).send({});

    }

  } catch (err) {
    next(err);
  }
};

module.exports.stripe_hooks = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ errors: errors.array() });
    return;
  }

  try {
    const data = req.body.data.object;
    const User = await user.find({ stripe_customer_id: data.customer })

    if (!User) {
      throw ({ code: 11 })
    }

    if (User.stripe_subscription_id && User.stripe_subscription_id !== '' && User.stripe_subscription_id !== data.subscription) {
      throw ({ code: 11 })
    }

    if (data.paid && data.status === 'paid') {
      await user.update(User.id, { stripe_subscription_id: data.subscription, level: 'premium' })
    } else {
      await user.update(User.id, { stripe_subscription_id: '', level: 'basic' })
    }

    res.status(200).send({});
  } catch (err) {
    next(err);
  }
};