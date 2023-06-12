const {logModel} = require('../models');
const Colors = require('@colors/colors');


const handleLog = async (error) => {

 try {
  const Data = error;
  
  const result = await logModel.create({Data});
  
 } catch (error) {
  console.log(Colors.bgRed.black(`Error in handleLog -- [${error}]`));
 }
}



module.exports = handleLog;