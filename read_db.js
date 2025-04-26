(async () => {
    const { readUser } = require('./dbFunctions');
    const user = await readUser('demo‑123');
    console.log(user);
  })();