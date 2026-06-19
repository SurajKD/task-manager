require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function resetUser() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  
  // Delete existing user
  const result = await db.collection('users').deleteMany({});
  console.log(`Deleted ${result.deletedCount} user(s)`);
  
  await mongoose.disconnect();
  console.log('Done. Refresh the app and create a new password.');
}

resetUser().catch(console.error);
