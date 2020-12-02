const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const gravatar=require('gravatar');
const  {check,validationResult}=require('express-validator/check');

const User=require('../../models/user');

router.post('/',
[
    check('name','name is required')
    .not()
    .isEmpty(),
    check('email','please include a email').isEmail(),
    check('password','plz enter a password with min 6 character').isLength({min:6}),
],

  async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()}); //bad request
        }

        const {name,email,password}=req.body;
    try{
        let user = await User.findOne({email});
        if(user){
            return res
            .status(400).json({errors:[{msg:'User already exits'}]});
        }
        //see if user exits


    //get users gravatar

    const avatar=gravatar.url(email,{

        s:'200', //size
        r:'pg',//rating
        d:'mm' //deafult img
    })
    user =new User({
        name,
        email,
        avatar,
        password
    });
    //encrypt passsword 
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(password,salt);
    await user.save();
 
    //return jsonwebtoken
    res.send('user registered');

    }catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
    
    //return jsonwebtoken
res.send('User route');
})

//@route GET api/users
//@desc Test route
//@acess PUblic



module.exports=router;