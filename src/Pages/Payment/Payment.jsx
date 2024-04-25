import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm ";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const location = useLocation();
  const { price,CourseTitle} = location.state; 
  console.log('payment page:',price,CourseTitle);

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm price={price} courseTitle={CourseTitle}/>
      </Elements>
    </div>
  );
};

export default Payment;
