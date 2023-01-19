import React from "react"
import NoInputNavbar from "../../components/NoInputNavbar"
import ExplorerBar from "../../components/ExplorerBar"
import styles from "../../styles/papersexplorer.module.css"
import Head from "next/head"
import Plaque from "../../components/Ads/Plaque"

function index(props) {
  return (
    <div className="main">
      <Head>
        <meta
          name="description"
          content="Explorer cambridge A level and O level past papers, view mark schemes and question papers. "
        />
        <meta
          name="keywords"
          content="O-Level, A-Level, CIE, Past Papers,Search, Search Past Papers, Cambridge"
        />
        <title>Papers Explorer</title>
      </Head>
      <NoInputNavbar />

      <h1
        style={{
          marginTop: 10,
          marginBottom: 10,
          textAlign: "center",
          padding: 10,
        }}
      >
        Examinations
      </h1>
      <ul className={styles.explorerUl}>
        <ExplorerBar href={"/PapersExplorer/A"} label="A Level" />
        <ExplorerBar href={"/PapersExplorer/O"} label="O Level" />
        {/* <Plaque /> */}
      </ul>
    </div>
  )
}

export default index
