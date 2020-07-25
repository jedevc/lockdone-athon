import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import PostCard from "../components/post-card"
import SEO from "../components/seo"

export const query = graphql`
  query PeopleQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
    }
    people: allPeopleYaml {
      nodes {
        name
        link
        picture {
          childImageSharp {
            fluid(maxWidth: 540, maxHeight: 540, quality: 80) {
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
          }
        }
      }
    }
  }
`

export default function PeopleList({ data }) {
  const people = data.people.nodes.map((node, index) => (
    <PostCard
      key={index}
      title={node.name}
      featuredImage={node.picture}
      link={node.link}
    />
  ))

  return (
    <Layout className="blog-page">
      <SEO title="People" />
      <h1>People</h1>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      <div className="grids col-1 sm-2 lg-3">{people}</div>
    </Layout>
  )
}
