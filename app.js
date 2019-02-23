const  express=require("express");

const  app=express();
//example of middleware
// app.use((req,res,next)=>{
//     res.status(200).json({
//         message:"its working"
//     });
// });


const productRoutes=require("./api/routes/products");

app.use("/products",productRoutes);


const ordersRoutes=require("./api/routes/orders");

app.use("/orders",ordersRoutes);



module.exports=app;