const joi= require('joi');

const signupValidation=(req,res,next)=>{
    const Schema=joi.object({
        name:joi.string().min(3).max(100).required(),
        email:joi.string().email().required(),
        password:joi.string().min(5).max(100).required()
    });
    const {error}=Schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message:"Bad Request",error
        })
    }
    next();
}

const loginValidation = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      const errmsg = "auth failed, password or mail is wrong";
      
      if (!user) {
        return res.status(403).json({
          message: errmsg, success: false
        });
      }
  
      const isPassEqual = await bcrypt.compare(password, user.password);
      if (!isPassEqual) {
        return res.status(403).json({
          message: errmsg, success: false
        });
      }
  
      const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
      });
  
      res.status(200).json({
        message: "login successful",
        success: true,
        jwtToken,
        email,
        name: user.name
      });
    } catch (err) {
      res.status(500).json({
        message: "internal server error",
        success: false
      });
    }
  };
  
module.exports={
    
    signupValidation,
    loginValidation

}