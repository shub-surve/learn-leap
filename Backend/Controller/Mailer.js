const nodemailer = require('nodemailer')
const mailgen = require('mailgen')
const {EMAIL , PASSWORD} = require("../mail.js")
const {register} = require('./appController.js')

const registerMail = (req , res) => {
    let config = {
        service : "gmail",
        auth : {
            user : EMAIL,
            password : PASSWORD
        }
    }

    let trasporter = nodemailer.createTransport(config);
    let MailGenerator = new mailgen({
        theme : "default",
        product : {
            name : "mailgen",
            link : "https://mailgen.js"
        }
    })
    let response = {
        body: {
            name,
            intro: 'Welcome  to LearnNleap! We\'re glad to see you again.', // Update the welcome message
            action: {
                instructions: 'To continue learning, please click the button below to log in:', 
                button: {
                    color: '#22BC66', // Button color
                    text: 'Log In', // Button text
                    link: 'https://learnNleap.com/login' // Link to your app's login page
                }
            },
            outro: 'If you have any questions or need assistance, feel free to reach out. We\'re here to help!' // Update the outro message
        }
    }
    let mail = MailGenerator.generate(response)
    const userMAil = 
    let message = {
        from : EMAIL, 
        to : 
    }
}