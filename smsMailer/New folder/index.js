const accountSid = "AC6ce261e0d623713a24ef3d2bc802f9cd";
const authToken = "6bda8535d7d02ab5f1d580d33443fe92";
// const twilio = require('twilio');

// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure

const client = require("twilio")(accountSid, authToken);
client.messages
  .create({ body: "Greetings from Gravity Grill, you have been successful registered on our website. We are looking forward to cater you well.", from: "+15677042215", to: "+919667938525" })
  .then((res)=>(console.log('message has send')))
  .catch((err)=>{console.log(err);
});
