import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './styles.css'
import { AiOutlineMenu } from 'react-icons/ai'
import MediaQuery from 'react-responsive'
import { background } from '../../assets/styles/colors'

export type NavbarProps = {
  vertical?: boolean
}

export const NavBar = (props: NavbarProps) => {
  const [openMobileNavbar, setOpenMobileNavbar] = React.useState(false)
  const location = useLocation()

  React.useEffect(() => {
    if (location.hash) {
      const elem: HTMLElement = document.getElementById(location.hash.slice(1)) as HTMLElement
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }, [location])

  const toggleMobileNavbar = (open: boolean) => setOpenMobileNavbar(open)

  return (
    <div>
      <div
        className={`links-container container-${props.vertical ? 'vertical' : 'horizontal'}`}
        style={{ backgroundColor: background }}
      >
        <Link to='/#top' className='navbarLink'>
          <span>Home</span>
        </Link>
      </div>
    </div>
  )
}
