import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Emoji from '../lib/emoji'


const name = <Emoji symbol="🏀"/>;

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {home ? (
          <>
            <Image        
              src="https://cdn.nba.com/manage/2021/07/NBA_75-690x588.jpg"
              height="100%"
              width="100%"
          
            />
            
            <h1 className={utilStyles.Applogo}>{name}</h1>
          </>
        ) 
        
        : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="https://cdn.nba.com/manage/2021/07/NBA_75-690x588.jpg"
              
                  height="100%"
                  width="100%"
                  alt={name}
                />
              </a>
            </Link>
          
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}