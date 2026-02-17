export default function Work() {
    const work1 = [
         {
            name: 'Best Car Detailing',
            icon: './assets/best_car_detailing.png',
            description: 'Client business website build',
            link: 'https://www.bestcardetailing.com.au/',
        },
        {
            name: 'Eagle Tamer Barbershop',
            icon: './assets/eagle_tamer_barbershop.png',
            description: 'Client business website build',
            link: 'https://www.eagletamerbarbershop.com.au/',
        },
        {
            name: 'JAdore Flowers & Gifts',
            icon: './assets/jadore_flowers_and_gifts.png',
            description: 'Client ecommerce website build',
            link: 'https://www.jadorecairns.com.au/',
        },
        {
            name: 'Salt Building & Pest Inspection',
            icon: './assets/salt_building_pest_inspections.png',
            description: 'Client business website build',
            link: 'https://www.saltinspections.com.au/',
        },
    ];

    const workMockups = [
        {
            name: 'Cakeholics',
            icon: './assets/cakeholics.png',
            description: 'Cakeholics website UI Design',
            link: 'https://drive.google.com/file/d/1gIAWFIQERH4fN2thRxpVD027YUPi350m/view?usp=sharing',
        },
        {
            name: 'Earthenics',
            icon: './assets/earthenics.png',
            description: 'Earthenics website UI Design',
            link: 'https://drive.google.com/file/d/17twJ9rAZLtyaTbg2fNWdYnfzi9XvjojD/view?usp=sharing',
        },
        {
            name: 'Furmister',
            icon: './assets/furmister.png',
            description: 'Furmister website UI Design',
            link: 'https://drive.google.com/file/d/19gGlI-0dQ2kcQKKnvfFMf7W98cd1BPsr/view?usp=sharing',
        },

    ];

    const work = [
        {
            name: 'CAP Middle East',
            icon: './assets/cap_website.png',
            description: 'Ecommerce full website build',
            link: 'https://capmiddleast.com/',
        },
        {
            name: 'Elysce Essential Oils',
            icon: './assets/elysce_website.png',
            description: 'Handled overall website changes',
            link: 'https://elysce.com/',
        }
    ];
    
    return (
        <div id="work" className="w-full px-[12%] py-10 scroll-mt-20">
            <h4 className="mb-2 text-lg text-center font-Poppins">My portfolio</h4>
            <h2 className="text-5xl font-bold text-center font-Poppins">My latest work</h2>
            <p className="max-w-2xl mx-auto mt-5 mb-12 text-center font-Poppins">Welcome to my web development portfolio! Explore a collection of projects showcasing my expertise in front-end development.</p>

            <h3 className="mb-2 text-2xl font-bold text-center font-Poppins">Duda Websites</h3>

            <div className="grid grid-cols-1 gap-5 my-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 dark:text-black">
                {work1.map((work1) => (
                    <div key={work1.name} className="relative bg-center bg-no-repeat bg-cover rounded-lg cursor-pointer aspect-square group" style={{ backgroundImage: `url(${work1.icon})` }}>
                        <div className="shadow-[0_4px_55px_rgba(149,0,162,0.15)] absolute flex items-center justify-between w-10/12 col-span-2 px-5 py-3 duration-500 -translate-x-1/2 bg-white rounded-md bottom-5 left-1/2 group-hover:bottom-7">
                            <div>
                                <h2 className="font-semibold">{work1.name}</h2>
                                <p className="text-sm text-gray-700">{work1.description}</p>
                            </div>
                            <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition">
                                <a target="_block" href={work1.link}><img  src="./assets/send-icon.png" alt="" className="w-5" /></a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            
            <h3 className="mb-2 text-2xl font-bold text-center font-Poppins">Website Mockups</h3>

            <div className="grid grid-cols-1 gap-5 my-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 dark:text-black">
                {workMockups.map((workMockups) => (
                    <div key={workMockups.name} className="relative bg-center bg-no-repeat bg-cover rounded-lg cursor-pointer aspect-square group" style={{ backgroundImage: `url(${workMockups.icon})` }}>
                        <div className="shadow-[0_4px_55px_rgba(149,0,162,0.15)] absolute flex items-center justify-between w-10/12 col-span-2 px-5 py-3 duration-500 -translate-x-1/2 bg-white rounded-md bottom-5 left-1/2 group-hover:bottom-7">
                            <div>
                                <h2 className="font-semibold">{workMockups.name}</h2>
                                <p className="text-sm text-gray-700">{workMockups.description}</p>
                            </div>
                            <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition">
                                <a target="_block" href={workMockups.link}><img  src="./assets/send-icon.png" alt="" className="w-5" /></a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h3 className="mb-2 text-2xl font-bold text-center font-Poppins">Shopify Websites</h3>

            <div className="grid grid-cols-1 gap-5 my-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 dark:text-black">
                {work.map((work) => (
                    <div key={work.name} className="relative bg-center bg-no-repeat bg-cover rounded-lg cursor-pointer aspect-square group" style={{ backgroundImage: `url(${work.icon})` }}>
                        <div className="shadow-[0_4px_55px_rgba(149,0,162,0.15)] absolute flex items-center justify-between w-10/12 col-span-2 px-5 py-3 duration-500 -translate-x-1/2 bg-white rounded-md bottom-5 left-1/2 group-hover:bottom-7">
                            <div >
                                <h2 className="font-semibold">{work.name}</h2>
                                <p className="text-sm text-gray-700">{work.description}</p>
                            </div>
                            <div className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition">
                                <a target="_block" href={work.link}><img  src="./assets/send-icon.png" alt="" className="w-5" /></a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            
            <a href="#contact" className="flex items-center justify-center gap-2 px-8 py-2 mx-auto my-20 text-gray-700 duration-300 border border-gray-300 rounded-full w-max dark:border-white/25 hover:bg-slate-100/70 dark:hover:bg-darkHover dark:text-white">
                Contact Me
                <img src="./assets/right-arrow-bold.png" alt="" className="w-4 dark:hidden" />
                <img src="./assets/right-arrow-bold-dark.png" alt="" className="hidden w-4 dark:block" />
            </a>

        </div>
    )
}