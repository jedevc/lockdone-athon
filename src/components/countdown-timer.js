import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import { RiArrowDownLine, RiArrowRightSLine } from "react-icons/ri"
import { FaClock } from "react-icons/fa"

export default function BlogListHome() {
  return (
    <div className="countdown">
      <span class="icon">
        <FaClock />
      </span>

      <span class="time">
        <span class="hours">10</span>
        <span class="minutes">20</span>
        <span class="seconds">30</span>
      </span>
   </div>
  )
}