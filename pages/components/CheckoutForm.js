import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const CheckoutForm = ({ paymentAmount, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        // Create a payment intent on the server
        const response = await axios.post("/api/payment_intents", {
            amount: paymentAmount,
        });

        if (!response.data || !response.data.clientSecret) {
            setErrorMessage("Failed to create payment intent");
            setLoading(false);
            return;
        }

        // Confirm the card payment on the client
        const result = await stripe.confirmCardPayment(response.data.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: event.target.name.value,
                    email: event.target.email.value,
                },
            },
        });

        if (result.error) {
            setErrorMessage(result.error.message);
            setLoading(false);
        } else {
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name
                <input type="text" name="name" required />
            </label>

            <label>
                Email
                <input type="email" name="email" required />
            </label>

            <label>
                Card details
                <CardElement />
            </label>

            <button type="submit" disabled={!stripe || loading}>
                {loading ? "Processing payment..." : `Pay $${paymentAmount / 100}`}
            </button>

            {errorMessage && <p>{errorMessage}</p>}
        </form>
    );
};

export default CheckoutForm;
