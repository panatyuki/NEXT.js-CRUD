import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    params: string;
    id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
    const { id } = params;
    await connectMongoDB();
    const post = await Post.findOne({ _id: id });
    return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
    const { id } = params;
    const {
        newTitle: title,
        newImg: img,
        newContent: content,
    } = await req.json();
    await connectMongoDB();
    await Post.findByIdAndUpdate(id, { title, img, content });
    return NextResponse.json({ message: "Post updated" }, { status: 200 });
}

