import { CommentDataType } from "@/services/board.service";
import { formatTimeAgo } from "@/utils/functions";
import Image from "next/image";

type CommentProps = {
  comment: CommentDataType;
};

const Comment = ({ comment }: CommentProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <div className="flex items-center mb-2">
        <Image
          className="bg-gray-300 rounded-full p-2 w-10 h-10 mr-3"
          src="/icons/user.png"
          alt="icon-user"
          width={19}
          height={19}
        />
        <div>
          <p className="font-semibold text-gray-800">{comment.username}</p>
          <p className="text-xs text-gray-500">
            {formatTimeAgo(comment.createdAt)}
          </p>
        </div>
      </div>
      <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
    </div>
  );
};

export default Comment;
