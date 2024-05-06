import React, { useState, useEffect } from "react"
import styles from "../styles/components/noinputnavbar.module.css"
import Link from "next/link"
import { motion } from "framer-motion"
import HomeIcon from "../public/assets/tab/home.svg"
import NewsIcon from "../public/assets/tab/news.svg"
import PapersIcon from "../public/assets/tab/papers.svg"
import ExplorerIcon from "../public/assets/tab/explorer.svg"
import Image from "next/image"

function NoInputNavbar(props) {
  useEffect(() => {
    setStyle("flex")
  }, [])

  const [style, setStyle] = useState("none")
  const [navbarRight, setNavbarRight] = useState("100%")

  function menuClicked() {
    if (navbarRight == "40%") {
      setNavbarRight("100%")
    } else {
      setNavbarRight("40%")
    }
  }

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <a className={styles.title}>Papurs</a>
      </Link>

      <motion.ul
        style={{ display: style }}
        animate={{
          right: navbarRight,
        }}
        transition={{ duration: 0.5 }}
        className={styles.navbarUl}
      >
        <li>
          <Link href="/">
            <a className={styles.tabLink}>
              <div className={styles.tabIcons}>
                <Image
                  priority={true}
                  quality={100}
                  src={HomeIcon}
                  alt={"Home"}
                  width={35}
                  height={35}
                />
              </div>
              <div>Home</div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/News">
            <a className={styles.tabLink}>
              <div className={styles.tabIcons}>
                <Image
                  priority={true}
                  quality={100}
                  src={NewsIcon}
                  alt={"News"}
                  width={35}
                  height={35}
                />
              </div>

              <div>News</div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/PastPapers">
            <a className={styles.tabLink}>
              <div className={styles.tabIcons}>
                <Image
                  priority={true}
                  quality={100}
                  src={PapersIcon}
                  alt={"Past Papers"}
                  width={35}
                  height={35}
                />
              </div>
              <div>Past papers</div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/PastPapersCreator">
            <a>Creator</a>
          </Link>
        </li>
        {/* <li>
          <Link href="/ImageSearch">
            <a className={styles.tabLink}>Image Search</a>
          </Link>
        </li> */}
        <li>
          <Link href="/Help">
            <a>Help</a>
          </Link>
        </li>

        <li>
          <Link href="/About">
            <a>About</a>
          </Link>
        </li>

        <li>
          <Link href="/Contact">
            <a>Contact</a>
          </Link>
        </li>
      </motion.ul>
      <div className={styles.burger} onClick={menuClicked}>
        {/* <Image
          priority={true}
          quality={100}
          src={ListIcon}
          alt={"Menu button"}
          width={41}
          height={41}
        /> */}
        <motion.div
          className={styles.burgerLines}
          style={{ originX: 0.1 }}
          animate={{ rotate: navbarRight == "100%" ? 0 : 45 }}
        ></motion.div>
        <motion.div
          className={styles.burgerLines}
          style={{ originX: 0.5 }}
          animate={{
            opacity: navbarRight == "100%" ? 1 : 0,
            translateX: navbarRight == "100%" ? 0 : 100,
          }}
        ></motion.div>
        <motion.div
          className={styles.burgerLines}
          style={{ originX: 0.1 }}
          animate={{ rotate: navbarRight == "100%" ? 0 : -45 }}
        ></motion.div>
      </div>
    </nav>
  )
}

export default NoInputNavbar
