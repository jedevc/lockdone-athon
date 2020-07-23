import React, { useLayoutEffect, useState } from "react"
import useSWR from "swr"
import { graphql, useStaticQuery } from "gatsby"
import { FaClock } from "react-icons/fa"
import moment from "moment"

function googleCalendarURL(id, eventId, apiKey) {
  return new URL(`https://www.googleapis.com/calendar/v3/calendars/${id}/events/${eventId}?key=${apiKey}`)
}

export default function CountdownTimer() {
  const data = useStaticQuery(graphql`
    query HomeLayoutQuery {
      site {
        siteMetadata {
          eventStartString: eventStart
          eventEndString: eventEnd
          googleCalendarId: googleCalendarId
          googleCalendarApiKey: googleCalendarApiKey
          googleCalendarEventID: googleCalendarEventID
        }
      }
    }
  `)

  const {
    eventStartString,
    eventEndString,
    googleCalendarApiKey,
    googleCalendarId,
    googleCalendarEventID,
  } = data.site.siteMetadata

  const { data: times } = useSWR("event-data", async () => {
    let resp = await fetch(googleCalendarURL(googleCalendarId, googleCalendarEventID, googleCalendarApiKey))
    if (resp.ok) {
      let json = await resp.json()
      return {
        start: moment(json.start.dateTime),
        end: moment(json.end.dateTime),
      }
    } else {
      return { start: moment(eventStartString), end: moment(eventEndString) }
    }
  }, {
    initialData: {
      start: moment(eventStartString),
      end: moment(eventEndString),
    },
    revalidateOnMount: true,
  })

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
  if (now < times.start) {
    diff = moment.duration(times.start.diff(now))
    text = "to start"
  } else if (now > times.start && now < times.end) {
    diff = moment.duration(times.end.diff(now))
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
