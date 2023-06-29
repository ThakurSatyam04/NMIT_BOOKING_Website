import nodemailer from 'nodemailer'

export const sendEmail = async (req,res,next)=>{
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'eddie.beier@ethereal.email',
          pass: 'T6NyvGeJX4WJXW2QSj'
      }
    });

    var mailOptions = {
        from: 'human9479@gmail.com',// sender address
        to: "kumarsatyam04.2000@gmail.com", // list of receivers
        subject: "email send", // Subject line
        text:"Email Send successfully",
        html: `
        <div style="padding:10px;border-style: ridge">
        <p>You have a new contact request.</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Email: "Welcome"</li>
            <li>Subject: "Come"</li>
            <li>Message: "Description"</li>
        </ul>
        `
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: true, respMesg: error})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
      });
};
