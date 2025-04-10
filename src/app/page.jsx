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

      <div className="container">

        <div className="section-header">
          <h2 className="section-header-title">Portfolio</h2>
        </div>

        <div className="cases-roll">

          <div className="case">
            <div className="case-title">
              <a href="//silverskincoffee.ie" target="_blank">silverskincoffee.ie</a>
            </div>
            <div className="case-details">
              <div>2024</div>
              <span>/</span>
              <div>Development</div>
            </div>
            <a href="//silverskincoffee.ie" className="case-link">View live</a>
          </div>

          <div className="case">
            <div className="case-title">
              <a href="//autosl.de" target="_blank">autosl.de</a>
            </div>
            <div className="case-details">
              <div>2024</div>
              <span>/</span>
              <div>UX Design, Development</div>
              <span v-if="project.client">/</span>
              <div v-if="project.client">For <a href="//mindlind.de" target="_blank">Mindlind</a></div>
            </div>
            <a href="//autosl.de" className="case-link">View live</a>
          </div>

          <div className="case">
            <div className="case-title">
              <a href="//muafaktur.de" target="_blank">muafaktur.de</a>
            </div>
            <div className="case-details">
              <div>2023</div>
              <span>/</span>
              <div>UX Design, Development</div>
              <span v-if="project.client">/</span>
              <div v-if="project.client">For <a href="//mindlind.de" target="_blank">Mindlind</a></div>
            </div>
            <a href="//muafaktur.de" className="case-link">View live</a>
          </div>

          <div className="case">
            <div className="case-title">
              <a href="//medienfaktur.com" target="_blank">medienfaktur.com</a>
            </div>
            <div className="case-details">
              <div>2023</div>
              <span>/</span>
              <div>UX Design, Development</div>
              <span v-if="project.client">/</span>
              <div v-if="project.client">For <a href="//mindlind.de" target="_blank">Mindlind</a></div>
            </div>
            <a href="//medienfaktur.com" className="case-link">View live</a>
          </div>

          <div className="case">
            <div className="case-title">
              <a href="//monitask.com" target="_blank">monitask.com</a>
            </div>
            <div className="case-details">
              <div>2024</div>
              <span>/</span>
              <div>Development</div>
            </div>
            <a href="//monitask.com" className="case-link">View live</a>
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
