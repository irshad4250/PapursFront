import React, { useState, useEffect } from "react"
import styles from "../styles/viewpdf.module.css"
import NoInputNavbar from "../components/NoInputNavbar"
import Head from "next/head"
import { Worker, Viewer } from "@react-pdf-viewer/core"
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"

import { getReq } from "../Global/functions"
import Image from "next/image"
import DownloadIcon from "../public/assets/icons/download.svg"
import { motion, AnimatePresence } from "framer-motion"

import { Circle } from "rc-progress"

import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"

import Switch from "react-switch"
import PaperClipSvg from "../public/assets/icons/bx-paperclip.svg"
import PenSvg from "../public/assets/icons/bxs-pen.svg"

import axios from "axios"
// import PapursViewer from "../components/PapursViewer"

function PenIcon() {
  return (
    <div className={styles.iconBox}>
      <Image src={PenSvg} width={25} priority={true} />
    </div>
  )
}

function PaperClipIcon() {
  return (
    <div className={styles.iconBox}>
      <Image src={PaperClipSvg} width={25} priority={true} />
    </div>
  )
}

function ViewPdf(props) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [],
  })

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

  const [pdfLocalUrl, setPdfLocalUrl] = useState({ qp: null, ms: null })
  const [pdfDataUrl, setPdfDataUrl] = useState({ qp: null, ms: null })

  const [pdfDownloaded, setPdfDownloaded] = useState(false)
  const [progress, setProgress] = useState(0)

  const [active, setActive] = useState(props.type)
  const [switchChecked, setSwitchChecked] = useState(
    props.type == "qp" ? false : true
  )

  const [initialPages, setInitialPages] = useState({ qp: 0, ms: 0 })

  useEffect(() => {
    setTimeout(() => {
      setWarningBox()
    }, 1500)

    getQpAndMs().then((urlObj) => {
      setPdfLocalUrl(urlObj)
      setPdfDownloaded(true)
    })
  }, [])

  useEffect(() => {
    if (switchChecked) {
      setActive("ms")
    } else {
      setActive("qp")
    }
  }, [switchChecked])

  function getQpAndMs() {
    return new Promise(async (resolve, reject) => {
      let qp = await getPdfAndStore(props.pdfQpUrl)
      let ms = await getPdfAndStore(props.pdfMsUrl)

      resolve({ qp, ms })
    })
  }

  function getPdfAndStore(pdfLink) {
    return new Promise(async (resolve, reject) => {
      const response = await getReq(pdfLink, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          let progressPercentage =
            (progressEvent.loaded / progressEvent.total) * 100
          progressPercentage = progressPercentage / 2

          setProgress((pr) => {
            if (pr < 50) {
              return progressPercentage
            } else {
              return progressPercentage + 50
            }
          })
        },
      })

      if (response.error) {
        resolve()
        alert("Could not download some papers try reloading page.")
        return
      }

      const url = URL.createObjectURL(
        new Blob([response], { type: "application/pdf" })
      )

      resolve(url)
    })
  }

  const switchChanged = (e) => setSwitchChecked(e)

  const downloadClicked = async () => {
    let fileName =
      active == "ms" ? props.pdfName.replace("qp", "ms") : props.pdfName
    const blob = await fetch(pdfLocalUrl[active]).then((res) => res.blob())
    saveByteArray(fileName, blob)
  }

  const getDataUrlFromLocal = (url) => {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { responseType: "arraybuffer" })
        .then((response) => {
          const base64 = Buffer.from(response.data, "base64").toString("base64")
          resolve(base64)
        })
        .catch(() => {
          alert("Could not download pdf")
          resolve()
        })
    })
  }

  function saveByteArray(reportName, byte) {
    var blob = new Blob([byte], { type: "application/pdf" })
    var link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    var fileName = reportName
    link.download = fileName
    link.click()
  }

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
        <meta name="theme-color" content="#FFFFFF" />
      </Head>

      <NoInputNavbar />
      <AnimatePresence>{warningBox}</AnimatePresence>

      {!pdfDownloaded && (
        <div className={styles.progressBarContainer}>
          <Circle
            percent={progress}
            style={{ width: 150, height: 150 }}
            strokeWidth={8}
            gapDegree={72}
            strokeColor={"#6d28d9"}
          />
          <div className={styles.percentIndicator}>
            {Math.round(progress) + "%"}
          </div>
        </div>
      )}

      {/* 
      <iframe
        src={`https://docs.google.com/viewerng/viewer?url=${props.pdfUrl}&embedded=true`}
        width="100%"
        className={styles.pdfContainer}
        scrolling="yes"
        frameBorder="0"
      ></iframe> */}

      {pdfDownloaded && (
        <motion.div
          className={styles.toolbarBox}
          initial={{
            bottom: -40,
            opacity: 0,
            scaleX: 0,
          }}
          animate={{
            bottom: 40,
            opacity: 1,
            scaleX: 1,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 17 }}
        >
          <a
            // href={active == "qp" ? pdfLocalUrl.qp : pdfLocalUrl.ms}
            // target="_blank"
            // rel="noreferrer"
            attributes-list
            // download
            onClick={downloadClicked}
            className={styles.downloadButton}
          >
            <Image
              src={DownloadIcon}
              priority={true}
              quality={100}
              height={22}
              width={22}
            />
          </a>

          <div>QP</div>
          <div className={styles.switchContainer}>
            <Switch
              checkedIcon={<PenIcon />}
              uncheckedIcon={<PaperClipIcon />}
              offColor={"#fff"}
              onColor={"#fff"}
              offHandleColor={"#6d28d9"}
              onHandleColor={"#6d28d9"}
              activeBoxShadow={"0 0 1px 1px #000"}
              onChange={switchChanged}
              checked={switchChecked}
            />
          </div>
          <div>MS</div>
        </motion.div>
      )}

      <div className={styles.pdfContainer}>
        {pdfDownloaded && (
          <Worker
            workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js"
            style={{ width: "100%", height: "100%" }}
            canvasCss={{ width: 700 }}
          >
            <Viewer
              plugins={[defaultLayoutPluginInstance]}
              fileUrl={pdfLocalUrl[active] ? pdfLocalUrl[active] : "pdfbroken"}
              defaultScale={0.9}
              onPageChange={(e) => {
                setInitialPages((prev) => {
                  prev[active] = e.currentPage
                  return prev
                })
              }}
              initialPage={initialPages[active]}
            />
          </Worker>
        )}
        {/* {pdfDownloaded && (
          <PapursViewer
            fileUrl={pdfLocalUrl[active] ? pdfLocalUrl[active] : "pdfbroken"}
            initialPage={initialPages[active]}
            onPageChange={(e) => {
              setInitialPages((prev) => {
                prev[active] = e.currentPage
                return prev
              })
            }}
          />
        )} */}
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
  let type = context.query.type

  let pdfUrl = process.env.NEXT_PUBLIC_BACKEND_URL + `getPdf?pdfName=${pdfName}`

  const pdfQpUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL + `getPdf?pdfName=${pdfName}`
  const pdfMsUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL + `getPdf?pdfName=${pdfName}&type=ms`

  if (type) {
    pdfUrl += `&type=${type}`
  } else {
    type = "qp"
  }

  if (pdfUrl) {
    return {
      props: {
        pdfUrl,
        pdfName,
        pdfMsUrl,
        pdfQpUrl,
        type,
      },
    }
  } else {
    return {
      notFound: true,
    }
  }
}

export default ViewPdf
