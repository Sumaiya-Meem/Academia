import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
// import logo from "../../../../public/logo.png"
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { CiLogin } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import {ContextProvider} from "../../Context/AuthProvider"
import { IoCartOutline } from "react-icons/io5";
import { useContext } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";




const Header = () => {
  
  const { logOutUser, user } = useContext(ContextProvider);



  const handleLogout = () => {
    logOutUser()
          .then(() => {
              toast.success('sign out successfully')
          })
        }

  const navItem = (
    <>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-[#bc0024] font-bold menu   " : "text-black"
        }
      >
        Home
      </NavLink>
      {
            user ?
            <NavLink
        to="/dashboard/adminHome"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-[#bc0024] font-bold  " : "text-black"
        }
      >
       Dashboard
      </NavLink>
      : 
      <> </>
            
        }
      

     
     
    </>
  );
    return (
        <div>

    <Navbar fluid  className="fixed bg-[#fff] z-10 w-full shadow-md">
    <Navbar.Brand href="/">
          <div className="flex items-center ">
          {/* <img src={logo} className="mr-3 h-12" alt="Logo" /> */}
          <div className="flex flex-col text-[#bc0024]">
          <h1 className="font-serif text-xl text-center font-bold">Academia</h1>
          </div>
          </div>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {user ? 
            <>
            <div className="flex items-center gap-5">
            <IoCartOutline className="text-2xl font-bold text-black"></IoCartOutline>
            <IoMdNotificationsOutline className="text-2xl font-bold text-black"></IoMdNotificationsOutline>
            <Dropdown
            arrowIcon={false}
            inline
            label={
                <Avatar alt="User settings" img={user?.photoURL} rounded />
            }
        >
            <Dropdown.Header>
                <span className="block text-sm">{ user?.displayName}</span>
                <span className="block truncate text-sm font-medium">{user?.email}</span>
            </Dropdown.Header>
            <Dropdown.Item>
                <Link to="/dashboard">Dashboard</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
            <Button color="" className=''  onClick={handleLogout}>
            <span className='mr-2 text-xl'><IoIosLogOut className="text-red-700 font-bold"></IoIosLogOut></span> LogOut
        </Button>
            </Dropdown.Item>
        </Dropdown> 
            </div>
            </>
           : (
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
                  <CiLogin className="text-xl text-black font-bold"></CiLogin><p className="text-xl text-black">Login</p>
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