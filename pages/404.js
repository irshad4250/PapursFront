import React, { useEffect } from "react"
import NoInputNavbar from "../components/NoInputNavbar"
import Head from "next/head"

function FourOhFOur(props) {
  useEffect(() => {
    document.getElementById("__next").classList.add("error404")

    return () => {
      document.getElementById("__next").classList.remove("error404")
    }
  }, [])

  return (
    <>
      <NoInputNavbar />
      <Head>
        <title>Error 404 | Not found</title>
      </Head>
      <div
        className="main"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <style jsx global>{`
          .error404 {
            height: calc(100vh - 55px);
          }
        `}</style>
        <h1>Error 404, Page not found</h1>
      </div>
    </>
  )
}

export default FourOhFOur
