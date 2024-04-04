import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTechnology = () => {
    const axiosSecure = useAxiosPublic();

    const {data: technologys = [], refetch} = useQuery({
        queryKey: ['technology'],
        queryFn: async () =>{
              const res = await axiosSecure.get('/technology')
              return res.data;
        }
    })
  

  return[technologys,refetch]
};

export default useTechnology;