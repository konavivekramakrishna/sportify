import React from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { UserContext } from "../context/user";
import { Link } from "react-router-dom";

const casualUser = [
  {
    label: "Authentication",
    icon: UserCircleIcon,
    action: "/auth",
  },
];

const profileMenuItems = [
  {
    label: "Preferences",
    icon: Square3Stack3DIcon,
    action: "/home/preferences",
  },
  {
    label: "Reset Password",
    icon: Cog6ToothIcon,
    action: "/home/resetpassword",
  },

  {
    label: "Sign Out",
    icon: PowerIcon,
    action: "/signout",
  },
];

export function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { user } = React.useContext(UserContext);

  const options = user ? profileMenuItems : casualUser;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {options.map(({ label, icon, action }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <Link to={action}>
              <MenuItem
                key={label}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export function Appbar() {
  return (
    <Navbar
      fullWidth={true}
      className="mx-auto max-w-screen-2xl p-5 lg:rounded-full  lg:pl-6 w-screen h-20"
    >
      <div className="relative mx-auto flex items-center justify-center  text-blue-gray-900 ">
        <div className="ml-1 mr-1">
          <img src="/crlogo1.png" width={200} />
        </div>
        <div className="hidden lg:block"></div>

        <ProfileMenu />
      </div>
    </Navbar>
  );
}
