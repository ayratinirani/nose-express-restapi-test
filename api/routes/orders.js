
    const  express= require("express");
    const  router = express.Router();

    router.get("/",(req,res,next)=>{
        res.status(200).json({
            message:"orders here"
        });
    });


    router.post("/",function (req,res,next) {

        res.status(200).json({
            message:"order here"
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