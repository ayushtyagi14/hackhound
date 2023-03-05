import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Checkout() {
    const [summaryData, setSummaryData] = useState([]);

    useEffect(() => {
        setSummaryData(JSON.parse(localStorage.getItem("orderSummary")));
    }, []);

    return (
        <Layout>
            <div className="container mx-auto px-4 py-5">
                <h1 className="text-2xl font-semibold mb-5">Review Your Order</h1>
                <div className="bg-white p-3 rounded-md">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left py-2 px-3">Dish Name</th>
                                <th className="text-left py-2 px-3">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summaryData.order.map((dish) => {
                                const dishData = summaryData.dishInfo.find(
                                    (item) => item._id === dish
                                );
                                return (
                                    <tr key={dish}>
                                        <td className="py-2 px-3">{dishData.dishName}</td>
                                        <td className="py-2 px-3">${dishData.dishPrice}</td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td className="font-semibold py-2 px-3">Total</td>
                                <td className="font-semibold py-2 px-3">
                                    ${summaryData.totalAmount}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="my-5">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm summaryData={summaryData} />
                    </Elements>
                </div>
            </div>
        </Layout>
    );
}
