import React from 'react'
import styles from "./navbar.module.css";
import Link from 'next/link';
import Links from './Navlinks/Links';
const Navbar = () => {
  return (
    <div className={styles.container}>
        <Link href="/" className={styles.logo}>CRUD Operation</Link>
        <Links/>
        {/* <div className={styles.Navbar}>
            <Link href='/'>Home</Link>
            <Link href='/about'>About</Link>
            <Link href='/contact'>Contact</Link>
            <Link href='/addemployee'>Add Employee</Link>
        </div> */}
        <div className={styles.btns}>
            <button className={styles.login}>Login</button>
            <button className={styles.signup}>Sign Up</button>
        </div>
    </div>
  )
}

export default Navbar