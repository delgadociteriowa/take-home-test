import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-gray-300 py-4'>
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between px-4'>
        <div className='flex flex-wrap justify-center md:justify-start mb-4 md:mb-0'>
          <ul className='flex space-x-4'>
            <li>
              <Link href='/'>About</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className='text-sm text-gray-500 mt-2 md:mt-0'>DriveApp</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
