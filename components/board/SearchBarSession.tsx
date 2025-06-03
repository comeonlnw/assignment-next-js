import { CommunityDataType } from "@/services/board.service";
import CONSTANTS from "@/utils/constants";
import SelectCommunity from "./SelectCommunity";

type SearchBarSessionProps = {
  onClickCreate: () => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  onChangeCommunity: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  community: string;
  optionsCommunity: CommunityDataType[];
};

const SearchBarSession = ({
  handleSearchChange,
  searchTerm,
  onClickCreate,
  onChangeCommunity,
  community,
  optionsCommunity = [],
}: SearchBarSessionProps) => {
  return (
    <div className="flex justify-between items-center mb-6 sticky pt-6  top-0 bg-gray-100 pb-4 z-10">
      <div className="flex items-center bg-white rounded-full shadow-sm w-full ">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-l-full focus:outline-none text-gray-600 w-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex items-center">
        <div className="mx-4">
          <SelectCommunity
            width="w-28"
            onChange={onChangeCommunity}
            options={optionsCommunity}
            value={community}
          />
        </div>
        <button
          onClick={onClickCreate}
          className="bg-green-600/80 text-white px-4 py-2 rounded-md cursor-pointer w-52"
        >
          {CONSTANTS.CREATE}
        </button>
      </div>
    </div>
  );
};

export default SearchBarSession;
