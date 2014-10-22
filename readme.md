# pokeradio-socketserver

This is a Node.JS server that connects Redis PubSub events from the PokeRadio app to users' browsers, via Socket.IO.

The idea is that the main (Django) web app runs as another Heroku app, and shares the Redis addon to which it publishes events.

## Running Locally
You will need:
- Node
- NPM

###Check out:
```sh
$ git checkout http://github.com/pokelondon/pokeradio-socketserver
$ cd pokeradio-socketserver
```

###Set Config (optional):
Unless you want to connect to a Redis server on localhost, you will need to configure it's location.

To do this rename example env file, and edit it to reference your (non local) Redis server; otherwise don't bother.
```sh
$ mv example.env .env && vim .env
$ source .env
```

###Run it
```sh
$ npm start
# or
$ foreman start
```

## Deploying to Heroku
You will need
- **Heroku** toolkit + an account
- **pokeradio** running on another Heroku app, with a Redis server configured. (see main pokeradio)
- The connection details for the other Redis server

###Set config:
```sh
$ heroku create {yourapp}-socketserver
$ heroku config:set REDISCLOUD_URL={Your rediscloud url from the other app}
```
###Push it
```sh
$ git push heroku master
```