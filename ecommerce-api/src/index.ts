import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";
import { IStripePayment } from "./models/IStripePayment";
app.use("/products", productRouter);
app.use("/customers", customerRouter);
app.use("/orders", orderRouter);
app.use("/order-items", orderItemRouter);

const stripe = require("stripe")(process.env.STRIPE_KEY);

[
  {
    price_data: {
      currency: "sek",
      product_data: [Object],
      unit_amount: 123,
    },
    quantity: 2,
  },
];

app.post(
  "/create-checkout-session-embedded",
  async (req: Request, res: Response) => {
    const { line_items, client_reference_id }: IStripePayment = req.body;
    
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      ui_mode: "embedded",
      client_reference_id: client_reference_id,
      return_url:
        "http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}",
    });

    // res.send({clientSecret: session.client_secret});
    res.json({
      clientSecret: session.client_secret,
      checkout_url: session.url,
      session_id: session.id,
    });
  }
);

// Match the raw body to content type application/json
// If you are using Express v4 - v4.16 you need to use body-parser, not express, to retrieve the request body
app.post("/webhook", (req: Request, res: Response) => {
  const event = req.body;

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      // update order with confirmed payment
      // -- payment_status = paid
      // -- payment_id = session.id
      // -- payment status = "Recieved"

      // Update product stock

      // Send confirmation email
      console.log(session);
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
});

// Attempt to connect to the database
connectDB();
// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});
