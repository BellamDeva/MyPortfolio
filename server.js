const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Required for cross-origin requests

const app = express();
const port = 3000; // You can choose any available port

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Serve static files (your frontend)
app.use(express.static('C:\Users\DELL\Desktop\personal\port')); // Adjust this path to your frontend files

// Contact form submission route
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter object using your email service's SMTP details
    // Replace with your actual email service credentials (use environment variables in production!)
    let transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., 'gmail', 'outlook', or custom SMTP
        auth: {
            user: 'devabellam21@gmail.com', // Your email address
            pass: 'swfn lwqt ohgr clcr' // Your email password or app-specific password
        }
    });

    // Email content
    let mailOptions = {
                from: email, // The email address entered by the user in the contact form // Sender address
        to: 'devabellam21@gmail.com', // Recipient address (your email)
        subject: `New Contact Form Submission from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong> ${message}</p>`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending email.');
        }
        console.log('Message sent: %s', info.messageId);
        res.status(200).send('Email sent successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
