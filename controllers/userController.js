import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import { generateJWT } from "../utils/generateJWT.js";

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already registered",
      });
    }

    // create user (OBJECT pass karo)
    const newUser = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error,"error in userRegister");
    return res.status(500).json({
      message: "Server error",
    });
  }
};



const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
              message:"user with credintials not found"
            })
        }

      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
         return res.status(401).json({
           message: "password didnt match",
         });
      }

      const token = generateJWT(user._id, user.role)
      
     return res.status(200).json({
       message: "Login successful",
       token,
       user: {
         id: user._id,
         name: user.name,
         email: user.email,
         role: user.role,
       },
     });
      

        
    } catch (error) {
         console.error(error, "error in userRegister");
         return res.status(500).json({
           message: "Server error",
         });
    }
}
export { userRegister, userLogin };
