"use client";
import Post from "@/components/board/Post";
import SearchBarSession from "@/components/board/SearchBarSession";
import Sidebar from "@/components/layouts/Sidebar";
import ModalCreate from "@/components/modals/ModalCreate";
import {
  BoardDataType,
  BodyDataType,
  CommunityDataType,
  FindAllResultsType,
  getBoards,
  getCommunity,
  postBoards,
} from "@/services/board.service";
import useUserStore from "@/storages/user";
import CONSTANTS from "@/utils/constants";
import PAGES from "@/utils/pages";
import useDebounce from "@/utils/useDebounce";
import useIsMobile from "@/utils/useIsMobile";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, Fragment, useCallback, useEffect, useState } from "react";

type BoardPageProps = {
  isOurBlog?: boolean | undefined;
};

const BoardPage = ({ isOurBlog }: BoardPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initialSearchQuery = searchParams.get("query") || "";

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [boards, setBoards] = useState<FindAllResultsType<BoardDataType>>({
    data: [],
    lastPage: 0,
    page: 1,
    total: 0,
  });
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchQuery);
  const [community, setCommunity] = useState<string>("");
  const [optionsCommunity, setOptionCommunity] = useState<CommunityDataType[]>(
    []
  );

  const { user } = useUserStore();
  const isMobile = useIsMobile();

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  const loadBoard = useCallback(
    async (search: string = "") => {
      const { data } = await getBoards({ search, community, isOurBlog });
      setBoards(data);
    },
    [community, isOurBlog]
  );

  const LoadCommunity = useCallback(async () => {
    try {
      const { data } = await getCommunity();
      setOptionCommunity(data);
    } catch (error) {
      console.error({ function: LoadCommunity.name, error });
    }
  }, []);

  const onClickCreate = () => {
    if (user?.username) {
      setIsModalOpen(true);
      return;
    }

    router.push(PAGES.SIGNIN);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onClickSubmit = async (body: BodyDataType) => {
    try {
      await postBoards(body);
      setIsModalOpen(false);
      loadBoard(debouncedSearchTerm);
    } catch (error: unknown) {
      console.error({ function: onClickSubmit.name, error });
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onChangeCommunity = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setCommunity(selectedValue);
  };

  useEffect(() => {
    LoadCommunity();
  }, [LoadCommunity]);

  useEffect(() => {
    loadBoard(debouncedSearchTerm);

    const params = new URLSearchParams(searchParams);
    if (debouncedSearchTerm) {
      params.set("query", debouncedSearchTerm);
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [
    debouncedSearchTerm,
    loadBoard,
    searchParams,
    pathname,
    router,
    community,
    isOurBlog,
  ]);

  return (
    <Fragment>
      <div className="flex min-h-screen bg-gray-100">
        {!isMobile && <Sidebar />}

        <div className="flex-1 pb-20 px-6 overflow-y-scroll h-screen">
          <SearchBarSession
            handleSearchChange={handleSearchChange}
            onClickCreate={onClickCreate}
            searchTerm={searchTerm}
            onChangeCommunity={onChangeCommunity}
            optionsCommunity={optionsCommunity}
            community={community}
          />

          <div className="space-y-4">
            {boards?.data?.length > 0 ? (
              boards.data.map((post, index) => (
                <Post
                  key={`key-of-post-${index}`}
                  post={post}
                  searchString={searchTerm}
                  isOurBlog={isOurBlog || false}
                  optionsCommunity={optionsCommunity}
                  refetch={loadBoard}
                />
              ))
            ) : (
              <p className="text-center text-gray-600 mt-10">
                {CONSTANTS.NO_DATA_FOUND}
              </p>
            )}
          </div>
        </div>
        {!isMobile && <div className="w-56" />}
      </div>
      <ModalCreate
        onClose={onModalClose}
        isOpen={isModalOpen}
        onClickSubmit={onClickSubmit}
        optionsCommunity={optionsCommunity}
      />
    </Fragment>
  );
};

export default BoardPage;
