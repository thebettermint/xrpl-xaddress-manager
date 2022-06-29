# xrpl-xaddress-manager
A package for managing account balances with destination tags

## Getting Started
#### Install
To get started using this project, install the required node packages

```npm
npm install
```
or
```yarn
yarn install
```
#### Configuration
In the config folder, copy the config.sample.json file and rename to config.json.

#### Database
This project saves wallet records to a mongodb database. If you need to quicky spin up a local instance, you can use the docker compose file found within the root of the project.

The default root name and password match the credentials found in the config.sample.json. 
If you would like to change them, modify your config.json and docker-compose.yml prior to building the container.

```cli
docker-compose up 
```

#### Start monitoring

You can now begin listening for new deposits or widthdrawals. The balance changes will be saved as a timeseries dataset in your mongodb database.

```yarn
yarn start
```

## TO DO's
- Wallet tx backfilling
- Direct support for xAddress
- Mongo query functions for getting current tag balance


