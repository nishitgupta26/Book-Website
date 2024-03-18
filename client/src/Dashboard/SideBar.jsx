import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiSupport, HiTable, HiUser, HiViewBoards, HiOutlineCloudUpload } from 'react-icons/hi';
import img from '../../src/assets/profile.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import MobileDashboard from './MobileDashboard';

const SideBar = () => {
  const {user} = useContext(AuthContext)

  const {logOut} = useContext(AuthContext);
  const navigate = useNavigate();

  const hangleSignOut = () => {
    console.log("sign out");
    logOut().then(() => {
        // Sign-out successful.
        navigate('/');
      }).catch((error) => {
        // An error happened.
      })
  }

  return (
    <div className=''>
      <Sidebar aria-label="Sidebar with content separator example" className='hidden md:block'>
        <Sidebar.Logo
          href="/"
          img={ img}
          className='w-10 h-10 rounded-full'
          imgAlt="Flowbite logo"
        >
          <p>
            {user?.displayName || "Demo User" }
          </p>
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="/admin/dashboard/upload"
              icon={HiOutlineCloudUpload}
            >
              <p>
                Upload Book
              </p>
            </Sidebar.Item>

            <Sidebar.Item
              href="/admin/dashboard/manage"
              icon={HiInbox}
            >
              <p>
                ManageBooks
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              onClick={hangleSignOut}
              icon={HiTable}
              className='cursor-pointer'
            >
              <p>
                Log out
              </p>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className='md:hidden'>
          <MobileDashboard/>
      </div>
    </div>
  )
}

export default SideBar