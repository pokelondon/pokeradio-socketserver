# pokeradio-socketserver

This is a Node.JS server that connects Redis PubSub events from the [PokeRadio app](https://github.com/pokelondon/pokeradio) to users' browsers, via Socket.IO.

The idea is that the main (Django) web app runs as another Heroku app, and shares the Redis addon to which it publishes events.

##Also in this family:
- [PokeRadio app](https://github.com/pokelondon/pokeradio)
- [**PokeRadio Socket Server**](https://github.com/pokelondon/pokeradio-socketserver) ☜ This!
- [PokeRadio Mopidy Client](https://github.com/pokelondon/pokeradio-mopidy)

## Running Locally
You will need:
- Node
- NPM
- Redis Server

###Check out:
```sh
$ git clone http://github.com/pokelondon/pokeradio-socketserver
$ cd pokeradio-socketserver
```
###Redis Server:
You can get a local Redis server running with homebrew if you don't have one:
```sh
$ brew install redis-server
```
###Set Config (optional):

If you want to connect to a Redis server other than localhost, you will need to configure it's location. To do this rename example env file, and edit it to reference your (non local) Redis server; otherwise don't bother.
```sh
$ mv example.env .env && vim .env
$ source .env
```
###Install Node dependencies
```sh
$ npm install
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
