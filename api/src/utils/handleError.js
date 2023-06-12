const Colors = require('@colors/colors');
const handleLog = require('../utils/handleLog');

const handleHttpError = (res, msg= 'An Error Ocurred', code = 500, nameFunction = 'null', error = 'Internal Error') => {

  console.log(Colors.red(`*** Error *** <<< message:[${msg}] -- code:[${code}] -- [${nameFunction}] -- Error Data:[${error}] >>>`))    
  res.status(code).send({Error: msg});
  handleLog({LogError: `Error : message:[${msg}] -- code:[${code}] -- [${nameFunction}] -- Error Data:[${error}]`});
}


module.exports = {
  handleHttpError,
};