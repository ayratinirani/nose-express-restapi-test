const  express=require("express");
const morgan=require("morgan");
const  app=express();
const  bodyParser=require("body-parser");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
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

//orders dept
const ordersRoutes=require("./api/routes/orders");

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