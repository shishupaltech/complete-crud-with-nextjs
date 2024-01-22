import React from 'react'
import Link from 'next/link';
import styles from './navsinglelink.module.css'
const NavSingleLink = ({item}) => {
  return (
    <div className={styles.container}>
        <Link href={item.path}>
            {item.title}
        </Link>
    </div>
  )
}

export default NavSingleLink