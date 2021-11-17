
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
    }
  }
}


export default function Games({ scoreboardData }) {

  var games = scoreboardData.scoreboard.games;

  return (

    <Container>
      

      <Card border="secondary" style={{ width: '18rem' }}>
    <Card.Header>Header</Card.Header>
    <Card.Body>
      <Card.Title>Secondary Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Card.Body>
  </Card>


      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
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



