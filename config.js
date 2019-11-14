module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb://localhost:27017/patrulla',
    SECRET_TOKEN : '@patrulla_2020#'
}
