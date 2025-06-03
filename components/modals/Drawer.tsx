import useIsMobile from "@/utils/useIsMobile";
import { Dispatch, ReactNode, SetStateAction } from "react";

type DrawerBaseProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  maxWidth?: string | number | undefined;
  className?: string | undefined;
};

const DrawerBase = ({
  children,
  isOpen,
  setIsOpen,
  maxWidth,
  className,
}: DrawerBaseProps) => {
  const isMobile = useIsMobile();
  return (
    <main
      className={
        "z-50 bg-gray-400/50 fixed overflow-hidden bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        style={{
          maxWidth: maxWidth
            ? maxWidth
            : isMobile
            ? "100%"
            : "calc(100% - 256px)",
        }}
        className={
          className +
          " w-screen right-0 absolute h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article
          style={{
            maxWidth: maxWidth
              ? maxWidth
              : isMobile
              ? "100%"
              : "calc(100% - 256px)",
          }}
          className="mx-auto relative w-screen pb-10 flex flex-col space-y-6 overflow-y-scroll h-full"
        >
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
};

export default DrawerBase;
