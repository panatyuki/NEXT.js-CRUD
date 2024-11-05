"use client";

/* Delete Button */
// Hooks.
import React from "react";
import axios from "axios";

// Interface.
interface DeleteBtnProps {
  id: string;
}

function DeleteBtn({ id }: DeleteBtnProps) {
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure to delete this post?");

    if (confirmed) {
      const res = await axios.delete(`http://localhost:3000/api/posts`, {
        params: { id },
      });

      if (res.status === 200) {
        window.location.reload();
      }
    }
  };

  return (
    <a
      onClick={handleDelete}
      className="bg-red-500 border px-4 py-2 text-white text-lg rounded-md hover:cursor-pointer"
    >
      Delete
    </a>
  );
}

export default DeleteBtn;

