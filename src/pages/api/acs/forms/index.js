const tokenEndpoint = 'https://go.cappex-health.com/oauth/v2/token';
const clientId = '1_1gludp8swx40o8kgsc40oogo88s44ocw44oswksco80wocskcc';
const clientSecret = '4qk755p2nxmo00kcwcs4s4c4cwocso8c80ss8s4ks0gkwggsgs';

let accessToken = null;
let tokenExpiration = 0;

async function getToken() {
    if (!accessToken || Date.now() >= tokenExpiration) {
        const tokenResponse = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(
                    `${clientId}:${clientSecret}`
                ).toString('base64')}`,
            },
            body: `grant_type=client_credentials`,
        });

        const tokenData = await tokenResponse.json();
        accessToken = tokenData.access_token;
        tokenExpiration = Date.now() + tokenData.expires_in * 1000;
    }

    return accessToken;
}

export default async (req, res) => {
    const token = await getToken();

    const response = await fetch('https://go.cappex-health.com/api/forms', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // parse the response as json
    const data = await response.json();
    // return the response as json
    res.status(200).json(data);
};
