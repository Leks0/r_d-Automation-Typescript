//const rawEndpoint = process.env.RP_ENDPOINT || '';

export default {
  apiKey: process.env.RP_API_KEY || '',
  endpoint: process.env.RP_ENDPOINT || 'http://localhost:8080/api/v1',
  launch: process.env.RP_LAUNCH_NAME || 'Playwright Launch',
  project: process.env.RP_PROJECT || '',
  description: 'UI tests with Playwright',
  attributes: [{ key: 'env', value: 'docker' }],
  restClientConfig: {
    timeout: 10000,
  }
};
