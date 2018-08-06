# berlin-apartments-lambda

Anyone who has ever look for an apartment in Berlin knows how much painful and time-consuming process it is.
Its more effiecent to just apply for everything that fit on your criteria (without even looking picture of the apartment) and if you are lucky and got invited to see the apartment, and you are even more lucky to be accepted by the landlord, then you can decide if you want to keep it or not, so lets apply for everything...

Send application forms to Landlords every time a new apartment that fit on your criteria, is listed on Immobilien Scout.

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com) [![Greenkeeper badge](https://badges.greenkeeper.io/AvraamMavridis/berlin-apartments-lambda-public.svg)](https://greenkeeper.io/)

## Architecture

<img src="https://github.com/AvraamMavridis/berlin-apartments-lambda-public/blob/master/diagram.png?raw=true" />

## HOT TO

1. Edit the settings on the `config.js` file.

```js
module.exports = {
  queryUrl: 'Your POST request, you can find it in the Chrome console',
  cookie: 'You can find the cookie in the Chrome console, by executing a request',
  email: 'Your gmail address',
  emailPassword: 'Your gmail password',
  emailContentHTML: `Your message to the landlords, it can be html`
}
```

3. Find the mappings between company names and emails, for privacy reasons I don't want to provide that, but you will have to edit the `landlordEmails.js`

4. Install the serverless framework.

5. Deploy the application

```
serverless deploy
```




