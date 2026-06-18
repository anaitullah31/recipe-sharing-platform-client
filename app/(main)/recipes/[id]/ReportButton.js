// "use client";

// import { useState } from "react";
// import { Flag } from "@gravity-ui/icons";
// import { Icon } from "@gravity-ui/uikit";
// import ReportModal from "./ReportModal";

// const ReportButton = ({ recipe, user }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(true)}
//         className="ml-auto cursor-pointer transition hover:text-danger"
//       >
//         <Icon data={Flag} size={17} />
//       </button>

//       <ReportModal
//         isOpen={isOpen}
//         onOpenChange={setIsOpen}
//         recipeId={recipe._id}
//         userEmail={user?.email || ""}
//       />
//     </>
//   );
// };

// export default ReportButton;
