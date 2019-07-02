const axios = require("axios");

const {API, username} = process.env;

const handler = async event => {
    return axios(
        {
            url: 'https://ossindex.sonatype.org/api/v3/component-report',
            method: 'POST',
            auth: {
                username: username,
                password: API
            },
            data: {
                "coordinates": [
                    `pkg:npm/${event.queryStringParameters.pkg}@latest`
                ]
            }
        }
    )
        .then(res => {
            return {
                statusCode: 200,
                body: JSON.stringify(res.data)
            };
        }).catch(error => {
            return {statusCode: 422, body: {error: JSON.stringify(error)}}
        });

};

module.exports = {handler}
