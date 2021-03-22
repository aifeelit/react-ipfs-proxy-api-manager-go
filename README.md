## **Getting started**

First we need:

- **[NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)**
- **[Docker](https://www.docker.com/)**
- **[IPFS](https://docs.ipfs.io/install/command-line/)**

(I made a docker-compose.yml that built everything but for some reason the proxy didn't work correctly within the container and I didn't want to spend much time finding the problem, so we have to do this manually)

**1** - From the root dir run `node npminstall.js` (this will `npm install` all directories, if this doesn't work we need to do this manually on ./api-manager-ui, ./proxy and ./ipfs-api)

**2** - Run `docker-compose up` to get our mongodb going. 

**3** - Run `go run main.go` on **./api-key-manager-api** (initially I was going for a MERN stack, but decided to give go a try)

**4** - Now we need to `npm start` on **./proxy**, **./ipfs-api**,  **./api-key-manager-ui.**

**5** - Make sure to run the IPFS Daemon with `ipfs daemon` or the `ipfs.exe`. 

We're ready :)

## Notes

- Ports:
    * api-key-manager-ui: 3000
    * api-key-manager-api: 8000
    * proxy: 4999
    * ipfs-api: 5000 (local ipfs node on 5001)
    * mongodb: 27017

- The login doesn't have any validations, any mail/pw is good to go

- We can create api keys on the ui, disable them and view requests info.

- With an api key you now can send a request to the proxy, which will forward it to the ipfs-api

- If the api key doesn't exists or is disabled the proxy will return 401 unauthorized

- If the api key exists it will log the info on the db

## Request examples

Proxy request:
```
url: http://localhost:4999/ipfs
header: 'Authorization 1q6BQmB9xm5tcY0aSy0ICK4Kte9'
body: {
    "path": "path here",
    "content": "content here"
}
```

# Written questions

**Q:** How would you improve this assignment for a production ready solution (e.g., security,
deployment)?

**A:** I'd add a jwt token system for authorization, obviously unit and integration tests to keep the quality of the code. I've been working for almost 2 years with gitlab's pipelines and I love its integrated CI/CD system, together with kubernetes (OKD in my case) and the possibility to use secrets to handle sensible information allowing a quick and easy deploy.

**Q:** Describe IPFS and compare it to other protocols e.g., HTTP?

**A:** IPFS is a protocol and p2p network for storing and fetching information in a distributed system.

IPFS knows how to find information based on its content instead of its location unlike http that the content is located on a specific server. This distributed protocol allows for a more resistant internet infrastructure, makes it more difficult for "authorities" (eg state, companies, etc) to block content and it can accelerate the speed of the web if the data you are accessing is close and not on the other side of the planet (hence the name InterPlanetary File System).

Life wouldn't be the same without http, but its usefulness as a foundation for the distribution and persistences of the unimaginable amount of information that there is today is not enough.
Clearly protocols like IPFS are the future of the internet and could complement or directly replace http and other standards that are centralized and not in the user’s control.