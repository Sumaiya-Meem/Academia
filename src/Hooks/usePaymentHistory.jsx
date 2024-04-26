import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { ContextProvider } from "../Pages/Context/AuthProvider";

const usePaymentHistory = () => {

        const {user}=useContext(ContextProvider);
   
        const axiosPublic= useAxiosPublic();
    
    
        const {data : payments = [],isLoading, isError} = useQuery({
            queryKey: ['payment-history'],
            queryFn: async () => {
                const res = await axiosPublic.get(`/payment/${user?.email}`)
                return res.data;
            }
        });
        return { payments, isLoading, isError };
};

export default usePaymentHistory;