import { InputBox } from "@/components/styles/StyledComponents";
import { Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";

import { useInfiniteScrollTop } from "6pp";
import { getSocket } from "@/Socket";
import FileMenu from "@/components/dialogs/FileMenu";
import MessageComponent from "@/components/shared/MessageComponent";
import { NEW_MESSAGE } from "@/constant/events";
import { useErrors, useSocketEvents } from "@/hooks/hook";
import { useChatDetailsQuery, useGetMessagesQuery } from "@/redux/api/api";
import { setIsFileMenu } from "@/redux/reducers/misc";
import { AttachFile as AttachFileIcon } from "@mui/icons-material";
import { IconButton, Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeNewMessagesAlert } from "@/redux/reducers/chat";

function Chat({ chatId, user }) {
  const containerRef = useRef();
  const socket = getSocket();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;

  useEffect(() => {
    dispatch(removeNewMessagesAlert(chatId));
    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
    };
  }, [chatId]);

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!message) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });

    setMessage("");
  };

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const eventHandler = {
    [NEW_MESSAGE]: newMessagesListener,
  };

  useSocketEvents(socket, eventHandler);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  // fileMenu

  // const [sendAttachments] = useSendAttachmentsMutation();

  // const imageRef = useRef(null);
  // const audioRef = useRef(null);
  // const videoRef = useRef(null);
  // const fileRef = useRef(null);

  // const selectImage = () => {
  //   imageRef.current?.click();
  //   console.log("exit image");
  // };
  // const selectAudio = () => audioRef.current?.click();
  // const selectVideo = () => videoRef.current?.click();
  // const selectFile = () => fileRef.current?.click();

  // const fileChangeHandler = async (e, key) => {
  //   const files = Array.from(e.target.files);

  //   console.log("hahahhhhhh");

  //   console.log(files);

  //   if (files.length <= 0) return;

  //   if (files.length > 5)
  //     return toast.error(`You can only send 5 ${key} at a time`);

  //   dispatch(setUploadingLoader(true));

  //   const toastId = toast.loading(`Sending ${key}...`);

  //   try {
  //     const myForm = new FormData();

  //     myForm.append("chatId", chatId);
  //     files.forEach((file) => myForm.append("files", file));

  //     const res = await sendAttachments(myForm);

  //     if (res.data) toast.success(`${key} sent successfully`, { id: toastId });
  //     else toast.error(`Failed to send ${key}`, { id: toastId });
  //   } catch (error) {
  //     toast.error(error, { id: toastId });
  //   } finally {
  //     dispatch(setUploadingLoader(false));
  //   }
  // };

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <div
        ref={containerRef}
        className="flex flex-col gap-1 h-[90%] box-border overflow-y-auto overflow-x-hidden p-4 bg-gray-200"
      >
        {allMessages?.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </div>

      <form
        action=""
        className="h-[10%] flex items-center p-2 relative"
        onSubmit={submitHandler}
      >
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* <Button variant="outline">Open</Button> */}
        <IconButton
          sx={{
            position: "absolute",
            left: "1.5rem",
            rotate: "30deg",
          }}
          onClick={handleFileOpen}
        >
          <AttachFileIcon />
        </IconButton>
        {/* </DropdownMenuTrigger> */}
        {/* <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Choose</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={selectImage}>
                <Image className="ml-2 h-8 w-8" />
                <span className="ml-auto mr-4 text-lg">Image</span>
                <input
                  type="file"
                  multiple
                  // accept="image/png, image/jpeg, image/gif"
                  style={{ display: "none" }}
                  onChange={(e) => fileChangeHandler(e, "Images")}
                  ref={imageRef}
                />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={selectAudio}>
                <AudioFile className="ml-2 h-8 w-8" />
                <span className="ml-auto mr-4 text-lg">Audio</span>
                <input
                  type="file"
                  multiple
                  accept="audio/mpeg, audio/wav"
                  style={{ display: "none" }}
                  onChange={(e) => fileChangeHandler(e, "Audios")}
                  ref={audioRef}
                />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={selectVideo}>
                <Video className="ml-2 h-8 w-8" />
                <span className="ml-auto mr-4 text-lg">Video</span>
                <input
                  type="file"
                  multiple
                  accept="video/mp4, video/webm, video/ogg"
                  style={{ display: "none" }}
                  onChange={(e) => fileChangeHandler(e, "Videos")}
                  ref={videoRef}
                />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={selectFile}>
                <UploadFile className="ml-2 h-8 w-8" />
                <span className="ml-auto mr-4 text-lg">File</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </DropdownMenuContent> */}
        {/* </DropdownMenu> */} */
        <InputBox
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div
          className={` bg-[#ea7070] rounded-full  w-8 h-8 flex items-center justify-center text-white`}
          style={{
            transform: "rotate(40deg)",
          }}
        >
          <Send className="" />
        </div>
      </form>

      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </>
  );
}

export default AppLayout()(Chat);
