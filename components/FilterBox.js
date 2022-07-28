import React, { useEffect, useState } from "react"
import styles from "../styles/Components/Filterbox.module.css"
import { motion } from "framer-motion"
import * as globalFunctions from "../Global/functions"

const variants = {
  start: { scale: [0, 1.1, 1], opacity: 1 },
  // You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
  return: { scale: 0, opacity: 0 },
}

/**
 *
 * Filter box component.
 *
 * @props `show` boolean to show modal or not
 *
 * @props `handleUpdate` your local function that takes as parameters: subject,year,level
 *
 * @props `onClose` function that modal executes to remove itself, meaning setting your state to false.
 *
 */

function FilterBox(props) {
  const [subjects, setSubjects] = useState(["Any"])
  const [years, setYears] = useState(["Any"])

  const [subjectDisabled, setSubjectDisabled] = useState(true)
  const [yearsDisabled, setYearsDisabled] = useState(true)

  const [subjectValue, setSubjectValue] = useState()
  const [yearValue, setYearValue] = useState()
  const [levelValue, setLevelValue] = useState()

  const [show, setShow] = useState(props.show)

  async function handleExamChange(level) {
    setYearsDisabled(true)
    setYears(["Any"])
    setSubjectDisabled(true)
    setSubjects(["Any"])

    setYearValue("Any")
    setSubjectValue("Any")

    setLevelValue(level)
    if (level == "Any") {
      return
    }

    const subjectsArr = await globalFunctions.getSubjects(level)

    if (subjectsArr.length == 0) {
      alert("Error getting subjects.")
    } else {
      subjectsArr.unshift("Any")
      setSubjects(subjectsArr)
      setSubjectDisabled(false)
    }
  }

  async function handleSubjectChange(subject) {
    setYearsDisabled(true)
    setYears(["Any"])

    if (subject == "Any") {
      return
    }

    const yearsArr = await globalFunctions.getYears(subject)

    if (yearsArr.length == 0) {
      alert("Error getting subjects.")
    } else {
      yearsArr.unshift("Any")
      setYears(yearsArr)
      setYearsDisabled(false)
    }
  }

  function applyClicked() {
    props.handleUpdate(subjectValue, yearValue, levelValue)
  }

  function resetClicked() {
    handleExamChange("Any")
    props.handleUpdate("Any", "Any", "Any")
  }

  useEffect(() => {
    setShow(props.show)
  }, [props.show])

  return (
    <motion.div
      className={styles.filterContainer}
      initial={{ scale: 0, opacity: 0 }}
      variants={variants}
      animate={show ? "start" : "return"}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ damping: 0, stiffness: 10, mass: 0.2 }}
    >
      <motion.div className={styles.filterBox}>
        <div className={styles.filterLabel + " " + styles.examinationLabel}>
          Examination
        </div>

        <div className={styles.filterInputContainer}>
          <select
            onChange={(r) => {
              handleExamChange(r.target.value)
            }}
            className={styles.filterInput + " " + styles.examinationInput}
          >
            <option value="Any">Any</option>
            <option value="A">A Level</option>
            <option value="O">O Level</option>
          </select>
        </div>

        <div className={styles.filterLabel + " " + styles.subjectLabel}>
          Subject
        </div>
        <div className={styles.filterInputContainer}>
          <select
            className={styles.filterInput + " " + styles.subjectInput}
            disabled={subjectDisabled}
            onChange={(e) => {
              handleSubjectChange(e.target.value)
              setSubjectValue(e.target.value)
            }}
            aria-placeholder="Select subject(optional)"
          >
            {subjects.map((subject) => {
              return (
                <option value={subject} key={subject}>
                  {subject}
                </option>
              )
            })}
          </select>
        </div>

        <div className={styles.filterLabel + " " + styles.subjectLabel}>
          Year
        </div>
        <div className={styles.filterInputContainer}>
          <select
            className={styles.filterInput + " " + styles.yearInput}
            disabled={yearsDisabled}
            aria-placeholder="Select year(optional)"
            onChange={(e) => {
              setYearValue(e.target.value)
            }}
          >
            {years.map((year) => {
              return (
                <option value={year} key={year}>
                  {year}
                </option>
              )
            })}
          </select>
        </div>

        <div className={styles.buttonContainers}>
          <div
            className={"papursButton " + styles.filterApplyButton}
            onClick={applyClicked}
          >
            Apply
          </div>
          <div
            className={"papursButton " + styles.filterCancelButton}
            onClick={resetClicked}
          >
            Reset
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FilterBox
