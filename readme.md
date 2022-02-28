## 👨‍💻Installation

1. Clone the project with `git clone git@github.com:mihkelmark/katana-mmark.git`
2. Move into the directory `cd katana-mmark`
3. Run the application in docker with `docker-compose -f docker-compose.dev.yml up --build` and wait until the server spins up. (Add `-d` for detached mode)
4. The server is exposed on http://localhost:6868 on your machine.
5. To run the integration tests, run `docker exec -it katana-homework-mmark npm run test`

## 📖 API endpoints

| Method | Endpoint          | Description                                            | Request body schema                     |
| ------ | ----------------- | ------------------------------------------------------ | --------------------------------------- |
| GET    | /decks            | Receive a list of all decks with full contents         | -                                       |
| GET    | /decks/:uuid      | Receive a single deck of cards                         | -                                       |
| POST   | /decks            | Create a deck                                          | { "type": String, "shuffled": Boolean } |
| POST   | /decks/:uuid/draw | Draw a specified number of cards from an existing deck | { "count": Number }                     |

## 🗒 Notes

- The application is not polished (as requested) :)
- The code contains only integration tests.
- I've commited the entire .env to git for ease of use.
- The app currently only contains a docker configuration for a development environment. For production, a different configuration would be used.
- The spec requires a deckId field name. I have used "\_id" instead. (Default MongoDB naming convention.)
