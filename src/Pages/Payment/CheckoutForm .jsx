import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { ContextProvider } from "../Context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const CheckoutForm = ({ price,courseTitle}) => {
  console.log('checkout page:',price,courseTitle);
  // const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();
  
  // const [transactionId, setTransactionId] = useState('');

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;


  const stripe = useStripe();
  const elements = useElements();

  const { user } = useContext(ContextProvider);
  const axiosPublic =useAxiosPublic();
//   console.log(price)

useEffect(()=> {
    axiosPublic.post("/create-payment-intent", {price:price})
    .then(res=> {
        console.log(res.data.clientSecret);
       setClientSecret(res.data.clientSecret)
    })

},[axiosPublic,price])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card
      })

    if (error) {
      console.log("[error]", error);
      // setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      // setError(' ');
    }

    // confirm payment
    const {paymentIntent, error: cardError} = await stripe.confirmCardPayment(clientSecret , {
      payment_method: {
          card: card,
          billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous',
          }
      }
 });

   if(cardError){
    
    // setError(cardError.message)
}else{
    console.log('payment intent',paymentIntent);
     if(paymentIntent.status === 'succeeded'){
        // setTransactionId(paymentIntent.id);

         const paymentInfo = {
             email: user?.email,
             price:price,
             transactionId: paymentIntent.id,
             date:formattedDate,
             courseTitle:courseTitle,
             status:"pending",
             
         };
        //  console.log(paymentInfo)

     const res = await axiosPublic.post('/payment', paymentInfo);
     if(res?.data?.acknowledged){
         toast.success('payment succeeded')
     }

     }    
     navigate("/dashboard/payment-history");
}



  };
  return (
    <div className="mt-0">
      <form onSubmit={handleSubmit} className="py-28 px-5">

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
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out my-5"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        {/* <p className='text-red-600'>{error}</p> */}
        {/* {
            transactionId && <p className="text-green-500">Your transaction id : {transactionId}</p>
        } */}
      </form>
    </div>
  );
};

export default CheckoutForm;
