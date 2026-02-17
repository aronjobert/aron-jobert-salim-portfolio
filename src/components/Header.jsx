export default function Header() {
    return (
        <div className="flex flex-col items-center justify-center w-11/12 h-screen max-w-6xl gap-4 pt-24 mx-auto text-center">
          

            <img src="./assets/aron-salim-profile.png" alt="" className="w-32 rounded-full" />
            <h3 className="flex items-end gap-2 mb-3 text-xl md:text-2xl font-Poppins">
                Hi! I&apos;m Aron Jobert
                <img src="./assets/hand-icon.png" alt="" className="w-6 mb-1" />
            </h3>
            <h1 className="text-xl sm:text-6xl lg:text-[66px] font-Poppins font-semibold">Building High-Performing eCommerce Stores on Shopify, WordPress & Duda</h1>
            <p className="max-w-2xl mx-auto font-Poppins">I am a Web Developer & Designer from Philippines with 4 years of Experience. focusing on building Shopify, WordPress and Duda Websites. </p>

            <div className="flex flex-col items-center gap-4 mt-4 sm:flex-row">
                <a href="#contact"
                    className="px-10 py-2.5 border rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white flex items-center gap-2 dark:border-transparent">
                    Contact Me <img src="./assets/right-arrow-white.png" alt="" className="w-4" />
                </a>

                {/* <a href="./assets/Aron-Jobert-Salim-Resume.pdf" download */}
                <a target="_block" href="https://drive.google.com/file/d/1qyyyb7g2EWrOtrvDeaoNWz7TF-a6vjBk/view?usp=drive_link"
                    className="px-10 py-2.5 rounded-full border border-gray-300 dark:border-white/25 hover:bg-slate-100/70 dark:hover:bg-darkHover flex items-center gap-2 bg-white dark:bg-transparent dark:text-white">
                    My Resume <img src="./assets/download-icon.png" alt="" className="w-4 dark:invert" />
                </a>
            </div>
        </div>
    )
}