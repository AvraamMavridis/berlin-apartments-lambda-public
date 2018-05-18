# berlin-apartments-apply-bot
Send application forms to Landlords every time a new apartment is listed on Immobilien Scout

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


