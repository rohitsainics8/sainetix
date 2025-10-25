// Redesigned Services page with permanent border, hover effects, and images
import React from 'react';
import type { Service as BaseService } from '../types';
import AnimatedSection from './AnimatedSection';
import LaunchIcon from './icons/LaunchIcon';
import DesignIcon from './icons/DesignIcon';
import WordPressIcon from './icons/WordPressIcon';
import ApiIcon from './icons/ApiIcon';
import TrendingUpIcon from './icons/TrendingUpIcon';
import PencilIcon from './icons/PencilIcon';
// ✅ Add this type definition here
interface Service extends BaseService {
  icon: React.FC<any>;
  title: string;
  description: string;
  img?: string;
}
const services: Service[] = [
  {
    icon: LaunchIcon,
    title: 'AI-Powered Prototyping',
    description:
      'Rapidly visualize and validate your ideas. Our AI generates functional, aesthetic web concepts, giving you a powerful head start on development.',
    img: 'https://www.hostinger.com/in/tutorials/wp-content/uploads/sites/52/2023/06/how-to-design-websites-with-ai.png',
  },
  {
    icon: DesignIcon,
    title: 'Custom Web Applications',
    description:
      'We build scalable, secure, and high-performance web applications tailored to your specific business needs, from complex dashboards to customer-facing platforms.',
    img: 'https://datarob.com/content/images/2020/10/Web-Application-Development-.jpg',
  },
  {
    icon: WordPressIcon,
    title: 'WordPress Development',
    description:
      "From personal blogs to robust e-commerce stores, we build powerful, scalable, and easy-to-manage websites using the world's most popular CMS.",
    img: 'https://www.synapseindia.com/assets_newwebsite/images/tc_wp_banner.jpg',
  },
  {
    icon: ApiIcon,
    title: 'Custom API Development',
    description:
      'We design and build robust, secure, and scalable APIs to power your mobile and web applications, enabling seamless data integration.',
    img: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/277000910/original/1b44b34704ff1affefd32190d9c768b5febb1d2b/help-you-with-custom-api-development-and-integration.png',
  },
  {
    icon: TrendingUpIcon,
    title: 'SEO & Performance',
    description:
      'Boost your online visibility and ranking. We implement technical SEO best practices and optimize for core web vitals to drive organic traffic.',
    img: 'https://ahrefs.com/blog/wp-content/uploads/2023/03/image6-1.png',
  },
  {
    icon: PencilIcon,
    title: 'Blogging & Content Platforms',
    description:
      'Engage your audience with a feature-rich, custom blogging platform or CMS, designed for easy content management and optimal reader experience.',
    img: 'https://contentfuel.co/wp-content/uploads/2019/12/All-Time_Best_Blogging_Platforms_to_Launch_Your_Company_s_Blog_Design.jpg',
  },
];

const ServiceCard: React.FC<{
  service: Service;
  cta?: { href: string; text: string };
  setActiveRoute: (route: string) => void;
}> = ({ service, cta, setActiveRoute }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveRoute(href.slice(1));
  };

  return (
    <div className="group flex flex-col h-full overflow-hidden rounded-2xl border border-indigo-500/50 bg-white/5 hover:border-indigo-400/80 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/20 duration-300">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={service.img}
          alt={service.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70"></div>
        <div className="absolute bottom-4 left-4 flex items-center space-x-3">
          <div className="bg-zinc-900/80 p-2 rounded-full border border-indigo-500/40">
            <service.icon className="h-6 w-6 text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">{service.title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col justify-between p-6 text-center">
        <p className="text-zinc-400 text-sm mb-4">{service.description}</p>
        {cta && (
          <a
            href={cta.href}
            onClick={(e) => handleNavClick(e, cta.href)}
            className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors duration-300 inline-block"
          >
            {cta.text} &rarr;
          </a>
        )}
      </div>
    </div>
  );
};

const ServicesPage: React.FC<{ setActiveRoute: (route: string) => void }> = ({ setActiveRoute }) => {
  return (
    <div className="py-24 pt-36 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black">
      <div className="container max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-4xl lg:text-5xl font-bold text-center text-white mb-4 tracking-tight">
            Our Core Services
          </h2>
          <p className="text-lg text-zinc-400 text-center max-w-3xl mx-auto mb-16">
            We offer a spectrum of services designed to build, scale, and maintain world-class web applications.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => {
            const cta = service.title.includes('AI')
              ? { href: '#/ai-generator', text: 'Try AI Generator' }
              : undefined;
            return (
              <AnimatedSection key={service.title} delay={`delay-${index * 150}`}>
                <ServiceCard service={service} cta={cta} setActiveRoute={setActiveRoute} />
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
