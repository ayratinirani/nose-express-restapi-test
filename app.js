const  express=require("express");
const morgan=require("morgan");
const  app=express();
const  bodyParser=require("body-parser");
const  mongoose=require('mongoose');

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
    if(req.method==="OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,PATCH,DELETE");
        return res.status(200).json({});
    }
    next();
});
//example of middleware
// app.use((req,res,next)=>{
//     res.status(200).json({
//         message:"its working"
//     });
// });


//routing system
//products dept
const productRoutes=require("./api/routes/products");

app.use("/products",productRoutes);
const ordersRoutes=require("./api/routes/orders");
//orders dept

mongoose.connect("mongodb://localhost/resatapitest",{ useNewUrlParser: true });


app.use("/orders",ordersRoutes);

app.use((req,res,next)=>{
    const  error=new Error("not found");
    error.status=404;
    next(error);
});





app.use((error,req,res,next)=>{

   res.status(error.status || 500);res.json({
        error:{
            message:error.message
        }
    })
});

module.exports=app;