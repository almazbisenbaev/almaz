import Link from 'next/link';

const Header = () => {
  return (
    <header className='hdr uppe'>
      <div className="container mx-auto p-6">
        <div className="hdr-row flex flex-col sm:flex-row gap-3 justify-between leading-tight font-semibold">

          <div className='flex gap-1'>
            <Link 
              href="/"
              className="hdr-link font-semibold"
            >
              Almaz Bissenbayev,
            </Link>
            <span className='opacity-50'> Web Developer</span>
          </div>

          <nav className="flex gap-4">
            <Link 
              href="/posts/"
              className="hdr-link font-semibold"
            >
              Posts
            </Link>
            <Link 
              href="#"
              className="hdr-link font-semibold"
            >
              Resume
            </Link>
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Header;
