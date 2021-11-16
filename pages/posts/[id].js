import Layout from '../../components/layout'
import { getAllGameIds, getGameData } from '../../lib/posts'
import Image from 'next/image'
import Head from 'next/head'
import styles from '../../components/layout.module.css'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav, Navbar, Alert } from 'react-bootstrap';
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

      <div style={{ textAlign: 'center', }} >
        <Image src={awayTeamLogoURL} height={200} width={200} className={utilStyles.imageInline}></Image>
        <h1 className={utilStyles.scoreInline}>{game.awayTeam.score}</h1>
        <h1 className={utilStyles.clockInline}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{game.gameStatusText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
        <h1 className={utilStyles.scoreInline}>{game.homeTeam.score}  </h1>
        <Image src={homeTeamLogoURL} height={200} width={200} className={utilStyles.imageInline}></Image>

      </div>


      





      <h1 >  </h1>


    </Layout>





  )
}

export async function getStaticPaths() {
  const paths = await getAllGameIds();
  console.log('hi');
  console.log(paths);
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const gameData = await getGameData(params.id)
  return {
    props: {
      gameData
    }
  }
}