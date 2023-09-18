const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkUsersDB';

connect(connectionString);

// When successfully connected
connection.on('connected', () => {
  console.log('Mongoose default connection open to ' + connectionString);
});

// If the connection throws an error
connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// Export the connection
module.exports = connection;
