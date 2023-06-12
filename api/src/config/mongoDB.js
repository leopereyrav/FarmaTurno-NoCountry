const mongoose = require('mongoose');
const Colors = require('@colors/colors');


const dbConnection = async () => {

  try {
    const DB_URI = process.env.DB_URI;
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(Colors.bgBlue.black('==>> ** Successful Connection to DataBase ** '))
  } catch (error) {
    console.log(Colors.bgRed.black(`** Error Connecting to DataBase -- [${error}] **`))
  }
}


module.exports = dbConnection;