export default {
    loader: ['ts-node/esm'],
    format: [
        '@cucumber/pretty-formatter',
        'json:./reports/cucumber.json',
        'html:./reports/cucumber-embedded.html',
        'junit:./reports/cucumber.xml'
    ],
    formatOptions: {
        snippetInterface: 'async-await'
    },
    import: ['src/**/*.ts'],
    retry: 2
};
