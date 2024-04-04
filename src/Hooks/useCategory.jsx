import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCategory = () => {
    const axiosSecure = useAxiosPublic();

    const { data: categorys, refetch, isLoading, isError } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await axiosSecure.get('/category');
            return res.data;
        }
    });

    return { categorys, refetch, isLoading, isError };
};

export default useCategory;
