import React from "react"
import styles from "../styles/components/giveaway.module.css"

function Giveaway(props) {
  return (
    <div className="divMargin">
      <div className={styles.giveaway}>
        <h1>Giveaway Alert!</h1>
        <p>
          Enter Papurs first giveaway for a chance to win an M3 Macbook Pro,
          Dell XPS 13, Galaxy Tab S8 and Airpods pros to help you in your
          studies! Click the button below to enter.
        </p>
        <div
          onClick={() => {
            window.location.href = "/intro"
          }}
          className={styles.giveawayButton}
        >
          Enter Giveaway
        </div>
      </div>
    </div>
  )
}

export default Giveaway
