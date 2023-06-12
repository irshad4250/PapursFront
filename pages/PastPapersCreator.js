import React, { useState, useEffect } from "react"
import axios from "axios"
import styles from "../styles/pastpaperscreator.module.css"
import NoInputNavbar from "../components/NoInputNavbar"
import Head from "next/head"
import { getSubjects, makeId, getYears, postReq } from "../Global/functions"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import { motion } from "framer-motion"
import { Line } from "rc-progress"

function PastPapersCreator(props) {
  const [allYears, setAllYear] = useState([])
  const [startYearList, setStartYearList] = useState(["None"])
  const [endYearList, setEndYearList] = useState(["None"])

  const [endYear, setEndYear] = useState("")
  const [startYear, setStartYear] = useState("")
  const [subject, setSubject] = useState("")

  const [variantsText, setVariantsText] = useState("")

  const [gotData, setGotData] = useState([])

  const [percentage, setPercentage] = useState(-1)
  const [downloadInfo, setDownloadInfo] = useState("")

  async function subjectChanged(e) {
    setSubject(e.target.value)
    const years = await getYears(e.target.value)
    if (years.length == 0) {
      alert("Error in getting years for " + e.target.value + " try again later")
      return
    }
    setAllYear(years)
    setStartYearList(years)
    setStartYear(years[0])
  }

  async function startYearChanged(e) {
    const value = e.target.value
    setStartYear(value)
    const index = allYears.indexOf(parseInt(value))

    const tempArray = [...allYears]
    setEndYearList(tempArray.splice(index, allYears.length - 1))
    setEndYear(value)
  }

  async function endYearChanged(e) {
    setEndYear(e.target.value)
  }

  function generatePressed() {
    let variantsArr = variantsText.split(",").map((vari) => vari.trim())
    if (!variantsText) {
      variantsArr = []
    }

    postReq(process.env.NEXT_PUBLIC_BACKEND_URL + "getUrlForPastPapers", {
      subject,
      startYear,
      endYear,
      variants: variantsArr,
    }).then((response) => {
      if (response.error) {
        alert("Error in generating past paper, " + response.info)
        return
      }
      // setGotData(response)
      setGotData(sortObject(response))
    })
  }

  const getDataUrlFromUrl = (url) => {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { responseType: "arraybuffer" })
        .then((response) => {
          const base64 = Buffer.from(response.data, "base64").toString("base64")
          resolve("data:application/pdf;base64," + base64)
        })
        .catch(() => {
          alert("Could not download pdf")
          resolve()
        })
    })
  }

  function sortObject(object) {
    const yearArr = [[]]

    let current = object[0].yearInt
    object.forEach((paperData) => {
      if (paperData.yearInt != current) {
        yearArr.push([])
        current = paperData.yearInt
      }
      yearArr[yearArr.length - 1].push(paperData)
    })

    const monthArr = []
    yearArr.forEach((yearArray) => {
      const sortedMonth = sortMonth(yearArray)
      monthArr.push(...sortedMonth)
    })

    const finalArr = []
    monthArr.forEach((monthArray) => {
      const sortedArr = monthArray.sort((a, b) => {
        return a.variant < b.variant ? -1 : 1
      })

      finalArr.push(...sortedArr)
    })

    return finalArr

    function sortMonth(yearArray) {
      const marchArray = []
      const juneArray = []
      const novArray = []
      const finalArr = []

      yearArray.forEach((yearPaperData) => {
        if (yearPaperData.month == "March") {
          marchArray.push(yearPaperData)
        } else if (yearPaperData.month == "June") {
          juneArray.push(yearPaperData)
        } else if (yearPaperData.month == "November") {
          novArray.push(yearPaperData)
        }
      })

      if (marchArray.length != 0) {
        finalArr.push(marchArray)
      }
      if (juneArray.length != 0) {
        finalArr.push(juneArray)
      }
      if (novArray.length != 0) {
        finalArr.push(novArray)
      }

      return finalArr
    }
  }

  function deletePressed(data) {
    setGotData((previous) => {
      const arr = previous.splice(gotData.indexOf(data), 1)
      console.log(arr)
      return [...previous]
    })
  }

  async function downloadPressed() {
    setPercentage(0)
    const papersArr = []

    for (let i = 0; i < gotData.length; i++) {
      setDownloadInfo("Downloading " + gotData[i].title)
      const url = gotData[i].downloadUrl
      const dataUri = await getDataUrlFromUrl(url)

      papersArr.push(dataUri)
      setPercentage(100 * ((i + 1) / (gotData.length + 1)))
    }

    createPdf(papersArr)
  }

  async function createPdf(papersArr) {
    const mainPdf = await PDFDocument.create()
    const coverPdf = await makeTemplate()
    setPercentage(100)
    setDownloadInfo(
      "Merging PDFs please wait 5s or more depending on your device"
    )

    //Adding cover page from template
    const coverCopyPage = await mainPdf.copyPages(
      coverPdf,
      coverPdf.getPageIndices()
    )
    mainPdf.addPage(coverCopyPage[0])

    for (let i = 0; i < papersArr.length; i++) {
      const url = papersArr[i]
      let paperPdf = await PDFDocument.load(url)
      const copiedPages = await mainPdf.copyPages(
        paperPdf,
        paperPdf.getPageIndices()
      )

      for (let j = 0; j < copiedPages.length; j++) {
        mainPdf.addPage(copiedPages[j])
      }
    }

    const mainPdfFile = await mainPdf.save()
    saveByteArray(`${subject}, ${startYear}-${endYear}`, mainPdfFile)
    setDownloadInfo(
      "Download Complete, if PDF is corrupt click download again."
    )

    setTimeout(() => {
      setPercentage(-1)
    }, 2500)
  }

  function makeTemplate() {
    const BORDER_LEFT = 40
    const Y_SLIDE = 35
    const COLUMN_SEPERATION = 120
    const CONTENTS_TOP = 330
    const MAX_ROWS = 16

    return new Promise(async (resolve, reject) => {
      const bytes = await getDataUrlFromUrl(
        process.env.NEXT_PUBLIC_BACKEND_URL + "getTemplate"
      )

      const pdfDoc = await PDFDocument.load(bytes)
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

      const page = pdfDoc.getPages()[0]
      page.moveTo(BORDER_LEFT, page.getHeight() - 205)
      page.drawText(subject.toUpperCase(), {
        size: 22,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })

      page.moveDown(Y_SLIDE)
      page.drawText(`${startYear}-${endYear} PAST PAPERS`, {
        size: 22,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })

      page.moveDown(Y_SLIDE)
      page.drawText(`VARIANTS: ${variantsText}`, {
        size: 22,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })

      page.moveTo(BORDER_LEFT, CONTENTS_TOP)

      for (let i = 0; i < MAX_ROWS * 4; i++) {
        let data
        try {
          data = gotData[i]
        } catch {
          break
        }

        if (!data) break

        page.drawText(data.title, {
          size: 12,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        })

        try {
          page.moveDown(20)
        } catch {}

        if ([1, 2, 3].includes((i + 1) / MAX_ROWS)) {
          page.moveTo(
            BORDER_LEFT + ((i + 1) / MAX_ROWS) * COLUMN_SEPERATION,
            CONTENTS_TOP
          )
        }
      }

      resolve(pdfDoc)
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
    <>
      <NoInputNavbar />
      <Head>
        <meta charset="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Search cambridge A level and O level examination questions using a picture and find out which year they belong to. View the question papers and mark schemes. You can also view past papers."
        />
        <meta
          name="keywords"
          content="O-Level, A-Level, CIE, Past Papers,Search, Search Past Papers, Cambridge"
        />

        <title>Papurs</title>
      </Head>
      <div className="main">
        <div className={styles.parentContainer}>
          <h1 style={{ marginTop: 20, textAlign: "center" }}>
            Past Papers Creator
          </h1>
          <div className={styles.inputBar}>
            <div className={styles.label + " " + styles.yearLabel}>Subject</div>
            <select
              className={styles.inputStyle}
              aria-placeholder="Select subject"
              onChange={subjectChanged}
              value={subject}
            >
              <option value={"None"}>None</option>
              {props.subjects.map((subject) => (
                <option key={makeId(5)} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputBar}>
            <div className={styles.label + " " + styles.yearLabel}>
              Start Year
            </div>
            <select
              className={styles.inputStyle}
              onChange={startYearChanged}
              value={startYear}
            >
              {/* <option value={"None"}>None</option> */}
              {startYearList.map((year) => (
                <option key={makeId(5)} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputBar}>
            <div className={styles.label + " " + styles.yearLabel}>
              End Year
            </div>
            <select
              className={styles.inputStyle}
              value={endYear}
              onChange={endYearChanged}
            >
              {/* <option value={"None"}>None</option> */}
              {endYearList.map((year) => (
                <option key={makeId(5)} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputBar} style={{ marginBottom: 20 }}>
            <div className={styles.label + " " + styles.yearLabel}>
              Variants
            </div>
            <input
              onChange={(event) => {
                setVariantsText(event.target.value)
              }}
              value={variantsText}
              className={styles.inputStyle}
              placeholder="Ex: 12,54,22, For each series (leave blank to include all)"
            />
          </div>
          <div
            className={"papursButton"}
            style={{ width: 100, margin: "auto" }}
            onClick={generatePressed}
          >
            Generate
          </div>
          {gotData.length != 0 && (
            <>
              <div className={styles.showerBox}>
                {gotData.map((data) => {
                  return (
                    <ShowerBar
                      key={makeId(5)}
                      title={data.title}
                      onDelete={() => {
                        deletePressed(data)
                      }}
                    />
                  )
                })}
              </div>
              <div
                className={"papursButton"}
                style={{
                  width: 100,
                  margin: "auto",
                  marginTop: 20,
                  marginBottom: 20,
                }}
                onClick={downloadPressed}
              >
                Download
              </div>
            </>
          )}
          {percentage != -1 && (
            <DownloadModal
              percentage={percentage}
              downloadInfo={downloadInfo}
            />
          )}
        </div>
      </div>
    </>
  )
}

function ShowerBar(props) {
  return (
    <div className={styles.showerBar}>
      <div className={styles.showerTitle}>
        <PdfSvg />
        {props.title}
      </div>
      <TrashIcon onDelete={props.onDelete} />
    </div>
  )
}

function PdfSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path d="M319-250h322v-60H319v60Zm0-170h322v-60H319v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z" />
    </svg>
  )
}

function TrashIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="27"
      viewBox="0 -960 960 960"
      width="27"
      onClick={props.onDelete}
      className={styles.deleteBox}
    >
      <path
        fill="#dc3545"
        d="M261-120q-24 0-42-18t-18-42v-570h-11q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T190-810h158q0-13 8.625-21.5T378-840h204q12.75 0 21.375 8.625T612-810h158q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T770-750h-11v570q0 24-18 42t-42 18H261Zm0-630v570h438v-570H261Zm106 454q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625 12.825 0 21.325-8.625T427-296v-339q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T367-635v339Zm166 0q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625 12.825 0 21.325-8.625T593-296v-339q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T533-635v339ZM261-750v570-570Z"
      />
    </svg>
  )
}

function DownloadModal(props) {
  const [percentage, setPercentage] = useState(0)
  const [downloadInfo, setDownloadInfo] = useState(0)

  useEffect(() => {
    setPercentage(props.percentage)
  }, [props.percentage])

  useEffect(() => {
    setDownloadInfo(props.downloadInfo)
  }, [props.downloadInfo])

  return (
    <motion.div
      className={styles.downloadModalWindow}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "linear",
        duration: 0.4,
      }}
    >
      <motion.div
        className={styles.downloadModalBody}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 18 }}
      >
        <div className={styles.downloadModalTitle}>Downloading...</div>
        <div className={styles.downloadingBar}>
          <Line
            percent={percentage}
            strokeWidth={4}
            trailWidth={4}
            strokeColor="#6d28d9"
            trailColor="#FFFFFF"
            style={{ transition: 100 }}
          />
          <div className={styles.percentageIndicator}>
            {parseInt(percentage) + "%"}
          </div>
        </div>
        <div className={styles.downloadInfo}>{downloadInfo}</div>
        <div className={styles.downloadTip}>
          Please wait, PDF will automatically be downloaded to your device but
          depending on your browser or platfrom you might be redirected to
          another page where you may need to manually download.
        </div>
      </motion.div>
    </motion.div>
  )
}

export async function getServerSideProps() {
  const oSubjects = await getSubjects("O")
  const aSubjects = await getSubjects("A")

  const allSubjects = [...oSubjects, ...aSubjects]

  allSubjects.sort()

  return {
    props: { subjects: allSubjects },
  }
}

export default PastPapersCreator
