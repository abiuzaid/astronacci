// const bcrypt = require('bcryptjs');

// const testHashing = async () => {
//   const password = "123";
//   const saltRounds = 10;

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, saltRounds);
//   console.log("Hashed Password:", hashedPassword);

//   // Verify password
//   const isMatch = await bcrypt.compare(password, hashedPassword);
//   console.log("Password Match:", isMatch);
// };

// testHashing();

const bcrypt = require('bcryptjs');

const testHashing = async () => {
  const password = "123";
  const saltRounds = 10;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log("Hashed Password:", hashedPassword);

  // Verify password
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log("Password Match:", isMatch);
};

testHashing();