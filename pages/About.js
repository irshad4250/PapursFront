import React from "react"
import NoInputNavbar from "../components/NoInputNavbar"
import styles from "../styles/about.module.css"
import Head from "next/head"

function About(props) {
  return (
    <div>
      <Head>
        <title>Papurs | About</title>
      </Head>
      <NoInputNavbar />
      <div className="main">
        <h1 className={styles.title}>About Us</h1>
      </div>
      <p className={styles.paragraph}>
        Papurs is a website that searches past exam papers, mainly cambridge
        examinations. You simply enter a question and we will show you relevant
        papers that matches the search.
      </p>
      <p className={styles.paragraph}>
        This website was designed to help students learn more about their
        subjects. The search results will bring the question papers and mark
        schemes in order to help them know the answers.
      </p>
      <p className={styles.paragraph}>
        Papurs was first created in 2022, we plan on adding more papers to
        search and some new features. If you got any questions or want us to add
        a feature you want in the website. Feel free to use the contact button.
      </p>

      <p className={styles.paragraph}>Papurs is located in Mauritius.</p>
    </div>
  )
}

export default About
