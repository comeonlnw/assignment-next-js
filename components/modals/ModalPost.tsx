"use client";
import {
  BoardWithDetails,
  getBoardById,
  PostComment,
} from "@/services/board.service";
import useUserStore from "@/storages/user";
import CONSTANTS from "@/utils/constants";
import { formatTimeAgo } from "@/utils/functions";
import PAGES from "@/utils/pages";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Comment from "../board/Comment";
import DrawerBase from "./Drawer";

type ModalPostProps = {
  isOpen: boolean;
  onClose: () => void;
  boardId: string | null;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
};

const ModalPost = ({
  isOpen,
  onClose,
  boardId,
  setIsOpen,
  refetch,
}: ModalPostProps) => {
  const router = useRouter();

  const [postDetail, setPostDetail] = useState<BoardWithDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenAddComment, setIsOpenAddComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const { user } = useUserStore();

  const LoadPost = useCallback(async () => {
    if (!boardId) {
      setPostDetail(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await getBoardById(boardId);
      if (response?.data) {
        setPostDetail(response?.data);
      }
    } catch (error) {
      console.error({
        function: LoadPost.name,
        error,
      });
      setError("Failed to load post. Please try again.");
      setPostDetail(null);
    } finally {
      setIsLoading(false);
    }
  }, [boardId]);

  const onClickAddComments = () => {
    setIsOpenAddComment(true);
  };

  const onSubmitAddComments = async () => {
    try {
      if (!user?.username) {
        router.push(PAGES.SIGNIN);
        return;
      }
      if (boardId) {
        await PostComment(boardId, { content: comment });
        setComment("");
        await LoadPost();
        await refetch();
      }
    } catch (error) {
      console.error({
        function: onSubmitAddComments.name,
        error,
      });
    }
  };

  const onChangeComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setComment(value);
  };

  const onClickCancel = () => {
    setIsOpenAddComment(false);
  };

  useEffect(() => {
    if (isOpen) {
      LoadPost();
    } else {
      setPostDetail(null);
      setIsLoading(false);
      setError(null);
    }
  }, [isOpen, LoadPost]);

  useEffect(() => {
    setIsOpenAddComment(false);
  }, [isOpen]);

  return (
    <DrawerBase className="bg-white" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="w-full h-full flex flex-col mx-auto">
        {" "}
        {error && (
          <div className="flex justify-center items-center h-full">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        )}
        {postDetail && (
          <div className="p-6 flex flex-col h-full">
            {" "}
            <div className="flex items-center mb-4 flex-shrink-0">
              {" "}
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl bg-green-800/20 rounded-full w-10 h-10"
              >
                <Image
                  src="/icons/left.png"
                  alt="icon-left"
                  width={18}
                  height={18}
                  className="m-auto"
                />
              </button>
            </div>
            <div className="flex items-center mb-4 flex-shrink-0">
              {" "}
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl mr-3 flex-shrink-0">
                {postDetail.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {postDetail.username}
                </p>
                <p className="text-sm text-gray-500">
                  {formatTimeAgo(postDetail.createdAt)}
                </p>
              </div>
            </div>
            <div className=" text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-xs w-fit mb-2">
              {postDetail?.community?.name}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 flex-shrink-0">
              {" "}
              {postDetail.title}
            </h1>
            <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap flex-shrink-0">
              {" "}
              {postDetail.content}
            </p>
            <div className="flex flex-row space-x-2 flex-shrink-0">
              {" "}
              <Image
                src="/icons/comment.png"
                alt="icon-comment"
                width={18}
                height={18}
              />
              <p className="text-gray-600">
                {postDetail.commentCount} Comments
              </p>
            </div>
            <div className="flex items-center justify-between mb-6 pt-4 flex-shrink-0">
              {" "}
              {isOpenAddComment ? (
                <div className="w-full">
                  <textarea
                    className="border border-gray-300 p-2 text-gray-600 w-full rounded-md"
                    value={comment}
                    onChange={onChangeComment}
                    placeholder={CONSTANTS.CREATE_DESCRIPTION}
                  />
                  <div className="grid grid-cols-1 gap-2 md:flex space-x-2 justify-end">
                    <button
                      className="w-full md:w-24  border border-green-600 rounded-md text-green-600 px-4 py-2"
                      onClick={onClickCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="w-full md:w-24  bg-green-600 text-white px-4 py-2 rounded-md"
                      onClick={onSubmitAddComments}
                    >
                      Post
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={onClickAddComments}
                  className="bg-blue-500 text-white px-4 py-2 justify-start  rounded-md hover:bg-blue-600 transition-colors"
                >
                  Add Comments
                </button>
              )}
            </div>
            <div className="flex-grow overflow-y-auto pr-2">
              {isLoading ? (
                "Loading..."
              ) : (
                <div className="space-y-4 ">
                  {postDetail.comments.length > 0 ? (
                    postDetail.comments.map((comment, index) => {
                      return (
                        <Comment
                          key={`key-of-comment-${index}`}
                          comment={comment}
                        />
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No comments yet. Be the first to comment!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DrawerBase>
  );
};

export default ModalPost;
