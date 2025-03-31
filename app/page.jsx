'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Home = () => {
  const { data: session } = useSession();
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState({ id: '', name: '' });
  const [selectedFileToUpload, setSelectedFileToUpload] = useState(null);

  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/drive');
      const data = await res.json();
      setFiles(data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const deleteFile = async (fileId) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the file: ${selectedFile.name}?`
    );

    if (!isConfirmed) {
      return;
    }
    try {
      const res = await fetch(`/api/drive?fileId=${fileId}`, {
        method: 'DELETE',
      });

      if (res.status === 200 || res.status === 204) {
        alert('File deleted successfully');
        setSelectedFile({ id: '', name: '' });
        fetchFiles();
      } else {
        alert('Failed to delete file');
      }
    } catch (error) {
      alert('Error deleting file:', error);
    }
  };

  const downloadFile = async (fileId) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to download the file: ${selectedFile.name}?`
    );

    if (!isConfirmed) {
      return;
    }
    try {
      const res = await fetch(`/api/drive/download?fileId=${fileId}`, {
        method: 'GET',
      });

      if (res.status === 200 || res.status === 204) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = selectedFile.name || 'downloaded-file';
        link.click();
        window.URL.revokeObjectURL(url);
        setSelectedFile({ id: '', name: '' });
      } else {
        alert('Failed to download file');
      }
    } catch (error) {
      alert('Error downloading file:', error);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/drive', {
        method: 'POST',
        body: formData,
      });

      if (res.status === 200) {
        alert('File uploaded successfully');
        setSelectedFileToUpload(null);
      } else {
        alert('Failed to upload file');
      }
    } catch (error) {
      alert('Error uploading file:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFileToUpload(file);
  };

  const handleUploadClick = () => {
    if (selectedFileToUpload) {
      uploadFile(selectedFileToUpload);
    } else {
      alert('Please select a file first');
    }
  };

  useEffect(() => {
    fetchFiles();
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
              <div className='flex items-center justify-between mt-8 mb-4 mx-6'>
                <h3 className='text-2xl text-gray-700 font-semibold flex-1'>
                  Your Google Drive Files:
                </h3>
                {selectedFile.id && (
                  <div className='flex-1 flex justify-end'>
                    <span className='px-6 py-2 mr-2'>{selectedFile.name}</span>
                    <button
                      className='rounded-md shadow-md bg-green-400 hover:bg-green-500 hover:cursor-pointer px-6 py-2 mr-2 text-lg text-white'
                      onClick={() => downloadFile(selectedFile.id)}
                    >
                      Download
                    </button>
                    <button
                      className='rounded-md shadow-md bg-red-400 hover:bg-red-500 hover:cursor-pointer px-6 py-2 mr-2 text-lg text-white'
                      onClick={() => deleteFile(selectedFile.id)}
                    >
                      Delete
                    </button>
                    <button
                      className='rounded-md shadow-md bg-gray-400 hover:bg-gray-500 hover:cursor-pointer px-6 py-2 mr-2 text-lg text-white'
                      onClick={() => setSelectedFile({ id: '', name: '' })}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <ul className='bg-gray-200 m-6 p-10 rounded-md'>
                {files.map((file) => (
                  <li
                    className={`
                      ${selectedFile.id === '' && 'bg-white hover:bg-blue-200'}
                      ${
                        selectedFile.id === file.id ? 'bg-blue-400' : 'bg-white'
                      }
                      my-4 px-6 py-4 rounded-md shadow-md hover:cursor-pointer`}
                    key={file.id}
                    onClick={() =>
                      setSelectedFile({ id: file.id, name: file.name })
                    }
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
          {session && (
            <div className='mt-8 mb-4 mx-6'>
              <h3 className='text-2xl text-gray-700 font-semibold mb-4'>
                Upload files to your Google Drive
              </h3>
              <label className='block mb-2 text-sm font-medium text-gray-700'>
                Select a File (img or pdf)
              </label>
              <input
                type='file'
                onChange={handleFileChange}
                accept='image/*,application/pdf'
                className='border rounded w-full py-2 px-3 mb-5'
              />

              <button
                className={`${
                  !selectedFileToUpload
                    ? 'bg-gray-400 hover:bg-gray-400 hover:cursor-not-allowed'
                    : 'bg-blue-400 hover:bg-blue-500 hover:cursor-pointer'
                }   rounded-md shadow-md  px-6 py-2 mr-2 text-lg text-white`}
                onClick={handleUploadClick}
                disabled={!selectedFileToUpload}
              >
                Upload File
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
