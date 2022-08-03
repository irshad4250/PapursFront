import React, { useState, useEffect } from "react"
import Head from "next/head"
import styles from "../styles/home.module.css"
import funnelIcon from "../public/assets/icons/funnel.svg"
import Image from "next/image"
import NoInputNavbar from "../components/NoInputNavbar"
import FilterBox from "../components/FilterBox"
import { postReq } from "../Global/functions"

export default function Home() {
  const [showFilter, setShowFilter] = useState(false)
  const [filterObj, setFilterObj] = useState({
    year: "Any",
    subject: "Any",
    level: "Any",
  })

  const [searchValue, setSearchValue] = useState("")

  function handleUpdate(subject, year, level) {
    setFilterObj({ year: year, subject: subject, level: level })
    setShowFilter(false)
  }

  function go() {
    if (!searchValue) {
      return
    }

    const yearGot = filterObj.year
    const subjectGot = filterObj.subject
    const levelGot = filterObj.level

    let url = `/Search?q=${encodeURIComponent(searchValue)}`

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
          content="Search examination questions and find out which year they belong to. View the question papers and mark schemes."
        />
        <meta
          name="keywords"
          content="O-Level, A-Level, CIE, Past Papers,Search, Search Past Papers, Cambridge"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
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
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
              value={searchValue}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  go()
                }
              }}
            />
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

          <div className={styles.searchButton} onClick={go}>
            Search
          </div>

          <div className={styles.howToUseBox}>
            <h2>Coming soon, Autocomplete</h2>
            <h2>How to use</h2>
            <div>1. Enter question. For example: what is a mole.</div>
            <div>2. Press search.</div>
            <div>
              3. We will give you a list of papers which have the question.
            </div>
            <div>
              Tip: To get more accurate results. Type questions which seem to be
              unique from other papers.
            </div>
            <div>
              For example, the diagram shows a cannon ball fired from a cannon,
              will be more likely to bring the right paper than what is a mole.
            </div>
            <div>
              Or if you want to surf papers. You can search what is a mole and
              your search results will have a part of the paper based on you
              search which you can read to find the paper you want.
            </div>
            <div>
              You can also filter your results to bring more relevant results.
              Lets say your search is a particle, the results may bring you
              physics,chemistry and even biology papers. But you can filter the
              search to only show chemistry papers and even the year you want.
            </div>
            <h2>New Update</h2>
            {/* <div>
              Our pdf viewer is now better and more powerful and pdfs load
              better. You can even search the pdf and download it.
            </div> */}
            <div>
              Past papers explorer: You can now explore past papers available on
              our webistes. Click on papers explorer to try!
            </div>
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
