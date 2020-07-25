import React from "react"
import Loadable from "react-loadable"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { FaDiscord } from "react-icons/fa"

import Layout from "../components/layout"
import BlogListHome from "../components/blog-list-home"
import CountdownTimer from "../components/countdown-timer"
import SEO from "../components/seo"

export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        tagline
        description
        summary
        featuredImage {
          childImageSharp {
            fluid(
              maxWidth: 480
              maxHeight: 380
              quality: 100
              srcSetBreakpoints: [960, 1440]
            ) {
              ...GatsbyImageSharpFluid
            }
            sizes {
              src
            }
          }
        }
        discord {
          link
        }
      }
    }
  }
`

const LoadableEventCalendar = Loadable({
  loader: () => import("../components/calendar"),
  loading() {
    return <></>
  },
})

const HomePage = ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.fluid
    : ""
  return (
    <Layout>
      <SEO />
      <div className="home-banner grids col-1 sm-2">
        <div>
          <h1 className="title">{frontmatter.title}</h1>
          <p className="tagline">{frontmatter.tagline}</p>
          <div className="description">{frontmatter.description}</div>
          <a href={frontmatter.discord.link} className="button">
            Join the Discord
            <span className="icon -right">
              <FaDiscord />
            </span>
          </a>
        </div>
        <div>
          {Image ? (
            <Img
              fluid={Image}
              alt={frontmatter.title + " - Featured image"}
              className="featured-image"
            />
          ) : (
            ""
          )}
        </div>
      </div>

      <CountdownTimer />

      <p className="summary">{frontmatter.summary}</p>

      <div className="calendar">
        <LoadableEventCalendar />
      </div>

      <div className="content" dangerouslySetInnerHTML={{ __html: html }} />

      {/* <BlogListHome /> */}
    </Layout>
  )
}

export default HomePage
