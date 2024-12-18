import nodemailer from "nodemailer"

import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
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