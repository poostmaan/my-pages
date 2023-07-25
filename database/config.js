const mongoose = require('mongoose');

const dbConnect = async() => {
    try {
        
        mongoose.set('strictQuery', false);
        await mongoose.connect(`mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASSWORD }@mypagesdb.aqvzukp.mongodb.net/myPages`);

        console.log("Everything goes fine! DB connected");

    } catch (error) {
        console.log(`Something went wrong on ${error}`);
    }
}

module.exports = {
    dbConnect
}