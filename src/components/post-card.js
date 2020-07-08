import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

export default function PostCard({ title, slug, link, date, featuredImage }) {
  let img
  if (featuredImage) {
    img = (
        <Img
          fluid={featuredImage.childImageSharp.fluid}
          objectFit="cover"
          objectPosition="50% 50%"
          alt={title + " - Featured image"}
          className="featured-image"
        />
    )
  }

  return (
    <article className="post-card">
      {slug ? (
        <Link to={slug}>
          {img}
        </Link>
      ) : link ? (
        <a href={link}>
          {img}
        </a>
      ) : img}
      <div className="post-content">
        <h2 className="title">
          {slug ? <Link to={slug}>{title}</Link> : title}
        </h2>
        {date && (
          <p className="meta">
            <time>{date}</time>
          </p>
        )}
      </div>
    </article>
  )
}
