import Link from 'next/link';

const Header = () => {
  return (
    <header className='py-5'>
      <div className="container mx-auto px-6">
        <div className="hdr-row flex items-start flex-col sm:flex-row sm:items-end gap-3 justify-between font-medium text-sm leading-tight">

          <div className=''>
              <Link 
                href="/"
                className="flex flex-col gap-1"
              >
                <div>Almaz Bissenbayev</div>
                <div className='opacity-50'> Web Developer</div>
              </Link>           
          </div>

          <nav className="flex gap-4">
            <Link href="/posts/">
              Posts
            </Link>
            <Link href="#">Resume</Link>
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Header;
