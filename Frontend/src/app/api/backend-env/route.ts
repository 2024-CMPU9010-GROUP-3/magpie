import { NextResponse } from "next/server";

export async function GET() {
  try {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendURL) {
      throw new Error("Backend URL not found");
    }

    return NextResponse.json({ backendURL });
  } catch (error) {
    console.error("Error fetching Backend URL:", error);
    return NextResponse.json({ backendURL: "" }, { status: 500 });
  }
}
