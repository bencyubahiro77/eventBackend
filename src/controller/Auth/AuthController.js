import {User} from '../../database/models/index.js'
import { createToken } from '../../middleware/authMiddleware.js';

const login =  async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({
            where: {email},
        });
        if (!user) {
            return res.status(400).json({ status: 400, message:'User does not exist',data:[] });
          }
          if (password === user.password) {
            user.password = null;
            const token = createToken({ user });
        
            return res.status(200).json({
              status: 200,
              data: user,
              token,
              message: 'Login Successfully ',
            });
          }
          return res
            .status(400)
            .json({ status: 400, message: 'Invalid email or Password',data:[] });

    } catch (error) {
         res.status(error.status).json({status:error.status,message:error.message,data:[]});
    }

}

export default {login}