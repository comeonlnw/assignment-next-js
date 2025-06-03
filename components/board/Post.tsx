import {
  BoardDataType,
  CommunityDataType,
  DeleteBoard,
  EditBoard,
} from "@/services/board.service";
import CONSTANTS from "@/utils/constants";
import Image from "next/image";
import { Fragment, useState } from "react";
import ModalPost from "../modals/ModalPost";
import HighlightText from "./HighlightText";
import ModalConfirmDelete from "../modals/ModalConfirmDelete";
import ModalEdit from "../modals/ModalEdit";

type PostProps = {
  post: BoardDataType;
  searchString: string;
  isOurBlog: boolean;
  optionsCommunity: CommunityDataType[];
  refetch: () => void;
};

const Post = ({
  post,
  searchString,
  isOurBlog,
  optionsCommunity,
  refetch,
}: PostProps) => {
  const [isOpenPost, setIsOpenPost] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);

  const onClickOpenPost = () => {
    setIsOpenPost(true);
  };

  const highlightedTitle = HighlightText(post?.title || "", searchString);
  const highlightedContent = HighlightText(post?.content || "", searchString);

  const onModalClose = () => {
    setIsOpenPost(false);
  };

  const onModalCloseEdit = () => {
    setIsOpenEdit(false);
  };

  const onModalDeleteClose = () => {
    setIsOpenDelete(false);
  };

  const onClickEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpenEdit(true);
  };

  const onClickRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpenDelete(true);
  };

  const onClickConfirm = async () => {
    try {
      await DeleteBoard(post.id);
      refetch();
    } catch (error) {
      console.error({
        function: onClickConfirm.name,
        error,
      });
    }
  };

  const onClickUpdate = async (updatedPost: BoardDataType) => {
    try {
      await EditBoard(post.id, {
        community: updatedPost.community,
        content: updatedPost.content,
        title: updatedPost.title,
        id: updatedPost.id,
      });
      refetch();
    } catch (error) {
      console.error({
        function: onClickUpdate.name,
        error,
      });
    }
  };

  return (
    <Fragment>
      <div
        onClick={onClickOpenPost}
        className="bg-white p-4 rounded-lg shadow-sm cursor-pointer"
      >
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl mr-3 flex-shrink-0">
            {post?.username?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-400">
              {post?.username}
            </h2>
            <div className=" text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-xs">
              {post?.community?.name}
            </div>
          </div>
          {isOurBlog && (
            <div className="flex flex-row space-x-4 ml-auto">
              <button onClick={onClickEdit}>
                <Image
                  src={`/icons/edit.png`}
                  alt="icon-edit"
                  width={16}
                  height={16}
                />
              </button>

              <button onClick={onClickRemove}>
                <Image
                  src={`/icons/delete.png`}
                  alt="icon-delete"
                  width={16}
                  height={16}
                />
              </button>
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-700">
          {highlightedTitle}
        </h3>{" "}
        <p className="text-gray-700">{highlightedContent}</p>{" "}
        <div className="flex items-center mt-2 text-gray-500">
          <Image
            src="/icons/comment.png"
            width={15}
            height={15}
            alt="icon-comment"
            className="mb-0.5 mr-3"
          />
          <span>
            {post?.commentCount} {CONSTANTS.COMMENTS}
          </span>
        </div>
      </div>
      <ModalPost
        isOpen={isOpenPost}
        setIsOpen={setIsOpenPost}
        onClose={onModalClose}
        boardId={post.id}
        refetch={refetch}
      />
      <ModalConfirmDelete
        onClickConfirm={onClickConfirm}
        isOpen={isOpenDelete}
        onClose={onModalDeleteClose}
      />

      <ModalEdit
        optionsCommunity={optionsCommunity}
        onConfirm={onClickUpdate}
        post={post}
        isOpen={isOpenEdit}
        onClose={onModalCloseEdit}
      />
    </Fragment>
  );
};

export default Post;
