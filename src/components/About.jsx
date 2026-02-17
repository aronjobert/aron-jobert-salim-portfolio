export default function About() {
    const tools = [
        { name: 'vscode', icon: './assets/vscode.png', },
        { name: 'git', icon: './assets/git.png', },
        { name: 'api', icon: './assets/api.png', },
        { name: 'photoshop', icon: './assets/photoshop.png', },
        { name: 'elementor', icon: './assets/elementor.png', },
        { name: 'google-analytics', icon: './assets/google-analytics.png', },
        { name: 'page-speed-insight', icon: './assets/page-speed-insight.png', },
        { name: 'figma', icon: './assets/figma.png', },
    ];

    const data = [
        {
            name: 'Languages',
            icon1: './assets/code-icon.png',
            icon2: './assets/code-icon-dark.png',
            description: 'HTML, CSS, JavaScript, Shopify Liquid, PHP, MySQL, React Js, Tailwind',
        },
        {
            name: 'Education',
            icon1: './assets/edu-icon.png',
            icon2: './assets/edu-icon-dark.png',
            description: 'Bachelor of Science Information Technology',
        },
        {
            name: 'Projects',
            icon1: './assets/project-icon.png',
            icon2: './assets/project-icon-dark.png',
            description: 'Designed and built Shopify eCommerce stores, as well as professional, brand-focused websites with Duda Website Builder.',
        },
    ];
    return (
        <div id="about" className="w-full px-[12%] py-10 scroll-mt-20">
            <h4 className="mb-2 text-lg text-center font-poppins">Introduction</h4>
            <h2 className="text-5xl font-bold text-center font-Poppins">About me</h2>

            <div className="flex flex-col items-center w-full gap-20 my-20 xl:flex-row">
                <div className="relative mx-auto max-w-max">
                    <img src='./assets/user-image.jpeg' alt="" className="w-64 sm:w-80 rounded-3xl max-w-none" />

                    <div className="bg-white w-1/2 aspect-square absolute right-0 bottom-0 rounded-full translate-x-1/4 translate-y-1/3 shadow-[0_4px_55px_rgba(149,0,162,0.15)] flex items-center justify-center">
                        <img src="./assets/circular-text.png" alt="" className="w-full animate-spin_slow" />
                        <img src="./assets/dev-icon.png" alt="" className="absolute w-1/4 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
                    </div>
                </div>
                <div className="flex-1 w-full">
                    <p className="max-w-2xl mb-10 lg:max-w-full font-poppins">I am an experienced Web Designer & Developer with over 4 years of professional expertise in building and optimizing websites and eCommerce stores. Throughout my career, I have collaborated with clients across Duda, Shopify, and WordPress, helping them create high-performing, conversion-focused, and SEO-friendly online experiences.</p>

                    <ul className="grid max-w-2xl grid-cols-1 gap-6 lg:max-w-full sm:grid-cols-3">
                        {data.map((data) => (
                            <li key={data.name} className="p-6 duration-500 border border-gray-300 cursor-pointer dark:border-white/30 rounded-xl hover:bg-lightHover hover:-translate-y-1 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50">
                                <img src={data.icon1} alt="" className="mt-3 w-7 dark:hidden" />
                                <img src={data.icon2} alt="" className="hidden mt-3 w-7 dark:block" />
                                <h3 className="my-4 font-semibold text-gray-700 dark:text-white">{data.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-white/80">{data.description}</p>
                            </li>
                        ))}
                    </ul>
                    <h4 className="my-6 text-gray-700 font-Poppins dark:text-white/80">Tools I use</h4>

                    <ul className="flex flex-wrap items-center gap-3 md:flex-nowrap sm:gap-5">
                        {tools.map((tool) => (
                            <li key={tool.name} className="flex items-center justify-center w-12 duration-500 border border-gray-300 rounded-lg cursor-pointer sm:w-14 aspect-square dark:border-white/30 hover:-translate-y-1">
                                <img src={tool.icon} alt={tool.name} title={tool.name} className="w-5 sm:w-7" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}