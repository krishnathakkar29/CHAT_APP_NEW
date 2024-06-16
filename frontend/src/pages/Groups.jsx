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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

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
import { samepleChats, sampleUsers } from "@/constant/sampleData";
import UserItem from "@/components/shared/UserItem";

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
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  //open add member dialog
  const [isAddMember, setIsAddMember] = useState(false);

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
    if (chatId) {
      setGroupName(`GroupName ${chatId}`);
      setGroupNameUpdatedValue(`GroupName ${chatId}`);
    }

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

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const openAddMemberHandler = () => {
    setIsAddMember(true);
  };

  const deleteHandler = () => {
    console.log("Delete handler");
    setConfirmDeleteDialog(false);
  };

  // plus icon on the user item -- nope
  // const addFriendHandler = (id) => {
  //   console.log(`user id : ${id}`);
  // };

  //add member dialog submit changes handler
  const addMemberSubmitHandler = () => {};

  const removeFromMainScreenMembers = (id) => {
    console.log("main user , id");
  };

  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    if (selectedMembers.includes(id)) {
      const newMembers = selectedMembers.filter(
        (single) => single.toString() !== id.toString()
      );
      setSelectedMembers(newMembers);
    } else {
      setSelectedMembers((prev) => [...prev, id]);
    }
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

        {chatId && groupName && GroupName}

        {chatId && <p className="m-2 mb-4">Members</p>}

        {chatId && (
          <div className="flex flex-col gap-3 w-full max-w-xl h-[50vh] box-border overflow-y-auto">
            {/* members */}

            {sampleUsers.map((i) => (
              <UserItem
                styling={{
                  padding: "1rem 2rem",
                  boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                  borderRadius: "1rem",
                }}
                key={i._id}
                user={i}
                handler={removeFromMainScreenMembers}
                isAdded
              />
            ))}
          </div>
        )}

        {chatId && (
          <div className="flex flex-col md:flex-row mt-4 gap-4">
            <Button
              className="bg-green-500 hover:bg-green-700"
              onClick={openAddMemberHandler}
            >
              Add Member
            </Button>

            <Button
              className="bg-red-500 hover:bg-red-700"
              onClick={openConfirmDeleteHandler}
            >
              {" "}
              Delete Group
            </Button>

            {/* delete group dialog */}
            <Dialog
              open={confirmDeleteDialog}
              onOpenChange={() => {
                setConfirmDeleteDialog((prev) => !prev);
              }}
            >
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Group</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete the group?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="destructive" onClick={deleteHandler}>
                    Yes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setConfirmDeleteDialog(false);
                    }}
                  >
                    No
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* add members dialog */}
            <Dialog
              open={isAddMember}
              onOpenChange={() => {
                setIsAddMember((prev) => !prev);
              }}
            >
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Members</DialogTitle>
                  <DialogDescription>
                    <div className="flex flex-col gap-4 p-4 ">
                      {members.length > 0 ? (
                        members.map((i) => (
                          <UserItem
                            user={i}
                            key={i._id}
                            handler={selectMemberHandler}
                            isAdded={selectedMembers.includes(i._id)}
                          />
                        ))
                      ) : (
                        <>
                          <p className="text-center">No Friends..</p>
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-evenly mt-4">
                      <Button
                        className="bg-green-500 hover:bg-green-700"
                        onClick={addMemberSubmitHandler}
                      >
                        Submit Changes
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-red-700"
                        onClick={() => {
                          setIsAddMember(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </Grid>

      <div>
        <Sheet
          className=""
          open={isMobileMenuOpen}
          onOpenChange={setIsMobileMenuOpen}
        >
          <SheetContent side={"bottom"}>
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
      <div className="flex flex-col overflow-y-auto max-h-screen">
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
