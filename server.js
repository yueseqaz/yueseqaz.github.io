const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const DEEPSEEK_API_KEY = 'sk-a9cb889ed67646e0a38c078276490bd2'; // 💡不要放在前端！

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "你是一个可爱且博学的AI助手。" },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: '调用 DeepSeek 失败' });
  }
});

app.listen(3000, () => {
  console.log('后端服务运行在 http://localhost:3000');
});
