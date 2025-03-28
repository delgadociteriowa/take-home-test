const Navbar = () => {
  return (
    <nav className='bg-yellow-600'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <a className='flex flex-shrink-0 items-center' href='/index.html'>
              <span className='text-white text-2xl font-bold ml-2'>
                Test Google Drive
              </span>
            </a>
          </div>

          {/* <!-- Right Side Menu (Logged Out) --> */}
          <div className='hidden md:block md:ml-6'>
            <div className='flex items-center'>
              <button className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'>
                <i className='fa-brands fa-google text-white mr-2'></i>
                <span>Login or Register</span>
              </button>
            </div>
          </div>

          {/* <!-- Right Side Menu (Logged In) --> */}
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0'>
            {/* <!-- Profile dropdown button --> */}
            <div className='relative ml-3'>
              <div>
                <button
                  type='button'
                  className='relative flex rounded-full bg-yellow-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                  id='user-menu-button'
                  aria-expanded='false'
                  aria-haspopup='true'
                >
                  <span className='absolute -inset-1.5'></span>
                  <span className='sr-only'>Open user menu</span>
                  <img
                    className='h-8 w-8 rounded-full'
                    src='/images/profile.png'
                    alt=''
                  />
                </button>
              </div>

              {/* <!-- Profile dropdown --> */}
              <div
                id='user-menu'
                className='hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='user-menu-button'
                tabIndex='-1'
              >
                <a
                  href='/profile.html'
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  tabindex='-1'
                  id='user-menu-item-0'
                >
                  Your Profile
                </a>
                <a
                  href='/saved-properties.html'
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  tabindex='-1'
                  id='user-menu-item-2'
                >
                  Saved Properties
                </a>
                <button
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  tabindex='-1'
                  id='user-menu-item-2'
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className='hidden' id='mobile-menu'>
        <div className='space-y-1 px-2 pb-3 pt-2'>
          <a
            href='/index.html'
            className='bg-black text-white block rounded-md px-3 py-2 text-base font-medium'
          >
            Home
          </a>
          <a
            href='/properties.html'
            className='text-white block rounded-md px-3 py-2 text-base font-medium'
          >
            Properties
          </a>
          <a
            href='/add-property.html'
            className='text-white block rounded-md px-3 py-2 text-base font-medium'
          >
            Add Property
          </a>
          <button className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-5'>
            <i className='fa-brands fa-google mr-2'></i>
            <span>Login or Register</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
