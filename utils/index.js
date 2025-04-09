const { generateLicence } = require("../service/generateOTP")

exports.setExpiry = (exp, interval) =>{
    // expires in 1 year
    if(exp ==="Yearly") return new Date().setFullYear(new Date().getFullYear() + interval)
    // expires in 1 month
    if(exp ==="Monthly") return new Date().setMonth(new Date().getMonth() + interval)
    // expires in 1 day
    if(exp ==="Daily") return new Date().setDate(new Date().getDate() + interval)
    // expires in 100 years
    if(exp ==="Never") return new Date().setFullYear(new Date().getFullYear() + 100)
  }
exports.setTrialExpiry = (exp) =>{
    // expires in 1 day
    if(exp ==="1D") return new Date().setDate(new Date().getDate() + 1)
    // expires in 3 days
    if(exp ==="3D") return new Date().setDate(new Date().getDate() + 3)
    // expires in 1 week
    if(exp ==="1W") return new Date().setDate(new Date().getDate() + 7)
    // expires in 2 weeks
  if(exp ==="2W") return new Date().setDate(new Date().getDate() + 14)
  // expires in 1 Month
    if(exp ==="1M") return new Date().setMonth(new Date().getMonth() + 1)
  }

exports.trialHandler = (trialMode, productTrial, accountNumber, productId) => {
    let trial = `li-trial-${accountNumber}-${productId}`
    if(trialMode == true && productTrial) return trial
    return generateLicence()
  }

  
exports.showDiff = (date1, date2, warning) => {

    var diff = (date2 - date1)/1000;
    diff = Math.abs(Math.floor(diff));

    var days = Math.floor(diff/(24*60*60));
    var leftSec = diff - days * 24*60*60;

    var hrs = Math.floor(leftSec/(60*60));
    var leftSec = leftSec - hrs * 60*60;

    var min = Math.floor(leftSec/(60));
    var leftSec = leftSec - min * 60;
    if(warning)return("You have " + days + " days " + hrs + " hours " + min + " minutes and " + leftSec + " seconds to expire.");
    return days

}