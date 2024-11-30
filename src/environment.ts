import * as dotenv from 'dotenv';
dotenv.config();

export const testsConfig = {
  baseUrl: `${process.env.PROTO}://${process.env.BASE_URL}:${process.env.PORT}`,
  accountsUrl: `${process.env.PROTO}://account.${process.env.BASE_URL}:${process.env.PORT}`,
  apiUrl: `${process.env.PROTO}://api.${process.env.BASE_URL}:${process.env.PORT}`,
  testUser: {
    email: `${process.env.TESTS_EMAIL}`,
    password: `${process.env.TESTS_PASSWORD}`,
  },
};
