import React, { useState } from "react"
import axios from "axios"
import NoInputNavbar from "../../components/NoInputNavbar"
import Head from "next/head"
import styles from "../../styles/papersresult.module.css"
import { makeId } from "../../Global/functions"

function MonthBox({ month, variantObjectArray }) {
  return (
    <div className={styles.monthBoxContainer}>
      <div className={styles.monthLabel}>{month}</div>
      <div className={styles.papersLinkContainer}>
        {variantObjectArray.map((variantObject) => {
          return <ListPdf variantObject={variantObject} key={makeId(6)} />
        })}
      </div>
    </div>
  )
}

function ListPdf({ variantObject }) {
  return (
    <a
      className={styles.papersLink}
      href={variantObject.qpLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.papersLinkArrow}>
        <PdfSvg />
        {"P" + variantObject.variant}
      </div>
      <div>{variantObject.title}</div>
      <div className={styles.QuickSwitchIndicator}>QP and MS</div>
    </a>
  )
}

function PdfSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="currentColor"
      className="bi bi-arrow-bar-right"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8Zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5Z"
      />
    </svg>
  )
}

function Papers(props) {
  const [data, setData] = useState(() => {
    const rawData = { Nov: [], March: [], June: [] }

    props.papers.forEach((paper) => {
      const words = paper.title.split(" ")
      const month = words[0]
      const variant = words[2].replace("P", "")

      if (!rawData[month]) {
        return
      }

      rawData[month].push({
        variant,
        title: paper.title,
        qpLink: paper.qpLink,
      })
    })

    return rawData
  })

  return (
    <div className="main">
      <Head>
        <title>{props.subject + " " + props.year}</title>
      </Head>
      <NoInputNavbar />
      <h1 style={{ marginTop: 10, textAlign: "center", padding: 5 }}>
        {props.subject + " " + props.year}
      </h1>

      {data.March.length > 0 && (
        <MonthBox month={"March"} variantObjectArray={data.March} />
      )}

      {data.June.length > 0 && (
        <MonthBox month={"June"} variantObjectArray={data.June} />
      )}
      {data.Nov.length > 0 && (
        <MonthBox month={"November"} variantObjectArray={data.Nov} />
      )}
    </div>
  )
}

export default Papers

export async function getServerSideProps(context) {
  const { subject, year } = context.query

  if (!subject || !year) {
    return {
      notFound: true,
    }
  }

  const papers = await getPapers(subject, year)

  if (!papers) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      subject,
      year,
      papers,
    },
  }

  function getPapers(subject, year) {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.NEXT_PUBLIC_BACKEND_URL + "getPapers", {
          subject: subject,
          year: year,
        })
        .then((response) => {
          if (response.data.error) {
            resolve()
          } else {
            resolve(response.data)
          }
        })
        .catch((error) => {
          resolve()
        })
    })
  }
}
