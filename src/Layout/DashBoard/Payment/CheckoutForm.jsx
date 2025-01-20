import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ fees, id }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    // console.log("Fees in CheckoutForm:", fees, id);
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    // console.log(clientSecret);

    useEffect(() => {
        if (fees) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, { fees })
                .then((res) => {
                    if (res.data?.clientSecret) {
                        setClientSecret(res.data.clientSecret);
                    }
                })
                .catch((error) => console.error("Error creating payment intent:", error));
        }
    }, [fees]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);

        if (card == null) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            // setError(confirmError.message);
            // console.log('confirm error');
        } else {
            // console.log("Payment Success:", paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                // console.log('transactionId', paymentIntent.id);
                setTransactionId(paymentIntent.id);
                // Update payment status in database
                axios
                    .post(`${import.meta.env.VITE_API_URL}/update-payment-status/${id}`, {transactionId: paymentIntent.id, email: user?.email})
                    .then((res) => {
                        // console.log(res.data);
                        if (res.data.result.modifiedCount) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `Your payment successfully!Transaction ID: ${paymentIntent.id}`,
                                showConfirmButton: false,
                                timer: 2000
                            });
                            navigate('/dashboard/payment-history');
                        }
                    });
            }

        }



    };

    if (!clientSecret) return <p>Loading payment intent...</p>;

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <button
                type="submit"
                className="btn btn-primary mt-4"
                disabled={!stripe || !clientSecret}
            >
                Pay
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {transactionId && <p className="text-green-500">Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;