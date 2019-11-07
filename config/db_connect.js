const mongoose = require('mongoose');
const config   = require('./config.json');

mongoose.set('useNewUrlParser',true);
mongoose.set('useUnifiedTopology',true);
mongoose.set('useCreateIndex', true);

module.exports = mongoose.connect(config.url).then(()=>{
    console.log('Connectin to Db success')
}).catch(err=>{
    console.error('Connection to Db Failds')
})
