
import { getScoreboardData } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Link from 'next/link';


export async function getStaticProps() {
  const scoreboardData = await getScoreboardData();
  return {
    props: {
      scoreboardData
    }
  }
}


export default function Games({ scoreboardData }) {

  var games = scoreboardData.scoreboard.games;

  return (

    <Container>

      <h1>First Post</h1>


      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>LIVE</h2>
        <ul className={utilStyles.list}>
          {games.map(({ gameId, gameStatusText, homeTeam, awayTeam }) => (
            <li className={utilStyles.listItem} key={gameId}>
              <Link href={`/games/${gameId}`}>
            <a>{awayTeam.teamCity + ' '+ awayTeam.teamName + ' @ '+homeTeam.teamCity + ' '+ homeTeam.teamName} </a>
          </Link>
            </li>
          ))}
        </ul>
      </section>

    </Container>

  )

}



