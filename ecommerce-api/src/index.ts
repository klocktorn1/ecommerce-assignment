import dotenv from "dotenv";
import express, { Request, Response } from "express";
import {connectDB} from "./config/db";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(express.json())
app.use(cors())

// Routes
import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)
app.use('/order-items', orderItemRouter)

// // This example sets up an endpoint using the Express framework.
// // Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.


// const stripe = require('stripe')(process.env.STRIPE_KEY)

// app.post('/stripe/create-checkout-session-hosted', async (req: Request, res: Response) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: 'T-shirt',
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: 'http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}',
//     cancel_url: 'http://localhost:5173/',
//     client_reference_id: "123"
//   });

//   res.json({checkout_url: session.url})

//   // res.redirect(303, session.url);
// });

// app.listen(4242, () => console.log(`Listening on port ${4242}!`));


const stripe = require('stripe')(process.env.STRIPE_KEY);

app.post('/create-checkout-session-embedded', async (req: Request, res: Response) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'T-shirt',
        },
        unit_amount: 2000,
      },
      quantity: 1,
    }],
    mode: 'payment',
    ui_mode: 'embedded',
    client_reference_id: "123",
    return_url: 'https://localhost:5173/checkout/return?session_id={CHECKOUT_SESSION_ID}'
  });

  // res.send({clientSecret: session.client_secret});
  res.json({
    clientSecret: session.client_secret,
    checkout_url: session.url,
    session_id: session.id 
  });
  
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));


// Attempt to connect to the database
connectDB()
// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
})
