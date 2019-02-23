const  express= require("express");
const  router = express.Router();
const mongoose=require("mongoose");
const Product = require("../models/product");


router.get("/",function (req,res,next) {
  Product.find().
  select("name price _id")
  .exec()
  .then(products=>{
     const response={
         count:products.length,
         products:products.map(doc=>{
             return{
                 name:doc.name,
                 price:doc.price,
                 _id:doc.id,
                 request:{
                     type:"GET",
                     url:"http://localhost:3435/products/"+doc.id
                 }
             }
         })
     };
      if(products.length>=1){
      res.status(200).json(response);}else{
          res.status(404).json({message:"not found any thng"})
      }
  })
  .catch(err=>{
      console.log(err);
      res.status(500).json({eror:err});
  });
  
});

router.post("/",function (req,res,next) {

 const product=new Product({
_id:new mongoose.Types.ObjectId,
    name:req.body.name,
    price:req.body.price
 });
     product.save().then((result)=>{
         console.log(result);
         res.status(201).json({
            message:"products here",
            createdProduct:{
                name:result.name,
                price:result.price,
                _id:result.id,
                request:{
                    type:"Get",
                    url:"http://localhost:3435/products/"+result.id
                }

            }
        })   .catch(err=>{
            console.log(err);
            res.status(500).json({eror:err});
        });;
     });
   

});
router.get("/:productId",function (req,res,next) {
    const id= req.params.productId;
    Product.findById(id)
    .select("name price _id")
    .exec()
    .then(doc=>{
        if(doc){
        
        res.status(200).json(
        {
            product:doc,
            request:{
                type:"GET",
                description:"TO GET ALL PRODUCTS",
                url:"http://localhost:3435/products"
            }
        }
        );}else{
            res.status(404).json({message:"no valid info"});
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({eror:err});
    });


});

router.patch("/:id",(req,res,next)=>{
    const id= req.params.id;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    Product.update({_id:id},{$set:updateOps})
            .exec()
            .then(result=>{
              
                res.status(200).json(
                   {message:"product updated",
                request:{
                    type:"GET",
                    url:"localhost:3435/products/"+id
                }
                }
                    
                    );
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    ;

});

router.delete("/:id",(req,res,next)=>{
    const id=req.params.id;
    Product.deleteOne({_id:id})
        .exec()
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    ;
   
});



module.exports=router;