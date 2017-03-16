
# adsales-web

## How to use

Clone:

```bash
git clone https://github.com/vuldin/adsales-web.git
cd adsales-web
```
Install yarn (faster replacement for npm):

```bash
npm i -g yarn
```

Install dependencies:

```bash
yarn
```

This version uses a mock API made available through [json-server](https://github.com/typicode/json-server):

```bash
yarn global add json-server
json-server --watch api.json
```

Run:
```bash
yarn run dev -- -p 3001
```

Then navigate to [http://localhost:3001](http://localhost:3001)

Deploy: *more details later*

## Dependency package details

This example features how you use [react-md](https://react-md.mlaursen.com/) (React Material Design) with [Next.js](https://github.com/zeit/next.js).
Other libraries are [superagent](https://www.npmjs.com/package/superagent) and obviously [React](https://facebook.github.io/react/).
