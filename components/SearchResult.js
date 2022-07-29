import React from "react"
import styles from "../styles/components/searchresult.module.css"
import Image from "next/image"
import PaperClipIcon from "../public/assets/icons/paperclip.svg"
import PenIcon from "../public/assets/icons/pen.svg"
import StickiesIcon from "../public/assets/icons/stickies.svg"

function SearchResult(props) {
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
