export default async function useForm(id) {
    const username = process.env.NEXT_PUBLIC_ACS_USERNAME;
    const password = process.env.NEXT_PUBLIC_ACS_PASSWORD;
    let url = '';
    if (!id) {
        url = `/api/acs/forms`;
    } else {
        url = `/api/acs/form/${id}`;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
