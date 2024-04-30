import { useContext, useEffect, useState } from "react";
import useCart from "../../Hooks/useCart";
import { ContextProvider } from "../Context/AuthProvider";

import { Rating } from "flowbite-react";

const AllCartItem = () => {
  const { carts } = useCart();
  const { user } = useContext(ContextProvider);
  const [matchedCartItem, setMatchedCartItem] = useState([]);

  useEffect(() => {
    if (carts && user) {
      const res = carts.filter((data) => data.email === user.email);
      setMatchedCartItem(res);
    }
  }, [carts, user]);
  return (
    <div className="mt-0">
      {matchedCartItem.length > 0 ? (
        <h1 className="pt-20 lg:ml-10 font-bold text-xl mb-5">
          {matchedCartItem.length} Courses in Cart
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
          {matchedCartItem && matchedCartItem.length > 0
            ? matchedCartItem.map((data) => (
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
                        <button className="text-[#5624d0]">Remove</button>
                        <button className="text-[#5624d0]">Save for later</button>
                       
                      </div>
                    </div>
                  </div>
                </>
              ))
            : ""}
        </div>
        <div className="w-[28%]">
            <h1 className="text-xl font-semibold lg:-mt-5">Total:</h1>
        </div>
      </div>
    </div>
  );
};

export default AllCartItem;
