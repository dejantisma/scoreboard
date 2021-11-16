import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Navbar } from 'react-bootstrap';
import { getScoreboardData } from '../lib/posts'
import Link from 'next/link';



const getCloseGame = (games) => {

  //console.log(games);
  // return {
  //   game: games[1]
    
  // }

  for(var i = 0; i < games.length; i++){
    if(games[i].gameStatusText.startsWith('Q4')){ 
      if(games[i].homeTeam.score - games[i].awayTeam.score <= 10 ){
        console.log('entered');
        return {  
          game: games[i],
          leader: games[i].homeTeam,
          scoreDiff: games[i].homeTeam.score - games[i].awayTeam.score
        }
      } else if(games[i].awayTeam.score - games[i].homeTeam.score <= 10 ){
        console.log('entered');
        return {  
          game:games[i],
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
      scoreboardData
    }
  }
}


export default function Home( {scoreboardData } ) {

  var games = scoreboardData.scoreboard.games;
  var closeGame = getCloseGame(games);
  console.log(JSON.stringify(closeGame.leader));
 
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
      </section>

      


{closeGame ?  //if close game display alert
      <Alert variant="danger">
        <Alert.Heading>Down to the wire in <Link href={`/posts/${closeGame.game.gameId}`}><a>{closeGame.game.homeTeam.teamCity}</a></Link>!</Alert.Heading>
        <p>
          {closeGame.leader.teamName} up {closeGame.scoreDiff} with         {closeGame.game.gameStatusText.slice(4)} left to go in the 4th.
        </p>
      </Alert>

      : <></>

}

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>LIVE</h2>
        <ul className={utilStyles.list}>
          {games.map(({ gameId, gameStatusText, homeTeam, awayTeam }) => (
            <li className={utilStyles.listItem} key={gameId}>
              <Link href={`/posts/${gameId}`}>
            <a>{awayTeam.teamCity + ' '+ awayTeam.teamName + ' @ '+homeTeam.teamCity + ' '+ homeTeam.teamName} </a>
          </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}