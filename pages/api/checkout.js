import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    if (req.method === "POST") {
        const { amount, id } = req.body;

        try {
            const payment = await stripe.paymentIntents.create({
                amount,
                currency: "USD",
                description: "Gravity Grills Payment",
                payment_method: id,
                confirm: true,
            });

            console.log(payment);

            return res.status(200).json({ message: "Payment successful" });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error.raw.message });
        }
    }

    return res.status(404).json({ message: "Invalid HTTP method" });
};
