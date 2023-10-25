import React, { useState } from "react"
import styles from "../../styles/pastpapers.module.css"
import NoInputNavbar from "../../components/NoInputNavbar"
import { getSubjects, getYears } from "../../Global/functions"
import Head from "next/head"
import Plaque from "../../components/Ads/Plaque"
import { getReq } from "../../Global/functions"
import Footer from "../../components/Footer"

function PastPapers(props) {
  const [subjects, setSubjects] = useState([])
  const [subjectValue, setSubjectValue] = useState()
  const [subjectDisabled, setSubjectDisabled] = useState(true)

  const [years, setYears] = useState([])
  const [yearsValue, setYearsValue] = useState()
  const [yearsDisabled, setYearsDisabled] = useState(true)

  const [examValue, setExamValue] = useState()

  const [allSubjects, setAllSubjects] = useState(props.allSubjects)

  async function examChange(event) {
    setExamValue(event.target.value)

    const exam = event.target.value

    if (exam == "None") {
      setSubjects([])
      setYears([])
      setSubjectValue()
      setYearsValue()

      setSubjectDisabled(true)
      setYearsDisabled(true)
      return
    }

    const subjectsArr = returnArrayFromObject(allSubjects[exam])

    if (subjectsArr.length == 0 || subjectsArr.error) {
      alert("Could not get subjects for exam.")
      return
    }
    subjectsArr.unshift("None")

    setSubjects(subjectsArr)
    setSubjectDisabled(false)
  }

  function returnArrayFromObject(subjectObject) {
    const final = []
    for (let key in subjectObject) {
      final.push(key)
    }
    return final
  }

  async function subjectChange(event) {
    setSubjectValue(event.target.value)
    const subject = event.target.value

    setYears([])
    setYearsDisabled(true)
    setYearsValue()

    if (subject == "None") {
      return
    }

    const yearsArr = allSubjects[examValue][subject]

    if (yearsArr.length == 0 || yearsArr.error) {
      alert("Could not get years for subject.")
      return
    }

    yearsArr.unshift("None")

    setYears(yearsArr)
    setYearsDisabled(false)
  }

  function goClicked() {
    if (
      !subjectValue ||
      !yearsValue ||
      examValue == "None" ||
      subjectValue == "None" ||
      yearsValue == "None"
    ) {
      alert("Please fill all the fields!")
      return
    }

    const url = `/PastPapers/Papers?subject=${subjectValue}&year=${yearsValue}`
    window.location.href = url
  }

  return (
    <div className="main">
      <Head>
        <title>Past Papers Navigator</title>
        <meta
          name="description"
          content="Browse cambridge A level and O Level past papers. Papurs Past papers Navigator."
        />
      </Head>
      <NoInputNavbar />
      <Plaque />
      <h1 style={{ marginTop: 20, textAlign: "center" }}>
        Past Papers Navigator
      </h1>

      <div className={styles.filterContainer}>
        <div className={styles.filterBox}>
          <div className={styles.inputRow}>
            <div className={styles.filterLabel + " " + styles.examinationLabel}>
              Exam
            </div>

            <div className={styles.filterInputContainer}>
              <select
                className={styles.filterInput + " " + styles.examinationInput}
                onChange={examChange}
              >
                <option value="None">None</option>
                <option value="A">A Level</option>
                <option value="O">O Level</option>
              </select>
            </div>
          </div>

          <div className={styles.inputRow}>
            <div className={styles.filterLabel + " " + styles.subjectLabel}>
              Subject
            </div>
            <div className={styles.filterInputContainer}>
              <select
                className={styles.filterInput + " " + styles.subjectInput}
                disabled={subjectDisabled}
                aria-placeholder="Select subject"
                onChange={subjectChange}
              >
                {subjects.map((subject) => {
                  return (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className={styles.inputRow}>
            <div className={styles.filterLabel + " " + styles.subjectLabel}>
              Year
            </div>
            <div className={styles.filterInputContainer}>
              <select
                className={styles.filterInput + " " + styles.yearInput}
                aria-placeholder="Select year"
                disabled={yearsDisabled}
                onChange={(event) => setYearsValue(event.target.value)}
              >
                {years.map((year) => {
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <div
              className={"papursButton " + styles.goButton}
              onClick={goClicked}
            >
              Go
            </div>
          </div>
        </div>
      </div>

      <h3 className={styles.subtitle}>How to use the navigator</h3>
      <p className={styles.paragraph}>
        Select the examination, the subject and the year and press Go, you will
        redirected to a list of available past papers for the specified
        criteria.
      </p>
    </div>
  )
}

export const getServerSideProps = async () => {
  const allSubjects = await getReq(
    process.env.NEXT_PUBLIC_BACKEND_URL + "api/getAllSubjectsAndYears"
  )
  return {
    props: {
      allSubjects: allSubjects.data,
    },
  }
}

export default PastPapers
