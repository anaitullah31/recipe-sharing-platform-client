"use client";

import { clientMutation } from "@/app/lib/core/client";
import { useRouter } from "next/navigation";

const BlockButton = ({ user, currentUser }) => {
  const router = useRouter();

  const handleStatus = async () => {
    try {
      const data = await clientMutation(
        `/users/${user._id}`,
        {
          currentUserEmail: currentUser?.email,
          currentUserId: currentUser?.id,
        },
        "PATCH",
      );

      if (data.success) {
        router.refresh();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update user status");
    }
  };

  // Disable button for admins and yourself
  const isCurrentUser =
    currentUser?.email === user?.email || currentUser?.id === user?._id;

  const isAdmin = user?.role === "admin";

  const disabled = isCurrentUser || isAdmin;

  return (
    <button
      onClick={handleStatus}
      disabled={disabled}
      title={
        isCurrentUser
          ? "You cannot block yourself"
          : isAdmin
            ? "Admins cannot be blocked"
            : ""
      }
      className={`cursor-pointer rounded px-4 py-2 text-xs font-bold transition ${
        disabled
          ? "cursor-not-allowed bg-default text-default-foreground opacity-60"
          : user.status === "active"
            ? "bg-danger text-danger-foreground hover:opacity-90"
            : "bg-success text-success-foreground hover:opacity-90"
      }`}
    >
      {disabled
        ? isAdmin
          ? "Admin"
          : "You"
        : user.status === "active"
          ? "Block"
          : "Activate"}
    </button>
  );
};

export default BlockButton;
