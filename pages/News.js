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
      {/* <NewsComponent
        title={"Coming soon"}
        body={
          "Autocomplete. We believe autocomplete will be extremely useful and faster when searching."
        }
        date={"03/08/2022"}
      />
      <NewsComponent
        title={"Papurs Update V 0.7"}
        body={
          "Updated our pdf viewer. You can zoom in, zoom out, search and download pdfs now."
        }
        date={"03/08/2022"}
      /> */}
      <NewsComponent
        title={"Papurs Update V 1.0.1"}
        body={"Added download button when viewing papers."}
        date={"14/08/2022"}
      />
      <NewsComponent
        title={"Papurs Update V 1.0"}
        body={"Papurs is now officially released."}
        date={"10/08/2022"}
      />

      <NewsComponent
        title={"Papurs Update V 0.8"}
        body={
          "Search algorithm has been improved. We made use of several analyzers and algorithms to bring out the best search results."
        }
        date={"08/08/2022"}
      />

      <NewsComponent
        title={"Papurs Update V 0.75"}
        body={
          "Added autocomplete to search bar. You can now view text predictions while you type. This make searching questions more effective."
        }
        date={"05/08/2022"}
      />

      <NewsComponent
        title={"Papurs Update V 0.6"}
        body={
          "Added past papers explorer. You can view which papers are available to search now."
        }
        date={"01/08/2022"}
      />
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
    </div>
  )
}

export default News
