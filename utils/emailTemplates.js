// utils/emailTemplates.js

// Forgot Password Email Template
exports.forgotPasswordTemplate = (resetLink) => {
    return `
      <html>
        <body>
          <h2>Password Reset Request</h2>
          <p>Hi,</p>
          <p>You requested a password reset. Please click the link below to reset your password:</p>
          <a href="${resetLink}" target="_blank">Reset Password</a>
          <p>If you did not request this, please ignore this email.</p>
          <p>Best regards,<br />Your App Team</p>
        </body>
      </html>
    `;
  };
  
  // Reset Password Confirmation Email Template
  exports.resetPasswordTemplate = () => {
    return `
      <html>
        <body>
          <h2>Password Reset Successful</h2>
          <p>Your password has been successfully reset. You can now log in with your new password.</p>
          <p>If you did not initiate this reset, please contact support immediately.</p>
          <p>Best regards,<br />Your App Team</p>
        </body>
      </html>
    `;
  };
  