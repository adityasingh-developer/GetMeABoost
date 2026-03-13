const bcrypt = require("bcrypt");
const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question("Password: ", async (password) => {
  const hash = await bcrypt.hash(password, 10);
  console.log("\nHASH:", hash);
  rl.close();
});
