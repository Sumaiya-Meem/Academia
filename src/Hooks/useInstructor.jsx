import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useInstructor = () => {
    const axiosSecure = useAxiosPublic();

    const { data: instructors = [], refetch, isLoading, isError } = useQuery({
        queryKey: ['instructor'],
        queryFn: async () => {
            const res = await axiosSecure.get('/instructor');
            return res.data;
        }
    });

    return [ instructors, refetch, isLoading, isError ];
};

export default useInstructor;