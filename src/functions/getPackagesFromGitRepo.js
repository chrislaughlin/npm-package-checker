const axios = require("axios");

const RAW_URL_START = 'https://raw.githubusercontent.com';
const GITHUB_COM = 'github.com'
const HTTPS_GITHUB_COM = `https://${GITHUB_COM}`
const HTTP_GITHUB_COM = `http://${GITHUB_COM}`
const { URL } = process.env

const handler = async event => {
    try {
        const repoUrl = JSON.parse(event.body).repo;

        if (repoUrl === '') {
            return {
                statusCode: 400,
                body: {error: 'repoUrl empty'}
            }
        }

        if (!repoUrl.includes(GITHUB_COM)) {
            return {
                statusCode: 400,
                body: {error: 'Only GitHub repos are supported'}
            }
        }

        let rawPackageUrl = repoUrl;

        if (rawPackageUrl.startsWith('github.com')) {
            rawPackageUrl = rawPackageUrl.replace(GITHUB_COM, RAW_URL_START);
        } else if (rawPackageUrl.startsWith(HTTPS_GITHUB_COM) || rawPackageUrl.startsWith(HTTPS_GITHUB_COM)) {
            rawPackageUrl = rawPackageUrl
                .replace(HTTPS_GITHUB_COM, RAW_URL_START)
                .replace(HTTP_GITHUB_COM, RAW_URL_START);
        } else {
            return {
                statusCode: 400,
                body: {error: 'Repo url format not supported'}
            }
        }

        rawPackageUrl = rawPackageUrl.concat('/master/package.json');

        const { data: packageJson } = await axios({
            method: 'GET',
            url: rawPackageUrl
        });

        const packageNames = Array.from(new Set([
            ...Object.keys(packageJson.dependencies),
            ...Object.keys(packageJson.devDependencies),
        ]));

        const vulns = await axios({
            url: `${URL}/.netlify/functions/checkPackages`,
            method: 'POST',
            data: {
                packageNames
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify(vulns.data)
        };
    } catch (e) {
        console.log(e)
        return {
            statusCode: 500
        };
    }

};

module.exports = {handler}
