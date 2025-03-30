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
  }, [session]);

  return (
    <section className='bg-gray-100 min-h-210 pb-20'>
      <div className='mx-auto max-w-7xl px-2 pt-7 '>
        <div className='bg-white p-8 mt-10 mx-6 rounded-md border-[1px] border-gray-300 shadow-md'>
          {session ? (
            <>
              <h2 className='text-3xl text-gray-700 font-semibold'>
                Welcome, {session.user.name}
              </h2>
              <h3 className='text-2xl text-gray-700 font-semibold my-8'>
                Your Google Drive Files:
              </h3>
              <ul className='bg-gray-200 m-6 p-10 rounded-md'>
                {files.map((file) => (
                  <li
                    className='bg-white my-4 px-6 py-4 rounded-md'
                    key={file.id}
                  >
                    {file.name} ({file.mimeType})
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h2 className='text-3xl text-gray-700 font-semibold'>
                Welcome to DriveApp
              </h2>
              <p className='mt-6 mb-6'>
                The DriveApp allows you to manage your Google Drive files with
                ease, providing a great experience. <br /> Login or register now
                to start managing your files.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
