"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/registry/button";
import { Input } from "@/components/ui/registry/input";
import { Label } from "@/components/ui/registry/label";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null); // clear error previous message

    if (
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !firstName.trim() ||
      !lastName.trim()
    ) {
      console.error("Fields cannot be empty");
      setErrorMessage("Fields cannot be empty");
      setIsLoading(false);
      return;
    }

    // passwordComplexity check
    const passwordComplexity =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordComplexity.test(password)) {
      console.error("Password does not meet complexity requirements");
      setErrorMessage("Password does not meet complexity requirements");
      setIsLoading(false);
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL); // debug

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/public/auth/User/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email.split("@")[0],
            email,
            password,
            firstName,
            lastName,
          }),
        }
      );
      console.log("Response:", response);
      const responseData = await response.json();

      if (response.ok) {
        // handle successful registration
        console.log("Registration successful:", responseData); // print success response

        // store user info and login status
        localStorage.setItem("token", responseData.bearerToken); // store token
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            // store user info
            username: responseData.username,
            email: responseData.email,
            firstName: responseData.firstName,
            lastName: responseData.lastName,
          })
        );

        alert("Sign up successful"); // display success message
        console.log("Redirecting to home page"); // display redirect message
        console.log("User info:", localStorage.getItem("userInfo")); // display user info
        console.log("Token:", localStorage.getItem("token")); // display token
        console.log("Router:", router); // display router
        router?.push("/"); // redirect to home
      } else {
        // Handle errors
        console.error("Registration failed:", responseData);
        setErrorMessage("Registration failed: " + responseData.message); // display error message
        alert("Sign up failed: " + responseData.message); // alert user that sign up failed
      }
    } catch (error) {
      console.error("An error occurred", error);
      alert("An error occurred, please try again later."); // alert user that an error occurred
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label className="sr-only" htmlFor="first-name">
                First Name
              </Label>
              <Input
                id="first-name"
                placeholder="First Name"
                type="text"
                disabled={isLoading}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label className="sr-only" htmlFor="last-name">
                Last Name
              </Label>
              <Input
                id="last-name"
                placeholder="Last Name"
                type="text"
                disabled={isLoading}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                autoCapitalize="none"
                autoComplete="current-password"
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="confirm-password">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                placeholder="Confirm your password"
                type={showConfirmPassword ? "text" : "password"}
                autoCapitalize="none"
                autoComplete="current-password"
                disabled={isLoading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
