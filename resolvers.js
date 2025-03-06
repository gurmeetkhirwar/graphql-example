import db from "./_db.js";


export const resolvers = {
    Query: {
        games: () => db.games,
        game: (_, args) => {
            return db.games.find((game) => game.id === args.id)
        },
        reviews: () => db.reviews,
        review: (_, args) => {
            return db.reviews.find((review) => review.id === args.id)
        },
        authors: () => db.authors,
        author: (_, args) => {
            return db.authors.find((author) => author.id === args.id)
        }
    },
    Game: {
        reviews(parent, args, context, info) {
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((r) => r.author_id === parent.id)
        }
    },
    Review: {
        game(parent) {
            return db.games.find((game) => game.id === parent.game_id)
        },
        author(parent) {
            return db.authors.find((author) => author.id === parent.author_id)
        }
    },
    Mutation: {
        deleteGame(_, args) {
            db.games = db.games.filter((game) => game.id !== args.id)
            return db.games
        },
        updateGame(_, args) {
            db.games = db.games.map((game) => {
                if (game.id === args.id) {
                    return { ...game, ...args.edits }
                }
                return game
            })

            return db.games.find((game) => game.id === args.id)
        },
        addGame(_, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString()
            }
            db.games.push(game)

            return game
        },
    }
}