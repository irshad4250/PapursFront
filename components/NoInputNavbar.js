import React, { useState, useEffect } from "react"
import styles from "../styles/components/noinputnavbar.module.css"
import Link from "next/link"
import { motion } from "framer-motion"
import ListIcon from "../public/assets/icons/list.png"
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
        <li className={styles.close} onClick={menuClicked}>
          Close
        </li>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/News">
            <a>News</a>
          </Link>
        </li>
        <li>
          <Link href="/PastPapers">
            <a>Past papers</a>
          </Link>
        </li>
        <li>
          <Link href="/PapersExplorer">
            <a>Papers explorer</a>
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
        <Image
          priority={true}
          quality={100}
          src={ListIcon}
          alt={"Menu button"}
          width={41}
          height={41}
        />
      </div>
    </nav>
  )
}

export default NoInputNavbar
