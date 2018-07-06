import utilsService, { saveToStorage } from './utils-service.js';

var EMAILS_KEY = 'emailApp';
var emails = [];
var emailFilter = 'All'

function createEmails() {
    emails = utilsService.loadFromStorage(EMAILS_KEY);
    if (!emails || emails.length === 0) {
        emails = [];
        addEmailsTest(); // emails for testing
    }
    return Promise.resolve(emails);
}

function createEmail(subject, body, senderMail, senderName) {
    return {
        id: utilsService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        senderMail,
        senderName
    }
}

function getEmails() {
    return Promise.resolve(emails);
}

function getEmailById(id) {
    let email = emails.find(email => email.id === id);
    return Promise.resolve(email);
}

function removeEmail(id) {
    return new Promise((resolve, reject) => {
        var emailIdx = emails.findIndex(email => email.id === id);
        if (emailIdx !== -1) {
            emails.splice(emailIdx, 1);
            saveToStorage(EMAILS_KEY, emails);
            resolve();
        } else {
            reject('Error. Try to refresh, then delete again');
        }
    });
}

// function saveEmail(email) {
//     if (email.id) {
//         var emailIdx = emails.findIndex(currEmail => currEmail.id === email.id);
//         emails.splice(emailIdx, 1, email)
//     } else {
//         email.id = makeId();
//         emails.unshift(email);
//     }
//     return Promise.resolve(email);
// }

// function getPrevEmailId(emailId) {
//     var emailIdx = emails.findIndex(currEmail => currEmail.id === emailId);
//     var prevEmail = (emailIdx === 0) ? emails[emails.length - 1] : emails[emailIdx - 1];
//     return Promise.resolve(prevEmail.id)
// }

// function getNextEmailId(emailId) {
//     var emailIdx = emails.findIndex(currEmail => currEmail.id === emailId);
//     var nextEmail = (emailIdx < emails.length - 1) ? emails[emailIdx + 1] : emails[0];
//     return Promise.resolve(nextEmail.id)
// }

export default {
    createEmails,
    getEmails,
    getEmailById,
    removeEmail,
    // saveEmail
}

function addEmailsTest() {
    emails.unshift(createEmail('My First Email!', 'This is my first email. Yay!', 'Sus@mail.com', 'Puki Ben-Yaron'));
    emails.unshift(createEmail('I\'m Back!', 'This is offical. I\'m Back.', 'Sus@yam.co.il', 'Baba Cohen'));
    emails.unshift(createEmail('Baba is here!', 'Hi Puki, baba is here after his injury. Come to his office to pay a visit', 'Sus@met.com', 'Muki Ben-David'));
    saveToStorage(EMAILS_KEY, emails);
}