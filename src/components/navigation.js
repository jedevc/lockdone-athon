import React from "react"
import { Link } from "gatsby"
import { RiMenu3Line, RiCloseLine } from "react-icons/ri"

const MenuItems = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/challenges",
    title: "Challenges",
  },
  {
    path: "https://ctf.lockd.one",
    title: "CTF",
    absolute: true,
  },
  {
    path: "/people",
    title: "People",
  },
  // {
  //   path: "/blog",
  //   title: "Blog"
  // },
]

const ListLink = props => {
  if (props.absolute) {
    return (
      <li>
        <a href={props.to}>{props.children}</a>
      </li>
    )
  } else {
    return (
      <li>
        <Link to={props.to}>{props.children}</Link>
      </li>
    )
  }
}

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showMenu: false }

    this.handleToggleClick = this.handleToggleClick.bind(this)
  }

  handleToggleClick() {
    this.setState(state => ({
      showMenu: !state.showMenu,
    }))
  }

  render() {
    const listMenuItems = MenuItems.map((menuItem, index) => (
      <ListLink key={index} to={menuItem.path} absolute={menuItem.absolute}>
        {menuItem.title}
      </ListLink>
    ))
    return (
      <nav className="site-navigation">
        <button
          onClick={this.handleToggleClick}
          className={"menu-trigger" + (this.state.showMenu ? " is-active" : "")}
        >
          <div className="icon-menu-line">
            <RiMenu3Line />
          </div>
          <div className="icon-menu-close">
            <RiCloseLine />
          </div>
        </button>
        <ul>{listMenuItems}</ul>
      </nav>
    )
  }
}

export default Navigation
