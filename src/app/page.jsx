import Image from "next/image";
import styles from "./page.module.css";

import IconWp from '@/assets/images/icon-wp.svg'; 
import IconReact from '@/assets/images/icon-react.svg'; 
import IconNext from '@/assets/images/icon-next.svg'; 
import IconNode from '@/assets/images/icon-node.svg'; 
import IconFigma from '@/assets/images/icon-figma.svg'; 

export default function Home() {
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
