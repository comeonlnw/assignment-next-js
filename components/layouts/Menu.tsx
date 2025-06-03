import CONSTANTS from "@/utils/constants";
import PAGES from "@/utils/pages";
import useIsMobile from "@/utils/useIsMobile";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Menu = () => {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const router = useRouter();

  const ROUTES = [
    {
      label: CONSTANTS.HOME,
      icon: isMobile ? "/icons/home-white.png" : "/icons/home.png",
      page: PAGES.BOARD,
    },
    {
      label: CONSTANTS.OUR_BLOG,
      icon: isMobile ? "/icons/blog-white.png" : "/icons/blog.png",
      page: PAGES.OUR_BLOG,
    },
  ];

  const onClickRoute = (page: PAGES) => () => {
    router.push(page);
  };

  return (
    <div>
      <ul>
        {ROUTES?.map((route, index) => {
          const isSelected = pathname === route.page;

          return (
            <li key={`key-of-route-${index}`}>
              <button
                onClick={onClickRoute(route.page)}
                className={`flex items-center text-lg font-semibold ${
                  isMobile
                    ? [isSelected ? "text-white" : "text-gray-400"]
                    : [isSelected ? "text-gray-900" : "text-gray-400"]
                }`}
              >
                <Image
                  width={24}
                  height={24}
                  alt="Icon Bloc"
                  className="mr-3"
                  src={route.icon}
                />
                {route.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
