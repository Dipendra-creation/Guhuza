import { error } from "console";
import next from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
   try{
    const body =await req.json();

    return NextResponse.json(body);
   }catch(error){
    return NextResponse.json({error:error}, {status:500})
   }
  }