import UserModel from '../models/user.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
    static userRegistration = async (req, res) => {
    try {
        const { name, email, password, tc } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (user) {
            return res.send({ "status": "failed", "message": "Email already exists" });
        } else {
            if (name && email && password && tc) {
                try {
                    const salt = await bcrypt.genSalt(12);
                    const hashPassword = await bcrypt.hash(password, salt);
                    const doc = new UserModel({
                        name: name,
                        email: email,
                        password: hashPassword,
                        tc: tc
                    });
                    await doc.save();
                    const saved_user = await UserModel.findOne({ email: email });
                    //Generate JWT Token
                    const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });

                    return res.status(201).send({ "status": "success", "message": "registration successful", "token": token });
                } catch (err) {
                    return res.send({ "status": "failed", "message": "request failed" });
                }
            } else {
                return res.send({ "status": "failed", "message": "Please enter required fields" });
            }
        }
    } catch (err) {
        return res.status(401).send(err);
    }
};
    
    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (email && password) {
            const user = await UserModel.findOne({ email: email });
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                // Generate JWT Token
                const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
                res.send({ "status": "success", "message": "login successful", "token": token });
                } else {
                res.send({ "status": "failed", "message": "password does not match" });
                }
            } else {
                res.send({ "status": "failed", "message": "email does not exist" });
            }
            } else {
            res.send({ "status": "failed", "message": "all fields are required" });
            }
        } catch (err) {
            res.status(500).send({ "status": "failed", "message": "failed request" });
        }
    };

//      static userLogout = async (req, res) => {
//     try {
//       isLoggedIn = false;

//       res.send({ "status": "success", "message": "Logout successful" });
//     } catch (err) {
//       res.status(500).send({ "status": "failed", "message": "Logout failed" });
//     }
//   }
}

export default UserController;