import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAnnouncement = () => {
    const axiosSecure = useAxiosPublic();

    const { data: announcement=[], refetch, isLoading, isError } = useQuery({
        queryKey: ['announcement'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcement');
            return res.data;
        }
    });

    return [ announcement, refetch, isLoading, isError ];
};

export default useAnnouncement;