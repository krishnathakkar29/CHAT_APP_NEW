import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";
import moment from "moment";
import { transformImage } from "@/lib/features";

const ProfileCard = ({ user }) => {
  return (
    <div className="flex flex-col items-center gap-8">
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          height: 200,
          width: 200,
          border: "2px solid #fff",
          objectFit: "contain",
        }}
      />

      <Profile heading={"Bio"} text={user?.bio} />
      <Profile
        heading={"username"}
        text={user?.username}
        Icon={<UserNameIcon />}
      />
      <Profile heading={"name"} text={user?.name} Icon={<FaceIcon />} />
      <Profile
        heading={"joined"}
        text={moment(user?.createdAt).fromNow()}
        Icon={<CalendarIcon />}
      />
    </div>
  );
};

const Profile = ({ text, Icon, heading }) => {
  return (
    <div className="flex items-center justify-center gap-4 mx-auto text-white ">
      {Icon && Icon}

      <div className="flex flex-col items-center">
        <p className="text-white">{text}</p>
        <p className="text-gray-500">{heading}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
