import React from "react"
import ExplorerBar from "../../../components/ExplorerBar"
import styles from "../../../styles/papersexplorer.module.css"
import NoInputNavbar from "../../../components/NoInputNavbar"
import { postReq } from "../../../Global/functions"
import Head from "next/head"
import Plaque from "../../../components/Ads/Plaque"

function index({ subject, years, level }) {
  return (
    <div className="main">
      <Head>
        <meta
          name="description"
          content={`Explore cambridge ${level} level ${subject} past papers, view mark schemes and question paper`}
        />
        <meta
          name="keywords"
          content={`${level}-Level, ${subject}, CIE, Past Papers,Search, Search Past Papers, Cambridge, Exams, Examination,`}
        />
        <title>{subject}</title>
      </Head>
      <NoInputNavbar />
      <h1 style={{ marginTop: 10, marginBottom: 10 }}>{subject}</h1>
      <ul className={styles.explorerUl}>
        {years.length != 0 &&
          years.map((year) => {
            return (
              <ExplorerBar
                key={year}
                href={`/PastPapers/Papers?subject=${subject}&year=${year}`}
                label={year}
              />
            )
          })}
        {/* <Plaque /> */}
      </ul>
    </div>
  )
}

export default index

export async function getStaticProps(context) {
  let level = context.params.exam
  let subject = context.params.subject

  const years = await postReq(
    process.env.NEXT_PUBLIC_BACKEND_URL + "api/getYears",
    { level, subject }
  )

  if (!subject) {
    subject = null
  }
  if (!level) {
    level = null
  }

  return {
    props: {
      years: years.data,
      level,
      subject,
    },
  }
}

export async function getStaticPaths(context) {
  const aLevels = await postReq(
    process.env.NEXT_PUBLIC_BACKEND_URL + "api/getSubjectsLevel",
    { level: "A" }
  )
  const oLevels = await postReq(
    process.env.NEXT_PUBLIC_BACKEND_URL + "api/getSubjectsLevel",
    { level: "O" }
  )

  let path = []

  if (!aLevels.error && aLevels.level != 0) {
    aLevels.data.forEach((subject) => {
      path.push({
        params: {
          exam: "A",
          subject: subject,
        },
      })
    })
  }
  if (!oLevels.error && oLevels.level != 0) {
    oLevels.data.forEach((subject) => {
      path.push({
        params: {
          exam: "O",
          subject: subject,
        },
      })
    })
  }

  return {
    paths: path,
    fallback: false,
  }
}
