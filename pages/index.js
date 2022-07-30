import React, { useState } from "react"
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
          <div className="divMargin">
            <style jsx>{`
              .divMargin {
                margin: auto;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 15px;
              }
            `}</style>
            <a
              href="https://go.fiverr.com/visit/?bta=488083&nci=16949"
              Target="_Top"
            >
              <img
                border="0"
                src="https://fiverr.ck-cdn.com/tn/serve/?cid=19327845"
                width="450"
                height="60"
              />
            </a>
          </div>

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
          <div className="divMargin">
            <style jsx>{`
              .divMargin {
                margin: auto;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 15px;
                margin-bottom: 15px;
              }
            `}</style>
            <a
              href="https://go.fiverr.com/visit/?bta=488083&nci=9985"
              rel="sponsored"
              Target="_Top"
            >
              <img
                border="0"
                src="https://fiverr.ck-cdn.com/tn/serve/?cid=19327868"
                width="350"
                height="250"
              />
            </a>
          </div>
          <div className={styles.howToUseBox}>
            <h2>Papurs.com is now our new domain!</h2>
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
              For example: A person uses a trolley to move suitcases at an
              airport will more unique than what is a mole. Therefore bringing
              more accurate results.
            </div>
            <h2>New Update</h2>
            <div>
              Past papers navigator: You can now surf past papers. Click on Past
              papers to try!
            </div>
            <div>
              Papurs results are now extremely precise. You can now search fewer
              words and get the same accurate results. Maths searches have also
              been improved. We also added the filter feature, you can now press
              the funnel icon to filter you search results. O Level papers are
              now availabe.
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
