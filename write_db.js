(async () => {
    const { writeUser } = require('./dbFunctions');
    await writeUser({
      userId: 'demo‑123',
      username: 'James',
      badges: ['Starter']
    });
  })();