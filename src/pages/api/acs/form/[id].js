export default async (req, res) => {
    const { username, password } = req.body;
    const { id } = req.query;
    const response = await fetch(
        `https://go.cappex-health.com/api/forms/${id}`,
        {
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${username}:${password}`
                ).toString('base64')}`,
            },
        }
    );

    // parse the response as json
    const data = await response.json();
    // return the response as json
    res.status(200).json(data);
};
