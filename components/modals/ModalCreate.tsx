"use client";
import { BodyDataType, CommunityDataType } from "@/services/board.service";
import CONSTANTS from "@/utils/constants";
import { useState } from "react";
import BaseModal from "./BaseModal";

type ModalCreateProps = {
  isOpen: boolean;
  onClose: () => void;
  onClickSubmit: (data: BodyDataType) => void;
  optionsCommunity: CommunityDataType[];
};

const ModalCreate = ({
  isOpen,
  onClose,
  onClickSubmit,
  optionsCommunity,
}: ModalCreateProps) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [community, setCommunity] = useState<string>("");

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();

    const postData: BodyDataType = {
      community,
      content,
      title,
    };

    try {
      onClickSubmit(postData);
      setTitle("");
      setContent("");
      setCommunity("");
      onClose();
    } catch (error) {
      console.error({ function: handleFormSubmit.name, error });
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="w-96 h-96">
        <form onSubmit={handleFormSubmit}>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {CONSTANTS.CREATE_POST}
          </h2>
          <div className="mb-4">
            <label htmlFor="community" className="sr-only">
              {CONSTANTS.CHOOSE_A_COMMUNITY}
            </label>
            <select
              required
              id="community"
              className="text-gray-600 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
            >
              <option value="text-gray-600">
                {CONSTANTS.CHOOSE_A_COMMUNITY}
              </option>
              {optionsCommunity?.map((community: CommunityDataType) => {
                return (
                  <option
                    key={community?.id}
                    className="text-gray-600"
                    value={community?.id}
                  >
                    {community.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="title" className="sr-only">
              {CONSTANTS.TITLE}
            </label>
            <input
              required
              type="text"
              id="title"
              className="placeholder:text-gray-600 text-gray-600 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="sr-only">
              {CONSTANTS.CREATE_DESCRIPTION}
            </label>
            <textarea
              required
              id="content"
              className="placeholder:text-gray-600 text-gray-600 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
              placeholder="What's on your mind..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {CONSTANTS.CANCEL}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {CONSTANTS.POST}
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default ModalCreate;
