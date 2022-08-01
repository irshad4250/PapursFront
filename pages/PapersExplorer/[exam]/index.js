import React from "react"
import ExplorerBar from "../../../components/ExplorerBar"
import styles from "../../../styles/papersexplorer.module.css"
import NoInputNavbar from "../../../components/NoInputNavbar"
import { postReq } from "../../../Global/functions"
import Head from "next/head"

function index({ subjects, level }) {
  return (
    <div className="main">
      <Head>
        <title>{level + " Level"}</title>
        <meta
          name="description"
          content={`Explorer cambridge ${level} level past papers, view mark schemes and question paper`}
        />
        <meta
          name="keywords"
          content={`${level}-Level, CIE, Past Papers,Search, Search Past Papers, Cambridge, Exams, Examination,`}
        />
      </Head>
      <NoInputNavbar />
      <h1 style={{ marginTop: 10, marginBottom: 10 }}>{level + " Level"}</h1>
      <ul className={styles.explorerUl}>
        {subjects.length != 0 &&
          subjects.map((subject) => {
            return (
              <ExplorerBar
                key={subject}
                href={`/PapersExplorer/${level}/${subject}`}
                label={subject}
              />
            )
          })}
      </ul>
    </div>
  )
}

export default index

export async function getStaticProps(context) {
  let level = context.params.exam
  let subjects = await postReq(
    process.env.NEXT_PUBLIC_BACKEND_URL + "api/getSubjectsLevel",
    { level: level }
  )

  if (subjects.error) {
    subjects = { data: [] }
  }
  if (!level) {
    level = null
  }

  return {
    props: { subjects: subjects.data, level: level },
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { exam: "A" } }, { params: { exam: "O" } }],
    fallback: false,
  }
}
