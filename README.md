# Codemailer Node.js SDK

Node.js library for the Codemailer API.

## Install

```bash
npm install codemailer
```

## Setup

First, you need to get an API key, which is available in the [Codemailer Dashboard](https://codemailer.dev).

```js
import { Codemailer } from "codemailer";
const codemailer = new Codemailer("sk_123456789");
```

## Usage

Send your first verification email:

```js
await codemailer.emails.send({
  email: "you@example.com",
  sender: "Codemailer",
  // Optional rate limit
  rateLimit: {
    limit: 2
    interval: "10s" // Limits to 2 requests per 10 seconds (for login / signup)
    identifier: "ipAddress"
  }
});
```

## Verify email address

Verify the OTP sent in the verification email.

```js
await codemailer.emails.verify({
  id: "041a87ff-60be-4054-a96f-9bf0c7f0beaf",
  otp: "123456",
  // Optional rate limit
  rateLimit: {
    limit: 10
    interval: "60s" // Limits to 10 requests per 60 seconds (for verifying OTP)
    identifier: "041a87ff-60be-4054-a96f-9bf0c7f0beaf"
  }
});
```

## License

MIT License
