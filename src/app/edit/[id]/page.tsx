"use client";

/* Edit post by ID page. */
// Hooks.
import React, { useEffect, useState } from "react";
import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

// Components.
import Navbar from "@/app/components/Navbar";

// Interfaces.
interface EditPostPageProps {
  params: {
    id: string;
  };
}

interface PostData {
  title: string;
  img: string;
  content: string;
}

function EditPostPage({
  params: initialParams,
}: {
  params: Promise<EditPostPageProps["params"]>;
}) {
  const params = use(initialParams);
  const { id } = params;

  const [postData, setPostData] = useState<PostData>({
    title: "",
    img: "",
    content: "",
  });

  const [newTitle, setNewTitle] = useState<string>("");
  const [newImg, setNewImg] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");

  const router = useRouter();

  console.log(postData);

  useEffect(() => {
    const getPostById = async (id: string) => {
      try {
        const res = await axios.get(`http://localhost:3000/api/posts/${id}`, {
          headers: {
            "Cache-Control": "no-store",
          },
        });

        const data = res.data;

        console.log("edit post: ", data);
        setPostData(data.post);
      } catch (error) {
        console.log(error);
      }
    };

    getPostById(id);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.put(`http://localhost:3000/api/posts/${id}`, {
        newTitle,
        newImg,
        newContent,
      });

      if (res.status !== 200) {
        throw new Error("Failed to update post");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mx-4 sm:mx-[10%]">
      <Navbar />

      <h3 className="text-3xl font-bold">Edit Post</h3>
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
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-[450px] bg-gray-200 text-lg border py-2 px-3 my-2 rounded"
          placeholder={postData.title}
        />

        <input
          type="text"
          onChange={(e) => setNewImg(e.target.value)}
          className="w-[450px] bg-gray-200 text-lg border py-2 px-3 my-2 rounded"
          placeholder={postData.img}
        />

        <textarea
          name=""
          id=""
          onChange={(e) => setNewContent(e.target.value)}
          cols={30}
          rows={10}
          className="w-[800px] bg-gray-200 text-lg border py-2 px-3 my-2 rounded"
          placeholder={postData.content}
        ></textarea>

        <button
          type="submit"
          className="bg-green-500 w-[150px] text-white border my-2 py-2 px-3 rounded-lg text-lg"
        >
          Edit Post
        </button>
      </form>
    </section>
  );
}

export default EditPostPage;

