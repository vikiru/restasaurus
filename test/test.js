process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';

require('./config/config.test');
require('./controllers/controllers.test');
require('./data/data.test');
require('./models/models.test');
require('./scripts/scripts.test');
require('./services/services.test');
require('./utils/util.test');
