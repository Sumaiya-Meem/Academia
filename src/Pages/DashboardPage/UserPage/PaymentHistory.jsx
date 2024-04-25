import { useContext } from "react";
import { ContextProvider } from "../../Context/AuthProvider";


const PaymentHistory = () => {
    const {user}=useContext(ContextProvider);

    



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
                        
                    </tbody>
                </table>
        </div>
    );
};

export default PaymentHistory;