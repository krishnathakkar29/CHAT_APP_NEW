import { transformImage } from "@/lib/features";
import { Avatar } from "@mui/material";
import { Minus, Plus } from "lucide-react";
import React, { memo } from "react";

function UserItem({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling = {},
}) {
  const { name, _id, avatar } = user;
  return (
    <div
      className="flex items-center justify-between p-2  overflow-hidden max-w-full"
      style={{...styling}}
    >
      <Avatar
        src={transformImage(avatar)}
        sx={{
          height: 50,
          width: 50,
          objectFit: "contain",
        }}
      />
      <p
        className=" flex-grow text-left ml-4 text-ellipsis overflow-hidden "
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
        }}
      >
        {name}
      </p>

      <button
        className={`rounded-full ${
          isAdded ? "bg-red-600" : "bg-blue-600"
        }  text-white p-3`}
        onClick={() => handler(_id)}
        disabled={handlerIsLoading}
      >
        {isAdded ? <Minus /> : <Plus />}
      </button>
    </div>
  );
}

export default memo(UserItem);
