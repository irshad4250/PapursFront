import React from "react"
import NoInputNavbar from "../components/NoInputNavbar"
import NewsComponent from "../components/NewsComponent"
import Head from "next/head"

function News(props) {
  return (
    <div className="main">
      <Head>
        <title>Papurs | News</title>
      </Head>
      <NoInputNavbar />
      <h1 className="title">Papurs News</h1>
      <NewsComponent
        title={"Papurs Update V 0.5"}
        body={
          "You can now view past papers. Click on Past papers in the navigation bar. You will be redirected to the past papers navigator. The Past papers navigator was designed to be simple and easy to use. It's different from other websites where you would need to go from page to page in order to view your paper."
        }
        date={"23/07/2022"}
      />
      <NewsComponent
        title={"Papurs Update V 0.45"}
        body={
          "You can now view a peek of the paper in search results if the paper contain your search text."
        }
        date={"23/07/2022"}
      />
      <NewsComponent
        title={"Papurs is still in demo."}
        body={
          "Search results are not guaranteed to be accurate since the app is still in demo. There might be bugs and unfinished places in the website. Papurs will be released soon."
        }
        date={"11/07/2022"}
      />
    </div>
  )
}

export default News
