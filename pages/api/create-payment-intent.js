import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { items, email } = req.body;

        // Calculate the total order amount
        const amount = calculateOrderAmount(items);

        try {
            // Create a payment intent with the calculated order amount
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: "usd",
                receipt_email: email,
            });

            // Return the payment intent client secret to the client
            res.status(200).json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error creating payment intent" });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}

function calculateOrderAmount(items) {
    // Calculate the order total from the items in the cart
    return items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
}
