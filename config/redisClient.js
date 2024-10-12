const redis = require('redis');

// Tạo kết nối tới Redis
const redisClient = redis.createClient();

// Kết nối Redis và bắt lỗi kết nối
redisClient.connect().catch(console.error);

redisClient.on('connect', () => {
  console.log('Kết nối thành công tới Redis');
});

redisClient.on('error', (err) => {
  console.error('Lỗi kết nối Redis:', err);
});

// Export Redis client để sử dụng ở nơi khác
module.exports = redisClient;