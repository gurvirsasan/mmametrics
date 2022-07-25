//-------------------------------------------------------+
// Improving upon https://github.com/valish/sherdog-api
// implementing in a similar format using es6, axios, and
// some different selectors
//-------------------------------------------------------+

const axios = require('axios').default;
const cheerio = require('cheerio');

const baseUrl = 'https://www.sherdog.com/';

const getFighterData = (sherdogLink, callback) => {
  axios
    .get(sherdogLink)
    .then((sherdogPage) => {
      const $ = cheerio.load(sherdogPage.data);
      const fighter = {
        name: '',
        nickname: '',
        age: '',
        birthday: '',
        locality: '',
        nationality: '',
        association: '',
        height: '',
        weight: '',
        weight_class: '',
        image_url: '',
        draws: 0,
        no_contests: 0,
        wins: {
          total: 0,
          knockouts: 0,
          submissions: 0,
          decisions: 0,
          others: 0,
        },
        losses: {
          total: 0,
          knockouts: 0,
          submissions: 0,
          decisions: 0,
          others: 0,
        },
        fights: [],
      };

      //----------------------------------+
      //  Fighter's Name
      //----------------------------------+
      fighter.name = $('span.fn').text();
      fighter.nickname = $('span.nickname').text().replace(/['"]+/g, '');
      fighter.image_url =
        baseUrl + $('.fighter-info > .fighter-right > img').attr('src');

      //----------------------------------+
      //  Fighter's Bio
      //----------------------------------+
      const weight_class = $('.association-class > a').text();
      fighter.age = $(
        'div.bio-holder > table > tbody > tr:nth-child(1) > td:nth-child(2)'
      )
        .text()
        .split('/')[0]
        .trim();
      fighter.birthday = $('span[itemprop="birthDate"]').text();
      fighter.locality = $('span[itemprop="addressLocality"]').text();
      fighter.nationality = $('strong[itemprop="nationality"]').text();
      fighter.association = $('.association > span').text();
      fighter.height = $('b[itemprop="height"]').text();
      fighter.weight = $('b[itemprop="weight"]').text();
      fighter.weight_class = weight_class;

      //----------------------------------+
      //  Fighter Data
      //----------------------------------+

      fighter.wins.total = parseInt(
        $('div.winloses.win > span:nth-child(2)').text()
      );
      fighter.losses.total = parseInt(
        $('div.winloses.lose > span:nth-child(2)').text()
      );
      fighter.draws = $('div.winloses.draws > span:nth-child(2)').text();
      fighter.draws =
        fighter.draws === '' || fighter.draws === null
          ? 0
          : parseInt(fighter.draws);

      fighter.no_contests = $('div.winloses.nc > span:nth-child(2)').text();
      fighter.no_contests =
        fighter.no_contests === '' || fighter.no_contests === null
          ? 0
          : parseInt(fighter.no_contests);

      fighter.wins.knockouts = parseInt(
        $('div.wins > div:nth-child(3) > div.pl').text()
      );
      fighter.wins.submissions = parseInt(
        $('div.wins > div:nth-child(5) > div.pl').text()
      );
      fighter.wins.decisions = parseInt(
        $('div.wins > div:nth-child(7) > div.pl').text()
      );
      fighter.wins.others = parseInt(
        $('div.wins > div:nth-child(9) > div.pl').text() !== ''
          ? $('div.wins > div:nth-child(9) > div.pl').text()
          : '0'
      );
      if (fighter.wins.others === null) fighter.wins.others = 0;
      fighter.losses.knockouts = parseInt(
        $('div.loses > div:nth-child(3) > div.pl').text()
      );
      fighter.losses.submissions = parseInt(
        $('div.loses > div:nth-child(5) > div.pl').text()
      );
      fighter.losses.decisions = parseInt(
        $('div.loses > div:nth-child(7) > div.pl').text()
      );
      fighter.losses.others = parseInt(
        $('div.loses > div:nth-child(9) > div.pl').text() !== ''
          ? $('div.loses > div:nth-child(9) > div.pl').text()
          : '0'
      );

      //----------------------------------+
      //  Fight History
      //----------------------------------+
      // .module.fight_history tr:not(.table_head) gets all fights
      $(
        'div > section:nth-child(4) > div.module.fight_history > div > table > tbody > tr:not(.table_head)'
      ).each(function () {
        const el = $(this);
        const result = el.find('td:nth-child(1) .final_result').text();
        const opponent_name = el.find('td:nth-child(2) a').text();
        const opponent_url = el.find('td:nth-child(2) a').attr('href');
        const event_name = el.find('td:nth-child(3) a').text();
        const event_url = el.find('td:nth-child(3) a').attr('href');
        const event_date = el.find('td:nth-child(3) .sub_line').text();
        const method =
          el
            .find('td:nth-child(4)')
            .text()
            .split(/\)(.*)/)[0] + ')';
        const referee = el.find('td:nth-child(4) .sub_line').text();
        const round = el.find('td:nth-child(5)').text();
        const time = el.find('td:nth-child(6)').text();
        //----------------------------------+
        //  JSON object for Fight
        //----------------------------------+
        const baseUrl = 'https://www.sherdog.com/';
        const fight = {
          name: event_name,
          date: event_date,
          url: baseUrl + event_url,
          result: result,
          method: method,
          referee: referee,
          round: round,
          time: time,
          opponent: opponent_name,
          opponent_url: baseUrl + opponent_url,
        };

        if (result !== '') fighter.fights.push(fight);
      });

      // send response
      callback(fighter);
    })
    .catch(() => {
      console.error(
        `${sherdogLink} is invalid. Could not retrieve fighter's data...`
      );
      callback({});
    });
};

module.exports = { getFighterData, baseUrl };
