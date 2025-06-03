import { CommunityDataType } from "@/services/board.service";
import CONSTANTS from "@/utils/constants";
import { ChangeEventHandler } from "react";

type SelectCommunityProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement> | undefined;
  options: CommunityDataType[];
  width?: string;
};

const SelectCommunity = ({
  value,
  onChange,
  options,
  width = "w-full",
}: SelectCommunityProps) => {
  return (
    <select
      id="community"
      className={`${width} px-2 h-10 border border-green-700/40 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-white block`}
      value={value}
      onChange={onChange}
    >
      <option value="" className="text-gray-600 font-bold">
        {CONSTANTS.CHOOSE_A_COMMUNITY}
      </option>
      {options?.map((community) => {
        return (
          <option
            key={community?.id}
            className="text-gray-600 font-bold"
            value={community?.id}
          >
            {community.name}
          </option>
        );
      })}
    </select>
  );
};

export default SelectCommunity;
