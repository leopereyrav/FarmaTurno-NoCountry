const {turnModel} = require('../models');
const Colors = require('@colors/colors');
const handleLog = require('./handleLog');


/**
 * handleRestarDBTurn function that reset the turn collection from the database, 
 * if reset is successful print message info. But if reset is error shows a message with the error.
 * 
 */
const handleRestartDBTurn = async () => {
  
  try {
    const result = await turnModel.deleteMany();
    
    if(result){
      console.log(Colors.bgCyan.black('==>> Turn collection has been successfully reset '));
      handleLog({logResetDBTurn: 'Turn collection has been successfully reset', result});
    }else{
      console.log(Colors.bgCyan.black('==>> It was not possible to reset Turn collection '));
      handleLog({logResetDBTurn: 'It was not possible to reset Turn collection ', result});
    }
  } catch (error) {
    console.log(Colors.bgRed.black(`** Error to reset Turn colletion : [${error}] **`));
    handleLog({logResetDBTurn: 'Error to reset Turn colletion ', error});
  }

}


module.exports = handleRestartDBTurn;