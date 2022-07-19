const path = require('path');
const express = require('express');
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
 * Summary: Perform a google search for the given name
 * @param {*} name string
 * @returns returns an Object of title and links for the google saerch
 */
const googleSearch = async (name) => {
  const searchURL =
    'https://www.google.com/search?q=' + name.replace(' ', '+') + '+sherdog';
  try {
    const { data } = await axios.get(searchURL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
      },
    });
    const $ = cheerio.load(data);
    return Array.from($('.yuRUbf >a')).map((a) => ({
      title: $(a).text(),
      link: $(a).attr('href'),
    }));
  } catch (error) {
    console.error(error);
  }
};

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
    console.log('Fetching for sherdog link ...');
    const searchResults = await googleSearch(req.query.name);
    try {
      sherdogLink = searchResults.find((searchResult) =>
        searchResult.link.includes(baseUrl)
      ).link;
    } catch (error) {
      return res.status(404).json({
        errorMessage: `Fighter not found`,
      });
    }
  }

  if (fighterSearchName && req.query.url && sherdogLink !== req.query.url)
    console.log(
      `Found link for "${fighterSearchName}" and provided url: "${req.query.url}" are not the same. \n Outputting results for the searched name...\n`
    );

  if (!sherdogLink)
    return res
      .status(404)
      .json({ errorMessage: `Url provided is incorrect: ${sherdogLink}` });

  //----------------------------------+
  //  Get the fighter's data
  //----------------------------------+
  getFighterData(sherdogLink, async (fighterData) => {
    if (_.isEqual(fighterData, {}) || _.isEqual(fighterData.fights, []))
      return res.status(400).json({
        errorMessage: `Fighter not found`,
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
