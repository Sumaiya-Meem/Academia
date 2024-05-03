import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import userImg from "../../../../public/userimage.png";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { CiLogin } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { ContextProvider } from "../../Context/AuthProvider";
import { IoCartOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import useAnnouncement from "../../../Hooks/useAnnouncement";
import { IoNotifications } from "react-icons/io5";
import useCart from "../../../Hooks/useCart";

const Header = () => {
  const { announcement } = useAnnouncement();
  const [carts] = useCart();
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  

  const { logOutUser, user } = useContext(ContextProvider);

  const timeDifference = (date) => {
    const currentDate = new Date();
    const diffInMs = currentDate - new Date(date);

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ${minutes % 60} min ago`;
    } else if (minutes > 0) {
      return `${minutes} min ago`;
    } else {
      return "just now";
    }
  };

  const handleLogout = () => {
    logOutUser().then(() => {
      toast.success("sign out successfully");
    });
  };


  const navItem = (
    <>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-blue-600 font-bold menu   "
            : "text-black"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/allCourses"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-blue-600 font-bold menu   "
            : "text-black"
        }
      >
        All Course
      </NavLink>
      {user ? (
        <NavLink
          to="/dashboard/adminHome"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-blue-600 font-bold  "
              : "text-black"
          }
        >
          Dashboard
        </NavLink>
      ) : (
        <> </>
      )}
    </>
  );
  return (
    <div>
      <Navbar fluid className="fixed bg-[#fff] z-10 w-full shadow-md">
        <Navbar.Brand href="/">
          <div className="flex items-center ">
            {/* <img src={logo} className="mr-3 h-12" alt="Logo" /> */}
            <div className="flex flex-col text-blue-600">
              <h1 className="font-serif text-xl text-center font-bold">
                Academia
              </h1>
            </div>
          </div>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {user ? (
            <>
              <div className="flex items-center gap-5">
                <div className="relative">
                  <Link to="/allCart">
                  <IoCartOutline
                    className="text-2xl font-bold text-black"
                    style={{ cursor: "pointer" }}
                  ></IoCartOutline>
                  <p className="absolute -right-2 -top-2 w-[18px] text-center bg-[#a435f0] rounded-[50%] text-white">
                    {carts.length}
                  </p>
                  </Link>
                </div>
                <div className="relative">
                  <IoMdNotificationsOutline
                    className="text-3xl font-bold text-black "
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowAnnouncement(!showAnnouncement)}
                  ></IoMdNotificationsOutline>
                  <p className="absolute -right-1 -top-2 w-[18px] text-center bg-blue-500 rounded-[50%] text-white">
                    {/* {announcement.length} */}
                  </p>

                  {showAnnouncement && (
                    <div className="bg-white p-2 top-[45px] absolute w-[310px] right-0">
                      {announcement.map((data) => (
                        <>
                          <div className="flex gap-2">
                            <div className="bg-fuchsia-600 text-white p-1 rounded-md h-[30px]">
                              <IoNotifications className="text-xl"></IoNotifications>
                            </div>
                            <div className="flex flex-col">
                              <h1>{data.title}</h1>
                              <p className="text-[12px] text-gray-700">
                                {timeDifference(data.date)}
                              </p>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  )}
                </div>
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={<Avatar alt="User settings" img={userImg} rounded />}
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{user?.displayName}</span>
                    <span className="block truncate text-sm font-medium">
                      {user?.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item>
                    <Link to="/dashboard">Dashboard</Link>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <Button color="" className="" onClick={handleLogout}>
                      <span className="mr-2 text-xl">
                        <IoIosLogOut className="text-red-700 font-bold"></IoIosLogOut>
                      </span>{" "}
                      LogOut
                    </Button>
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-[#bc0024]"
                    : "text-black"
                }
              >
                <div className="flex items-center gap-1 font-semibold">
                  <CiLogin className="text-xl text-black font-bold"></CiLogin>
                  <p className="text-xl text-black">Login</p>
                </div>
              </NavLink>
            </>
          )}

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>{navItem}</Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
