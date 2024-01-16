import User from '../schemas/userSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const handleErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};

const sendMail = async (user, resetToken) => {
  const transporter = nodemailer.createTransport({
    // Transporter configuration (SMTP settings, etc.)
  });

  const mailOptions = {
    to: user.email,
    subject: 'Password Reset',
    text: `To reset your password, please click the following link or paste it into your browser: \n\n` +
          `http://<your_frontend_url>/reset-password/${resetToken}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.`
  };

  await transporter.sendMail(mailOptions);
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await user.isValidPassword(password)) {
      return handleErrorResponse(res, 401, 'Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return handleErrorResponse(res, 404, 'User not found');
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendMail(user, resetToken);
    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return handleErrorResponse(res, 400, 'Password reset token is invalid or has expired.');
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    handleErrorResponse(res, 500, error.message);
  }
};

export default {
  register,
  login,
  requestPasswordReset,
  resetPassword
};
