import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Badge, Card, Col, Container, Row } from 'react-bootstrap';
import { getScoreboardData } from '../lib/posts'
import Link from 'next/link';
import Emoji from '../lib/emoji'

const getCloseGame = (games) => {

  for (var i = 0; i < games.length; i++) {
    if (games[i].gameStatusText.startsWith('Q4')) {
      if (games[i].homeTeam.score - games[i].awayTeam.score <= 9 && games[i].homeTeam.score - games[i].awayTeam.score >= 1) {
        return {
          game: games[i],
          leader: games[i].homeTeam,
          scoreDiff: games[i].homeTeam.score - games[i].awayTeam.score
        }
      } else if (games[i].awayTeam.score - games[i].homeTeam.score <= 9 && games[i].awayTeam.score - games[i].homeTeam.score >= 1) {
        return {
          game: games[i],
          leader: games[i].awayTeam,
          scoreDiff: games[i].awayTeam.score - games[i].homeTeam.score
        }
      }
    }
  }

}

export async function getStaticProps() {
  const scoreboardData = await getScoreboardData();
  return {
    props: {
      scoreboardData,
      revalidate: 5
    }
  }
}


export default function Home({ scoreboardData }) {

  var games = scoreboardData.scoreboard.games;
  var closeGame = getCloseGame(games);
  //console.log(JSON.stringify(closeGame.leader));

  return (
    <Container>
      <Layout home>
        <Head>
          <title>Scoreboard</title>
        </Head>
        <section className={utilStyles.headingMd}>
        </section>

        {closeGame ?  //if close game display alert
          <Alert variant="danger">
            <Alert.Heading>Down to the wire in <Link href={`/games/${closeGame.game.gameId}`}><a>{closeGame.game.homeTeam.teamCity}!</a></Link> <Badge bg="danger">LIVE</Badge> </Alert.Heading>
            <p>
              {closeGame.leader.teamName} up {closeGame.scoreDiff} with         {closeGame.game.gameStatusText.slice(4)} left to go in the 4th.
            </p>
          </Alert>

          : <></>

        }
     <br />
<Link href='/leaders'>
          <Card style={{ cursor: 'pointer' }} border="info">
            <Card.Header><Card.Title><Emoji symbol='🔍' /> Search</Card.Title></Card.Header>
            <Card.Body>
              <Card.Text>
                Search players to look at their statistics.
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>

        <br />     <br />

        <Link href="/games">
          <Card style={{ cursor: "pointer" }} border="info">

            <Card.Header><Card.Title><Emoji symbol="📋" /> Scores</Card.Title></Card.Header>
            <Card.Body>
              <Card.Text>
                Catch all of tonight's action here!
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>

        <br /> <br />
        <Link href='/leaders'>
          <Card style={{ cursor: 'pointer' }} border="info">
            <Card.Header><Card.Title><Emoji symbol='🥇' /> Leaders</Card.Title></Card.Header>
            <Card.Body>
              <Card.Text>
                See who balled out tonight!
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>

      </Layout>

    </Container>
  )
}