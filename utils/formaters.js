export function formatEmail(email) {

    console.log("asdadasd");

    let formatedEmail

    if (email.includes("@")) {
        const emailSplited = email.split("@");
        formatedEmail = emailSplited[0] + "@" + emailSplited[1].toLowerCase();
    } else {
        formatedEmail = email;
    }



    return formatedEmail;

}