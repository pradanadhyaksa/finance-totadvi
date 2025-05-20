import { asyncMiddleware } from '../middlewares'
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const CONTROLLER_SUBSCRIPTION = {
  create: asyncMiddleware(async (req, res) => {
    try {
      const { email, priceId } = req.body;
      
      // Check if customer already exists
      let customers = await stripe.customers.list({ email });
      let customer;
  
      if (customers.data.length) {
        customer = customers.data[0];
        const subscriptions = await stripe.subscriptions.list({ customer: customer.id, status: 'active' });
  
        if (subscriptions.data.length) {
          return res.status(400).json({ error: 'Subscription already exists!' });
        }
      } else {
        customer = await stripe.customers.create({ email });
      }
  
      let session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        customer: customer.id, 
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: 'https://fpatotadvi-b53f67880f53.herokuapp.com',
        cancel_url: 'https://fpatotadvi-b53f67880f53.herokuapp.com',
      });
      res.json({ url: session.url });
  
    } catch (error) {
      console.error('Stripe Checkout Error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }),
  

  update: asyncMiddleware(async (req, res) => {
    try {
      const { email, priceId } = req.body;
      const customers = await stripe.customers.list({ email });
      if (!customers.data.length) {
        return res.status(404).json({ error: "Customer not found" });
      }
      const customer = customers.data[0];

      const subscriptions = await stripe.subscriptions.list({ customer: customer.id , status:'active'});
      if (!subscriptions.data.length) {
        return res.status(404).json({ error: "No active subscription found" });
      }
      const subscription = subscriptions.data[0];

      await stripe.subscriptions.update(subscription.id, {
        items: [{ id: subscription.items.data[0].id, price: priceId }],
        proration_behavior: "create_prorations", // immediately attempt charge to user 
        payment_behavior: "error_if_incomplete", // ensure subscription is only update if payment is successful
      });

      return res.json({ success: true, message: "Subscription upgraded successfully!", subscription: priceId });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message })
    }
  }),

  getSubscription: asyncMiddleware(async (req, res) => {
    try {
      const { email } = req.body;
      const customers = await stripe.customers.list({ email });
      if (!customers.data.length) {
        return res.status(404).json({ error: "Customer not found" });
      }

      let customer = customers.data[0];
      const subscriptions = await stripe.subscriptions.list({ customer: customer.id });
      if (!subscriptions.data.length) {
        return res.status(404).json({ error: "No active subscription found" });
      }
      
      const subscription = subscriptions.data[0];
      const currentPriceId = subscription.items.data[0].price.id;
      return res.json({message:'Successfully doload', plan: currentPriceId})
    } catch (error) {
      res.status(500).json({message: 'Server error', error: error.message})
    }
  }),

  cancel: asyncMiddleware(async (req, res) => {
    try {
      const { email } = req.body;
      const customers = await stripe.customers.list({ email });
      if (!customers.data.length) {
        return res.status(404).json({ error: "Customer not found" });
      }

      const customer = customers.data[0];
      const subscriptions = await stripe.subscriptions.list({ customer: customer.id, status: "active" });
      if (!subscriptions.data.length) {
        return res.status(404).json({ error: "No active subscription found" });
      }

      const subscription = subscriptions.data[0];
      await stripe.subscriptions.del(subscription.id);

      return res.json({ message: "Subscription canceled successfully!" });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  })
}