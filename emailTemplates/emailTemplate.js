const verifyEmailTemplate = (user, OTP) => {
  return `<h1>Welcome</h1>
    <p>
    Hi ${user},</p>
    <h2>Thanks for registering on our site.</h2>
    <h4> Please verify your email with the otp below to continue enjoying our services</h4>
    <h1>${OTP}</a>
    <hr/>
    <p>
    Thanks for using our service with us.
    </p>
    `;
};
const resetPasswordTemplate = (user, req) => {
  return `<h1>Reset Password</h1>
    <p>
    Hi ${user.name},</p>
    <h2>Thanks for registering on our site.</h2>
    <h4> Please click the link to reset your password</h4>
    <a href='http://${req.headers.host}/api/users/reset-password/${user.resetpasswordToken}'> Reset Account Password</a>
    <hr/>
    <p>
    Just ignore this message, If you didn't authorize this.
    </p>
    `;
};

const OrderTemplate = (user, tracker) => {
  return `<h1>Order Created</h1>
    <p>
    Hi ${user},</p>
    <h2>Thank you for using our express delivery service.</h2>
    <h4>Coral courier is always here to help with any inquires </h4>
    <a href='http://yusuflateef.vercel.app'>Coral Courier </a>
    <hr/>
    <p>
    ${tracker}
    </p>
    `;
};
const PromoTemplate = (user, req) => {
  return `<h1>1st Promotional Email</h1>
    <p>
    Hi ${user.name},</p>
    <h2>Welccome to prommotional email.</h2>
    <h4> Check out this cool portfolio and see the awesomeness of BigYusuf</h4>
    <a href='http://yusuflateef.vercel.app'>Portfolio </a>
    <hr/>
    <p>
    Yeah, It worked.
    </p>
    `;
};

module.exports = {
  verifyEmailTemplate,
  resetPasswordTemplate,
  PromoTemplate,
  OrderTemplate,
};
