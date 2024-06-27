// bg-gray-900 , text-white , text-gray-400

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { server } from "@/constant/config";
import { userNotExists } from "@/redux/reducers/auth";
import { resetNotificationCount } from "@/redux/reducers/chat";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "@/redux/reducers/misc";
import { Backdrop } from "@mui/material";
import axios from "axios";
import { Suspense, lazy, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotifcationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isMobile, isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);

  // const [isNewGroup, setIsNewGroup] = useState(false);
  // const [isNotification, setIsNotification] = useState(false);

  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };

  const openSearch = () => {
    dispatch(setIsSearch(!isSearch));
  };
  const openNewGroup = () => {
    dispatch(setIsNewGroup(!isNewGroup))
  };
  const openNotification = () => {
    dispatch(setIsNotification(!isNotification));
    dispatch(resetNotificationCount())
  };

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  const navigateToGroups = () => {
    navigate("/groups");
  };
  return (
    <>
      <header className="flex items-center justify-between h-16 bg-gray-900 text-white px-4 md:px-6">
        <div className="hidden sm:flex items-center gap-2">
          <MessageCircleIcon className="h-6 w-6" />
          <span className="text-lg font-medium">Chat App</span>
        </div>
        <div className="sm:hidden flex  items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:bg-white hover:text-gray-800"
                  onClick={handleMobile}
                >
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Menu Icon</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-4">
          {/* 1st */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:bg-white hover:text-gray-800"
                  onClick={openSearch}
                >
                  <SearchIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* 2nd */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:bg-white hover:text-gray-800"
                  onClick={openNewGroup}
                >
                  <PlusIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Creat Group</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* hola! */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:bg-white hover:text-gray-800"
                  onClick={navigateToGroups}
                >
                  <GroupIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Creat Group</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* 3rd */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:bg-white hover:text-gray-800"
                    onClick={openNotification}
                  >
                    <BellIcon className="h-5 w-5" />
                  </Button>
                  <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {notificationCount}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* 4th */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:bg-white hover:text-gray-800"
                  onClick={logoutHandler}
                >
                  <LogOutIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog isOpen={isSearch} onOpenChange={openSearch} />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotifcationDialog
            isOpen={isNotification}
            onOpenChange={openNotification}
          />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog isOpen={isNewGroup} onOpenChange={openNewGroup} />
        </Suspense>
      )}
    </>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-menu"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function GroupIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-users"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// import { orange } from "@/constant/color";
// import React from "react";
// import {
//   Add as AddIcon,
//   Menu as MenuIcon,
//   // Search as SearchIcon,
//   Group as GroupIcon,
//   Logout as LogoutIcon,
//   Notifications as NotificationsIcon,
// } from "@mui/icons-material";
// import {
//   AppBar,
//   Backdrop,
//   Badge,
//   Box,
//   IconButton,
//   Toolbar,
//   Tooltip,
//   Typography,
// } from "@mui/material";

// const Header = () => {
//   const logoutHandler = () => {};
//   const handleMobile = () => {};
//   return (
//     <Box sx={{ flexGrow: 1 }} height={"4rem"}>
//       <AppBar
//         position="static"
//         sx={{
//           bgcolor: orange,
//         }}
//       >
//         <Toolbar>
//           <Typography
//             variant="h6"
//             sx={{
//               display: { xs: "none", sm: "block" },
//             }}
//           >
//             Chat App
//           </Typography>

//           <Box
//             sx={{
//               display: { xs: "block", sm: "none" },
//             }}
//           >
//             <IconButton color="inherit" onClick={handleMobile}>
//               <MenuIcon />
//             </IconButton>
//           </Box>
//           <Box
//             sx={{
//               flexGrow: 1,
//             }}
//           />
//           <Box>
//             <IconBtn
//               title={"Search"}
//               icon={<SearchIcon />}
//               //   onClick={openSearch}
//             />

//             <IconBtn
//               title={"New Group"}
//               icon={<AddIcon />}
//               //   onClick={openNewGroup}
//             />

//             <IconBtn
//               title={"Manage Groups"}
//               icon={<GroupIcon />}
//               //   onClick={navigateToGroup}
//             />

//             <IconBtn title={"Notifications"} icon={<NotificationsIcon />} />

//             <IconBtn
//               title={"Logout"}
//               icon={<LogoutIcon />}
//               onClick={logoutHandler}
//             />
//           </Box>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// };

// const IconBtn = ({ title, icon, onClick, value }) => {
//   return (
//     <Tooltip title={title}>
//       <IconButton color="inherit" size="large" onClick={onClick}>
//         {value ? (
//           <Badge badgeContent={value} color="error">
//             {icon}
//           </Badge>
//         ) : (
//           icon
//         )}
//       </IconButton>
//     </Tooltip>
//   );
// };

// export default Header;
