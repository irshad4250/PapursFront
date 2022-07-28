import React, { useState, useEffect } from "react"
import styles from "../styles/viewpdf.module.css"
import Navbar from "../components/Navbar"
import Head from "next/head"
import axios from "axios"
function ViewPdf(props) {
  return (
    <div className="main">
      <style jsx global>{`
        html {
          overflow: hidden;
        }
        #__next {
          height: 100vh;
        }
      `}</style>

      <Head>
        <title>{props.pdfName}</title>
      </Head>

      <Navbar />
      <div className={styles.warnBox}>
        <div className={styles.warnMessage}>
          Reload page if paper is not loaded.
        </div>
      </div>

      <iframe
        src={`https://docs.google.com/viewerng/viewer?url=${props.pdfUrl}&embedded=true`}
        width="100%"
        className={styles.pdfContainer}
        scrolling="yes"
        frameBorder="0"
      ></iframe>
    </div>
  )
}

export async function getServerSideProps(context) {
  const pdfName = context.query.name
  const type = context.query.type

  const pdfUrl = await getPdfUrl()

  if (pdfUrl) {
    return {
      props: {
        pdfUrl,
        pdfName,
      },
    }
  } else {
    return {
      notFound: true,
    }
  }

  function getPdfUrl() {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.NEXT_PUBLIC_BACKEND_URL + "getPdfUrl", {
          pdfName,
          type,
        })
        .then((response) => {
          if (response.data.error) {
            resolve(null)
          } else {
            resolve(response.data)
          }
        })
        .catch(() => {
          resolve(null)
        })
    })
  }
}

export default ViewPdf
