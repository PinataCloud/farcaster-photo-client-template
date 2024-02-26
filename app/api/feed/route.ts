import { NextRequest, NextResponse } from "next/server";
import { cronFeed } from "@/utils/fc";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const casts = await cronFeed(body.channel, body.nextPage);
    return NextResponse.json(casts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
