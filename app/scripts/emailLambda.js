console.log('Loading contact form processing function.');

// Load the SES API.
var AWS = require('aws-sdk');
var ses = new AWS.SES();

exports.handler = function (event, context) {
    console.log('Received event:', JSON.stringify(event, null, 2));

    // Check that we received all the required data.
    if (!event.inputName || event.inputName.trim() === '') {
        context.fail('The name is required.');
        return;
    }
    if (!event.inputEmail) {
        context.fail('The email address is required.');
        return;
    }
    if (!event.inputAttend) {
        context.fail('The Number Attending is required.');
        return;
    }
    if (!event.inputReal || event.inputReal.trim() === '' || event.inputReal != "7") {
        context.fail('4 + 3 = 7. Please enter 7 in the last field and submit the form.');
        return;
    }

    // Put together all info needed to send the email.
    var name = event.inputName.trim();
    var email = unescape(event.inputEmail.trim());
    var guestName = event.inputGuestName ? event.inputGuestName : " None Provided";
    var hotel = event.inputHotel ? event.inputHotel : " None Provided";
    var extraMessage = event.inputMessage ? event.inputMessage.trim() : " None Provided";
    var replyTo = event.name + " <" + email + ">";
    var subject = "RSVP from " + name;
    var message = "RSVP from " + name + " <" + email + ">\n\n" + "Number attending: " + event.inputAttend  + "\n\n Guest Names: " + guestName + "\n\n Hotel: " + hotel + "\n\n Message: " + extraMessage;

    // Send the email via SES.
    var params = {
        Destination: { ToAddresses: [ 'Karl And Eimear <karlandeimear@gmail.com>' ] },
        Message: {
            Body: { Text: { Data: message, Charset: 'UTF-8' } },
            Subject: { Data: subject, Charset: 'UTF-8' }
        },
        Source: 'Karl And Eimear <karlandeimear@gmail.com>',
        ReplyToAddresses: [ replyTo ]
    };
    ses.sendEmail(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            context.fail("Error. Couldn't send the message. Try again!");
            return;
        } else {
            console.log(data);
            context.succeed("Message sent. I'll get back to you in no time!");
            return;
        }
    });
};