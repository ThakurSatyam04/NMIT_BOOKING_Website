import nodemailer from 'nodemailer'

export const sendEmail = async (req,res,next)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'human9479@gmail.com',
          pass: 'human@7654'
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
