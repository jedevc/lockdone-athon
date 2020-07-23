import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import googleCalendarPlugin from "@fullcalendar/google-calendar"

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
  return (
    <FullCalendar
      plugins={[dayGridPlugin, googleCalendarPlugin]}
      googleCalendarApiKey={googleCalendarApiKeyString}
      initialView="dayGridMonth"
      eventSources={[
        {
          googleCalendarId: googleCalendarIdString,
        },
      ]}
    />
  )
}
