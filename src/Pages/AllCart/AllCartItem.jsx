import { useContext, useEffect, useState } from "react";
import useCart from "../../Hooks/useCart";
import { ContextProvider } from "../Context/AuthProvider";

import {Rating } from "flowbite-react";

const AllCartItem = () => {
    const {carts}=useCart();
    const {user}=useContext(ContextProvider);
    const [matchedCartItem, setMatchedCartItem] = useState([]);

    useEffect(() => {
  
        if (carts && user) {
            const res = carts.filter(data => data.email === user.email);
            setMatchedCartItem(res);
        }
    }, [carts,user]);
    return (
        <div className="mt-0">
            {
                matchedCartItem.length > 0 ?
                <h1 className="pt-20 lg:ml-4 font-bold">{matchedCartItem.length} Courses in Cart</h1>
                : <><h1 className="pt-20 lg:ml-4 font-bold text-center">There is no cart here</h1></>
            }
            <div className="grid grid-cols-2">
                <div className="">
                {matchedCartItem && matchedCartItem.length > 0 ? (
                matchedCartItem.map((data) => (
                <>
                  <div className="grid grid-cols-3 ml-3 mb-2 border-b my-3 pb-2">
                    <img src={data.photo} alt=""  className="w-[150px] h-[70px] "/>
                    <div>
                        <p className="font-semibold">{data.title}</p>
                          <div className="flex gap-2">
                          <p>{data.rating}</p>
                        <Rating>
            
                  <Rating.Star filled />
                  <Rating.Star filled />
                  <Rating.Star filled />
                  <Rating.Star filled />
               
              </Rating>
                          </div>
                        <p>({data.totalRating} ratings)</p>
                    </div>
                    <h1 className="font-semibold text-[#a435f0]">${data.price}</h1>
                  </div>
                </>

                ))
            ) : ""}
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default AllCartItem;