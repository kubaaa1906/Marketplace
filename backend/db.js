const mongoose = require('mongoose');

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    try{
        mongoose.connect(process.env.DB, connectionParams);
        console.log("Connection to database: success");
    } catch (error){
        console.log(error);
        console.log("Connection to database failed")
    }
}