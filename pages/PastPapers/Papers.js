import React from "react"
import axios from "axios"
import { makeId } from "../../Global/functions"
import SearchResult from "../../components/SearchResult"
import NoInputNavbar from "../../components/NoInputNavbar"
import Head from "next/head"

function Papers(props) {
  return (
    <div className="main">
      <Head>
        <title>{props.subject + " " + props.year}</title>
      </Head>
      <NoInputNavbar />
      <h1 style={{ marginTop: 10, textAlign: "center", padding: 5 }}>
        {props.subject + " " + props.year}
      </h1>
      {props.papers.map((paper) => {
        return (
          <SearchResult
            title={paper.title}
            qpLink={paper.qpLink}
            msLink={paper.msLink}
            key={makeId(5)}
          />
        )
      })}
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
