import React, { useState, useEffect } from "react"
import styles from "../styles/viewpdf.module.css"
import NoInputNavbar from "../components/NoInputNavbar"
import Head from "next/head"
import { Worker, Viewer } from "@react-pdf-viewer/core"
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"
import { getFilePlugin } from "@react-pdf-viewer/get-file"
import { postReq } from "../Global/functions"
import Image from "next/image"
import DownloadIcon from "../public/assets/icons/download.svg"
import { motion, AnimatePresence } from "framer-motion"

import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
import axios from "axios"

function ViewPdf(props) {
  const getFilePluginInstance = getFilePlugin()
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  const [warningBox, setWarningBox] = useState(
    <motion.div
      className={styles.warnBox}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.warnMessage}>
        Please wait while pdf is loading. Reload page if not loaded.
      </div>
    </motion.div>
  )

  useEffect(() => {
    setTimeout(() => {
      setWarningBox()
    }, 2500)
  }, [])

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

      <NoInputNavbar />
      <AnimatePresence>{warningBox}</AnimatePresence>

      {/* 
      <iframe
        src={`https://docs.google.com/viewerng/viewer?url=${props.pdfUrl}&embedded=true`}
        width="100%"
        className={styles.pdfContainer}
        scrolling="yes"
        frameBorder="0"
      ></iframe> */}

      <div className={styles.pdfContainer}>
        <Worker
          workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js"
          style={{ width: "100%", height: "100%" }}
          canvasCss={{ width: 700 }}
        >
          <Viewer
            plugins={[
              // defaultInstance,
              getFilePluginInstance,
              // searchPluginInstance,
              defaultLayoutPluginInstance,
            ]}
            fileUrl={props.pdfUrl}
            defaultScale={0.9}
          />
        </Worker>
        <style>{`
      #rpv-core__popover-body-inner-search, #rpv-core__popover-body-inner-toolbar-more-actions{
        max-height: 100% !important;
      }
      `}</style>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const pdfName = context.query.name
  const type = context.query.type

  // let pdfLink =
  //   process.env.NEXT_PUBLIC_BACKEND_URL + `getPdfUrl?pdfName=${pdfName}`

  // if (type) {
  //   pdfLink += `&type=${type}`
  // }

  // let pdfUrl = await getUrl(pdfLink)

  let pdfUrl = process.env.NEXT_PUBLIC_BACKEND_URL + `getPdf?pdfName=${pdfName}`
  if (type) {
    pdfUrl += `&type=${type}`
  }

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

  function getUrl(link) {
    return new Promise((resolve, reject) => {
      axios
        .get(link)
        .then((response) => {
          if (response.data.error) {
            resolve()
          } else {
            resolve(response.data)
          }
        })
        .catch(() => {
          resolve()
        })
    })
  }
}

export default ViewPdf
