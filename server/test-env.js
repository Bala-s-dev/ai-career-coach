import dotenv from 'dotenv';
dotenv.config();

console.log('--- Testing Environment Variables ---');
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('COOKIE_KEY:', process.env.COOKIE_KEY);
console.log('-----------------------------------');

if (!process.env.GOOGLE_CLIENT_ID) {
  console.error('\nERROR: Failed to load .env file.');
  console.error(
    'Please check that the file is named ".env" and is in the "server" directory.'
  );
} else {
  console.log('\nSUCCESS: .env file loaded correctly!');
}
