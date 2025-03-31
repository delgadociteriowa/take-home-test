# Take-Home Test

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- Google OAuth2 authentication
- List files from Google Drive
- Download and delete files
- Upload new documents

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open:

[http://localhost:3000](http://localhost:3000)

with your browser to see the result.

## Try the application

- First, log in or sign up by clicking the button in the right side of the navigation bar.
- Once access is granted, you will see a list of files in your Google Drive.
- Click on a file to select it, and three buttons will appear at the top-right of the list:
  - Download: Downloads the selected file.
  - Delete: Deletes the selected file.
  - Cancel: Cancels the action.
- To upload a file, click the file selection field at the bottom of the list, select your file, and then click the 'Upload File' button.

## Test the application

- This projects includes jest and react testing library for tests:

```bash
npm test
```
