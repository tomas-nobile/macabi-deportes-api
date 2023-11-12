export function formatEmail(email) {

    let formatedEmail

    if (email.includes("@")) {
        const emailSplited = email.split("@");
        formatedEmail = emailSplited[0] + "@" + emailSplited[1].toLowerCase();
    } else {
        formatedEmail = email;
    }

    return formatedEmail;
}