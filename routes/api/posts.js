const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>res.send('Posts route'))

//@route GET api/users
//@desc Test route
//@acess PUblic



module.exports=router;