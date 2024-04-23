import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";


const CheckoutForm  = () => {

    const stripe = useStripe();
  const elements = useElements();

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
            card,
          });
      
          if (error) {
            console.log('[error]', error);
          } else {
            console.log('[PaymentMethod]', paymentMethod);
          }

    }
    return (
       <div className="mt-0"> 
        <form onSubmit={handleSubmit} className="py-28 px-5">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out my-5" type="submit">
                    Pay
                </button>
                {/* <p className='text-red-600'>{error}</p> */}
            </form>
       </div>
    );
};

export default CheckoutForm ;