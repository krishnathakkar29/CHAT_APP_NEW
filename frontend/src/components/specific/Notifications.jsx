import { Dialog, DialogContent } from "@/components/ui/dialog";
import UserItem from "../shared/UserItem";
import { Cross, Plus, SearchIcon } from "lucide-react";
import { sampleNotifications } from "@/constant/sampleData";
import { memo } from "react";
import { Avatar, Skeleton } from "@mui/material";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "@/redux/api/api";
import { useAsyncMutation, useErrors } from "@/hooks/hook";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setIsNotification } from "@/redux/reducers/misc";

export default function Notifications({ isOpen, onOpenChange }) {
  const dispatch = useDispatch();
  const users = [1, 2, 3, 4, 5, 3];

  const { data, isLoading, error, isError } = useGetNotificationsQuery();

  const [acceptRequest] = useAcceptFriendRequestMutation();

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    try {
      const res = await acceptRequest({ requestId: _id, accept });

      if (res?.data?.success) {
        console.log("socket");
        toast.success(res.data?.message);
      } else {
        toast.error(res?.data?.error || "Something went Wrong");
      }
    } catch (error) {
      toast.error("Something went Wrong");
      console.log("yeh hai error", error);
    }
  };
  useErrors([{ error, isError }]);
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[25rem]">
        <h1 className="text-center text-xl">Notifications</h1>

        {isLoading ? (
          <>
            <Skeleton />
          </>
        ) : (
          <>
            {data?.allRequests?.length > 0 ? (
              data?.allRequests?.map(({ sender, _id }) => {
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
          </>
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

        <div className="flex flex-row items-center gap-2">
          <button
            className="rounded-xl bg-blue-600 text-white p-2"
            onClick={() => handler({ _id, accept: true })}
          >
            Accept
          </button>
          <button
            className="rounded-xl bg-red-600 text-white p-2"
            onClick={() => handler({ _id, accept: false })}
          >
            Reject
          </button>
        </div>
      </div>
    </>
  );
});
