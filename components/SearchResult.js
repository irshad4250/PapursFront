import React, { useState, useEffect } from "react"
import styles from "../styles/components/searchresult.module.css"
import Image from "next/image"
import PaperClipIcon from "../public/assets/icons/paperclip.svg"
import PaperIcon from "../public/assets/icons/paper.svg"
import { getAllInstantAnswers } from "../Global/functions"

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

function RightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
      <path d="m25.05 30.25 5.2-5.2q.45-.45.45-1.05 0-.6-.45-1.05L25 17.7q-.4-.4-1.025-.375-.625.025-1.025.425-.45.45-.45 1.05 0 .6.45 1.05l2.65 2.65h-7.65q-.6 0-1.025.45-.425.45-.425 1.05 0 .65.425 1.075.425.425 1.075.425h7.6l-2.7 2.7q-.4.4-.375 1.025.025.625.425 1.025.45.45 1.05.45.6 0 1.05-.45ZM24 44q-4.25 0-7.9-1.525-3.65-1.525-6.35-4.225-2.7-2.7-4.225-6.35Q4 28.25 4 24q0-4.2 1.525-7.85Q7.05 12.5 9.75 9.8q2.7-2.7 6.35-4.25Q19.75 4 24 4q4.2 0 7.85 1.55Q35.5 7.1 38.2 9.8q2.7 2.7 4.25 6.35Q44 19.8 44 24q0 4.25-1.55 7.9-1.55 3.65-4.25 6.35-2.7 2.7-6.35 4.225Q28.2 44 24 44Zm0-3q7.25 0 12.125-4.875T41 24q0-7.25-4.875-12.125T24 7q-7.25 0-12.125 4.875T7 24q0 7.25 4.875 12.125T24 41Zm0-17Z" />
    </svg>
  )
}

function LeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
      <path d="M23 30.3q.4.4 1.025.375.625-.025 1.025-.425.45-.45.45-1.05 0-.6-.45-1.05L22.4 25.5h7.65q.6 0 1.025-.45.425-.45.425-1.05 0-.65-.425-1.075Q30.65 22.5 30 22.5h-7.6l2.7-2.7q.4-.4.375-1.025-.025-.625-.425-1.025-.45-.45-1.05-.45-.6 0-1.05.45l-5.2 5.2q-.45.45-.45 1.05 0 .6.45 1.05ZM24 44q-4.25 0-7.9-1.525-3.65-1.525-6.35-4.225-2.7-2.7-4.225-6.35Q4 28.25 4 24q0-4.2 1.525-7.85Q7.05 12.5 9.75 9.8q2.7-2.7 6.35-4.25Q19.75 4 24 4q4.2 0 7.85 1.55Q35.5 7.1 38.2 9.8q2.7 2.7 4.25 6.35Q44 19.8 44 24q0 4.25-1.55 7.9-1.55 3.65-4.25 6.35-2.7 2.7-6.35 4.225Q28.2 44 24 44Zm0-3q7.25 0 12.125-4.875T41 24q0-7.25-4.875-12.125T24 7q-7.25 0-12.125 4.875T7 24q0 7.25 4.875 12.125T24 41Zm0-17Z" />
    </svg>
  )
}

function SearchResult(props) {
  const [currentInstantAnswer, setCurrentInstantAnswer] = useState({
    label: props.instantAns ? props.instantAns.label : null,
    question: props.instantAns ? props.instantAns.question : null,
    answer: props.instantAns ? props.instantAns.answer : null,
  })

  const [allInstantAns, setAllInstantAns] = useState([])
  const [currentInstantAnsIndex, setCurrentInstantAnsIndex] = useState(0)

  function removeUselessLines(text) {
    let finalText = text
      .split(/\r?\n/)
      .filter((l) => l)
      .join("\n")
    finalText = finalText.replace(
      /© UCLES 20\d\d \d\d\d\d\/\d\d\/\w\/\w\/\d\d/gm,
      ""
    )
    finalText = finalText.replace(/[[]Turn over/gm, "")
    finalText = finalText.replace(/© UCLES 20\d\d Page \d\d of \d\d/gm, "")
    return finalText
  }

  function AddBoldToResultText(q, resultText) {
    const resultTextWords = resultText.split(" ")
    const qWords = q.split(" ")

    const FinalComponent = []

    resultTextWords.forEach((word) => {
      if (qWords.includes(word)) {
        FinalComponent.push(<b>{word}</b>)
      } else {
        FinalComponent.push(word)
      }

      FinalComponent.push(" ")
    })

    return FinalComponent
  }

  async function changeInstanAnsClicked(position) {
    const changeFactor = position == "left" ? -1 : 1

    if (allInstantAns.length == 0) {
      const instantAnswers = await getAllInstantAnswers(
        props.instantAns.pdfname
      )

      if (instantAnswers.length == 0) {
        alert("Error occured while retrieving instant answers")
        return
      }

      let findingIndex = 0

      for (let i = 0; i < instantAnswers.length; i++) {
        const instantAns = instantAnswers[i]

        if (instantAns.label == currentInstantAnswer.label) {
          findingIndex = i
          break
        }
      }

      let currIndex = findingIndex + changeFactor
      if (currIndex < 0) {
        currIndex = 0
      }
      if (currIndex > instantAnswers.length - 1) {
        currIndex = instantAnswers.length - 1
      }

      setCurrentInstantAnsIndex(currIndex)
      setAllInstantAns(instantAnswers)
      return
    }

    let indexToChangeTo = currentInstantAnsIndex + changeFactor
    if (indexToChangeTo < 0) {
      indexToChangeTo = 0
    }
    if (indexToChangeTo > allInstantAns.length - 1) {
      indexToChangeTo = allInstantAns.length - 1
    }

    setCurrentInstantAnsIndex(indexToChangeTo)
  }

  useEffect(() => {
    if (allInstantAns.length != 0) {
      setCurrentInstantAnswer(allInstantAns[currentInstantAnsIndex])
    }
  }, [currentInstantAnsIndex])

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
        <div className={styles.resultText}>
          {AddBoldToResultText(props.q, props.resultText)}
        </div>
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
            <div
              className={styles.instantAnsChangeButton}
              onClick={() => {
                changeInstanAnsClicked("left")
              }}
            >
              <LeftIcon />
            </div>
            <div className={styles.instantAnsIcon}>
              <InstantAnsIcon />
            </div>
            <div className={styles.instantAnsLabel}>InstantAnswer</div>
            <div className={styles.instantAnsFoundIn}>
              Qu: <b>{currentInstantAnswer.label}</b>
            </div>
            <div
              className={styles.instantAnsChangeButton}
              onClick={() => {
                changeInstanAnsClicked("right")
              }}
            >
              <RightIcon />
            </div>
          </div>
          <div className={styles.instantAnsQuestion}>
            <b>Question</b>: {removeUselessLines(currentInstantAnswer.question)}
          </div>

          <div className={styles.instantAnsQuestion}>
            <b>Answer</b>: {removeUselessLines(currentInstantAnswer.answer)}
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
