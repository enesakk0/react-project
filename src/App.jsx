import { useState } from "react";
import "./App.css";
import ImageList from "./components/ImageList";
import axios from "axios";

function App() {
  const [image, setImage] = useState([]);

  const handleImageFunction = (e) => {
    if (e.target.files[0]?.name) {
      if (e.target.files[0].size > 5000000) {
        return alert("File size is too large");
      }
      setImage([
        ...image,
        {
          key: crypto.randomUUID(),
          name: e.target.files[0].name,
          size: ((e.target.files[0].size / 1000) * 1).toFixed(0) + " KB",
          url: URL.createObjectURL(e.target.files[0]),
        },
      ]);
      axios
        .post("https://httpbin.org/post", {
          name: e.target.files[0].name,
          size: ((e.target.files[0].size / 1000) * 1).toFixed(0) + " KB",
          url: URL.createObjectURL(e.target.files[0]),
        })
        .then((res) => console.log(res));
    } else {
      return null;
    }
  };

  return (
    <>
      <section className="h-[100vh] flex justify-center items-center">
        <article className="h-auto w-[600px] p-5 rounded-[2rem] bg-white border shadow-md flex flex-col gap-3">
          <article className="flex gap-3 p-4 ml-3 border-b">
            <img
              src="./cloud-upload.svg"
              className="border rounded-[50%] p-2 flex justify-center items-center"
              alt="cloud-icon"
              width={50}
              height={40}
            />
            <div>
              <h1>Upload files</h1>
              <p className="text-gray-400">
                Select and upload the files oof your choice.
              </p>
            </div>
          </article>
          <div className="p-4 border-dashed border-[3px] self-center w-[95%] rounded-md flex justify-center items-center flex-col gap-2">
            <img
              src="./cloud-upload.svg"
              alt="cloud-icon"
              width={30}
              height={30}
            />
            <p>Choose a file or drag & drop it here</p>
            <p className="text-gray-400">JPEG, PNG - max 5 MB</p>
            <input
              type="file"
              placeholder="Choose a file"
              className="rounded-lg border p-1 w-60 border-gray-400 cursor-pointer hover:opacity-60"
              onChange={(e) => handleImageFunction(e)}
            />
          </div>
          <ImageList image={image} stateHandle={setImage} />
        </article>
      </section>
    </>
  );
}

export default App;
