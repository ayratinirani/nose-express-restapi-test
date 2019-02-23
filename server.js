const http=require('http');
const app=require('./app');

//setting PORT
// const  port=process.env.PORT || 3000;

//setting app
const server=http.createServer(app);

//listening
server.listen(3005);

console.log(`server stated at http://localhost:3005`);