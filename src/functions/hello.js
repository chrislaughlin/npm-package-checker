const fetch = require("node-fetch");

const { API } = process.env;

exports.handler = async (event, context) => {
  return fetch(
    'https://ossindex.sonatype.org/api/v3/component-report',
    {
      method: 'POST',
      headers: {
        "authorization": `Basic ${API}`
      },
      body: JSON.stringify({
        "coordinates": [
          "pkg:npm/lodash@4.17.5"
        ]
      })
    }
  )
    .then(res => res.json())
    .then(res => {
      return {
        statusCode: 200,
        body: JSON.stringify(res)
      };
  }).catch(error => ({ statusCode: 422, body: String(error) }));
  
};
