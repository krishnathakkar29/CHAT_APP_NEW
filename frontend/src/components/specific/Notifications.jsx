import { Dialog, DialogContent } from "@/components/ui/dialog";
import UserItem from "../shared/UserItem";
import { Cross, Plus, SearchIcon } from "lucide-react";
import { sampleNotifications } from "@/constant/sampleData";
import { memo } from "react";
import { Avatar } from "@mui/material";

export default function Notifications({ isOpen, onOpenChange }) {
  const users = [1, 2, 3, 4, 5, 3];

  const friendRequestHandler = ({ _id, accept }) => {};
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[25rem]">
        <h1 className="text-center text-xl">Notifications</h1>
        {sampleNotifications.length > 0 ? (
          sampleNotifications.map(({ sender, _id }) => {
            return (
              <NotificationItem
                sender={sender}
                _id={_id}
                key={_id}
                handler={friendRequestHandler}
              />
            );
          })
        ) : (
          <p>No Notifications😒</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <>
      <div className="flex items-center justify-between p-2 overflow-hidden max-w-full">
        <Avatar
          src={avatar}
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
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {`${name} send you a friend request`}
        </p>

        <div className="flex flex-col items-center">
          <button
            className="rounded-xl mb-2 bg-blue-600 text-white p-1"
            onClick={() => handler({ _id, accept: true })}
          >
            Accept
          </button>
          <button
            className="rounded-xl bg-red-600 text-white p-1"
            onClick={() => handler({ _id, accept: false  })}
          >
            Reject
          </button>
        </div>
      </div>
    </>
  );
});
