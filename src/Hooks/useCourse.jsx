import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCourse = () => {
    const axiosSecure = useAxiosPublic();

    const { data: courses=[], refetch, isLoading, isError } = useQuery({
        queryKey: ['course'],
        queryFn: async () => {
            const res = await axiosSecure.get('/course');
            return res.data;
        }
    });

    return { courses, refetch, isLoading, isError };
};

export default useCourse;