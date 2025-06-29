import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const placeId = searchParams.get("placeId");
  if (!apiKey || !placeId) {
    return NextResponse.json({ reviews: [] }, { status: 400 });
  }
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json({ reviews: data.result?.reviews || [] });
}
