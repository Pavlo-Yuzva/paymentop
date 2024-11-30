Paymentop Test Task Testing Environment

1. Install dependencies:
```sh
npm install
```

2. Create `.env` from `.env.example`:

```sh
cp .env.example .env
```

3. Use valid credentials in just created .env file

4. Run tests

All tests:

```sh
npm run test:all
```

Api tests:

```sh
npm run test:api
```

Web-client tests:

```sh
npm run test:web-client
```
