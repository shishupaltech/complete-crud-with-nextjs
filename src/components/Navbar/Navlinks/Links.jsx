
import React from 'react'
import Link from 'next/link';
import styles from './link.module.css';
import NavSingleLink from './NavSingleLink/NavSingleLink';
const Navlinks = [
    {
        title:"Home",
        path:"/"
    },
    {
        title:"About",
        path:"/about"
    },
    {
        title:"Contact",
        path:"/contact"
    },
    {
        title:"Add Employee",
        path:"/addemployee"
    }
]
const Links = () => {
  return (
    <div className={styles.container}>
            {/* <Link href='/'>Home</Link>
            <Link href='/about'>About</Link>
            <Link href='/contact'>Contact</Link>
            <Link href='/addemployee'>Add Employee</Link> */}
            {
                Navlinks.map((navlinks)=>(
                    <NavSingleLink item={navlinks} key={navlinks.title}/>
                ))
            }

        </div>
  )
}

export default Links