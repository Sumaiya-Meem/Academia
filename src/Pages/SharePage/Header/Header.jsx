import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
// import logo from "../../../../public/logo.png"
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { CiLogin } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import {ContextProvider} from "../../Context/AuthProvider"

import { useContext } from "react";



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
          isPending ? "pending" : isActive ? "text-[#bc0024] font-bold menu   " : "text-white"
        }
      >
        Home
      </NavLink>
      

     
     
    </>
  );
    return (
        <div>

    <Navbar fluid rounded className="fixed bg-[#050a230a] z-10 bg-opacity-30 w-[1024px] text-white">
    <Navbar.Brand href="/">
          <div className="flex items-center ">
          {/* <img src={logo} className="mr-3 h-12" alt="Logo" /> */}
          <div className="flex flex-col text-[#bc0024]">
          <h1 className="font-serif text-xl text-center font-bold">Academia</h1>
          {/* <h3 className="text-[18px] font-bold">Online Education & Learning</h3> */}
          </div>
          </div>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {user ? 
            <>
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
            </>
           : (
            <>
              <NavLink
                to="/login"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-[#348f54]"
                    : "text-white"
                }
              >
                <div className="flex items-center gap-1 font-semibold">
                  <CiLogin className="text-xl text-white font-bold"></CiLogin><p className="text-xl text-white">Login</p>
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