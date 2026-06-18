import { fetchData } from "@/app/lib/core/server";
import { UserTable } from "./UserTable";

const AllUsersPage = async() => {
  const users = await fetchData("/users")
  
  return <UserTable users={users} />;
};

export default AllUsersPage;
