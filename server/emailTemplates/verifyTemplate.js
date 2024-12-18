const verificationEmail = (userName, verifyLink) => {
    return `
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .email-header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .email-header h1 {
                    color: #333333;
                }
                .email-content {
                    text-align: center;
                }
                .email-button {
                    display: inline-block;
                    background-color: #007bff;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    font-size: 16px;
                    margin-top: 20px;
                }
                .email-footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 14px;
                    color: #888888;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">
                    <h1>Verify Your Email Address</h1>
                </div>
                <div class="email-content">
                    <p>Hello ${userName} <br> Thank you for signing up with <strong>TestingNodemailer</strong>. To complete your registration, please verify your email address by clicking the button below:</p>
                    <a href="${verifyLink}" class="email-button">Verify Email Address</a>
                    <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
                    <p><a href="${verifyLink}">${verifyLink}</a></p>
                </div>
                <div class="email-footer">
                    <p>This link will expire in [X] hours. If you did not request this verification, you can safely ignore this email.</p>
                    <p>If you need assistance, please contact us at <a href="mailto:[Support Email]">[Support Email]</a>.</p>
                    <p>Thank you,<br>The [Your Company/Website Name] Team</p>
                </div>
            </div>
        </body>
    `;
};

export default verificationEmail;