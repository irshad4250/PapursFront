import React, { useState, useEffect, useRef } from "react"
import NoInputNavbar from "../components/NoInputNavbar"
import Head from "next/head"
import styles from "../styles/imagesearch.module.css"
import Tesseract from "tesseract.js"
import axios from "axios"
import SearchResult from "../components/SearchResult"
import { makeId, cropImageNow } from "../Global/functions"

import ReactCrop, { Crop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"

function ImageSearch(props) {
  const [image, setImage] = useState(<div>No Image Chosen</div>)
  const [imageTitle, setImageTitle] = useState("No image selected")

  const [textScanned, setTextScanned] = useState("")
  const [cropper, setCropper] = useState()

  const [searching, setSearching] = useState(false)
  const [recognizingText, setRecognizingText] = useState(false)
  const [textAreaDisabled, setTextAreaDisabled] = useState(true)

  const [lastSearch, setLastSearch] = useState("")

  const [results, setResults] = useState([])

  const textAreaRef = useRef()

  const handleFileChange = async (e) => {
    setTextAreaDisabled(true)
    if (e.target.files.length == 0) {
      return
    }

    setImageTitle(e.target.files[0].name)
    setCropper(
      <Cropper
        imageUrl={URL.createObjectURL(e.target.files[0])}
        confirmClicked={(config) => {
          cropperConfirmClicked(URL.createObjectURL(e.target.files[0]), config)
        }}
      />
    )

    async function cropperConfirmClicked(imgUrl, config) {
      setCropper()

      let url = await cropImageNow(
        URL.createObjectURL(e.target.files[0]),
        config.image,
        config.crop,
        config.rotate
      )
      setImage(<img src={url} className={styles.image} />)

      setRecognizingText(true)
      // Tesseract.recognize(url, "eng", { logger: (m) => console.log(m) }).then(
      Tesseract.recognize(url, "eng")
        .then(({ data: { text } }) => {
          const textFiltered = removeUselessLetters(text)
          setTextScanned(textFiltered)
          textAreaRef.current.value = textFiltered
          setRecognizingText(false)
          search(textFiltered)
        })
        .catch((error) => {
          console.log(error)
        })
    }
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
      {cropper}
      {/* <Cropper /> */}
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

function Cropper(props) {
  const [crop, setCrop] = useState({
    unit: "px",
    x: 10,
    y: 10,
    width: 300,
    height: 200,
    originalHeight: 0,
    originalWidth: 0,
  })

  const [rotate, setRotate] = useState(0)
  const imageRef = useRef()

  const rangeChanged = (e) => {
    setRotate(e.target.value)
  }

  const confirmClicked = () => {
    setCrop((pr) => {
      pr.originalHeight = imageRef.current.height
      pr.originalWidth = imageRef.current.width
    })
    props.confirmClicked({
      rotate: rotate,
      image: imageRef.current,
      crop: crop,
    })
  }

  return (
    <div className={styles.cropperWindow}>
      <div className={styles.cropperBody}>
        <div className={styles.cropperTitle}>Crop Image</div>
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          style={{ backgroundColor: "white" }}
          className={styles.cropperImage}
        >
          <img
            src={props.imageUrl}
            className={styles.cropperImage}
            style={{ transform: `rotate(${rotate}deg)` }}
            ref={imageRef}
          />
        </ReactCrop>
        <div className={styles.cropperButtons}>
          {/* <input
            className={styles.rotateBar}
            type="range"
            min={-180}
            max={180}
            defaultValue={0}
            onChange={rangeChanged}
          /> */}
          <div
            className={"papursButton " + styles.button}
            onClick={confirmClicked}
          >
            Confirm
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageSearch
