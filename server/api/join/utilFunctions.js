const User = require('../user/userModel');
const jwt = require('jsonwebtoken');
const otplib = require('otplib');
const config = require('../../config/config')
const Preference = require('../preference/preferenceModel');
const Handlebars = require('handlebars');
const smsService = require('../sms/smsController');
const emailService = require('../email/emailController')

exports.generateOTP = function (usrId) {
    const secret = config.secrets.jwt;
    const code = otplib.authenticator.generate(secret);
    const time = 600; //10min value is in seconds
    var token = jwt.sign({ code: code,userId:usrId }, secret, { expiresIn: time });
    return { code, token }
}

exports.verfiOtp = (req) => {
    let otp = req.body.otp;
    let token = req.body.verifyToken

    if (otp == undefined || otp == null) {
        return new Promise((resolve, reject) => reject(new Error('OTP not matched')));
    }
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secrets.jwt, function (err, decoded) {
            if (err) {
                return reject(err)
            }
            return resolve(decoded);
        })
    })
};

exports.pagination = function (req) {
    let pno = 1, skip = 0, psize = 10;
    if (req.query.psize != undefined && req.query.psize != null && !isNaN(req.query.psize)) {
        psize = parseInt(req.query.psize);
    }
    if (req.query.pno != undefined && req.query.pno != null && !isNaN(req.query.pno)) {
        pno = parseInt(req.query.pno);
    }
    skip = (pno - 1) * psize;

    var pagination = { skip, psize, pno };
    return pagination;
}

exports.sendMailSMS = async function(templateData,template,user) {
	try {
		let preference = await Preference.findOne({portfolioId:user.portfolioId})
		let { email, sms } = preference;
		let sender = (email.send.primary) ? email.send.primary : config.smtp.gmail;
		let portfolioEmailId = email.send.primary.auth.user ;
		let portfolioSenderName = email.send.primary.auth.user ;
		let portfolioSmsId = sms.send.primary.senderId || config.sms.msg91.senderId;
		let authKey = sms.send.primary.authKey || config.sms.msg91.authKey;
		//! Problem - Need to compile template once while sending email and again in sms
		let temp = require(`../../templates/${template}/${template}`).temp;
		let html1 = Handlebars.compile(temp.html);
		let subject = Handlebars.compile(temp.subject)
		let text = Handlebars.compile(temp.text)
		let resultBody = html1(templateData);
		let resultSubject = subject(templateData);
        let resultText = text(templateData);
        if(sms.send.notifications){
            smsService.sendSms(user.req, authKey, portfolioSmsId, user.mobile, resultText);
        }
		if(email.send.notifications){
            emailService.sendEmail(sender, {
                from: '"' + portfolioSenderName + '" <' + portfolioEmailId + '>', //sender address
                to: user.email, // list of receivers
                subject: resultSubject,
                text: resultText,
                html: resultBody,
            })
        }
		
	} catch (error) {
		console.log('Error', error);
	}
}

exports.sendMailSMSToSales = async function(templateData,template,user) {
	try {
        let preference = await Preference.findOne({portfolioId:user.portfolioId});
        let portfolio = await PortfolioService.getById(user.portfolioId);
		let { email, sms } = preference;
		let sender = (email.send.primary) ? email.send.primary : config.smtp.gmail;
		let portfolioEmailId = email.send.primary.auth.user ;
		let portfolioSenderName = email.send.primary.auth.user ;
		let portfolioSmsId = sms.send.primary.senderId || config.sms.msg91.senderId;
		let authKey = sms.send.primary.authKey || config.sms.msg91.authKey;
		//! Problem - Need to compile template once while sending email and again in sms
		let temp = require(`../../templates/${template}/${template}`).temp;
		let html1 = Handlebars.compile(temp.html);
		let subject = Handlebars.compile(temp.subject)
		let text = Handlebars.compile(temp.text)
		let resultBody = html1(templateData);
		let resultSubject = subject(templateData);
        let resultText = text(templateData);
        
        for (var i = 0; i < portfolio.contacts.length; i++) {
            smsService.sendSms(user.req, authKey, portfolioSmsId, portfolio.contacts[i].mobile.number, resultText);
            emailService.sendEmail(sender,
                {
                    from: '"' + portfolioSenderName + '" <' + portfolioEmailId + '>', //sender address
                    to: portfolio.contacts[i].email, // list of receivers
                    subject: resultSubject,
                    text: resultText,
                    html: resultBody,
                });
        }
        
        
        
        
        
        
        // if(sms.send.notifications){
        //     smsService.sendSms(user.req, authKey, portfolioSmsId, user.mobile, resultText);
        // }
		// if(email.send.notifications){
        //     emailService.sendEmail(sender, {
        //         from: '"' + portfolioSenderName + '" <' + portfolioEmailId + '>', //sender address
        //         to: user.email, // list of receivers
        //         subject: resultSubject,
        //         text: resultText,
        //         html: resultBody,
        //     })
        // }
		
	} catch (error) {
		console.log('Error', error);
	}
}
