
    const  express= require("express");
    const  router = express.Router();
    const mongoose=require("mongoose");
    const Product = require("../models/product");
    const Order=require("../models/order");



    router.get("/",(req,res,next)=>{
        Order.find()
        .select("quantity _id product ")
        .populate("product","name")
        .exec()
        .then(result=>{
            res.status(200).json({
                count:result.length,
                orders:result.map(doc=>{
                return{
                    _id:doc._id,
                    product:doc.product,
                    quantity:doc.quantity,
                    request:{
                        type:"GET",
                        url:"http://localhost:3435/orders/"+doc._id
                    }

                };
                
            })
        })
        .catch(
           err=>{
            console.log(err);
            res.status(500).json({eror:err});
           }
            
        );
      
    });
    });//done

    router.post("/",function (req,res,next) {
        Product.findById(req.body.productId)
        .then(
            product=>{

                const order=new Order({
                    _id:new mongoose.Types.ObjectId(),
                   quantity:req.body.quantity,
                   product:req.body.productId
               });
             return  order.save().then((result)=>{
                   console.log(result);
                   res.status(201).json(
                       {
                           message:"order created successfuly",
                           createdOreder:{
                               _id:result._id,
                               product:result.product,
                               quantity:result.quantity
                           }
                         ,  request:{
                               type:"GET",
                               url:"http://localhost:3435/orders/"+result._id
                           }
                       }
                   ).catch(err => {
                       console.log(err);
                       res.status(500).json({
                           eror: err
                       });
                   });;
               });
             




            }
        ).catch(
            err=>{
                console.log(err);
                res.status(500).json({
                    message:"Product not found",
                    eror: err
                });
            }
        );
       
       

    });//done

    router.get("/:orderId",function (req,res,next) {
        Order.findById(req.params.orderId)
        .populate("product","name price")
        .exec()
        .then(order=>{
            if(!order){
                res.status(404).json({message:"not found"});
                return;
            }
                res.status(200).json({
                    order:order,
                    request:{
                        type:"GET",
                        url:"http://localhost:3435/orders"
                    }
                });
        }
        )
        .catch(
            err=>{
                console.log(err);
                res.status(500).json({eror:err});}
        )
        ;

    });

    router.patch("/:orderId",(req,res,next)=>{
        const id= req.params.orderId;

        res.status(200).json({
            message:"order updated"
        });
    });

    router.delete("/:orderId",(req,res,next)=>{
       Order.remove({_id:req.params.orderId})
        .exec()
        .then(
            (result)=>{
                res.status(200).json({
                    message:"Order deleted",
                    request:{
                        type:"POST",url:"htpp://localhost:3435/orders",body:{productId:"ID",quantity:"Number"}
                        
                    }
                })
            }
        )
        .catch(
            err=>{

                console.log(err);
                res.status(500).json({eror:err});
             }

        )
       ;
    });


    module.exports=router;