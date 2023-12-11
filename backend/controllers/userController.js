const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userData = require('../model/userModel.js');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const userExists = await userData.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userData.create({
        name,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userData.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
        res.status(400);
        throw new Error('Invalid password');
    }

    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    });
};
