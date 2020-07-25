import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import PostCard from "../components/post-card"
import SEO from "../components/seo"

export const query = graphql`
  query ChallengeQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
    }
    challenges: allChallengesYaml {
      nodes {
        summary
        points
        image {
          childImageSharp {
            fluid(maxWidth: 356, maxHeight: 200, quality: 80) {
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
          }
        }
      }
    }
  }
`

export default function ChallengeList({ data }) {
  const challenges = data.challenges.nodes.map((node, i) => (
    <PostCard key={i} title={node.summary} featuredImage={node.image}>
      <ul>
        {node.points.map((point, j) => (
          <li key={j}>{point}</li>
        ))}
      </ul>
    </PostCard>
  ))

  return (
    <Layout className="blog-page">
      <SEO title="Challenges" />
      <h1>Challenges</h1>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      <div className="grids col-1 sm-2 lg-3">{challenges}</div>
    </Layout>
  )
}
