// /app/api/newsletter/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName } = body;

    if (!email || !firstName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 👇 TEMP: just log it for now
    console.log("Newsletter signup received:");
    console.log({ email, firstName });

    // Simulate small delay (optional)
    await new Promise((res) => setTimeout(res, 500));

    return NextResponse.json(
      { success: true, message: "Successfully subscribed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}