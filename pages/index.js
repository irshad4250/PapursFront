import React, { useState, useEffect } from "react"
import Head from "next/head"
import styles from "../styles/home.module.css"
import funnelIcon from "../public/assets/icons/funnel.svg"
import Image from "next/image"
import NoInputNavbar from "../components/NoInputNavbar"
import FilterBox from "../components/FilterBox"
import { postReq, makeId } from "../Global/functions"
import Block from "../components/Ads/Block"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import InstaIcon from "../public/assets/icons/instagram.png"

let searchValue = ""
let previousVal = ""

export default function Home() {
  const [showFilter, setShowFilter] = useState(false)
  const [filterObj, setFilterObj] = useState({
    year: "Any",
    subject: "Any",
    level: "Any",
  })

  const [inputFocused, setInputFocused] = useState(false)
  const [autocompleteList, setAutocompleteList] = useState([])

  const [fetching, setFetching] = useState(false)

  function handleUpdate(subject, year, level) {
    setFilterObj({ year: year, subject: subject, level: level })
    setShowFilter(false)
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
    <div>
      <NoInputNavbar />
      <FilterBox
        handleUpdate={handleUpdate}
        onClose={() => {
          setShowFilter(false)
        }}
        show={showFilter}
      />
      <Head>
        <meta charset="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Search cambridge A level and O level examination questions and find out which year they belong to. View the question papers and mark schemes. You can also view past papers."
        />
        <meta
          name="keywords"
          content="O-Level, A-Level, CIE, Past Papers,Search, Search Past Papers, Cambridge"
        />

        <title>Papurs</title>
      </Head>
      <div className="main">
        <div className={styles.inputContainer}>
          <h1 className={styles.papursTitle}>Papurs</h1>
          <div className={styles.searchBoxAndFilterContainer}>
            <input
              type="search"
              className={styles.searchBox}
              placeholder="Type question"
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

            <div className={styles.filterIconContainer}>
              <Image
                src={funnelIcon}
                width={25}
                height={100}
                alt="filter button"
                className={styles.funnelIcon}
                onClick={() => {
                  setShowFilter(true)
                }}
              />
            </div>
          </div>

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

          <div
            className={styles.searchButton}
            onClick={() => {
              go()
            }}
          >
            Search
          </div>
          <div className={styles.homeHrefBox}>
            <Link href="/PastPapers">
              <a className={styles.aboutHref}>
                <div>A/O Level Past Papers</div>
              </a>
            </Link>
            <Link href="/About">
              <a className={styles.aboutHref}>
                <div>What is Papurs.com?</div>
              </a>
            </Link>
          </div>
          <div className={styles.homeHrefBox}>
            <Link href="/Help">
              <a className={styles.aboutHref}>
                <div>How to download papers</div>
              </a>
            </Link>
            <Link href="https://www.instagram.com/pap.urs/">
              <a className={styles.instaLogo}>
                <Image
                  priority={true}
                  quality={100}
                  src={InstaIcon}
                  alt={"Instagram link"}
                  width={35}
                  height={35}
                />
              </a>
            </Link>
          </div>

          <Block />
          <div className={styles.howToUseBox}>
            <h2>New feature: Instant Answer</h2>
            <div>
              Introducing our new feature called Instant answer, It brings the
              question and the answer of your search on the search page. You
              won't have to open the pdf. Still in testing mode Available in
              paper 2 for physics, biology, economics, chemistry for both a
              level and o level.
            </div>
            <h2>New Update</h2>
            <div>Added the new Quick Switch feature</div>
            <div>Added a loading indicator to the pdf viewer</div>
            <h2>Papers available</h2>
            <div>
              A Level: Computer Science (9608), General Paper (AS Level only)
              (8004), Design and Technology (9705), Mathematics (9709), Physics
              (9702), English General Paper (AS Level only) (8021), Computer
              Science (9618), Accounting (9706), Economics (9708), French
              Language (AS Level only) (8682), Biology (9700).
              <br />
              <br />O Level: Chemistry (5070), Computer Science (2210), Design
              and Technology (6043), Additional Mathematics (4037), Physics
              (5054), Mathematics D (4024), English (1123), Accounting (7707),
              Economics (2281), Biology (5090).
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const papursId = context.req.cookies.papursId
  const source = context.query.src

  registerLog(papursId, source)

  function registerLog(cookieId, source) {
    postReq(process.env.NEXT_PUBLIC_BACKEND_URL + "registerLog", {
      cookieId: cookieId,
      source: source,
    }).then((e) => {})
  }
  return { props: {} }
}
