import { Fragment, useState } from "react";
import DrawerBase from "../modals/Drawer";
import Menu from "./Menu";

const HamburgerMenu = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const onClickHamburger = () => {
    setIsOpenDrawer(true);
  };

  const onClickClose = () => {
    setIsOpenDrawer(false);
  };

  return (
    <Fragment>
      <div className="flex items-center ml-auto p-4 justify-end">
        <button
          onClick={onClickHamburger}
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="text-white inline-flex items-center justify-center p-2 w-10 h-10 text-sm  rounded-lg  focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-hamburger"
          aria-expanded="false"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <DrawerBase
        isOpen={isOpenDrawer}
        setIsOpen={setIsOpenDrawer}
        maxWidth="80%"
        className="bg-green-900 rounded-md"
      >
        <div className="h-full w-full">
          <div onClick={onClickClose}>back</div>
          <Menu/>
        </div>
      </DrawerBase>
    </Fragment>
  );
};

export default HamburgerMenu;
