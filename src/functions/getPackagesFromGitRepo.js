const axios = require("axios");

const handler = async event => {
    try {
        const { data: packageJson } = await axios({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/chrislaughlin/thedyslexicdeveloper/new/package.json'
        });

        return {
            statusCode: 200,
            body: JSON.stringify(packageJson)
        };
    } catch (e) {
        console.error(e);
    }

};

module.exports = {handler}
