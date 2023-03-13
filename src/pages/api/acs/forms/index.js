import { getAccessToken } from '@/lib/token-utils';

export default async (req, res) => {
    const token = await getAccessToken();

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
