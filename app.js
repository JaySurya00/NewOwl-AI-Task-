const express= require('express');
const studentRouter= require('./routes/studentRoutes');
const errorHandler= require('./middlewares/error-handler');
const NotFoundError= require('./errors/not-found-error');


const app= express();

app.use(express.json());


app.use('/', studentRouter);
app.use('*', ()=>{
    throw new NotFoundError();
});

app.use(errorHandler);

module.exports= app;