const score = require('../score2.json');

export async function getScoreboardData() {

    const res = await fetch("https://nba-prod-us-east-1-mediaops-stats.s3.amazonaws.com/NBA/liveData/scoreboard/todaysScoreboard_00.json", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});

return score;



}

export async function getAllGameIds() {
  const IDs = await getScoreboardData();
  return IDs.scoreboard.games.map(name => {
    return {
      params: {
        id: name.gameId
      }
    }
  })
}

export async function getGameData(id) {

  var data = await getScoreboardData();
  var result = data.scoreboard.games.filter(obj => {
    return obj.gameId === id;
  });
  
  return{
    result
  }
   

  }




