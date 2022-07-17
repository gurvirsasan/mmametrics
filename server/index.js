const path = require('path');
const express = require('express');
const puppeteer = require('puppeteer');
const _ = require('lodash');
const { getFighterData, baseUrl } = require('./sherdog.js');
const cors = require('cors');
const axios = require('axios').default;
const cheerio = require('cheerio');

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(
  cors({
    origin: 'https://mmametrics.herokuapp.com/',
  })
);

/**
 * Main API endpoint for retrieving fighter's data
 */
app.get('/api/fighter', async (req, res) => {
  const fighterSearchName = req.query.name;
  let sherdogLink = req.query.url;

  if (!fighterSearchName && !sherdogLink)
    return res
      .status(400)
      .json({ errorMessage: `You didn't provide fighter's name and/or url.` });

  if (fighterSearchName) {
    //----------------------------------+
    //  find the link
    //----------------------------------+
    const searchURL =
      'https://www.google.com/search?q=' +
      req.query.name.replace(' ', '+') +
      '+sherdog';
    const { data } = await axios
      .get(searchURL, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
        },
      })
      .catch((error) => console.error(error));
    // use cheerio to find the link
    const $ = cheerio.load(data);
    const searchResults = Array.from($('div[class="yuRUbf"] >a')).map((a) => ({
      title: $(a).text(),
      link: $(a).attr('href'),
    }));
    console.log(searchResults);
    sherdogLink = searchResults.find((searchResult) =>
      searchResult.link.includes(baseUrl)
    ).link;
  }

  if (fighterSearchName && req.query.url && sherdogLink !== req.query.url)
    console.log(
      `Found link for "${fighterSearchName}" and provided url: "${req.query.url}" are not the same. \n Outputting results for the searched name...\n`
    );

  if (!sherdogLink) {
    console.log('no link brrr', sherdogLink);
    const errMsg = fighterSearchName
      ? `No fighter found: ${fighterSearchName}`
      : `Url provided is incorrect: ${sherdogLink}`;
    return res.status(404).json({ errorMessage: errMsg });
  }

  //----------------------------------+
  //  Get the fighter's data
  //----------------------------------+
  getFighterData(sherdogLink, (fighterData) => {
    if (_.isEqual(fighterData, {}))
      return res.status(400).json({
        errorMessage: `${sherdogLink} is invalid. Could not retrieve fighter's data...`,
      });
    return res.status(200).json(fighterData);
  });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// websites used:
// https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
