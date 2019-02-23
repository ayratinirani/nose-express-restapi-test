const http=require('http');
const app=require('./app');

//setting PORT
const  port=process.env.PORT || 3000;

//setting app
const server=http.createServer(app);

//listening
server.listen(port,function () {
    console.log(`server stated at http://localhost:${port}`);
});