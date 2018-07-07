import utilsService, { saveToStorage } from './utils-service.js';

var EMAILS_KEY = 'emailApp';
var emails = [];
var emailFilter = 'All'

function loadEmails() {
    emails = utilsService.loadFromStorage(EMAILS_KEY);
    if (!emails || emails.length === 0) {
        emails = [];
        addEmailsTest(); // emails for testing
    }
    return Promise.resolve(emails);
}

function createEmail(subject = '', body = '', senderMail = '', senderName = '') {
    return {
        id: utilsService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: '',
        senderMail,
        senderName,
        to: 'tester@appsus.com'
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

function sendEmail(email) {
    email.sentAt = moment();
    emails.unshift(email);
    saveToStorage(EMAILS_KEY, emails);
    return Promise.resolve(email);
}

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
    loadEmails,
    createEmail,
    sendEmail,
    getEmails,
    getEmailById,
    removeEmail,
}

function addEmailsTest() {
    var temp = createEmail('It\'s coming home!', 'Football is coming home', 'Sus@app.net.il', 'Dudi Rooney');
    temp.isRead = true;
    sendEmail(temp);
    temp.sentAt = moment(temp.sentAt).add(-45, 'm');
    sendEmail(createEmail('My First Email!', 'This is my first email. Yay!', 'Sus@mail.com', 'Puki Ben-Yaron'));
    sendEmail(createEmail('I\'m Back!', 'This is offical. I\'m Back.', 'Sus@yam.co.il', 'Baba Cohen'));
    sendEmail(createEmail('Baba is here!', 'Hi Puki, baba is here after his injury. Come to his office to pay a visit', 'Sus@met.com', 'Muki Ben-David'));
    temp = createEmail('Does Vue is the best JS Framework?', 'Probably the best framework in the world.', 'Sus@straw.co.il', 'Anonimus Alcoholic');
    sendEmail(temp);
    temp.sentAt = moment(temp.sentAt).add(30, 'd');
    saveToStorage(EMAILS_KEY, emails);
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}