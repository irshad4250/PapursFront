import React, { useState } from "react"
import styles from "../styles/components/searchresult.module.css"
import Image from "next/image"
import PaperClipIcon from "../public/assets/icons/paperclip.svg"
import PenIcon from "../public/assets/icons/pen.svg"
import StickiesIcon from "../public/assets/icons/stickies.svg"

const adUrl =
  "https://www.amazon.com/gp/search?ie=UTF8&tag=irshad090-20&linkCode=ur2&linkId=08b918f5dc7d7a1bf52cda2256a5e751&camp=1789&creative=9325&index=mobile&keywords=Apple"

function SearchResult(props) {
  const [showAds, setShowAds] = useState({
    ms: getRndInteger(1, 3) == 1 ? true : false,
    qp: getRndInteger(1, 3) == 1 ? true : false,
  })

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  function msClicked() {
    if (showAds.ms) {
      window.open(adUrl, "_blank")
    }
    setShowAds({ ms: false, qp: false })
  }

  function qpClicked() {
    if (showAds.qp) {
      window.open(adUrl, "_blank")
    }
    setShowAds({ ms: false, qp: false })
  }

  return (
    <div className={styles.resultBox}>
      <div className={styles.resultTitle}>
        <Image
          className={styles.resultTitleIcon}
          width={22}
          height={22}
          src={StickiesIcon}
          alt="Paper icon"
        />
        {props.title}
      </div>
      {props.subject && (
        <div className={styles.resultSubject}>{props.subject}</div>
      )}
      {props.resultText && (
        <div className={styles.resultText}>{props.resultText}</div>
      )}
      <div className={styles.resultRedirects}>
        <a
          className={styles.linkRow}
          href={props.qpLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={qpClicked}
        >
          <Image
            src={PaperClipIcon}
            width={25}
            height={25}
            alt={props.title + " question paper"}
          />
          <div>View Question paper</div>
        </a>
        <a
          className={styles.linkRow + " " + styles.linkMark}
          href={props.msLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={msClicked}
        >
          <Image
            src={PenIcon}
            width={25}
            height={25}
            alt={props.title + " mark scheme"}
          />
          <div>View Mark Scheme</div>
        </a>
      </div>
    </div>
  )
}

export default SearchResult
