import fetch from 'node-fetch';

async function waitForAppReady(url: string, timeout = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch (_) {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

export default async () => {
  const url = process.env.BASE_URL || 'http://expense-tracker-app:3000';
  console.log(`⏳ Waiting for app: ${url}`);
  await waitForAppReady(url);
  console.log('✅ App is ready!');
};

if (process.env.RP_ENDPOINT && process.env.RP_PROJECT) {
  const uiBase = process.env.RP_ENDPOINT
    .replace('host.docker.internal', 'localhost')
    .replace(/\/api\/v1\/?$/, '');
  console.log(`\n🔗 ReportPortal (UI): ${uiBase}/ui/#${process.env.RP_PROJECT}/launches/all`);
};