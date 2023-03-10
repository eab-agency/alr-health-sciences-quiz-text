import useSwr from 'swr';

const baseUrl = '/api';

export const useRequest = (path, name) => {
    const nameString = name.toString();
    if (!path) {
        throw new Error('Path is required');
    }

    const url = nameString ? `${baseUrl + path}/${nameString}` : baseUrl + path;
    const { data, error } = useSwr(url);

    return { data, error };
};
