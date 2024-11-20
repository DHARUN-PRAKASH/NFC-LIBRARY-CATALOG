process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Disable SSL certificate validation

const { Vonage } = require('@vonage/server-sdk'); // Correct import for the latest version


const vonage = new Vonage({
  apiKey: 'ca80aa27',      // Replace with your Vonage API Key
  apiSecret: 'cdxLHfCc9ytoleX1' // Replace with your Vonage API Secret
});

function sendSMS(mobile, message) {
  return new Promise((resolve, reject) => {
    vonage.sms.send(
      {
        to: mobile, // Recipient's number in international format
        from: 'VonageAPI', // Sender ID (can be a valid number or text)
        text: message,
      },
      (err, response) => {
        if (err) {
          reject(err); // Handle error
        } else if (response.messages[0].status !== '0') {
          reject(new Error(response.messages[0]['error-text'])); // Vonage API error
        } else {
          resolve(response.messages[0]); // Success response
        }
      }
    );
  });
}

module.exports = sendSMS;
