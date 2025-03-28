const Navbar = () => {
  return (
    <nav className='bg-yellow-600'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-start md:items-stretch md:justify-start'>
            <span className='text-white text-2xl font-bold ml-2'>DriveApp</span>
          </div>

          <div className='block ml-6'>
            <div className='flex items-center'>
              <button className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'>
                <i className='fa-brands fa-google text-white mr-2'></i>
                <span>Login / Register</span>
              </button>
            </div>
          </div>

          <div className='absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0'>
            <div className='relative ml-3'>
              <img
                className='h-8 w-8 rounded-full'
                src='/images/profile.png'
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
