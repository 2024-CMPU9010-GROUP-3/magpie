import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/registry/button";
import { LoginForm } from "@/app/components/form/login-form";
import ProtectedRoute from "@/app/components/ProtectedRoute";



export const metadata: Metadata = {
  title: "Login",
  description: "Authentication login page",
};

export default function LoginPage() {
  return (
    <ProtectedRoute>
      <div className="md:hidden relative min-h-screen flex flex-col items-center justify-center">
        {/* Mobile version */}
        <Image
          src="/images/auth-wt.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden object-cover absolute inset-0 w-full h-full" // Mobile Light Image
        />
        <Image
          src="/images/auth-bk.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block object-cover absolute inset-0 w-full h-full" // Mobile Dark Image
        />
        {/* Center LoginForm */}
        <div className="relative z-10 p-4 w-full max-w-sm bg-white bg-opacity-90 rounded-md shadow-md">
          <LoginForm />
          <p className="text-center text-sm text-muted-foreground mt-4">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Desktop and Tablet Version */}
      <div className="container relative hidden md:grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Test
        </Link>

        <div className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
          {/* Desktop Side Section */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-zinc-700" />
          <Link
            href="/"
            className="relative inline-flex items-center gap-2 z-20"
          >
            <Image
              src="/images/BKlogo.svg"
              alt="Logo"
              width={30}
              height={30}
              className="mr-2 h-12 w-12"
            />
            <span className="text-lg font-medium">Magpie</span>
          </Link>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;In the heart of the city&apos;s flow, we map the unseen,
                weaving data and vision to guide tomorrow&apos;s planners toward
                a more connected world.&rdquo;
              </p>
              <footer className="text-sm">Magpie</footer>
            </blockquote>
          </div>
        </div>

        <div className="lg:p-8 flex items-center justify-center">
          <div className="w-full max-w-sm flex flex-col justify-center space-y-6">
            <LoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
            
            


          </div>
        </div>
      </div>
    </ProtectedRoute >
  );
}

