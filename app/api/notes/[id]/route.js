import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";

export async function PUT(req,{params}){
  await connectDB();
  const { id } = await params;
  const data = await req.json();
  console.log(" Update Data:",data);
  const updated = await Note.findByIdAndUpdate(id, data, {new:true});
  return NextResponse.json({updated});
}

export async function DELETE(req,{params}){
  await connectDB();
  const { id } = await params;
  await Note.findByIdAndDelete(id);
  return NextResponse.json({message:"Note deleted successfully"});
}