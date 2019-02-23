
    const  express= require("express");
    const  router = express.Router();
   
    router.get("/",(req,res,next)=>{
        res.status(200).json({
            message:"orders here"
        });
    });


    router.post("/",function (req,res,next) {
        const neworder={
            produdtId:req.body.produdtId,
            quantity:req.body.quantity
        };
        res.status(201).json({
            message:"order created",
            order:neworder
        });

    });

    router.get("/:orderId",function (req,res,next) {
        const id= req.params.orderId;
        if(id=="special"){
            res.status(200).json({
                message:"hobby you found the secretId",
                id:id
            });
        }else {
            res.status(200).json({
                message:"no not correct"
            });
        }

    });

    router.patch("/:orderId",(req,res,next)=>{
        const id= req.params.orderId;

        res.status(200).json({
            message:"order uopdated"
        });
    });

    router.delete("/:orderId",(req,res,next)=>{
        const id= req.params.orderId;

        res.status(200).json({
            message:"order deleted"
        });
    });


    module.exports=router;