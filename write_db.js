(async () => {
    const { writeUser } = require('./dbFunctions');
    await writeUser({
      userId: 'samsontz',
      username: 'James',
      badges: ['Starter']
    });
  })();