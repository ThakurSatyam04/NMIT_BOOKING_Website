import nodemailer from 'nodemailer'


export const sendEmail = async (req,res,next) => {

    const transporter = nodemailer.createTransport ({
        service: 'Gmail',
        auth: {
            user: 'riya@gmail.com',
            pass: '123456'
        }
    })
    const { recipient, subject, message } = req.body;

    const mailOptions = {
        from : "riya@gmail.com",
        to: recipient,
        subject: subject,
        text: message, 
    };

    try{
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message : "email sent successfully"})
    } catch(err){
        next(err)
    }
}
