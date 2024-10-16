"use client";

import Link from "next/link";
import { useState } from "react"; // useState
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
import { useRouter } from 'next/compat/router'; // useRouter

export function LoginForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState(""); // allow login with username or email
  const [password, setPassword] = useState(""); // password state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // error message
  const [isLoading, setIsLoading] = useState(false); // loading state
  const router = useRouter(); // router

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault(); // prevent default form submission behavior
    setIsLoading(true); // set loading state

    // check if fields are empty
    if (!usernameOrEmail.trim() || !password.trim()) {
      setErrorMessage('Fields cannot be empty');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/public/auth/User/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usernameOrEmail, password }), // send username/email and password
      });

      if (response.ok) {
        // login success, handle logic
        const data = await response.json();
                localStorage.setItem('token', data.bearerToken); // storage the token
        if (router) { // Ensure router is not null
          router.push('/'); // redirect to home after login
        }
      } else {
        const errorData = await response.text(); // aquire error data
        try {
          const jsonErrorData = JSON.parse(errorData); // try to parse as JSON
          setErrorMessage('Login failed: ' + jsonErrorData.message); // display error message
        } catch (e) {
          setErrorMessage('Login failed: ' + errorData); // display original error message if parsing fails
        }
      }
    } catch (error) {
      console.error('An error occurred', error);
      setErrorMessage('An error occurred during login');
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
        <form onSubmit={onSubmit}> {/* form submission handling */}
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
                <Link href="#" className="ml-auto inline-block text-sm underline">
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
              {isLoading ? 'Logging in...' : 'Login'} {/* display loading state */}
            </Button>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>} {/* display error message */}
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
