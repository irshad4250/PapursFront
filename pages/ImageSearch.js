import React, { useState, useEffect, useRef } from "react"
import NoInputNavbar from "../components/NoInputNavbar"
import Head from "next/head"
import styles from "../styles/imagesearch.module.css"
import Tesseract from "tesseract.js"
import axios from "axios"
import SearchResult from "../components/SearchResult"
import { makeId } from "../Global/functions"

function ImageSearch(props) {
  const [image, setImage] = useState(<div>No Image Chosen</div>)
  const [imageTitle, setImageTitle] = useState("No image selected")

  const [textScanned, setTextScanned] = useState("")

  const [searching, setSearching] = useState(false)
  const [recognizingText, setRecognizingText] = useState(false)
  const [textAreaDisabled, setTextAreaDisabled] = useState(true)

  const [lastSearch, setLastSearch] = useState("")

  const [results, setResults] = useState([])

  const textAreaRef = useRef()

  const handleFileChange = (e) => {
    setTextAreaDisabled(true)
    if (e.target.files.length == 0) {
      return
    }

    const url = URL.createObjectURL(e.target.files[0])
    setImageTitle(e.target.files[0].name)
    setImage(<img src={url} className={styles.image} />)

    setRecognizingText(true)
    // Tesseract.recognize(url, "eng", { logger: (m) => console.log(m) }).then(
    Tesseract.recognize(url, "eng").then(({ data: { text } }) => {
      setTextScanned(removeUselessLetters(text))
      textAreaRef.current.value = removeUselessLetters(text)
      setRecognizingText(false)
      search(removeUselessLetters(text))
    })
  }

  const removeUselessLetters = (text) => {
    return text.replace(/[^a-zA-Z ]/g, "")
  }

  function search(q) {
    if (searching || !q) {
      setTextAreaDisabled(false)
      return
    }

    setSearching(true)
    getResults(q).then((results) => {
      if (results.error) {
        alert("Error in getting results for: " + q)
      } else {
        setLastSearch(q)
        setResults(results.results)
      }

      setSearching(false)
      setTextAreaDisabled(false)
    })
  }

  function getResults(q) {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.NEXT_PUBLIC_BACKEND_URL + "search", {
          q,
        })
        .then((results) => {
          resolve(results.data)
        })
        .catch(() => {
          resolve({ error: true })
        })
    })
  }

  return (
    <div>
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
        <div className={styles.inputBox}>{image}</div>
        <label htmlFor={"upload-photo"} className={styles.fileInputLabel}>
          <div className={styles.chooseImageTab}>Press</div>
          <div className={styles.imageNameTab}>{imageTitle}</div>
        </label>
        <input
          type="file"
          className={styles.fileInput}
          id="upload-photo"
          accept="image/png,image/jpg,image/webp,image/jpeg"
          multiple={false}
          onChange={handleFileChange}
        />
        <div className={styles.imageTextAreaContainer}>
          <textarea
            className={styles.imageTextArea}
            disabled={textAreaDisabled}
            ref={textAreaRef}
            onChange={(e) => {
              setTextScanned(e.target.value)
            }}
            placeholder="Scanned text will appear here, you may correct any mistakes. Note:  1. A cropped picture will make text extraction faster. 2. Once image is loaded no need to press search button, it is automatic. 3. The search button will be used if you edited the text's value after extraction, you will most likely not use it. Image search may be slow since it is still in testing mode."
          />
        </div>
        <div className={styles.buttonContainer}>
          <div
            className={styles.searchButton}
            onClick={() => {
              search(textScanned)
            }}
          >
            Search
          </div>
          {searching && (
            <div className={styles.searchIndicator}>Searching...</div>
          )}

          {recognizingText && (
            <div className={styles.searchIndicator}>
              Extracting text from image...
            </div>
          )}
        </div>
        {lastSearch && (
          <div className={styles.showingResults}>
            Showing results for: {lastSearch}
          </div>
        )}
        <div className={styles.resultsBox}>
          {results.map((result) => {
            return (
              <SearchResult
                title={result.title}
                subject={result.subject}
                qpLink={result.qpLink}
                msLink={result.msLink}
                resultText={result.resultText}
                instantAns={result.instantAns}
                key={makeId(5)}
                q={"none"}
              />
            )
          })}
          {results.length === 0 && <div>No results found</div>}
        </div>
      </div>
    </div>
  )
}

export default ImageSearch
