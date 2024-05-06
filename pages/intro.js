import React from "react"
import styles from "../styles/intro.module.css"
import Image from "next/image"
import Head from "next/head"

import searchEngineImage from "../public/assets/images/searchEngine.png"
import navigatorImage from "../public/assets/images/navigator.png"
import quickSwitchImage from "../public/assets/images/quickSwitch.png"
import creatorImage from "../public/assets/images/creator.png"
import instantAnswerImage from "../public/assets/images/instantAnswer.png"

import airpodImage from "../public/assets/images/airpod.jpg"
import macImage from "../public/assets/images/mac.jpg"
import samsungImage from "../public/assets/images/tab.jpg"
import dellImage from "../public/assets/images/xps.jpg"

function intro(props) {
  return (
    <div>
      <Head>
        <meta name="theme-color" content="#6d28d9" />
        <title>Papurs</title>
      </Head>
      <div className={styles.firstSlide}>
        <div className={styles.leftTitle}>
          <div className={styles.title}>Papurs</div>
        </div>
        <div className={styles.secondColumn}>
          <div className={styles.no1}>The #1 website for CIE students</div>
          <div className={styles.description}>
            Made by students for students. Papurs has been designed to enable
            excellence, most of our student users obtain A* and A grades in
            their O-Level and A-Level exams thank to our tools such as the Past
            Papers search engine.
          </div>
          <div className={styles.scrollDown}>Scroll Down For Giveaway</div>
        </div>
      </div>
      <div className={styles.secondSlide}>
        <div className={styles.secondSlideFirstRow}>
          <div className={styles.secondSlideFirstRowTitle}>
            Creating smart and innovative features to enhance your learning
            experience
          </div>
          <div className={styles.secondSlideFirstRowDescription}>
            Our initial idea was to create a Past papers search engine and we
            were successful in doing so. We have now expanded our services to
            include a variety of tools such as the past papers navigator, past
            papers creator an more!
          </div>
          <div className={styles.secondSlideSecondRow}>
            <div className={styles.secondSlideSecondRowListings}>
              <div className={styles.listingPicture}>
                <Image
                  src={searchEngineImage}
                  alt="search engine"
                  priority={true}
                />
              </div>
              <div className={styles.listingDescription}>
                <div className={styles.listingDescriptionTitle}>
                  Search engine
                </div>
                Query more than 5000+ CIE past papers all at your fingertips,
                equipped with autocomplete.
              </div>
            </div>
            <div className={styles.secondSlideSecondRowListings}>
              <div className={styles.listingPicture}>
                <Image
                  src={navigatorImage}
                  alt="Past papers navigator"
                  priority={true}
                />
              </div>
              <div className={styles.listingDescription}>
                <div className={styles.listingDescriptionTitle}>
                  Past Papers Navigator
                </div>
                Browse past papers blazing fast and easily with our innovative
                tool without needing to switch multiple pages.
              </div>
            </div>
            <div className={styles.secondSlideSecondRowListings}>
              <div className={styles.listingPicture}>
                <Image
                  src={quickSwitchImage}
                  alt="Quick Switch"
                  priority={true}
                />
              </div>
              <div className={styles.listingDescription}>
                <div className={styles.listingDescriptionTitle}>
                  Quick Switch
                </div>
                Use our Quick Switch feature to navigate between qp and ms. No
                need to change tabs. Fast, efficient and easy is our motto.
              </div>
            </div>
            <div className={styles.secondSlideSecondRowListings}>
              <div className={styles.listingPicture}>
                <Image src={creatorImage} alt="Quick Switch" priority={true} />
              </div>
              <div className={styles.listingDescription}>
                <div className={styles.listingDescriptionTitle}>
                  Past Papers Creator
                </div>
                Create a book of past papers with our Past Papers Creator tool.
                A world's first, we are committed to innovation.
              </div>
            </div>
            <div className={styles.secondSlideSecondRowListings}>
              <div className={styles.listingPicture}>
                <Image
                  src={instantAnswerImage}
                  alt="Instant Answer"
                  priority={true}
                />
              </div>
              <div className={styles.listingDescription}>
                <div className={styles.listingDescriptionTitle}>
                  Instant Answer
                </div>
                View the answers to the past papers instantly when searching
                query, without having to open the pdf. 60,000+ questions and
                answers!
              </div>
            </div>
          </div>
          <div
            className={styles.no1}
            style={{
              margin: "auto",
              textAlign: "center",
              marginTop: 50,
              marginBottom: 30,
            }}
          >
            Papurs.com and you're in!
          </div>
          <div
            className={styles.secondSlideFirstRowDescription}
            style={{ marginTop: 0, marginBottom: 20 }}
          >
            No need to go to multiple websites to find past papers, we have it
            all in one place. Just go to your address bar and type papurs.com.
          </div>
        </div>
      </div>

      <div className={styles.thirdSlide}>
        <div className={styles.giveawayTitle}>Giveaway alert!</div>
        <div className={styles.giveawayDescription}>
          Papurs is hosting it's first ever giveaway, participate now to stand
          for a chance to win huge prizes. The giveaway is open to anyone. The
          prizes are student oriented. We have laptops, tablets, headphones. All
          which will be useful in your studies.
        </div>

        <div className={styles.secondSlideSecondRow}>
          <div className={styles.secondSlideSecondRowListings}>
            <div className={styles.listingPicture}>
              <Image
                src={macImage}
                alt="Macbook Pro"
                priority={true}
                width={150}
                height={150}
                objectFit="cover"
              />
            </div>
            <div className={styles.listingDescription}>
              <div className={styles.listingDescriptionTitle}>
                1st Prize Macbook Pro
              </div>
              Win a brand new 14" M3 Macbook Pro, the perfect tool for your
              studies. Worth $1700.
            </div>
          </div>

          <div className={styles.secondSlideSecondRowListings}>
            <div className={styles.listingPicture}>
              <Image
                src={dellImage}
                alt="Dell XPS 13"
                priority={true}
                width={150}
                height={150}
                objectFit="cover"
              />
            </div>
            <div className={styles.listingDescription}>
              <div className={styles.listingDescriptionTitle}>
                2: Dell XPS 13
              </div>
              The perfect windows laptop for students. Worth $1100.
            </div>
          </div>

          <div className={styles.secondSlideSecondRowListings}>
            <div className={styles.listingPicture}>
              <Image
                src={samsungImage}
                alt="Samsung Tab S8"
                priority={true}
                width={150}
                height={150}
                objectFit="cover"
              />
            </div>
            <div className={styles.listingDescription}>
              <div className={styles.listingDescriptionTitle}>
                3: Samsung tab S8
              </div>
              Innovative reading experience with the Samsung Tab S8. Worth $800.
            </div>
          </div>

          <div className={styles.secondSlideSecondRowListings}>
            <div className={styles.listingPicture}>
              <Image
                src={airpodImage}
                alt="Airpods Pro"
                priority={true}
                width={150}
                height={150}
                objectFit="cover"
              />
            </div>
            <div className={styles.listingDescription}>
              <div className={styles.listingDescriptionTitle}>
                4: Airpods Pro
              </div>
              Win a pair of Airpods Pro, the perfect companion for your studies.
              Worth $250.
            </div>
          </div>
        </div>

        <div className={styles.howToEnter}>
          Click on the Enter Giveaway button below to participate. More details
          will be on the next page.
        </div>
        <div
          className={styles.enterGiveaway}
          onClick={() => {
            window.location.href = "/giveaway"
          }}
        >
          Enter Giveaway
        </div>
      </div>
    </div>
  )
}

export default intro

{
  /* <div className={styles.listingDescription}>
            <div className={styles.listingDescriptionTitle}>
              2nd Dell XPS 13
            </div>
            The perfect windows laptop for students. Worth $1100.
          </div>
          <div className={styles.listingDescription}>
            <div className={styles.listingDescriptionTitle}>
              3rd Samsung tab S8
            </div>
            Innovative reading experience with the Samsung Tab S8. Worth $800.
          </div>
          <div className={styles.listingDescription}>
            <div className={styles.listingDescriptionTitle}>
              4th Airpods Pro
            </div>
            Win a pair of Airpods Pro, the perfect companion for your studies.
            Worth $250.
          </div> */
}
