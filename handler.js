'use strict';
const axios = require('axios');
const config = require('./config');
const nodemailer = require('nodemailer');
const sendEmail = require('./sendEmail');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const post = (event, context, callback) => {
  axios
    .post(config.queryUrl, null, {
      headers: {
        Pragma: 'no-cache',
        Origin: 'https://www.immobilienscout24.de',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8,de;q=0.7',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Requested-With': 'XMLHttpRequest',
        Cookie: config.cookie,
        Connection: 'keep-alive',
        Referer: config.queryUrl,
        'Content-Length': '0'
      }
    })
    .then(function(response) {
      const res = {
        statusCode: 200,
        body: JSON.stringify(
          response.data.searchResponseModel['resultlist.resultlist']
            .resultlistEntries
        )
      };

      const apartments =
        response.data.searchResponseModel['resultlist.resultlist']
          .resultlistEntries[0].resultlistEntry;

      const emails = apartments.map(function(apartment) {
        return new Promise(function(resolve, reject) {
          const dbObject = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: { apartmentID: apartment['@id'] }
          };

          dynamoDb.get(dbObject, function(err, data) {
            if (err) {
              console.log(err);
              reject(err);
            }
            if (!data.Item) {
              dynamoDb.update(dbObject, function(err, data) {
                if (err) reject(err);
                else sendEmail(apartment);
              });
            } else {
              resolve(data);
            }
          });
        });
      });

      return Promise.all(emails).then(function() {
        if (callback) {
          callback(null, res);
        }
      });
    })
    .catch(function(error) {
      if (callback) {
        callback(error);
      }
      console.log(error);
    });
};

module.exports.post = post;
