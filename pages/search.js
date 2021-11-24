
import { getScoreboardData } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image'
import Head from 'next/head'
import Layout from '../components/layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Badge, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
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

export default function Search({ scoreboardData }) {

    const [searchInput, setSearchInput] = useState('');
    const [player, setPlayer] = useState(null);


    const searchPlayer = (e) => {
        fetch(`https://content-api-prod.nba.com/public/1/search/player?q=${encodeURIComponent(searchInput)}&page=1&count=10&offset=0&sources=league&region=united-states&sort=rel`, {
            "headers": {
              "accept": "*/*",
              "accept-language": "en-US,en;q=0.9",
              "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site"
            },
            "referrer": "https://www.nba.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "omit"
          }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).then(data => {
            if (data.results.count != 0) {
                console.log(data);
                setPlayer(data.results.items[0]);
            }

        })

    }

    return (
        <Layout>
            <Container>
                <Head>
                    <title>Search</title>
                </Head>
                <Badge bg="secondary">Beta</Badge>
                <Row>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="LeBron James"
                            aria-label="Player"
                            aria-describedby="basic-addon2"
                            onChange={e => setSearchInput(e.target.value)}
                        />
                        <Button onClick={searchPlayer} variant="outline-secondary" id="button-addon2">
                            Search
                        </Button>
                    </InputGroup>
                    
                </Row>
                <Row>
                <Col/>
                    <Col>
                    {

                        player === null ? <></> :
                        <div className={utilStyles.parent}>
                        <br />
                        <svg width="600" height="380">
                          <rect width="600" height="380" rx='15' className={utilStyles.image1} style={{ fill: `${getMainColor(player.teamAbbr).hex}` }} />
                        </svg>
                        <img className={utilStyles.iamge2Search} width="500" src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.pid}.png`} />
                        <p style={{ color: `${getSecondaryColor(player.teamAbbr).hex}` }} className={utilStyles.statsSearch}>{player.ppg}p<br />{player.rpg}r<br />{player.apg}a</p>
                        <br />
                      </div>

                    }
                    </Col>
                    <Col/>
                </Row>


            </Container>
        </Layout>
    )


}