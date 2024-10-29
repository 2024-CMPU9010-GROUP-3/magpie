"use client";

// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenuDemo } from "@/app/components/avatarmenu/avatarmenu";
// import { useState } from "react"; // add useState


const TestPage = () => {

  // const [open, setOpen] = useState(false); // add setOpen
//   const isLoggedIn = false; // 

//   const handleAvatarClick = () => {
//     setOpen(true); // Ensure you have setOpen defined and imported if needed
//   };

//   const avatar = isLoggedIn ? (
//     <Avatar>
//       <AvatarImage
//         src="https://github.com/shadcn.png"
//         alt="@shadcn"
//       />
//       <AvatarFallback>CN</AvatarFallback>
//     </Avatar>
//   ) : (
//     <Avatar>
//       <AvatarFallback>DF</AvatarFallback>
//     </Avatar>
//   );

  return <div>All the about us 
    
    <div>
      <DropdownMenuDemo /> {/* pass avatar component */}
    </div>
    
    content goes in this</div>; 
};
export default TestPage;