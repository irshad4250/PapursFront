import React, { useState } from "react"
import styles from "../styles/contact.module.css"
import NoInputNavbar from "../components/NoInputNavbar"
import { postReq } from "../Global/functions"
import Head from "next/head"

function Contact(props) {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  async function sendClicked() {
    const response = await postReq(
      process.env.NEXT_PUBLIC_BACKEND_URL + "contact",
      { email, message }
    )

    if (response.error) {
      alert(response.info)
    } else {
      alert("Message successfully delivered.")
      setEmail("")
      setMessage("")
    }
  }

  return (
    <div className={styles.main}>
      <Head>
        <title>Papurs | Contact us</title>
      </Head>
      <NoInputNavbar />
      <div className={styles.messageBox}>
        <h1>Contact Us</h1>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          placeholder="Email"
          className={styles.emailInput}
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          className={styles.messageInput}
        ></textarea>
        <div
          className={"papursButton " + styles.sendButton}
          onClick={sendClicked}
        >
          Send
        </div>
      </div>
    </div>
  )
}

export default Contact
