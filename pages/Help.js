import React from "react"
import styles from "../styles/about.module.css"
import Head from "next/head"
import NoInputNavbar from "../components/NoInputNavbar"

function Help(props) {
  return (
    <div>
      <Head>
        <title>Papurs | Help</title>
      </Head>
      <NoInputNavbar />
      <div className="main">
        <h1 className={styles.title}>Help</h1>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subtitle}>How to use</h2>
        <div className={styles.paragraph}>
          1. Enter question. For example: what is a mole.
        </div>
        <div className={styles.paragraph}>2. Press search.</div>
        <div className={styles.paragraph}>
          3. We will give you a list of papers which have the question.
        </div>
        <div className={styles.paragraph}>
          Tip: To get more accurate results. Type questions which seem to be
          unique from other papers.
        </div>
        <div className={styles.paragraph}>
          For example, the diagram shows a cannon ball fired from a cannon, will
          be more likely to bring the right paper than what is a mole.
        </div>
        <div className={styles.paragraph}>
          Or if you want to surf papers. You can search what is a mole and your
          search results will have a part of the paper based on you search which
          you can read to find the paper you want.
        </div>
        <div className={styles.paragraph}>
          You can also filter your results to bring more relevant results. Lets
          say your search is 'a particle', the results may bring you
          physics,chemistry and even biology papers. But you can filter the
          search to only show chemistry papers and even the year you want.
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subtitle}>How to download papers</h2>
        <div className={styles.paragraph}>
          You can download papers by clicking the purple download button which
          is on the left side when viewing the pdf
        </div>
        <div className={styles.paragraph}>
          You can also download paper by clicking the grey download icon at the
          top right side of the pdf viewer toolbar. For mobile users you need to
          press on the 3 dots to view the download button.
        </div>
        <div className={styles.paragraph}>
          For ios users, you need to press and hold on the purple button and
          press on download linked file.
        </div>
        <div className={styles.paragraph}>
          OR press on the download button you will be redirected to view the raw
          pdf. Then:
        </div>
        <div className={styles.paragraph}>
          1. Touch the Share icon at the bottom of the screen.
        </div>
        <div className={styles.paragraph}>2. Select the Options link.</div>
        <div className={styles.paragraph}>
          3. Choose the PDF option, then tap Done.
        </div>
        <div className={styles.paragraph}>4. Tap the Save to Files option.</div>
        <div className={styles.paragraph}>
          5. Select the desired location, then tap Save.
        </div>
      </div>
    </div>
  )
}

export default Help
