export const config = {
    api: {
        baseUrl: 'https://api.thecatapi.com/v1',
        apiKey: process.env.CAT_API_KEY || 'live_ksImyJMjibxZnYn54YyzTEzK3AOL0LKawAXbhqQ8b4uVPvTWZueuuWRkIU7MYmIf'
    },
    test: {
        timeout: 10000
    }
};
