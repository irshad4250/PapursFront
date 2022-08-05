import React, { useState, useEffect } from "react"
import styles from "../styles/components/navbar.module.css"
import Image from "next/image"
import Link from "next/link"
import FunnelIcon from "../public/assets/icons/funnel.svg"
import SearchIcon from "../public/assets/icons/search.svg"
import { postReq, makeId } from "../Global/functions"
import FilterBox from "../components/FilterBox"
import { motion, AnimatePresence } from "framer-motion"
import ListIcon from "../public/assets/icons/list.png"

function Navbar(props) {
  const [navbarTop, setNavbarTop] = useState("100%")
  const [showFilter, setShowFilter] = useState(false)
  const [filterObj, setFilterObj] = useState({
    year: "Any",
    subject: "Any",
    level: "Any",
  })
  const [searchValue, setSearchValue] = useState(props.q)

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

    const yearGot = filterObj.year
    const subjectGot = filterObj.subject
    const levelGot = filterObj.level

    let url = `/Search?q=${encodeURIComponent(value ? value : searchValue)}`

    if (levelGot && levelGot != "Any") {
      url += `&exam=${levelGot}`
    }
    if (subjectGot && subjectGot != "Any") {
      url += `&subject=${subjectGot}`
    }
    if (yearGot && yearGot != "Any") {
      url += `&year=${yearGot}`
    }
    window.location.href = url
  }

  function handleUpdate(subject, year, level) {
    setFilterObj({ year: year, subject: subject, level: level })
    setShowFilter(false)
  }

  async function handleTextChange(value) {
    if (!value) {
      setAutocompleteList([])
      return
    }

    if (fetching) {
      return
    }

    setFetching(true)
    const autocomplete = await postReq("/api/autocomplete", { q: value })
    setFetching(false)

    if (autocomplete.error) {
      return
    }

    setAutocompleteList(autocomplete)
  }

  return (
    <>
      <FilterBox
        handleUpdate={handleUpdate}
        onClose={() => {
          setShowFilter(false)
        }}
        show={showFilter}
      />
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
                setSearchValue(e.target.value)
                handleTextChange(e.target.value)
              }}
              value={searchValue}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  go()
                }
              }}
            />
            <Image
              src={FunnelIcon}
              width={30}
              className={styles.funnelIcon}
              alt="filter"
              onClick={() => {
                setShowFilter(true)
              }}
            />

            <Image
              src={SearchIcon}
              className={styles.funnelIcon + " " + styles.searchButton}
              width={30}
              alt="search"
              onClick={go}
            />
            <AnimatePresence>
              {autocompleteList.length > 0 && inputFocused && (
                <motion.div
                  exit={{ opacity: 0, height: 0 }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: autocompleteList.length * 40 }}
                  transition={{ duration: 0.3 }}
                  onHoverStart={() => {
                    setInputFocused(true)
                  }}
                  className={styles.autocompleteContainer}
                >
                  {autocompleteList.map((text) => {
                    return (
                      <motion.div
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
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
          transition={{ bounce: 1, duration: 0.7 }}
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
          </ul>
        </motion.div>
        <div className={styles.burgerContainer} onClick={menuClicked}>
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
    </>
  )
}

export default Navbar
