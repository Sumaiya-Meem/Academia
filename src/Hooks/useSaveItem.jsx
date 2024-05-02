import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useSaveItem = () => {
    const axiosSecure = useAxiosPublic();

    const { data: saveItems=[], refetch:saveRefetch, isLoading, isError } = useQuery({
        queryKey: ['saveItem'],
        queryFn: async () => {
            const res = await axiosSecure.get('/saveItem');
            return res.data;
        }
    });

    return [ saveItems, saveRefetch, isLoading, isError ];
};

export default useSaveItem;