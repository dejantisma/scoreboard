import Layout from '../../components/layout'
import { getAllGameIds, getGameData } from '../../lib/posts'
import Image from 'next/image'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table } from 'react-bootstrap';
import utilStyles from '../../styles/utils.module.css'

export default function Post({ gameData }) {
  var game = gameData.result[0];
  var homeTeamLogoURL = `https://cdn.nba.com/logos/nba/${game.homeTeam.teamId}/primary/L/logo.svg`;
  var awayTeamLogoURL = `https://cdn.nba.com/logos/nba/${game.awayTeam.teamId}/primary/L/logo.svg`;

  return (

    <Layout>
      <Head>
        <title>{game.gameCode}</title>
      </Head>

      {/* <div style={{ textAlign: 'center', }} >
        <div className={utilStyles.imageInline}>
          <Image src={awayTeamLogoURL} height={200} width={200}></Image>
        </div>
        <h1 className={utilStyles.scoreInline}>{game.awayTeam.score}</h1>
        <h1 className={utilStyles.clockInline}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{game.gameStatusText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
        <h1 className={utilStyles.scoreInline}>{game.homeTeam.score}  </h1>
        <Image src={homeTeamLogoURL} height={200} width={200} className={utilStyles.imageInline}></Image>
      </div> */}
      

      <Container>
        <Row>
          <Col>
            <Image src={awayTeamLogoURL} height={200} width={200}></Image>
            <p style={{ textAlign: 'center' }}>{game.awayTeam.teamCity + ' ' + game.awayTeam.teamName}</p>
            <p style={{ textAlign: 'center', lineHeight:.2}}>{game.awayTeam.wins + '-' + game.awayTeam.losses}</p>
          </Col>
          <Col lg={7} style={{ textAlign: 'center' }}>
            <h1 className={utilStyles.scoreInline}>{game.awayTeam.score}</h1>
            <h1 className={utilStyles.clockInline}> &nbsp;&nbsp;&nbsp;{game.gameStatusText}&nbsp;&nbsp;&nbsp;</h1>
            <h1 className={utilStyles.scoreInline}>{game.homeTeam.score}  </h1>
          </Col>
          <Col>
            <Image src={homeTeamLogoURL} height={200} width={200}></Image>
            <p style={{ textAlign: 'center'  }}>{game.homeTeam.teamCity + ' ' + game.homeTeam.teamName}</p>
            <p style={{ textAlign: 'center',lineHeight:.2 }}>{game.homeTeam.wins + '-' + game.homeTeam.losses}</p>
          </Col>
        </Row>
{/* 
        <Table size="sm">
          <thead>
            <tr>
              <th className={utilStyles.tableHeader}>PLAYER</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table> */}

      </Container>
    </Layout>

  )
}

export async function getStaticPaths() {
  const paths = await getAllGameIds();
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const gameData = await getGameData(params.id)
  return {
    props: {
      gameData,
      revalidate: 10
    }
  }
}