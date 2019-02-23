const  express= require("express");
const  router = express.Router();


router.get("/",function (req,res,next) {

    res.status(200).json({
        message:"products here"
    });

});

router.post("/",function (req,res,next) {
 const product={
     name:req.body.name,
     price:req.body.price
 };
 
    res.status(201).json({
        message:"products here",
        createdProduct:product
    });

});
router.get("/:productId",function (req,res,next) {
    const id= req.params.productId;
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

router.patch("/:id",(req,res,next)=>{

    res.status(200).json({
        message:"product uopdated"
    });
});

router.delete("/:id",(req,res,next)=>{

    res.status(200).json({
        message:"product deleted"
    });
});



module.exports=router;