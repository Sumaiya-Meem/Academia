import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTechnology = () => {
    const axiosSecure = useAxiosPublic();

    const { data: technologys, refetch, isLoading, isError } = useQuery({
        queryKey: ['technology'],
        queryFn: async () => {
            const res = await axiosSecure.get('/technology');
            return res.data;
        }
    });

    return { technologys, refetch, isLoading, isError };
};

export default useTechnology;
