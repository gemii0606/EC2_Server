const request = require('supertest');
const app = require('../server'); // 這裡假設你的 Express 應用程式是在 app.js 文件中
const sequelize = require('../utils/mysql');
// 在所有測試開始前，執行初始化 Sequelize 連接和資料庫創建
// beforeAll(async () => {
//   await sequelize.authenticate(); // 驗證連接
//   await sequelize.sync({ force: true }); // 創建測試資料庫的資料表，force: true 表示將原有資料表刪除再創建
// });

// 在所有測試結束後，關閉 Sequelize 連接
afterAll(async () => {
  await sequelize.close();
});

// 測試 signUpUser API
describe('Test signInUser API', () => {
  test('should create a new user and return access token', async () => {
    const newUser = {
      provider: 'native',
      email: 'test1@example.com',
      password: 'test123',
    };

    // 使用 Supertest 發送 POST 請求
    const response = await request(app)
      .post('/api/1.0/users/signin')
      .send(newUser);

    // 檢查返回的狀態碼是否為 200
    expect(response.status).toBe(200);

  //   // 檢查返回的 JSON 數據中是否包含 access_token 和 user 屬性
  //   expect(response.body.data).toHaveProperty('access_token');
  //   expect(response.body.data).toHaveProperty('user');
  //   expect(response.body.data.user.name).toBe(newUser.name);
  //   expect(response.body.data.user.email).toBe(newUser.email);
  //   // 其他屬性檢查...

  //   // 這裡可以根據你的項目需求進一步檢查返回的數據是否正確
  // });

  // test('should return 400 error for incomplete data', async () => {
  //   const incompleteUser = {
  //     name: 'Incomplete User',
  //   };

  //   const response = await request(app)
  //     .post('/signUpUser')
  //     .send(incompleteUser);

  //   expect(response.status).toBe(400);
  //   expect(response.body).toHaveProperty('error', 'You should not leave empty!');
  // });

  // test('should return 400 error for invalid email', async () => {
  //   const invalidEmailUser = {
  //     name: 'Invalid Email User',
  //     email: 'invalid_email',
  //     password: 'test123',
  //   };

  //   const response = await request(app)
  //     .post('/signUpUser')
  //     .send(invalidEmailUser);

  //   expect(response.status).toBe(400);
  //   expect(response.body).toHaveProperty('error', 'Please fill the correct email adress!');
  });

  // // 其他測試項目...
});