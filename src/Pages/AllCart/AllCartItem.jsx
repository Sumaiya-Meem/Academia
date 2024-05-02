import useCart from "../../Hooks/useCart";
import Swal from 'sweetalert2'
import { Rating } from "flowbite-react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import './AllCartItem.css'
import usePaymentHistory from "../../Hooks/usePaymentHistory";
import { IoMdPricetag } from "react-icons/io";
import toast from "react-hot-toast";
import { ContextProvider } from "../Context/AuthProvider";
import { useContext } from "react";
import useSaveItem from "../../Hooks/useSaveItem";

const AllCartItem = () => {
  const [carts, refetch, isLoading] = useCart();
  const [saveItems,saveRefetch] = useSaveItem();
  const axiosPublic = useAxiosPublic();
  const { payments } = usePaymentHistory();
  const {user}=useContext(ContextProvider);

  if (isLoading) {
    return <Loading />;
  }


  const isEnrolled = (title) => {
    return payments.find(payment => payment.courseTitle === title);
  };
 

  const totalPrice = carts.reduce((sum, data) => {
   
    if (!isEnrolled(data.title)) {
      const itemTotal = data.offerPrice > 0 ? parseInt(data.offerPrice) : parseInt(data.price);
      return sum + itemTotal;
    }
    return sum;
  }, 0);

  const originalPrice = carts.reduce((sum, data) => {
    if (!isEnrolled(data.title)) {
      return sum + parseInt(data.price);
    }
    return sum;
  }, 0);

  const percentageDiscount = ((originalPrice - totalPrice) / originalPrice) * 100;
  const discount = Math.round(percentageDiscount);

  const handleDelete = (id) => {
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
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "", "success");
            }
          })
      }
    });
  };

  const handleSaveLater = (data)=>{  
    const saveLaterItem ={
        email:user.email,
        courseId:data._id,
        title:data.title,
        price:data.price,
        offerPrice:data.offerPrice,
        photo:data.photo,
        rating:data.rating,
        totalRating:data.totalRating,
  
      }
    //   console.log(saveLaterItem);   
      axiosPublic.post("/saveItem",saveLaterItem)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("course added to save later");
          axiosPublic.delete(`carts/${data._id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();  
              saveRefetch();  
            }
          })
  
        }
      });
  }
  

  const handleSaveItemDelete = (id) => {
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
        axiosPublic.delete(`saveItem/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
            saveRefetch();
              Swal.fire("Deleted!", "", "success");
            }
          })
      }
    });
  };

  const handleMoveCart= (data)=>{  
    const item ={
        email:user.email,
        courseId:data._id,
        title:data.title,
        price:data.price,
        offerPrice:data.offerPrice,
        photo:data.photo,
        rating:data.rating,
        totalRating:data.totalRating,
  
      }
    //   console.log(saveLaterItem);   
      axiosPublic.post("/carts",item)
      .then((res) => {
        if (res.data.insertedId) {
          axiosPublic.delete(`saveItem/${data._id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();   
              saveRefetch(); 
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
        <h1 className="pt-20 lg:ml-4 font-bold text-center">
          Your cart is empty!
        </h1>
      )}
      <div className="flex gap-12">
        <div className="w-[70%]">
          {carts.map((data) => (
            <div key={data._id} className="flex justify-between ml-10 mb-2 border-t my-3 py-2">
              <Link to={`/detailCourse/${data.courseId}`}>
                <div className="flex gap-6">
                  <img src={data.photo} alt="" className="w-[150px] h-[70px]" />
                  <div>
                    <p className="font-semibold text-sm">{data.title}</p>
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
              </Link>
              <div className="flex gap-12">
                <div>
                  {isEnrolled(data.title) ? (
                    <h1 className="font-semibold mt-1 text-sm text-[#5624d0]">You enroll <br/> this course</h1>
                  ) : (
                    <>
                    <div className="flex items-center">
                    
                      <h1 className="font-bold text-xl">
                        
                        ${data.offerPrice > 0 ? data.offerPrice : data.price}</h1>
                        <IoMdPricetag className="text-[#a435f0] text-xl rotate-[265deg]"></IoMdPricetag>
                    </div>
                      {data.offerPrice > 0 && <del><p className="text-gray-500 ">${data.price}</p></del>}
                    </>
                  )}
                </div>
                <div className="flex flex-col">
                  <button onClick={() => handleDelete(data._id)} className="text-[#5624d0]">Remove</button>
                  <button onClick={() => handleSaveLater(data)}  className="text-[#5624d0]">Save for later</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {carts.length > 0 &&
          <div className="w-[28%] bg-white shadow lg:p-4">
            <h1 className="text-xl font-semibold lg:-mt-5">Total:</h1>
            <h1 className="text-[40px] font-bold">${totalPrice}.00</h1>
            <del><h1 className="">${originalPrice}.00</h1></del>
            <h1>{discount}% off</h1>
            <Link to="/make-payment" state={{ price: totalPrice }}>
                <button className="bg-[#a435f0] text-white w-[98%] p-2 mt-3 font-semibold text-lg">
                    Checkout</button>
            </Link>
          </div>
        }

      </div>
      {saveItems.length > 0 ? (
        <h1 className="mt-2 lg:ml-10 font-bold text-xl mb-5">
          Saved for later
        </h1>
      ) : <></>}
     
     <div className="w-[70%]">
          {saveItems.map((data) => (
            <div key={data._id} className="flex justify-between ml-10 mb-2 border-t my-3 py-2">
              <Link to={`/detailCourse/${data.courseId}`}>
                <div className="flex gap-6">
                  <img src={data.photo} alt="" className="w-[150px] h-[70px]" />
                  <div>
                    <p className="font-semibold text-sm">{data.title}</p>
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
              </Link>
              <div className="flex gap-12">
                <div>
                  {isEnrolled(data.title) ? (
                    <h1 className="font-semibold mt-1 text-sm text-[#5624d0]">You enroll <br/> this course</h1>
                  ) : (
                    <>
                    <div className="flex items-center">
                    
                      <h1 className="font-bold text-xl">
                        
                        ${data.offerPrice > 0 ? data.offerPrice : data.price}</h1>
                        <IoMdPricetag className="text-[#a435f0] text-xl rotate-[265deg]"></IoMdPricetag>
                    </div>
                      {data.offerPrice > 0 && <del><p className="text-gray-500 ">${data.price}</p></del>}
                    </>
                  )}
                </div>
                <div className="flex flex-col">
                  <button onClick={() => handleSaveItemDelete(data._id)} className="text-[#5624d0]">Remove</button>
                  <button onClick={() => handleMoveCart(data)}  className="text-[#5624d0]">Move to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>

    </div>
  );
};

export default AllCartItem;
