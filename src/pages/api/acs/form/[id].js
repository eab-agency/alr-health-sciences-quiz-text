export default async (req, res) => {
    // fetch form id from https://go.cappex-health.com/api/forms/[id] with basic auth
    const response = await fetch(
        `https://go.cappex-health.com/api/forms/${req.query.id}`,
        {
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${process.env.NEXT_PUBLIC_ACS_USERNAME}:${process.env.NEXT_PUBLIC_ACS_PASSWORD}`
                ).toString('base64')}`,
            },
        }
    );
    // parse the response as json
    const data = await response.json();
    // return the response as json
    res.status(200).json(data);
};
