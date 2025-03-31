const About = () => {
  return (
    <section className='bg-gray-100 min-h-210 pb-20'>
      <div className='mx-auto max-w-7xl px-2 pt-7 '>
        <div className='bg-white p-8 mt-10 mx-6 rounded-md border-[1px] border-gray-300 shadow-md'>
          <h2 className='text-3xl text-gray-700 font-semibold'>About</h2>
          <p className='mt-6 mb-6'>
            This is a Next.js project bootstrapped with create-next-app.
          </p>
          <h3 className='text-2xl text-gray-700 font-semibold mb-2'>
            Features
          </h3>
          <ul>
            <li>Google OAuth2 authentication</li>
            <li>List files from Google Drive</li>
            <li>Download and delete files</li>
            <li>Upload new documents</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
