"use client";
import { AuthLogin } from "@/services/auth/auth";
import { TOKEN_KEY } from "@/services/auth/auth.constant";
import useUserStore from "@/storages/user";
import CONSTANTS from "@/utils/constants";
import PAGES from "@/utils/pages";
import { HttpStatusCode } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const SignInPage = () => {
  const router = useRouter();

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: "",
  });

  const { setUser } = useUserStore();

  const onClickSignIn = async (event: React.MouseEvent) => {
    try {
      event.stopPropagation();

      const username = usernameRef.current?.value;

      if (username) {
        const response = await AuthLogin(username);

        if (response) {
          if ("token" in response) {
            sessionStorage.setItem(TOKEN_KEY, response.token);
            setUser(response);
            router.push(PAGES.BOARD);
          } else {
            if (response.status !== HttpStatusCode.Ok) {
              console.log("response : ", response);
              setError({
                message: response.message,
                error: response.error,
              });
            }
          }
        } else {
          setError({
            message: "Failed to receive a response from the server.",
            error: true,
          });
        }
      }
    } catch (error) {
      console.error({
        function: onClickSignIn.name,
        error,
      });
      setError({
        message: "An unexpected client-side error occurred during sign-in.",
        error: true,
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-[#1e3d3d]">
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              {CONSTANTS.SIGN_IN}
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  {CONSTANTS.USERNAME}
                </label>
                <input
                  ref={usernameRef}
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm text-white"
                  placeholder="Username"
                />
                {error.error && (
                  <div className="text-red-500">{error.message}</div>
                )}
              </div>
            </div>
            <button
              onClick={onClickSignIn}
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full  border border-transparent text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {CONSTANTS.SIGN_IN}
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-[#2d5a5a] p-10">
        <div className="text-center">
          <Image
            width={300}
            height={230}
            src="/images/board.png"
            alt="Board"
            className="mx-auto mb-4"
          />
          <p className="text-white italic">{CONSTANTS.A_BOARD}</p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
