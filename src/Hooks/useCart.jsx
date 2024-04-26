import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
    const axiosSecure = useAxiosPublic();

    const { data: carts, refetch, isLoading, isError } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const res = await axiosSecure.get('/carts');
            return res.data;
        }
    });

    return { carts, refetch, isLoading, isError };
};

export default useCart;