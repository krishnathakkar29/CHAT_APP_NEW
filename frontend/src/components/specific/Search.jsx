import { useInputValidation } from "6pp";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { sampleUsers } from "@/constant/sampleData";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import UserItem from "../shared/UserItem";
function Search({ isOpen, onOpenChange }) {
  const search = useInputValidation("");
  const isLoadingSendFriendRequest = false;

  const [users, setUsers] = useState(sampleUsers);

  const addFriendHandler = (_id) => {
    console.log("heyjire");
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <h1 className="text-center text-xl">Find People</h1>
        <div className=" flex p-2 items-center duration-200 ease-linear focus-within:border-2 focus-within:border-blue-500 border-2 border-[#000]">
          <SearchIcon className="w-6 h-6" />
          <input
            type="text"
            className="flex-grow border-none outline-none w-full rounded-md text-gray-700 p-1 text-xl"
            placeholder="Search"
            value={search.value}
            onChange={search.changeHandler}
          />
        </div>
        <div className="h-[40vh]">
          <ul className=" heyo list-none overflow-y-scroll h-full">
            {users.map((user) => {
              return (
                <li key={user._id}>
                  <UserItem
                    user={user}
                    handler={addFriendHandler}
                    handlerIsLoading={isLoadingSendFriendRequest}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Search;
