import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../specific/ChatList";
import { samepleChats } from "@/constant/sampleData";
import { useParams } from "react-router-dom";
import ProfileCard from "../specific/ProfileCard";
import { useMyChatsQuery } from "@/redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "@/redux/reducers/misc";
import { useErrors } from "@/hooks/hook";
import { getSocket } from "../../Socket";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const { chatId } = params;
    const dispatch = useDispatch();

    const socketBhai = getSocket();

    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);

    const { data, isError, error, isLoading, refetch } = useMyChatsQuery();

    useErrors([{ isError, error }]);

    const handleMobileClose = () => dispatch(setIsMobile(false));

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete Chat", _id, groupChat);
    };
    return (
      <>
        <Title />
        <Header />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                <ChatList
                  chats={data?.chats}
                  chatId={chatId}
                  handleDeleteChat={handleDeleteChat}
                />
              </>
            )}
          </Grid>

          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>

          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
          >
            <ProfileCard user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
