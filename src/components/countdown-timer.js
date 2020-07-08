import React, { useLayoutEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { FaClock } from "react-icons/fa"
import moment from "moment"

export default function CountdownTimer() {
  const data = useStaticQuery(graphql`
    query HomeLayoutQuery {
      site {
        siteMetadata {
          eventStartString: eventStart
          eventEndString: eventEnd
        }
      }
    }
  `)

  const { eventStartString, eventEndString } = data.site.siteMetadata
  const eventStart = moment(eventStartString)
  const eventEnd = moment(eventEndString)

  const [now, setNow] = useState(null)
  useLayoutEffect(() => {
    setNow(moment())
    const interval = setInterval(() => {
      setNow(moment())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  if (now == null) {
    return <></>
  }

  let diff
  let text
  if (now < eventStart) {
    diff = moment.duration(eventStart.diff(now))
    text = "to start"
  } else if (now > eventStart && now < eventEnd) {
    diff = moment.duration(eventEnd.diff(now))
    text = "left"
  } else {
    diff = null
    text = "time up!"
  }

  return (
    <div className="countdown">
      <span className="icon">
        <FaClock />
      </span>

      <span className="time">
        <span className="hours">
          {Math.floor(diff.asHours()).toString().padStart(2, "0")}
        </span>
        <span className="minutes">
          {diff.minutes().toString().padStart(2, "0")}
        </span>
        <span className="seconds">
          {diff.seconds().toString().padStart(2, "0")}
        </span>
        {" " + text}
      </span>
    </div>
  )
}
