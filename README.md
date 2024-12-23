# 🎄 Holiday Wishes 🎉  

Send warm and personalized Holiday Wishes to your friends and family. Enter your name and get a custom holiday greeting message for the festive season.  

**Note**  

"I've created a personalized Greeting Wishes site for my friends and family members, hosted on my Android mobile yes, my Android mobile serves as the server. The network is tunneled via Cloudflare Argo Tunnel <https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/>."  

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
