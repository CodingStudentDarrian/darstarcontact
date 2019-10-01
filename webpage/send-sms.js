function send() {
    const number = numberInput.value.replace(/\D/g, '');
    const text = textInput.value;
    const time = parseInt(scheduleSelect.value, 10);
    getTimeSchedule({ number, text, time });


    require('dotenv').config({ path: __dirname + '/.env' })

    const Nexmo = require('nexmo')

    const nexmo = new Nexmo({
        apiKey: process.env.NEXMO_API_KEY,
        apiSecret: process.env.NEXMO_API_SECRET
    });

    function myFunction() {
        document.getElementById("sms").submit();
        document.getElementById("phone").innerHTML = number;
        document.getElementById("message").innerHTML = text;
        document.getElementById("mySelect").selectedIndex = "0";
        nexmo.message.sendSms("12408379623", process.env.TO_NUMBER, text, {
            type: "unicode"
        }, (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                if (responseData.messages[0]['status'] === "0") {
                    console.log("Message sent successfully.");
                } else {
                    console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);

                }
            }
        })
    }
}