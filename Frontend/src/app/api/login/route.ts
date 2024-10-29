import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    if (process.env.NEXT_PUBLIC_BACKEND_URL) {
      const req = new NextRequest(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/public/auth/User/login`,
        request
      );
      const resp = await fetch(req);

      return resp;
    }
    return NextResponse.json([], { status: 500 });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json([], { status: 500 });
  }
}
