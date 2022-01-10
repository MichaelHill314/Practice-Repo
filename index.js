require('dotenv').config()
const { app, currentTime } = require('./server')
require('colors')

const PORT = process.env.PORT || 5500

app.listen(PORT, () => {
    console.log(
        `\n*** Server is listening on port ${PORT} at ${currentTime}`.random
    )
})