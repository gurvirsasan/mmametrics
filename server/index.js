const path = require('path');
const express = require('express');
const puppeteer = require('puppeteer');
const _ = require('lodash');
const { getFighterData, baseUrl } = require('./sherdog.js');
const cors = require('cors');

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
  console.log('received the order to fetch data...');
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
    // const browser = await puppeteer.launch();
    try {
      const browser = await puppeteer.launch({
        ignoreDefaultArgs: ['--disable-extensions'],
      });

      const page = await browser.newPage();
      const searchURL =
        'https://www.google.com/search?q=' +
        req.query.name.replace(' ', '+') +
        '+sherdog';

      // search
      await page.goto(searchURL);
      await page.waitForSelector('.LC20lb', { visible: true });

      // find link
      const searchResults = await page.$$eval('.LC20lb', (els) =>
        els.map((e) => ({ title: e.innerText, link: e.parentNode.href }))
      );
      sherdogLink = searchResults.find((searchResult) =>
        searchResult.link.includes(baseUrl)
      ).link;
      // close browser
      browser.close();
    } catch (error) {
      console.log(error);
    }
  }

  if (fighterSearchName && req.query.url && sherdogLink !== req.query.url)
    console.log(
      `Found link for "${fighterSearchName}" and provided url: "${req.query.url}" are not the same. \n Outputting results for the searched name...\n`
    );

  if (!sherdogLink) {
    return res
      .status(404)
      .json(
        fighterSearchName
          ? `No fighter found: ${fighterSearchName}`
          : `Url provided is incorrect: ${sherdogLink}`
      );
  }

  //----------------------------------+
  //  Get the fighter's data
  //----------------------------------+
  console.log('asking sherdog.js to return data');
  getFighterData(sherdogLink, (fighterData) => {
    if (_.isEqual(fighterData, {}))
      return res
        .status(400)
        .json(
          `${sherdogLink} is invalid. Could not retrieve fighter's data...`
        );
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
