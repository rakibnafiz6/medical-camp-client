import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);


const Payment = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const fees = queryParams.get("fees");
    const id = queryParams.get("id");

    console.log("Payment Component Fees:", fees);
    console.log("Payment Component ID:", id);

   
    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-6">Payment</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm fees={fees} id={id}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;