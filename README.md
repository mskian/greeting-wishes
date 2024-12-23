# 🎄 Holiday Wishes 🎉  

Send warm and personalized holiday wishes to your friends and family members. Enter your name to receive a custom holiday greeting message for the festive season.  

**Note**  

"I've created a personalized Greeting Wishes site for my friends and family members,hosted on my Private VPS server.The network is tunneled via Cloudflare Argo Tunnel <https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/>."  

"Termux has compatibility issues with NPM Canvas, so I recommend using a VPS server with Ubuntu, Node.js LTS, PNPM, PM2, and Cloudflare Tunnel. There’s no need to install servers like Nginx, Apache2, or Caddy.simply use Cloudflare Tunnel for reverse proxying."  

## Setup

- Download or Clone the repo
- install dependencies

```sh
pnpm install
```

- Development

```sh
pnpm dev
```

- Build a Project

```sh
pnpm build
```

- Start the server

```sh
pnpm start
```

## Usage

- `/` : input form for create Greeting
- `/your-name` - Directly create a greeting page
- `/nt/nt?name=your-name` - Create Greeting Wish image with Name
- `/dl/dl?url=http://localhost:6020/nt/nt?name=your-name` - Download image  

```sh

## Home page
http://localhost:6020/

```

## LICENSE

MIT
