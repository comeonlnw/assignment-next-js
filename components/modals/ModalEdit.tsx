"use client";

import type {
  BoardDataType,
  CommunityDataType,
} from "@/services/board.service";
import { ChangeEvent, useState } from "react";
import SelectCommunity from "../board/SelectCommunity";
import BaseModal from "./BaseModal";

type ModalEditProps = {
  isOpen: boolean;
  onClose: () => void;
  post: BoardDataType;
  onConfirm: (updatedPost: BoardDataType) => void;
  optionsCommunity: CommunityDataType[];
};

const ModalEdit = ({
  isOpen,
  onClose,
  post,
  onConfirm,
  optionsCommunity,
}: ModalEditProps) => {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [community, setCommunity] = useState<string>(post?.community?.id || "");

  const handleConfirm = () => {
    if (!title.trim() || !content.trim()) return;

    onConfirm({
      ...post,
      title,
      content,
    });
    onClose();
  };

  const onChangeCommunity = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setCommunity(selectedValue);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="w-full md:w-[672px] max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Edit Post</h2>

        <div className="mb-6">
          <SelectCommunity
            width="w-full"
            onChange={onChangeCommunity}
            options={optionsCommunity}
            value={community}
          />
        </div>

        <div className="space-y-4">
          <div>
            <input
              required
              type="text"
              value={title}
              onChange={onChangeTitle}
              className="w-full px-4 py-2 border border-gray-200 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Post title"
            />
          </div>

          <div>
            <textarea
              required
              value={content}
              onChange={onChangeContent}
              className="w-full px-4  py-2 border border-gray-200 rounded-md text-gray-700 h-40 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Post content"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ModalEdit;
