import { InputBox } from "@/components/styles/StyledComponents";
import { Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";

import { useInfiniteScrollTop } from "6pp";
import { getSocket } from "@/Socket";
import FileMenu from "@/components/dialogs/FileMenu";
import MessageComponent from "@/components/shared/MessageComponent";
import {
  ALERT,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "@/constant/events";
import { useErrors, useSocketEvents } from "@/hooks/hook";
import { useChatDetailsQuery, useGetMessagesQuery } from "@/redux/api/api";
import { setIsFileMenu } from "@/redux/reducers/misc";
import { AttachFile as AttachFileIcon } from "@mui/icons-material";
import { IconButton, Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeNewMessagesAlert } from "@/redux/reducers/chat";
import { TypingLoader } from "@/components/layout/Loaders";

function Chat({ chatId, user }) {
  const containerRef = useRef();
  const bottomRef = useRef(null);
  const socket = getSocket();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

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

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000]);
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

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(true);
    },
    [chatId]
  );
  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(false);
    },
    [chatId]
  );
  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "djasdhajksdhasdsadasdas",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
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

        {userTyping && <TypingLoader />}

        <div ref={bottomRef} />
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
          onChange={messageOnChange}
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
