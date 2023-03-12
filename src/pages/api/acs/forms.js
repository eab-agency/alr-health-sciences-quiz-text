export default async (req, res) => {
    // extract the username and password from the body of the request
    const { username, password } = req.body;

    // fetch forms from https://go.cappex-health.com/api/forms with basic auth
    const response = await fetch('https://go.cappex-health.com/api/forms', {
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${username}:${password}`
            ).toString('base64')}`,
        },
    });
    // parse the response as json
    const data = await response.json();
    // return the response as json
    res.status(200).json(data);
};
