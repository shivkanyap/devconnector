const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>res.send('auth route'))

//@route GET api/auth
//@desc Test route
//@acess PUblic



module.exports=router;