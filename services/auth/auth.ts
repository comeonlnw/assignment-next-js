import axiosInstance from "@/utils/axios";
import axios, { AxiosError, HttpStatusCode } from "axios";

export type ErrorResponseData = {
  message: string | string[];
};

export type MessageReturnType = {
  message: string;
  error: boolean;
  status?: HttpStatusCode;
};

export type UserDataType = {
  username: string;
  token: string;
  message: string;
  status: HttpStatusCode;
};

export type RegisterRequestType = {
  username: string;
};

export type RegisterSuccessType = {
  message: string;
};

export const ReturnError = (
  error: AxiosError<ErrorResponseData>
): MessageReturnType => {
  if (error.response && error.response.data) {
    const { message } = error.response.data;
    return {
      message: Array.isArray(message)
        ? message.join(", ")
        : message || "Something went wrong",
      error: true,
    };
  }
  return {
    message: error.message || "An unknown error occurred.",
    error: true,
  };
};

export const AuthLogin = async (
  username: string
): Promise<UserDataType | MessageReturnType> => {
  try {
    const { data } = await axiosInstance.post<UserDataType | MessageReturnType>(
      "/auth/login",
      {
        username,
      }
    );

    if ("token" in data) {
      return {
        ...data,
        status: HttpStatusCode.Ok,
      } as UserDataType;
    }

    return {
      message: data?.message || "Something went wrong!",
      error: true,
      status: data?.status || 500,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<MessageReturnType>;
      return {
        message: axiosError.response?.data?.message || "An error occurred.",
        error: true,
        status:
          axiosError.response?.status || HttpStatusCode.InternalServerError,
      };
    }

    return {
      message: "An unexpected error occurred during login.",
      error: true,
      status: HttpStatusCode.InternalServerError,
    };
  }
};

export const AuthRegister = async (
  body: RegisterRequestType
): Promise<RegisterSuccessType | MessageReturnType | undefined> => {
  try {
    const { data } = await axiosInstance.post("/auth/register", body);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return ReturnError(error as AxiosError<ErrorResponseData>);
    }

    return {
      message: "An unexpected error occurred during registration.",
      error: true,
    };
  }
};
