import Image from "next/image";
import styles from "./page.module.css";

import IconWp from '@/assets/images/icon-wp.svg'; 
import IconReact from '@/assets/images/icon-react.svg'; 
import IconNext from '@/assets/images/icon-next.svg'; 
import IconNode from '@/assets/images/icon-node.svg'; 
import IconFigma from '@/assets/images/icon-figma.svg'; 

import EmblaCarousel from './components/SideProjectsCarousel';
import LinkCard from './components/LinkCard';

export default function Home() {

  const OPTIONS = {}
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <div className={styles.page}>

      <div className="intro-wrapper">
        <div className="container">
          <div className="intro">
            <div className="intro-text">
              <span>Hi, I’m Almaz,</span>
              {/* The picture must animate somehow as you scroll, or maybe just fade out */}
              <Image
                className="intro-pic"
                src="/me.jpg"
                width={150}
                height={150}
                alt=""
              />
              <span> a&nbsp;Full-Stack Web Developer</span>
            </div>

            <div className="intro-logos">
              <IconWp />
              <IconReact />
              <IconNext />
              <IconNode />
              <IconFigma />
            </div>

          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">

          <div className="section-header">
            <h2 className="section-header-title">Recent works</h2>
          </div>

          <div className="grid grid-2x">

            <div className="grid-item">
              <LinkCard 
                title="silverskincoffee.ie"
                url="//silverskincoffee.ie"
                year="2024"
                description="E-Commerce website that sells coffee beans. WordPress, Woocommerce."
                category="Development"
              />
            </div>

            <div className="grid-item">
              <LinkCard 
                title="autosl.de"
                url="//autosl.de"
                year="2024"
                description="A company that sells expensive cars. Wordpress, a custom plugin for API intergration."
                category="UX Design, Development"
                client="Mindlind"
                clientUrl="//mindlind.de"
              />
            </div>

            <div className="grid-item">
              <LinkCard 
                title="muafaktur.de"
                url="//muafaktur.de"
                year="2023"
                description="Short description of the project"
                category="UX Design, Development"
                client="Mindlind"
                clientUrl="//mindlind.de"
              />
            </div>

            {/* <div className="grid-item">
              <LinkCard 
                title="medienfaktur.com"
                url="//medienfaktur.com"
                year="2023"
                description="Short description of the project"
                category="UX Design, Development"
                client="Mindlind"
                clientUrl="//mindlind.de"
              />
            </div> */}

            <div className="grid-item">
              <LinkCard 
                title="monitask.com"
                url="//monitask.com"
                year="2021"
                description="Short description of the project"
                category="Development"
                client="Mindlind"
                clientUrl="//mindlind.de"
              />
            </div>
            
          </div>

        </div>
      </div>



      <div className="section">
        <div className="container">

          <div className="section-header">
            <h2 className="section-header-title">Client reviews</h2>
          </div>

        </div>
      </div>



      <div className="section">
        <div className="container">

          <div className="section-header">
            <h2 className="section-header-title">Personal projects</h2>
          </div>

          <div>
              <div>
                <a target="_blank" href="https://mindmaker.vercel.app">Mindmaker</a>
                <div>NextJS, Supabase</div>
              </div>
              <div>
                <a target="_blank" href="https://planets-and-stars.vercel.app">Planets and Stars</a>
                <div>ReactJS</div>
              </div>
              <div>
                <a target="_blank" href="https://almazbisenbaev.gumroad.com/l/glowy-icons">Glowy Icons</a>
                <div>Figma</div>
              </div>
              <div>
                <a target="_blank" href="https://github.com/almazbisenbaev/wp-powertools">WP Power Tools</a>
                <div>WordPress, PHP</div>
              </div>
              <div>
                <a target="_blank" href="https://kartuli-abc.vercel.app">Kartuli ABC</a>
                <div>ReactJS</div>
              </div>
          </div>

        </div>
      </div>


      <div className="container">
        <a href="#">YouTube</a>
        <a href="#">Behance</a>
      </div>

      <div className="container">
        Telegram: <a href="//t.me/almazbisenbaev">@almazbisenbaev</a>
      </div>


      <EmblaCarousel slides={SLIDES} options={OPTIONS} />


      {/* <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.js</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
