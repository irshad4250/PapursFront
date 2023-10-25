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
        title={"Papurs update V 1.7"}
        body={"Made papurs navigator loading speed of subject really fast."}
        date={"25/10/2023"}
      />
      <NewsComponent
        title={"Papurs update V 1.6"}
        body={"Added the Past Papers Creator tool."}
        date={"21/05/2023"}
      />
      <NewsComponent
        title={"Papurs update V 1.5.6"}
        body={"Added a crop feature in Image Search"}
        date={"21/05/2023"}
      />
      <NewsComponent
        title={"Papurs update V 1.5.5"}
        body={"Added image search"}
        date={"09/05/2023"}
      />
      <NewsComponent
        title={"Papurs update V 1.5"}
        body={
          "Introducing Instant Answer. Search results will now bring the question number, question and answer of your search. Still in testing mode Available in paper 2 for physics, biology, economics, chemistry for both a level and o level."
        }
        date={"29/01/2023"}
      />
      <NewsComponent
        title={"Papurs Update V 1.35"}
        body={
          "Update past papers result page. Past papers are now grouped by their months and are sorted by their variants."
        }
        date={"08/01/2023"}
      />
      <NewsComponent
        title={"Papurs Update V 1.3"}
        body={
          "Updated our pdf viewer. Quick Switch: You can now quickly switch between mark scheme and question paper in only one page. Added a loading indicator."
        }
        date={"08/01/2023"}
      />
      <NewsComponent
        title={"Papurs Update V 1.2"}
        body={
          "Updated our pdf viewer. You can zoom in, zoom out, search and download pdfs now."
        }
        date={"23/11/2022"}
      />
      <NewsComponent
        title={"Papurs Update V 1.1"}
        body={"Changed user interface."}
        date={"15/11/2022"}
      />
      <NewsComponent
        title={"Papurs Update V 1.0.3"}
        body={
          "Added a loading spinner to search box to indicate that autocomplete is fetching."
        }
        date={"20/08/2022"}
      />
      <NewsComponent
        title={"Papurs Update V 1.0.2"}
        body={"Improved autocomplete."}
        date={"20/08/2022"}
      />
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
