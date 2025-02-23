import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useRouter } from "next/router";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        router.push("/dashboard");
      }
    });
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {user ? (
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      ) : (
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">Login with Google</button>
      )}
    </div>
  );
}
