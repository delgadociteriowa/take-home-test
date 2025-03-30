'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Home = () => {
  const { data: session } = useSession();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (session) {
      fetch('/api/drive')
        .then((res) => res.json())
        .then((data) => setFiles(data));
    }
    console.log('The Files: ', files);
  }, [session]);

  return (
    <div>
      {session ? (
        <>
          <p>Welcome, {session.user.name}</p>
          <button onClick={() => signOut()}>Sign Out</button>
          <h2>Your Google Drive Files:</h2>
          <ul>
            {files.map((file) => (
              <li key={file.id}>
                {file.name} ({file.mimeType})
              </li>
            ))}
          </ul>
        </>
      ) : (
        <button onClick={() => signIn('google')}>Sign In with Google</button>
      )}
    </div>
  );
};

export default Home;
