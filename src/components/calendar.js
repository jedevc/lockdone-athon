import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import googleCalendarPlugin from "@fullcalendar/google-calendar"
import moment from "moment"

export default function EventCalendar() {
  const data = useStaticQuery(graphql`
    query GoogleCalendarQuery {
      site {
        siteMetadata {
          googleCalendarIdString: googleCalendarId
          googleCalendarApiKeyString: googleCalendarApiKey
        }
      }
    }
  `)

  const {
    googleCalendarIdString,
    googleCalendarApiKeyString,
  } = data.site.siteMetadata

  const initialScrollTime = moment().format("HH:mm:ss")

  return (
    <FullCalendar
      plugins={[timeGridPlugin, googleCalendarPlugin]}
      googleCalendarApiKey={googleCalendarApiKeyString}
      initialView="timeGridWeek"
      height={500}
      nowIndicator={true}
      scrollTime={initialScrollTime}
      eventSources={[
        {
          googleCalendarId: googleCalendarIdString,
        },
      ]}
    />
  )
}
