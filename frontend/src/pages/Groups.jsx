import AppLayout from "@/components/layout/AppLayout";
import { Grid } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, Edit, Edit2, Pencil, PencilIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Done, Menu } from "@mui/icons-material";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/components/styles/StyledComponents";
import AvatarCard from "@/components/shared/AvatarCard";
import { samepleChats } from "@/constant/sampleData";

const Groups = () => {
  const navigate = useNavigate();
  const chatId = useSearchParams()[0].get("group");

  const navigateBack = () => navigate("/");

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("GroupName");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

  useEffect(() => {
    function handleResize(e) {
      if (window.innerWidth > 640 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setGroupName(`GroupName ${chatId}`);
    setGroupNameUpdatedValue(`GroupName ${chatId}`);

    // if (isEdit) return setIsEdit(false);

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const updateGroupName = () => {
    setIsEdit(false);
  };

  const IconsBtns = (
    <>
      <div
        onClick={handleMobile}
        className="block sm:hidden fixed top-8 right-4"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Menu />
            </TooltipTrigger>
            <TooltipContent>Menu</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div
        onClick={navigateBack}
        className="absolute top-8 left-8 rounded-full p-1 bg-black text-white hover:bg-[rgba(0,0,0,0.7)]"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ArrowLeft />
            </TooltipTrigger>
            <TooltipContent>Back</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );

  const GroupName = (
    <>
      <div className="flex items-center justify-center gap-3 p-8">
        {isEdit ? (
          <>
            <div className="flex items-center justify-center gap-3  ">
              <input
                type="text"
                className="border-2 border-black rounded p-3 text-gray-500"
                value={groupNameUpdatedValue}
                onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
              />
              <Done onClick={updateGroupName} />
            </div>
          </>
        ) : (
          <>
            <p className="md:text-xl">{groupName}</p>

            <Edit2 onClick={() => setIsEdit((prev) => !prev)} />
          </>
        )}
      </div>
    </>
  );

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
        bgcolor={"bisque"}
      >
        <GroupList myGroups={samepleChats} chatId={chatId} />
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconsBtns}

        {groupName && GroupName}

        <p className="m-2 mb-4">Members</p>

        <div className="flex bg-[#000] w-full max-w-2xl h-[50vh] box-border overflow-y-auto">
          {/* members */}
        </div>

        <div>
          <Button>Add Member</Button>
        </div>
      </Grid>

      <div>
        <Sheet
          className=""
          open={isMobileMenuOpen}
          onOpenChange={setIsMobileMenuOpen}
        >
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Chats</SheetTitle>
              <SheetDescription>
                <GroupList myGroups={samepleChats} chatId={chatId} />
              </SheetDescription>
            </SheetHeader>

            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </Grid>
  );
};

const GroupList = ({ myGroups = [], chatId }) => {
  return (
    <>
      <div className="flex flex-col">
        {myGroups.length > 0 ? (
          myGroups.map((group) => {
            return (
              <GroupListItem group={group} chatId={chatId} key={group._id} />
            );
          })
        ) : (
          <p className="text-center text-2xl p-4">No Groups 🙄</p>
        )}
      </div>
    </>
  );
};

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <>
      <Link
        to={`?group=${_id}`}
        onClick={(e) => {
          if (chatId == _id) {
            e.preventDefault();
          }
        }}
      >
        <div className="flex items-center p-2 gap-2">
          <AvatarCard avatar={avatar} />
          <p className="md:text-xl">{name}</p>
        </div>
      </Link>
    </>
  );
});

export default Groups;
