import React from "react"
import styles from "../styles/components/searchresult.module.css"
import Image from "next/image"
import PaperClipIcon from "../public/assets/icons/paperclip.svg"
import PaperIcon from "../public/assets/icons/paper.svg"

function InstantAnsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="currentColor"
      viewBox="0 0 16 15"
    >
      <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41 4.157 8.5z" />
    </svg>
  )
}

function SearchResult(props) {
  // if (props.type == "ads") {
  //   return (
  //     <div className={styles.adsContainer}>
  //       <AdsSearch />
  //     </div>
  //   )
  // }

  function removeUselessLines(text) {
    let finalText = text.replace(/^\s*\n/gm, "")
    finalText = finalText.replace(
      /© UCLES 20\d\d \d\d\d\d\/\d\d\/\w\/\w\/\d\d/gm,
      ""
    )
    finalText = finalText.replace(/[[]Turn over/gm, "")
    finalText = finalText.replace(/© UCLES 20\d\d Page \d\d of \d\d/gm, "")
    return finalText
  }

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
      {props.instantAns && (
        <>
          <div className={styles.instantAnsIndicator}>
            <div className={styles.instantAnsIcon}>
              <InstantAnsIcon />
            </div>
            <div className={styles.instantAnsLabel}>InstantAnswer</div>
            <div className={styles.instantAnsFoundIn}>
              Found in: <b>{props.instantAns.label}</b>
            </div>
          </div>
          <div className={styles.instantAnsQuestion}>
            <b>Question</b>: {removeUselessLines(props.instantAns.question)}
          </div>

          <div className={styles.instantAnsQuestion}>
            <b>Answer</b>: {removeUselessLines(props.instantAns.answer)}
          </div>

          <div className={styles.instantAnsWarning}>
            Note: Instant Answer is still in testing mode and might bring
            unexpected results.
          </div>
        </>
      )}
    </div>
  )
}

export default SearchResult
