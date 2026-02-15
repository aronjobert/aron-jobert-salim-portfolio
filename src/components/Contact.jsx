import { useEffect, useState } from 'react'

export default function Contact() {
    const [result, setResult] = useState("");

const onSubmit = async (event) => {
    event.preventDefault();

    const hCaptcha = event.target.querySelector('textarea[name=h-captcha-response]').value;
    if (!hCaptcha) {
        setResult("Please fill out captcha field");
        return;
    }

    setResult("Sending....");
    const formData = new FormData(event.target);

    // ----- Enter your Web3 Forms Access key below---------
    formData.append("access_key", "da758877-94fd-4500-b3c1-8dc441686da1");

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const res = await response.json();

        if (res.success) {
            console.log("Success", res);
            setResult(res.message);
            event.target.reset();
        } else {
            console.log("Error", res);
            setResult(res.message || "Something went wrong");
        }
    } catch (err) {
        console.error("Submit error", err);
        setResult("An error occurred. Please try again later.");
    }
};


    function CaptchaLoader() {
        const captchadiv = document.querySelectorAll('[data-captcha="true"]');
        if (captchadiv.length) {
            let lang = null;
            let onload = null;
            let render = null;

            captchadiv.forEach(function (item) {
                const sitekey = item.dataset.sitekey;
                lang = item.dataset.lang;
                onload = item.dataset.onload;
                render = item.dataset.render;

                if (!sitekey) {
                    item.dataset.sitekey = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";
                }
            });

            let scriptSrc = "https://js.hcaptcha.com/1/api.js?recaptchacompat=off";
            if (lang) {
                scriptSrc += `&hl=${lang}`;
            }
            if (onload) {
                scriptSrc += `&onload=${onload}`;
            }
            if (render) {
                scriptSrc += `&render=${render}`;
            }

            var script = document.createElement("script");
            script.type = "text/javascript";
            script.async = true;
            script.defer = true;
            script.src = scriptSrc;
            document.body.appendChild(script);
        }
    }

    useEffect(() => {
        CaptchaLoader();
    }, []);
    return (
        <div id="contact" className="w-full px-[12%] py-10 scroll-mt-20 bg-[url('./assets/footer-bg-color.png')] bg-no-repeat bg-[length:90%_auto] bg-center dark:bg-none">

            <h4 className="mb-2 text-lg text-center font-Poppins">Connect with me</h4>
            <h2 className="text-5xl text-center font-Poppins">Get in touch</h2>
            <p className="max-w-2xl mx-auto mt-5 mb-12 text-center font-Poppins">I&apos;d love to hear from you! If you have any questions, comments or feedback, please use the form below.</p>

            <form onSubmit={onSubmit} className="max-w-2xl mx-auto">

                <input type="hidden" name="subject" value="Aron Jobert - Portfolio Form Submission" />

                <div className="grid gap-6 mt-10 mb-8 grid-cols-auto">
                    <input type="text" placeholder="Enter your name" className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md outline-none focus:ring-1 dark:border-white/30 dark:bg-darkHover/30" required name="name" />

                    <input type="email" placeholder="Enter your email" className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md outline-none focus:ring-1 dark:border-white/30 dark:bg-darkHover/30" required name="email" />
                </div>
                <textarea rows="6" placeholder="Enter your message" className="w-full px-4 py-2 mb-6 bg-white border border-gray-300 rounded-md outline-none focus:ring-1 dark:border-white/30 dark:bg-darkHover/30" required name="message"></textarea>
                <div className="max-w-full mb-6 h-captcha" data-captcha="true"></div>
                <button type='submit' className="flex items-center justify-between gap-2 px-8 py-2 mx-auto text-white duration-500 rounded-full w-max bg-black/80 hover:bg-black dark:bg-transparent dark:border dark:border-white/30 dark:hover:bg-darkHover">
                Submit now
                    <img src="./assets/right-arrow-white.png" alt="" className="w-4" />
                </button>
                <p className='mt-4'>{result}</p>
            </form>
        </div>
    )
}