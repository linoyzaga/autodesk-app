const schedulerRoutes = require('./scheduler/routes');

module.exports = function routes(app) {
    app.use('/scheduler', schedulerRoutes);
};
