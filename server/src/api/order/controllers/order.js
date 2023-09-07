"use strict";
// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ stripe }) => ({
  async create(ctx) {
    const { product, userName, email } = ctx.request.body;

    try {
      const lineItems = await Promise.all(
        product.map(async (product) => {
          const item = await strapi
            .service("api::item.item")
            .findOne(product.id);
          console.log(product);
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity: product.count,
          };
        })
      );

      //stripe session

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        price: 'price_1NnnpoSCgy3veZpnpzp4Mfim',
        success_url: `${process.env.FRONTEND_URL}/checkout/success`,
        cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`,
        line_items: lineItems,
      });

      await strapi.service("api::order.order").create({
        data: {
          userName,
          product,
          stripeSessionId: session.id,
        },
      });

      return { id: session.id };
    } catch (err) {
      console.log(err);
      ctx.response.status = 500;
      return { error: err.message };
    }
  },
}));
