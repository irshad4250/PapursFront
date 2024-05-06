import React, { useState } from "react"
import NoInputNavbar from "../components/NoInputNavbar"
import styles from "../styles/pastpaperscreator.module.css"
import axios from "axios"
import Head from "next/head"
import { Circle } from "rc-progress"

function Giveaway(props) {
  const [linkEmail, setLinkEmail] = useState("")
  const [statusEmail, setStatusEmail] = useState("")
  const [modalContent, setModal] = useState()

  function getStatusClicked() {
    axios
      .get(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          `getGiveawayStatus?email=${statusEmail}`
      )
      .then((response) => {
        if (response.data.error) {
          setModal(
            <Modal
              title={"Error"}
              description={response.data.info}
              clearModal={() => {
                setModal()
              }}
            />
          )
        } else {
          setModal(
            <StatusModal
              title={"Status for " + response.data.email}
              description={`${
                response.data.clicks
              }/5 people clicked on your link, your email will appear ${Math.floor(
                response.data.clicks / 5
              )} times in the draw. Your link is: https://server.papurs.com/enterGiveaway?id=${
                response.data._id
              }`}
              clicks={response.data.clicks}
              clearModal={() => {
                setModal()
              }}
            />
          )
        }
      })
  }

  function getLinkClicked() {
    axios
      .get(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          `initiateGiveaway?email=${linkEmail}`
      )
      .then((response) => {
        if (response.data.error) {
          setModal(
            <Modal
              title={"Error"}
              description={response.data.info}
              clearModal={() => {
                setModal()
              }}
            />
          )
        } else {
          setModal(
            <Modal
              title={
                "Share this link to minimum 5 people to enter the giveaway draw"
              }
              description={response.data}
              link={true}
              clearModal={() => {
                setModal()
              }}
            />
          )
        }
      })
  }

  return (
    <div className="main">
      <Head>
        <title>Papurs</title>
      </Head>
      <NoInputNavbar />
      {modalContent}
      <div className="main">
        <div className={styles.parentContainer}>
          <h1 style={{ marginTop: 20, textAlign: "center" }}>Giveaway</h1>
          <div className={styles.howTo}>
            How to enter Giveaway: Enter your email in the box below and press
            get link, copy your link and share it to as much person as you can.
            For your email to appear in the draw you must have at least 5 people
            who clicked on your link. The more people who click on your link the
            more times your email will appear in the draw. For example if 15
            people clicked, your email will appear 3 times in the draw. An email
            will be sent to you if you won a prize. The draw will be done on
            15th of June 2024.
            <b>To view your giveaway link status scroll down.</b>
            <br />
            Share your link to whatsapp, reddit, instagram, facebook, twitter to
            get more clicks and get more draws and follow us on instagram
            @pap.urs ,Good luck!
          </div>
          <div className={styles.howTo}>
            <b>
              Prizes: <br /> 1. 14" M3 Macbook Pro
              <br /> 2. Dell XPS 13 <br />
              3. Galaxy Tab S8
              <br />
              4. Airpods Pro
            </b>
          </div>
          <div className={styles.inputBar} style={{ marginBottom: 20 }}>
            <div className={styles.label + " " + styles.yearLabel}>Email</div>
            <input
              onChange={(event) => {
                setLinkEmail(event.target.value)
              }}
              value={linkEmail}
              className={styles.inputStyle}
              placeholder="Enter your email here"
            />
          </div>
          <div
            className={"papursButton"}
            style={{ width: 100, margin: "auto" }}
            onClick={getLinkClicked}
          >
            Get Link
          </div>
          <h1 style={{ marginTop: 50, textAlign: "center" }}>
            View your giveaway link status
          </h1>
          <div className={styles.howTo}>
            Enter your email you used to get your link before and press get
            status, to view how many users clicked and how many times your email
            will appear in the draw.
          </div>
          <div className={styles.inputBar} style={{ marginBottom: 20 }}>
            <div className={styles.label + " " + styles.yearLabel}>Email</div>
            <input
              className={styles.inputStyle}
              placeholder="Enter your email here"
              onChange={(event) => {
                setStatusEmail(event.target.value)
              }}
              value={statusEmail}
            />
          </div>
          <div
            className={"papursButton"}
            style={{ width: 100, margin: "auto", marginBottom: 20 }}
            onClick={getStatusClicked}
          >
            Get status
          </div>
        </div>
      </div>
    </div>
  )

  function Modal(props) {
    function copyLinkClicked() {
      try {
        navigator.clipboard.writeText(props.description)
        alert("Link copied to clipboard")
      } catch (e) {
        alert("Failed to copy link, copy manually instead.")
      }
    }
    return (
      <div className={styles.modal}>
        <div className={styles.modalCon}>
          <div className={styles.modalTitle}>{props.title}</div>
          <div className={styles.modalDescription}>{props.description}</div>

          {props.link && (
            <div
              className={"papursButton"}
              style={{ width: 100 }}
              onClick={copyLinkClicked}
            >
              Copy Link
            </div>
          )}

          <div
            className={"papursButton"}
            style={{ width: 100 }}
            onClick={props.clearModal}
          >
            Close
          </div>
        </div>
      </div>
    )
  }

  function StatusModal(props) {
    return (
      <div className={styles.modal}>
        <div className={styles.modalCon}>
          <div className={styles.modalTitle}>{props.title}</div>
          <div>
            <Circle
              percent={(props.clicks / 5) * 100}
              style={{ width: 150, height: 150 }}
              strokeWidth={8}
              strokeColor={"#6d28d9"}
            />
          </div>
          <div className={styles.modalDescription}>{props.description}</div>
          <div
            className={"papursButton"}
            style={{ width: 100 }}
            onClick={props.clearModal}
          >
            Close
          </div>
        </div>
      </div>
    )
  }
}

export default Giveaway
