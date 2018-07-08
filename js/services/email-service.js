import utilsService, { saveToStorage } from './utils-service.js';

var EMAILS_KEY = 'emailApp';
var emails = [];
var emailsSortDefault = {
    sortBy: '',
    sortIsAsc: false,
};

function loadEmails() {
    emails = utilsService.loadFromStorage(EMAILS_KEY);
    
    if (!emails || emails.length === 0) {
        emails = [];
        addEmailsTest(); // emails for testing
    }
    // emails = sortEmails(emails, emailsSortDefault);
    return Promise.resolve(emails);
}

function createEmail(subject = '', body = '', senderMail = 'user@appsus.com', senderName = 'User Name') {
    return {
        id: utilsService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: '',
        senderMail,
        senderName,
        to: 'user@appsus.com'
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
    emails = sortEmails(emails, emailsSortDefault);
    emails.reverse();
    saveToStorage(EMAILS_KEY, emails);
    return Promise.resolve(email);
}

function filterEmails(emailsToFilter, emailsFiltered, filterBy) {
    if (filterBy.emailStatus !== '') {
        if (filterBy.emailStatus === 'read') {
            emailsFiltered = emailsToFilter.filter(email => email.isRead);
        } else {
            emailsFiltered = emailsToFilter.filter(email => !email.isRead);
        }
    } else emailsFiltered = emailsToFilter;

    emailsFiltered = emailsFiltered.filter(email =>
        (email.subject.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
            email.body.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
            email.senderName.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
            email.senderMail.toLowerCase().includes(filterBy.txt.toLowerCase()))
    );
    return emailsFiltered;
}

function sortEmails(emailsToSort, filterBy) {
    switch (filterBy.sortBy) {
        case 'date':
            emailsToSort = emailsToSort.sort((a, b) => {
                return a.sentAt - b.sentAt;
            });
            break;
        case 'subject':
            emailsToSort = emailsToSort.sort((a, b) => {
                if (a.subject < b.subject) return -1;
                if (a.subject > b.subject) return 1;
                return 0;
            });
            break;
    }
    
    if (!filterBy.sortIsAsc) emailsToSort.reverse();
    
    return emailsToSort;
}

export default {
    loadEmails,
    createEmail,
    sendEmail,
    getEmails,
    getEmailById,
    removeEmail,
    filterEmails,
    sortEmails
}

function addEmailsTest() {
    var temp = createEmail('It\'s coming home!', 'Football is coming home', 'Sus@app.net.il', 'Dudi Rooney');
    temp.isRead = true;
    temp.sentAt = moment(temp.sentAt).add(-2, 'd');
    sendEmail(temp);
    temp.sentAt = moment(temp.sentAt).add(-45, 'm');
    sendEmail(createEmail('My First Email!', 'This is my first email. Yay!', 'Sus@mail.com', 'Puki Ben-Yaron'));
    sendEmail(createEmail('I\'m Back!', 'This is offical.\nI\'m Back.', 'Sus@yam.co.il', 'Baba Cohen'));
    sendEmail(createEmail('Baba is here!', 'Hi Puki,\nbaba is here after his injury.\nCome to his office to pay a visit', 'Sus@met.com', 'Muki Ben-David'));
    temp = createEmail('Does Vue is the best JS Framework?', 'Probably the best framework in the world.\nFor sure.', 'Sus@straw.co.il', 'Horse');
    sendEmail(temp);
    temp.sentAt = moment(temp.sentAt).add(2, 'd');
    emails = sortEmails(emails, emailsSortDefault);
    saveToStorage(EMAILS_KEY, emails);
}