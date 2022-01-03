## Requirements
- yarn
- npm

## Environment Variables
- `BOT_TOKEN` -> acquire this from your Discord Application Page
- `GUILD_ID` -> the guild this bot should be active in. Still needs to be determined manually for the moment.
- `CLIENT_ID` -> not used right now

If you want to use this locally put these values into a file called `.env` in the project root.
```.env
BOT_TOKEN=<value here>
GUILD_ID=<value here>
CLIENT_ID=<value here>
```

## Usage
- Clone repo
- cd into dir
- `yarn install`

### Building
- `yarn run build`

### Start local instance
- `yarn run watch` for hot recompile on changes
- `yarn run monitor` for hot reload on recompile

### Start normal instance
- `yarn run start`
