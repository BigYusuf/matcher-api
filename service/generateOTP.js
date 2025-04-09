const otpGenerator = require('otp-generator')
 
const generateLicence = () => {
   const OTP = otpGenerator.generate(27, {
    lowerCaseAlphabets: true,
    upperCaseAlphabets: true,
    specialChars: true,
    digits: true,
   });

   return "li-" + OTP
  }

 const generateOTP = () => {
   const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    digits: true,
   });

   return OTP
  }

module.exports = { generateLicence, generateOTP }