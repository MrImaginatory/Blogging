import nodemailer from "nodemailer"

import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host:'smtp.ethereal.email'|| process.env.EMAIL_HOST,
    port:587 || process.env.EMAIL_PORT ,
    secure:false,
    auth:{
        user:'raoul.shields@ethereal.email'|| process.env.EMAIL_USER,
        pass:'Bj5ZeDfzC1PFUNZWBD'||process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

transporter.verify((error,success)=>{
    if (error) {
        console.error('Error connecting to the email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
})

export default transporter;