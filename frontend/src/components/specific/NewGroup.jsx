import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { sampleUsers } from "@/constant/sampleData";
import UserItem from "../shared/UserItem";
import { Button } from "../ui/button";
import { useInputValidation } from "6pp";

export default function NewGroup({ isOpen, onOpenChange }) {
  const groupName = useInputValidation("");

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

  console.log(selectedMembers);
  const submitHandler = () => {};
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[25rem]">
        <h1 className="text-center text-xl">New Group</h1>

        <Input
          placeholder="Enter Group Name"
          className=" outline-none"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        <h1 className="text-gray-600 font-normal my-2">Members</h1>
        <div className="h-[40vh]">
          <ul className=" heyo list-none overflow-y-scroll h-full">
            {sampleUsers.map((user) => {
              return (
                <li key={user._id}>
                  <UserItem
                    user={user}
                    
                    handler={selectMemberHandler}
                    isAdded={selectedMembers.includes(user._id)}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button
            className="bg-green-500 hover:bg-green-700"
            onClick={submitHandler}
          >
            Create
          </Button>
          <Button className="bg-red-500 hover:bg-red-700">Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
