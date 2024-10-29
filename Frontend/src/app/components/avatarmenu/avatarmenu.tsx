import {
    LifeBuoy,
    LogOut,
    Settings,
    User,
    UserRoundX,
  } from "lucide-react";
  
  import { useState } from "react"; // Import useState to manage login status
  
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  
  import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
  
  export function DropdownMenuDemo() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if the user is logged in
  
    // Function to simulate login (replace with real login logic)
    const handleLogin = () => {
      setIsLoggedIn(true);
      console.log("Logged in!");
    };
  
    // Function to handle logout
    const handleLogout = () => {
      setIsLoggedIn(false);
      console.log("Logged out!");
    };
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* Conditionally render Avatar or UserRoundX icon based on isLoggedIn state */}
          {isLoggedIn ? (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <UserRoundX className="w-8 h-8 cursor-pointer" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {/* Show different dropdown items based on login status */}
          {isLoggedIn ? (
            <>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuLabel>Login Required</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleLogin}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Log in</span>
                  <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
                </DropdownMenuItem>
                {/* You can add more login/signup related options here */}
              </DropdownMenuGroup>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  
  