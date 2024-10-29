"use client";

import Link from "next/link";
import { useState, useEffect } from "react"; // useState and useEffect
import { Button } from "@/components/ui/registry/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/registry/card";
import { Input } from "@/components/ui/registry/input";
import { Label } from "@/components/ui/registry/label";
import { useRouter } from "next/navigation"; // useRouter

export function LoginForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState(""); // allow login with username or email
  const [password, setPassword] = useState(""); // password state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // error message
  const [isLoading, setIsLoading] = useState(false); // loading state
  const router = useRouter(); // router

  // check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token"); // check user login status
    if (token) {
      // if user is already logged in, redirect to home
      router.push("/"); // redirect to home
    }
  }, [router]);

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault(); // prevent default form submission behavior
    setIsLoading(true); // set loading state

    // check if fields are empty
    if (!usernameOrEmail.trim() || !password.trim()) {
      setErrorMessage("Fields cannot be empty");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // TEST:ensure request includes credentials (cookies)
          body: JSON.stringify({ username: usernameOrEmail, password }), // send username/email and password
        }
      );

      if (response.ok) {
        // login success, handle logic
        const data = await response.json();
        console.log("Login successful:", data); // print success response
        if (data.response.content.userid) {
          // ensure bearerToken exists, note the key name
          localStorage.setItem("userId", data.response.content.userid); // store user id
          setErrorMessage(null); // clear any error message
          console.log("Redirecting to home..."); // add debug information
          console.log("router:", router);
          router?.push("/"); // safely check if router is defined before pushing to home
        } else {
          setErrorMessage("Login failed: No user id received"); // if no user id, display error message
        }
      } else {
        // handle error case
        const errorData = await response.text(); // get error data
        setErrorMessage("Login failed: " + errorData); // display original error message
      }
    } catch (error) {
      console.error("An error occurred", error);
      setErrorMessage("An error occurred during login");
    } finally {
      setIsLoading(false); // reset loading state
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username or email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          {" "}
          {/* form submission handling */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="usernameOrEmail">Username/Email</Label>
              <Input
                id="usernameOrEmail"
                type="text"
                placeholder="username or m@example.com"
                required
                value={usernameOrEmail} // bind usernameOrEmail state
                onChange={(e) => setUsernameOrEmail(e.target.value)} // update state
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password} // bind password state
                onChange={(e) => setPassword(e.target.value)} // update password state
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}{" "}
              {/* display loading state */}
            </Button>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}{" "}
            {/* display error message */}
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="./signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
