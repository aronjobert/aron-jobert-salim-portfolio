export default function Footer() {
    return (
        <div className="mt-20">
            <div className="text-center">
                <a href="#!">
                    <img src="/assets/logo.png" alt="" className="mx-auto mb-2 w-36 dark:hidden" />
                    <img src="/assets/logo_dark.png" alt="" className="hidden mx-auto mb-2 w-36 dark:block" />
                </a>

                <div className="flex items-center gap-2 mx-auto w-max">
                    <img src="./assets/mail_icon.png" alt="" className="w-5 dark:hidden" />
                    <img src="./assets/mail_icon_dark.png" alt="" className="hidden w-5 dark:block" />

                    <a href="mailto:aronjobertsalim@gmail.com">aronjobertsalim@gmail.com</a>
                </div>
            </div>
            <div className="text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-3">
                <p>© {new Date().getFullYear()} • All rights reserved • Aron Jobert Salim</p>
                <ul className="flex items-center justify-center gap-10 mt-4 sm:mt-0">
                    <li><a target="_block" href="https://profile.indeed.com/p/arons-7268d1c">Indeed</a></li>
                    <li><a target="_block" href="www.linkedin.com/in/aron-jobert-salim">LinkedIn</a></li>
                    <li><a target="_block" href="https://www.onlinejobs.ph/jobseekers/info/986084">OnlineJobs PH</a></li>
                </ul>
            </div>
        </div>
    )
}