'use strict';


module.exports = function(app) {
    let globals = require('../controllers/PrinterController');
    app.route('/api/create').post(globals.CreatePrinter);
    app.route('/api/printers').get(globals.GetPrinters);
    app.route('/api/find/:id').get(globals.GetPrinter);
    app.route('/api/update/:id').put(globals.UpdatePrinter);
    app.route('/api/delete/:id').delete(globals.DeletePrinter);
    app.route('/api/login').post(globals.Login);

};
