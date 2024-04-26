
import usePaymentHistory from "../../../Hooks/usePaymentHistory";

const PaymentHistory = () => {
    const {payments}=usePaymentHistory();
    
    return (
        <div>
            <h1 className="text-xl text-center  font-semibold my-7">Payment History</h1>

            <table className="w-[98%] mx-auto">
                    <thead className="">
                        <tr className="border-b">
                            <th className="py-4 px-6 text-center bg-blue-900 border-r-[1px] border-gray-500  text-sm font-semibold text-white capitalize tracking-wider">
                                Course Title
                            </th>
                            <th className="py-4 px-6 text-center bg-blue-900 border-r-[1px] border-gray-500  text-sm font-semibold text-white capitalize tracking-wider">
                            Purchase Date
                            </th>
                            <th className="py-4 px-6 text-center bg-blue-900 border-r-[1px] border-gray-500  text-sm font-semibold text-white capitalize tracking-wider">
                                transactionId
                            </th>
                            <th className="py-4 px-6 text-center bg-blue-900 border-r-[1px] border-gray-500  text-sm font-semibold text-white capitalize tracking-wider">
                                Price
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                    {payments?.map((item, index) => (
                            <tr key={index}  className={index % 2 === 0 ? 'bg-gray-100 border-b' : ' border-b'}>
                                <td className="py-2 px-3 border-r text-center">{item?.courseTitle}</td>
                                <td className="py-2 px-3 border-r text-center">{item?.date}</td>
                                <td className="py-2 px-3 border-r text-center">{item?.transactionId}</td> 
                                <td className="py-2 px-3 border-r text-center">{item?.price}</td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    );
};

export default PaymentHistory;