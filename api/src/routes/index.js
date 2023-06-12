
// const { redirectUrl } = require('../utils/redirectUrl');
const customer = require('./customer.routes');
const turn = require('./turn.routes');
const pharmacy = require('./pharmacy.routes');
const login = require('./login.routes');
const serveOk = require('./serverHealth');


const routes = (app) => {
  app.use('/api/customer', customer);
  app.use('/api/turn',turn);
  app.use('/api/pharmacy', pharmacy);
  app.use('/api/login', login);
  app.use('/api/serverok', serveOk);
  // app.get('/', redirectUrl);
}


module.exports = routes;