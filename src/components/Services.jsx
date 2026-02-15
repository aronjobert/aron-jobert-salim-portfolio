export default function Services() {
    const services = [
        {
            name: 'Web Building and Designing',
            icon: './assets/web-development.png',
            description: 'Web Developer specializing in Shopify, Liquid customization, and frontend development (HTML, CSS, JavaScript). Experienced in building and optimizing 300+ responsive websites with strong emphasis on performance, SEO structure, and clean, maintainable code.',
            link: '#contact',
        },
        {
            name: 'On Page SEO',
            icon: './assets/webpage-seo.png',
            description: 'Optimizing website structure and content to improve search visibility and performance. Includes proper heading hierarchy, meta tags, alt text implementation, internal linking, image optimization, and SEO-focused layout structuring to ensure better rankings and user experience.',
            link: '#contact',
        },
        {
            name: 'Custom Apps and API Integration',
            icon: './assets/api_1.png',
            description: 'Integrating third-party applications and external APIs to enhance website functionality and automate workflows. Experienced in Shopify app configuration, marketing tool integrations, product and inventory syncing, and building scalable solutions that improve store performance and operational efficiency.',
            link: '#contact',
        },
        {
            name: 'Ecommerce Store Setup',
            icon: './assets/online-shop.png',
            description: 'Complete setup and configuration of Shopify and Duda eCommerce stores from development to launch. Includes theme customization, product catalog setup, payment gateway integration, domain and DNS configuration, app installation, and performance optimization to ensure a seamless and conversion-ready online store.',
            link: '#contact',
        }
    ];
    return (
        <div id="services" className="w-full px-[12%] py-10 scroll-mt-20">
            <h4 className="mb-2 text-lg text-center font-Poppins">What I offer</h4>
            <h2 className="text-5xl font-bold text-center font-Poppins">My services</h2>
            <p className="max-w-2xl mx-auto mt-5 mb-12 text-center font-Poppins">Creating responsive, conversion-focused Shopify and CMS websites with strong SEO structure and performance optimization.</p>

            <div className="grid gap-6 my-10 grid-cols-auto">
                {services.map((service) => (
                    <div key={service.name} className="px-8 py-12 duration-500 border border-gray-300 rounded-lg cursor-pointer dark:border-white/30 hover:shadow-black hover:bg-lightHover hover:-translate-y-1 dark:hover:bg-darkHover dark:hover:shadow-white">
                        <img src={service.icon} alt="" className="w-10" />
                        <h3 className="my-4 text-lg text-gray-700 dark:text-white">{service.name}</h3>
                        <p className="text-sm leading-5 text-gray-600 dark:text-white/80">{service.description}</p>
                        <a href={service.link} className="flex items-center gap-2 mt-5 text-sm">Learn More <img src="./assets/right-arrow.png" alt="" className="w-4" /></a>
                    </div>
                ))}
            </div>
        </div>
    )
}