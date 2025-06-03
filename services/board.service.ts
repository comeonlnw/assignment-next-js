import axiosInstance, { axiosInstancePublic } from "@/utils/axios";
import { AxiosResponse } from "axios";

export type CommunityDataType = {
  name: string;
  id: string;
};

export type BodyDataType = {
  community: string;
  title: string;
  content: string;
};

export type BoardDataType = {
  content: string;
  title: string;
  username?: string;
  commentCount?: number;
  id: string;
  community: CommunityDataType;
};

export type SearchDataType = {
  search?: string;
  community?: string;
  page?: number;
  limit?: number;
  isOurBlog?: boolean;
};
export type FindAllResultsType<T> = {
  data: T[];
  total: number;
  page: number;
  lastPage: number;
};

export type CommentDataType = {
  username: string;
  content: string;
  createdAt: string;
};

export type BaseEntity = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type Comment = {
  username: string;
  content: string;
} & BaseEntity;

export type Community = {
  name: string;
} & BaseEntity;

export type BoardWithDetails = {
  username: string;
  title: string;
  content: string;
  commentCount: number;
  comments: Comment[];
  community: Community;
} & BaseEntity;

export const getCommunity = async (): Promise<
  AxiosResponse<CommunityDataType[]>
> => {
  return await axiosInstancePublic.get("/board/community");
};

export const postBoards = async (
  body: BodyDataType
): Promise<AxiosResponse<string>> => {
  return await axiosInstance.post("/board", body);
};

export const getBoards = async (
  search: SearchDataType
): Promise<AxiosResponse<FindAllResultsType<BoardDataType>>> => {
  if (search.isOurBlog) {
    return await axiosInstance.get("/board/our", {
      params: search,
    });
  }
  return await axiosInstancePublic.get("/board", {
    params: search,
  });
};

export const getBoardById = async (
  id: string
): Promise<AxiosResponse<BoardWithDetails> | null> => {
  return await axiosInstancePublic.get(`/board/${id}`);
};

export const PostComment = async (
  id: string,
  body: { content: string }
): Promise<AxiosResponse<string>> => {
  return await axiosInstance.post(`/board/${id}/comment`, body);
};

export const DeleteBoard = async (
  id: string
): Promise<AxiosResponse<string>> => {
  return await axiosInstance.delete(`/board/${id}`);
};

export const EditBoard = async (
  id: string,
  body: BoardDataType
): Promise<AxiosResponse<BoardDataType>> => {
  return await axiosInstance.put(`/board/${id}`, body);
};
