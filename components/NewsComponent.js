import React from "react"
import styles from "../styles/Components/news.module.css"

function NewsComponent(props) {
  return (
    <div className={styles.news}>
      <div className={styles.newsHeader}>
        <h2>{props.title}</h2>
        <div className={styles.date}>{props.date}</div>
      </div>
      <div>{props.body}</div>
    </div>
  )
}

export default NewsComponent
