import React, { useState } from "react"
import styles from "../styles/components/navbar.module.css"
import Image from "next/image"
import Link from "next/link"
import SearchIcon from "../public/assets/icons/search.svg"
import { postReq, makeId } from "../Global/functions"
import { motion, AnimatePresence } from "framer-motion"

let searchValue = ""
let previousVal = ""

function Navbar(props) {
  const [navbarTop, setNavbarTop] = useState("100%")
  const [inputFocused, setInputFocused] = useState(false)
  const [autocompleteList, setAutocompleteList] = useState([])
  const [fetching, setFetching] = useState(false)

  function menuClicked() {
    if (navbarTop == 0) {
      setNavbarTop("100%")
    } else {
      setNavbarTop(0)
    }
  }

  function go(value) {
    if (!searchValue) {
      return
    }

    let url = `/Search?q=${encodeURIComponent(value ? value : searchValue)}`
    window.location.href = url
  }

  async function handleTextChange(value, ignoreFetch) {
    if (!value) {
      setAutocompleteList([])
      return
    }

    if (!ignoreFetch && fetching) {
      return
    }

    setFetching(true)

    previousVal = value

    const autocomplete = await postReq(
      process.env.NEXT_PUBLIC_BACKEND_URL + "search/autocomplete",
      { q: value }
    )
    if (autocomplete.error) {
      return
    }

    setAutocompleteList(autocomplete)

    if (previousVal != searchValue) {
      await handleTextChange(searchValue, true)
    }

    setFetching(false)
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.leftSide}>
          <Link href="/">
            <a className={styles.title}>Papurs</a>
          </Link>

          <div className={styles.searchBoxAndFilterContainer}>
            <input
              type="search"
              className={styles.searchBox}
              onFocus={() => {
                setInputFocused(true)
              }}
              onBlur={() => {
                setInputFocused(false)
              }}
              onChange={(e) => {
                searchValue = e.target.value
                handleTextChange(e.target.value)
              }}
              defaultValue={props.q}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  go()
                }
              }}
            />

            <AnimatePresence>
              {fetching && (
                <motion.div
                  className={styles.loaderContainer}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className={styles["lds-ring"]}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <Image
              src={SearchIcon}
              className={styles.funnelIcon + " " + styles.searchButton}
              width={30}
              alt="search"
              onClick={() => {
                go()
              }}
            />
            <AnimatePresence>
              {autocompleteList.length > 0 && inputFocused && (
                <motion.div
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  onHoverStart={() => {
                    setInputFocused(true)
                  }}
                  className={styles.autocompleteContainer}
                >
                  {autocompleteList.map((text) => {
                    return (
                      <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        key={makeId(5)}
                        className={styles.autocompleteLi}
                        style={{ backgroundColor: "rgb(255, 255, 255)" }}
                        whileTap={{ backgroundColor: "rgb(245, 245, 245)" }}
                        whileHover={{ backgroundColor: "rgb(245, 245, 245)" }}
                        onClick={() => {
                          go(text)
                        }}
                      >
                        {text}
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <motion.div
          className={styles.rightSide}
          animate={{
            top: navbarTop,
          }}
          transition={{ duration: 0.25 }}
        >
          <ul>
            <li className={styles.closeNavButton} onClick={menuClicked}>
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
              <Link href="/ImageSearch">
                <a className={styles.tabLink}>Image Search</a>
              </Link>
            </li>
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
          </ul>
        </motion.div>
        <div className={styles.burgerContainer} onClick={menuClicked}>
          {/* <Image
            priority={true}
            quality={100}
            src={ListIcon}
            alt={"Menu button"}
            width={41}
            height={41}
          /> */}
          <div className={styles.burgerLines}></div>
          <div className={styles.burgerLines}></div>
          <div className={styles.burgerLines}></div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
