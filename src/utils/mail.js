import Mailgen from "mailgen";
import nodemailer from "nodemailer"; 

 export const sendMail = async (options) => {
  
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "E-Commerce", 
      link: "https://mailgen.js/",
    },
  });

  //  Generate the email content
  const emailBody = mailGenerator.generate(options.mailGenContent); 
  const emailText = mailGenerator.generatePlaintext(options.mailGenContent);

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  // Compose mail options
  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject, 
    text: emailText,
    html: emailBody,
  };

  try {
    await transporter.sendMail(mail);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Mail sending error:", error);
  }
};


export const emailVerificationMailGenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to E-commerce! We're very excited to have you on board.",
      action: {
        instructions: "To get started with Mailgen, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "verify Your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};


export const forgetPasswordMailGenContent = (username, passwordResetURL) => {
  return {
    body: {
      name: username,
      intro: "we got a request to change you'r password",
      action: {
        instructions: "To change the password click the button below",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Reset Password",
          link: passwordResetURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
