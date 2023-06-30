import nodemailer from 'nodemailer'

export const sendEmail = async (req,res,next)=>{
  console.log(req.body.userDetails.name)
    const transporter = nodemailer.createTransport({
        // service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'satyamrock04.2000@gmail.com',
          pass: 'lupdurkjmcqggaha'
        }
    });

    var mailOptions = {
        from: 'NMIT Booking Application',// sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.message,
        html: 
        `
        <!DOCTYPE html>
<html>
<head>
  <title>Equipment Booking Request</title>
</head>
<body>
  <div style="font-family: Arial, sans-serif;">
    <h3>Dear ${req.body.name},</h3>
    <p>I hope this email finds you well. I am writing to request a booking for <strong>${req.body.equipName}</strong> at <strong>${req.body.date}</strong> and <strong>${req.body.fromTime} to  ${req.body.toTime}</strong>. I have carefully reviewed the availability and believe this slot would be ideal for my needs.</p>

    <h4>Booking Details:</h4>
    <ul>
      <li><strong>Faculty Name:</strong> ${req.body.userDetails.name}</li>
      <li><strong>Faculty Email:</strong> ${req.body.userDetails.email}</li>
      <li><strong>Equipment:</strong> ${req.body.equipName}</li>
      <li><strong>Date:</strong>${req.body.date}</li>
      <li><strong>Start Time:</strong> ${req.body.fromTime}</li>
      <li><strong>End Time:</strong> ${req.body.toTime}</li>
    </ul>

    <p>I understand that there may be other requests for the same equipment during this time. However, I kindly request your consideration for my booking, as it is crucial for my project.</p>

    <p>Thank you for your attention to this matter. I appreciate your prompt response and assistance in confirming this booking.</p>

    <p>Looking forward to your positive response.</p>

    <p>Best regards,<br>
    ${req.body.userDetails.name}</p>

    <p class="mb-4">The Equipment Booking Request Link Page</p>
    <p>
      <a class="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" href="[Website URL]">Visit Website</a>
    </p>
  </div>
</body>
</html>

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


export const confirmEmail = async (req,res,next)=>{
  console.log(req.body.slotFromTime)
    const transporter = nodemailer.createTransport({
        // service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'satyamrock04.2000@gmail.com',
          pass: 'lupdurkjmcqggaha'
        }
    });

    var mailOptions = {
        from: 'NMIT Booking Application',// sender address
        to: req.body.FacultyEmail, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.message,
        html: 
        `
        <!DOCTYPE html>
<html>
<head>
  <title>Equipment Booking Request</title>
</head>
<div class="container mx-auto px-4 py-8 bg-gray-100">
    <p class="mb-4">Dear ${req.body.FacultyName},</p>
    <p class="mb-4">Your equipment booking for ${req.body.equipName} has been confirmed.</p>
    <p class="mb-4">Booking Details:</p>
    <ul class="list-disc ml-6 mb-4">
      <li><strong>Equipment:</strong> ${req.body.equipName}</li>
      <li><strong>Date:</strong> ${req.body.slotDate}</li>
      <li><strong>Start Time:</strong> ${req.body.slotFromTime}</li>
      <li><strong>End Time:</strong> ${req.body.slotToTime}</li>
    </ul>
    <p class="mb-4">Thank you for using our equipment booking service. If you have any further questions or need assistance, please feel free to contact us.</p>
    <p class="mb-4">Best regards,</p>
    <p class="mb-4">The Equipment Booking Team</p>
    <p>
      <a class="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" href="[Website URL]">Visit Website</a>
    </p>
  </div>
</html>

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

export const rejectEmail = async (req,res,next)=>{
  console.log(req.body.FacultyName)
    const transporter = nodemailer.createTransport({
        // service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'satyamrock04.2000@gmail.com',
          pass: 'lupdurkjmcqggaha'
        }
    });

    var mailOptions = {
        from: 'NMIT Booking Application',// sender address
        to: req.body.FacultyEmail, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.message,
        html: 
        `
        <!DOCTYPE html>
<html>
<body>
  <div class="container mx-auto px-4 py-8 bg-gray-100">
    <h1 class="text-2xl font-bold mb-4">Equipment Booking Rejection</h1>
    <p class="mb-4">Dear ${req.body.FacultyName},</p>
    <p class="mb-4">We regret to inform you that your equipment booking request for ${req.body.equipName} has been rejected.</p>
    <p class="mb-4">Booking Details:</p>
    <ul class="list-disc ml-6 mb-4">
      <li><strong>Equipment:</strong> ${req.body.equipName}</li>
      <li><strong>Date:</strong> ${req.body.slotDate}</li>
      <li><strong>Start Time:</strong> ${req.body.slotFromTime}</li>
      <li><strong>End Time:</strong> ${req.body.slotToTime}</li>
    </ul>
    <p class="mb-4">We apologize for any inconvenience caused. If you have any further questions or need assistance, please feel free to contact us.</p>
    <p class="mb-4">Best regards,</p>
    <p class="mb-4">The Equipment Booking Team</p>
    <p>
      <a class="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" href="[Website URL]">Visit Website</a>
    </p>
  </div>
</body>
</html>
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