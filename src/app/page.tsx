"use client";

/* Home page */
// Hooks.
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

// Components.
import Navbar from "./components/Navbar";
import DeleteBtn from "./components/DeleteBtn";

interface Posts {
  _id: string;
  title: string;
  img: string;
  content: string;
}

function Home() {
  const [postData, setPostData] = useState<Posts[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/posts", {
          headers: {
            "Cache-Control": "no-store",
          },
        });
        setPostData(res.data.posts);
      } catch (error) {
        console.log("Error loading posts: ", error);
      }
    };
    getPosts();
  }, []);

  return (
    <section className="mx-4 sm:mx-[10%]">
      <Navbar />

      <main className="mt-10">
        <button className="bg-green-500 p-3 text-white rounded-lg">
          <Link href="/create">Create a new post</Link>
        </button>

        <div className="grid grid-cols-4 mt-3 gap-5">
          {postData && postData.length > 0 ? (
            postData.map((val) => (
              <div key={val._id} className="shadow-xl my-10 p-10 rounded-xl">
                <h4>{val.title}</h4>
                <Image src={val.img} width={300} height={0} alt={val.title} />
                <p>{val.content}</p>

                <div className="mt-5">
                  <Link
                    href={`/edit/${val._id}`}
                    className="bg-gray-500 border px-4 py-2 text-white text-lg rounded-md"
                  >
                    Edit
                  </Link>

                  <DeleteBtn id={val._id} />
                </div>
              </div>
            ))
          ) : (
            <p className="bg-gray-300 p-3 my-3">You do not have ant post.</p>
          )}
        </div>
      </main>
    </section>
  );
}

export default Home;

