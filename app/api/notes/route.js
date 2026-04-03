import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";

export async function POST(req){
  await connectDB();
  const data = await req.json();
  console.log("Incoming Data:",data);
  const note = await Note.create(data);
  console.log("Saved Note:",note);
  return NextResponse.json({note});  
}

export async function GET(req){
  await connectDB();
  const {searchParams} = new URL(req.url);
  const userId = searchParams.get("userId");
  const notes = await Note.find({userId});
  return NextResponse.json({notes});  
}
