import React from "react"
import Image from "next/image"
import styles from "../styles/components/explorerbar.module.css"
import ArchiveLogo from "../public/assets/icons/archive.svg"
import Link from "next/link"

function ExplorerBar({ href, label }) {
  return (
    <Link href={href}>
      <a>
        <li className={styles.container}>
          <div className={styles.logoContainer}>
            <Image
              alt="archive logo"
              src={ArchiveLogo}
              width={32}
              height={32}
              priority={true}
              loading={"eager"}
            />
          </div>
          <div className={styles.label}>{label}</div>
        </li>
      </a>
    </Link>
  )
}

export default ExplorerBar
