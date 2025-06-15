const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const africastalking = require('africastalking')({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME
});

const sms = africastalking.SMS;

app.post('/send-code', async (req, res) => {
  const { phone, code, sender } = req.body;

  try {
    await sms.send({
      to: [`+254${phone.slice(1)}`],
      message: `Your MENDI APP verification code is: ${code}`,
      from: sender || 'AFRICASTKNG'
    });

    res.json({ success: true });
  } catch (err) {
    console.error('SMS send error:', err);
    res.json({ success: false, error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('MENDI APP SMS backend is running ✅');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('MENDI SMS server running on port 3000');
});