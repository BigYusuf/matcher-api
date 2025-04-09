const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { generateToken } = require("../middleware/Auth");
const { sendMail } = require("../utils/sendMail");

exports.logout = expressAsyncHandler(async (req, res) => {
  try {
    res
      .status(200)
      .cookie("accessToken", "", { maxAge: 1 })
      .send({ success: true, message: "Success" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

exports.forgotPass = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).send({ message: "Email not found" });
    }

    const user = result.rows[0];
    const resetToken = crypto.randomBytes(20).toString("hex"); // Generate a reset token

    // Store the reset token in the database (for validation)
    await pool.query(
      "UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE email = $3",
      [resetToken, Date.now() + 3600000, email] // Token expires in 1 hour
    );

    // Send reset email with the token
    const emailSuccess = await sendMail(email, resetToken);

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "your-email@gmail.com", // Replace with your email
    //     pass: "your-email-password", // Replace with your email password or use an app password
    //   },
    // });

    // const resetLink = `http://localhost:5200/api/auth/reset-password/${resetToken}`;

    // const emailContent = forgotPasswordTemplate(resetLink);

    // await transporter.sendMail({
    //   to: email,
    //   subject: "Password Reset Request",
    //   html: emailContent,
    // });
    if (emailSuccess) {
      res
        .status(200)
        .send({ success: true, message: "Password reset email sent" });
    } else {
      res.status(400).send({ success: false, message: "Something went wrong" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

exports.resetPass = expressAsyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    // Find user by reset token
    const result = await pool.query(
      "SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiry > $2",
      [token, Date.now()]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = result.rows[0];
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password and clear reset token
    await pool.query(
      "UPDATE users SET password = $1, reset_token = NULL, reset_token_expiry = NULL WHERE id = $2",
      [hashedPassword, user.id]
    );

    // Send confirmation email after reset
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com", // Replace with your email
        pass: "your-email-password", // Replace with your email password or use an app password
      },
    });

    const emailContent = resetPasswordTemplate();

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset Successful",
      html: emailContent,
    });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// exports.verifyOTP = expressAsyncHandler(async (req, res) => {
//   try {
//     const { email, token } = req.body;
//     if (!email) {
//       res.status(400).send({ message: "Email field cannot be empty!" });
//       return;
//     }
//     const tokenValues = {
//       isVerified: 1,
//       status: "used",
//       updatedAt: Date.now(),
//     };
//     const userAlreadyExists = await checkRecordExists("users", "email", email);
//     if (userAlreadyExists) {
//       res.status(409).send({ message: "Email already exists" });
//     } else {
//       //  //check if uregistered email exist
//       //  const checkMail = await checkRecordExists("tokens", "email", email);
//       const checkToken = await checkRecordExists("tokens", "token", token);

//       //check if token is verified
//       if (checkToken?.isVerified === 1 || checkToken?.status === "used") {
//         res.status(401).send({ message: "Already verified" });
//         return;
//       }
//       //check if token and email
//       if (checkToken?.email !== email) {
//         res.status(400).send({ message: "Invalid account" });
//         return;
//       }
//       if (!checkToken) {
//         res.status(400).send({ message: "Invalid token" });
//         return;
//       }

//       //if time is greater than 15 minutes, send token expired
//       let difference = Date.now() - checkToken?.createdAt;
//       let resultInMinutes = Math.round(difference / 60000);

//       if (resultInMinutes > 15) {
//         res.status(401).send({ message: "Token Expired" });
//         return;
//       }
//       await updateRecord("tokens", tokenValues, "token", token);

//       res
//         .status(200)
//         .send({ success: true, message: "Account Verified successfully!" });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .send({ error: error?.message, message: "Internal Server Error" });
//   }
// });

exports.register = expressAsyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const analysis = await analyzeData(req.body.text, 2);
  console.log(analysis)
  return
  if (!name || !email || !password) {
    return res.status(400).send({ message: "All fields are required" });
  }
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  try {
    const hashedPassword = await bcrypt.genSaltSync(10);
    const userRole = role ? role : "user";
    const userId = crypto.randomUUID();
    const result = await pool.query(
      "INSERT INTO users (id, name, email, password, created_at, updated_at) VALUES ($1, $2, $3) RETURNING *",
      [userId, name, email, hashedPassword, userRole, createdAt, updatedAt]
    );

    const token = generateToken(userId);
    if (!result[0]) {
      res.status(400).send({ success: false, message: "Error Occured" });
    }
    res.status(201).send({
      success: true,
      message:
        role === "staff"
          ? "Staff created successfully!"
          : "Account created successfully!",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

exports.login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const token = generateToken(user.id);

    res.status(200).send({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
