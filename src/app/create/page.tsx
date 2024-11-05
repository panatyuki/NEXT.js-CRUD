"use client";

// Hooks.
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

// Components.
import Navbar from "../components/Navbar";

function CreatePostPage() {
  const [title, setTitle] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !img || !content) {
      alert("Please complete all inputs!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/posts", {
        title,
        img,
        content,
      });

      if (res.status === 201) {
        router.push("/");
      } else {
        throw new Error("Failed to create a post");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <section className="mx-4 sm:mx-[10%]">
      <Navbar />

      <h3 className="text-3xl font-bold">Create Post</h3>
      <hr className="my-3" />
      <Link
        href="/"
        className="bg-gray-500 inline-block text-white border py-2 px-3 my-2 rounded-lg"
      >
        Go back to Home
      </Link>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="w-[450px] bg-gray-200 text-lg border py-2 px-3 my-2 rounded"
          placeholder="Post title"
        />

        <input
          type="text"
          onChange={(e) => setImg(e.target.value)}
          className="w-[450px] bg-gray-200 text-lg border py-2 px-3 my-2 rounded"
          placeholder="Post Img Url"
        />

        <textarea
          name=""
          id=""
          onChange={(e) => setContent(e.target.value)}
          cols={30}
          rows={10}
          className="w-[800px] bg-gray-200 text-lg border py-2 px-3 my-2 rounded"
          placeholder="Enter your contents"
        ></textarea>

        <button
          type="submit"
          className="bg-green-500 w-[150px] text-white border my-2 py-2 px-3 rounded-lg text-lg"
        >
          Create Post
        </button>
      </form>
    </section>
  );
}

export default CreatePostPage;

