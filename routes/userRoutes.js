import express from 'express';
import UserController from '../controllers/usercontrollers.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import path from 'path';
const app = express();
const router = express.Router();

router.post('/register', UserController.userRegistration);
router.post('/login', UserController.userLogin);
// router.post('/logout', authMiddleware, UserController.userLogout);

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

export default router;
