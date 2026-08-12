import React, { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id?: string | number;
  title: string;
  desc: string;
}

const App: React.FC = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get<{ allPost: Post[] }>(
        "https://express-route.up.railway.app/api/v1/post",
      );
      setPosts(response.data.allPost ?? []);
    } catch (error) {
      console.error("Failed to load posts:", error);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (!desc.trim()) {
      alert("Description is required");
      return;
    }

    try {
      await axios.post("https://express-route.up.railway.app/api/v1/post", {
        title,
        desc,
      });

      setTitle("");
      setDesc("");
      fetchPosts();
    } catch (error) {
      console.error("Failed to submit post:", error);
    }
  };

  const handleEdit = async (postId: any) => {
    const updated_title = prompt("Enter Updated title", title);
    const updated_description = prompt("Enter updated description", desc);
    try {
      await axios.put(`https://express-route.up.railway.app/api/v1/post/${postId}`, {
        title: updated_title,
        desc: updated_description,
      });
    } catch (error) {
      console.error(error);
    }
  };
  fetchPosts();

  const handleDelete = async (postId: any) => {
    try {
      await axios.delete(`https://express-route.up.railway.app/api/v1/post/${postId}`);
      alert("Post deleted Successfully");
      return;
    } catch (error) {
      console.error(error);
    }
  };
  fetchPosts();

  return (
    <div className="max-w-screen">
      <div className="flex p-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 text-center w-screen"
        >
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            className="border-2 px-6 py-3 rounded-lg outline-none hover:border-purple-700 focus:border-blue-800 transition-colors duration-400"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Enter Description"
            value={desc}
            className="resize-none border-2 px-6 py-3 rounded-lg outline-none hover:border-purple-700 focus:border-blue-800 transition-colors duration-400"
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            type="submit"
            className="max-w-xs px-18 py-2 md:ml-auto rounded-lg cursor-pointer font-bold bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-400"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-10">
        {posts.map((singlePost, index) => (
          <div key={singlePost.id ?? index} className="border p-4">
            <h2 className="font-bold text-2xl">{singlePost.title}</h2>
            <p>{singlePost.desc}</p>
            <div className="flex justify-start items-start gap-10">
              <button onClick={() => handleEdit(singlePost.id)}>Edit</button>
              <button onClick={() => handleDelete(singlePost.id)}>
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
