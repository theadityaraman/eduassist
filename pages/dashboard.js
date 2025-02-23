import { useState } from "react";
import { storage } from "../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    if (!file) return;
    const storageRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", downloadURL);
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="bg-green-500 text-white px-4 py-2 mt-2 rounded">Upload Video</button>
      <p>Upload Progress: {progress}%</p>
    </div>
  );
}
