import React from "react"
import {Link} from "gatsby"
import { FaHeart } from "react-icons/fa";

const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <p>A hackathon built for UoB's <a href="https://intranet.birmingham.ac.uk/eps/lockdone/lockdone.aspx">LOCKDONE</a>, made with <span className="icon -love"><FaHeart/></span> by <Link to="/people">these lovely people</Link></p>
    </div>
  </footer>
)

export default Footer