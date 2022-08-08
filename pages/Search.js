import React from "react"
import Head from "next/head"
import Navbar from "../components/Navbar"
import SearchResult from "../components/SearchResult"
import { makeId } from "../Global/functions"
import axios from "axios"
import Plaque from "../components/Ads/Plaque"

function Search(props) {
  return (
    <div>
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
        <title>{"Papurs | " + props.q}</title>
      </Head>
      <Navbar q={props.q} />
      <div className="main">
        {/* <Plaque /> */}
        {props.empty && (
          <>
            <style jsx>{`
              .noResult {
                font-family: var(--fontAccent);
                font-size: 40px;
                margin: auto;
                width: fit-content;
                margin-top: 150px;
              }
            `}</style>
            <div className={"noResult"}>No results found</div>
          </>
        )}
        {props.results.map((result) => {
          return (
            <SearchResult
              type={result}
              title={result.title}
              subject={result.subject}
              qpLink={result.qpLink}
              msLink={result.msLink}
              resultText={result.resultText}
              key={makeId(5)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Search

export async function getServerSideProps(context) {
  const { q, exam, subject, year } = context.query
  const cookieId = context.req.cookies.papursId

  if (!q) {
    return {
      notFound: true,
    }
  }

  let results
  results = await getResults()

  if (results.error || !results) {
    results = []
  }

  if (results.length == 0 || results.results.length == 0) {
    return {
      props: {
        empty: true,
        results: [],
        q: q,
      },
    }
  }

  // if (results.results.length >= 3) {
  //   results.results.splice(2, 0, "ads")
  // }

  return {
    props: {
      ...results,
    },
  }

  function getResults() {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.NEXT_PUBLIC_BACKEND_URL + "search", {
          q,
          exam,
          subject,
          year,
          cookieId,
        })
        .then((results) => {
          resolve(results.data)
        })
        .catch(() => {
          resolve({ error: true })
        })
    })
  }
}
