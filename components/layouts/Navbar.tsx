"use client";
import useUserStore from "@/storages/user";
import CONSTANTS from "@/utils/constants";
import PAGES from "@/utils/pages";
import useIsMobile from "@/utils/useIsMobile";
import { usePathname, useRouter } from "next/navigation";
import HamburgerMenu from "./HambergerMenu";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useUserStore();
  const isMobile = useIsMobile();

  const onClickSignIn = () => {
    router.push(PAGES.SIGNIN);
  };

  const ShowSignIn = () => {
    if (user?.username) {
      return (
        <div className="flex flex-row">
          <div className="my-auto mr-3"> {user?.username}</div>{" "}
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl mr-3 flex-shrink-0 my-auto">
            {user.username.charAt(0).toUpperCase()}
          </div>
        </div>
      );
    }

    return (
      <button
        onClick={onClickSignIn}
        className="bg-green-700 my-auto px-4 py-2.5 rounded-lg w-[105px]"
      >
        {CONSTANTS.SIGN_IN}
      </button>
    );
  };

  if (pathname === PAGES.SIGNIN) {
    return null;
  }

  return (
    <div className="bg-green-900 px-8 flex justify-between h-16">
      <div className="italic my-auto text-xl">{CONSTANTS.A_BOARD} </div>
      {isMobile ? <HamburgerMenu /> : <ShowSignIn />}
    </div>
  );
};

export default Navbar;
