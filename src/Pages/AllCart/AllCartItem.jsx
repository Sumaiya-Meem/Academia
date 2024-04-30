
import useCart from "../../Hooks/useCart";
import Swal from 'sweetalert2'
import { Rating } from "flowbite-react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AllCartItem = () => {
  const [carts,refetch]  = useCart();
  const axiosPublic = useAxiosPublic();

const totalPrice = carts.reduce((sum, data) => {
    const itemTotal = data.offerPrice >0 ? parseInt(data.offerPrice) : parseInt(data.price);
    return sum + itemTotal;
  }, 0);

  const orginalPrice = carts.reduce((sum, data) => sum+parseInt(data.price), 0);


  const percentageDiscount = ((orginalPrice- totalPrice ) / orginalPrice) * 100;
  const discount = Math.round(percentageDiscount);

  const handleDelete = (id)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosPublic.delete(`carts/${id}`)
          .then(res=>{
            if(res.data.deletedCount > 0){
                refetch();
                Swal.fire({
                    title: "Deleted!",
                    text: "",
                    icon: "success"
                  });
            }
          })
        }
      });
  }

 
  return (
    <div className="mt-0">
      {carts.length > 0 ? (
        <h1 className="pt-20 lg:ml-10 font-bold text-xl mb-5">
          {carts.length} Courses in Cart
        </h1>
      ) : (
        <>
          <h1 className="pt-20 lg:ml-4 font-bold text-center">
            Your cart is empty!
          </h1>
        </>
      )}
      <div className="flex gap-12">
        <div className="w-[70%]">
          { carts.map((data) => (
                <>
                  <div className="flex justify-between ml-10 mb-2 border-t my-3 py-2 ">
                    <div className="flex gap-6">
                      <img
                        src={data.photo}
                        alt=""
                        className="w-[150px] h-[70px] "
                      />
                      <div>
                        <p className="font-semibold text-lg">{data.title}</p>
                        <div className="flex gap-2">
                          <p className="font-bold">{data.rating}</p>
                          <Rating>
                            <Rating.Star filled />
                            <Rating.Star filled />
                            <Rating.Star filled />
                            <Rating.Star filled />
                          </Rating>
                        </div>
                        <p>({data.totalRating} ratings)</p>
                      </div>
                    </div>
                    <div className="flex gap-12"> 
                      <div>
                        {data.offerPrice > 0 ? (
                          <>
                            <h1 className="font-bold text-xl">
                              ${data.offerPrice}
                            </h1>
                            <del>
                              <p className="text-gray-500">${data.price}</p>
                            </del>
                            {/* <p>{Math.round(((data.price - data.offerPrice) / data.price) * 100)} % Off</p> */}
                          </>
                        ) : (
                          <>
                            <h1 className="font-bold text-xl">${data.price}</h1>
                          </>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <button onClick={()=> handleDelete(data._id)} className="text-[#5624d0]">Remove</button>
                        <button className="text-[#5624d0]">Save for later</button>
                       
                      </div>
                    </div>
                  </div>
                </>
              ))
         }
        </div>
        <div className="w-[28%]">
            <h1 className="text-xl font-semibold lg:-mt-5">Total:</h1>
            <h1 className="text-3xl font-bold">${totalPrice}</h1>
            <del><h1>${orginalPrice}</h1></del>
            <h1>{discount }% off</h1>
        </div>
      </div>
    </div>
  );
};

export default AllCartItem;
