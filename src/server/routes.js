const healthRoutes = require('./health/routes');

module.exports = function routes(app) {
    app.use('/health', healthRoutes);
};
