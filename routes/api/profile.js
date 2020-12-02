const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>res.send('Profile route'))

//@route GET api/profile
//@desc Test route
//@acess PUblic



module.exports=router;