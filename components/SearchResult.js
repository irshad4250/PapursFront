import React from "react"
import styles from "../styles/components/searchresult.module.css"
import Image from "next/image"
import PaperClipIcon from "../public/assets/icons/paperclip.svg"
import PaperIcon from "../public/assets/icons/paper.svg"

function SearchResult(props) {
  // if (props.type == "ads") {
  //   return (
  //     <div className={styles.adsContainer}>
  //       <AdsSearch />
  //     </div>
  //   )
  // }

  return (
    <div className={styles.resultBox}>
      <div className={styles.resultTitle}>
        <Image
          className={styles.resultTitleIcon}
          width={32}
          height={32}
          src={PaperIcon}
          priority={true}
          quality={100}
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
          <div>View Question Paper & Mark Scheme</div>
        </a>
      </div>
    </div>
  )
}

export default SearchResult
