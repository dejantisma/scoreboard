
import { getScoreboardData } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Row, Col, Table } from 'react-bootstrap';
import Link from 'next/link';


export async function getStaticProps() {
  const scoreboardData = await getScoreboardData();
  return {
    props: {
      scoreboardData
    },
    revalidate:10
  }
}

export default function Games({ scoreboardData }) {
  var games = scoreboardData.scoreboard.games;

  return (

    <Container>
      <Head>
        <title>Games</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {games.map(({ gameId, gameStatusText, homeTeam, awayTeam }) => (
            <li className={utilStyles.listItem} key={gameId}>
              <Link href={`/games/${gameId}`}>
                <a>{awayTeam.teamCity + ' ' + awayTeam.teamName + ' @ ' + homeTeam.teamCity + ' ' + homeTeam.teamName} </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  )
}



