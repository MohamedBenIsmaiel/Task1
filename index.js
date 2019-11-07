
const express = require('express');
const morgan  = require('morgan');
const path    = require('path')
const swaggerUi = require('swagger-ui-express');

const {db_connect} = require('./config/db_connect');
const router = require('./controller/student');
const config = require('./config/config.json');
const swaggerDoc = require('./config/swagger.json')

const app = new express();
app.use(express.json())
app.use(express.static(path.join(__dirname,'resource')))
app.use(morgan('dev'));
app.use('/students',router);
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDoc,{
    explorer:true
}))



app.listen(config.port,err=>{
    if(!err){
        console.log('listen on '+config.port);
    }
});




