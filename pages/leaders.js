
import { getScoreboardData } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image'
import Head from 'next/head'
import Layout from '../components/layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Alert, Row, Col, Table } from 'react-bootstrap';
import Link from 'next/link';
import { getMainColor, getSecondaryColor } from 'nba-color';

export async function getStaticProps() {
  const scoreboardData = await getScoreboardData();
  return {
    props: {
      scoreboardData,
      revalidate: 10
    }
  }
}

export default function Leaders({ scoreboardData }) {
  var games = scoreboardData.scoreboard.games;
  var leaders = games.flatMap(game => {
    return [game.gameLeaders.homeLeaders, game.gameLeaders.awayLeaders]
  });

  
  console.log(leaders);

  leaders = leaders.filter(leader => leader.personId != 0 && leader.playerSlug != null);
  
  console.log(leaders);
  
  return (
    <Layout>
      <Container>
        <Head>
          <title>Leaders</title>
        </Head>
        <div>
          {leaders.length === undefined || leaders.length === 0 ?
          <><br/>
            <Alert variant="primary">
              <Alert.Heading>No leaders currently! </Alert.Heading>
              <p>
               Check back later when games are on!
              </p>
            </Alert>
            </>
            : leaders.map(leader =>
              <div className={utilStyles.parent}>
                <br />
                <svg width="600" height="380">
                  <rect width="600" height="380" rx='15' className={utilStyles.image1} style={{ fill: `${getMainColor(leader.teamTricode).hex}` }} />
                </svg>
                <img className={utilStyles.image2} width="500" src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${leader.personId}.png`} />
                <p style={{ color: `${getSecondaryColor(leader.teamTricode).hex}` }} className={utilStyles.stats}>{leader.points}p<br />{leader.rebounds}r<br />{leader.assists}a</p>
                <br />
              </div>
            )}
        </div>
      </Container>
    </Layout>

  )

}



