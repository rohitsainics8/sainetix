// Redesigned Plans page with sleek, glassmorphic pricing cards in INR
import React from 'react';
import AnimatedSection from './AnimatedSection';
import ShieldIcon from './icons/ShieldIcon';
import StarIcon from './icons/StarIcon';
import RocketIcon from './icons/RocketIcon';

const plans = [
    {
        name: 'WordPress Starter',
        price: '₹7,999',
        description: 'Ideal for blogs, portfolios, and small businesses.',
        icon: ShieldIcon,
        features: [
            'WordPress Installation & Setup',
            'Up to 5 Pages',
            'Premium Theme Customization',
            'Basic SEO Setup',
            '1-2 Week Turnaround',
        ],
        cta: 'Choose Plan'
    },
    {
        name: 'Business Pro',
        price: '₹24,999+',
        description: 'For custom features and e-commerce functionality.',
        icon: StarIcon,
        features: [
            'Everything in Starter',
            'Up to 10 Pages',
            'Advanced Theme Customization',
            'WooCommerce Integration',
            'Custom Plugin Development (Basic)',
            'Advanced SEO & Analytics',
            'Priority Support'
        ],
        cta: 'Choose Plan',
        popular: true
    },
    {
        name: 'Enterprise',
        price: 'Contact Us',
        description: 'For large-scale applications & headless solutions.',
        icon: RocketIcon,
        features: [
            'Everything in Pro',
            'Unlimited Pages',
            'Headless WordPress / Custom Theme',
            'Advanced E-commerce Solutions',
            'Dedicated Support & SLA',
            'Scalable Architecture',
        ],
        cta: 'Get a Quote'
    }
];

const PlansPage: React.FC<{ setActiveRoute: (route: string) => void; }> = ({ setActiveRoute }) => {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setActiveRoute(href.slice(1));
    };

    return (
        <div className="py-24 pt-36">
            <div className="container max-w-7xl mx-auto px-6">
                <AnimatedSection>
                    <h2 className="text-4xl lg:text-5xl font-bold text-center text-white mb-4 tracking-tight">Transparent Pricing</h2>
                    <p className="text-lg text-zinc-400 text-center max-w-3xl mx-auto mb-16">Find the perfect plan for your project. From rapid AI-prototypes to full-scale custom applications, we have you covered.</p>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, index) => (
                        <AnimatedSection key={plan.name} delay={`delay-${index * 150}`}>
                            <div className={`relative h-full flex flex-col bg-white/5 p-8 rounded-xl border transition-all duration-300 hover:-translate-y-2 ${plan.popular ? 'border-indigo-500' : 'border-white/10 hover:border-indigo-500/50'}`}>
                                {plan.popular && <div className="absolute top-0 right-8 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>}
                                <div className="mb-6 text-center">
                                    <plan.icon className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                                    <p className="text-zinc-400 h-10">{plan.description}</p>
                                    <p className="text-4xl font-bold text-white my-4">{plan.price}</p>
                                </div>
                                <ul className="space-y-3 text-zinc-300 flex-grow">
                                    {plan.features.map(feature => (
                                        <li key={feature} className="flex items-start">
                                            <svg className="w-5 h-5 text-indigo-400 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8">
                                    <a href="#/contact" onClick={(e) => handleNavClick(e, '#/contact')} className={`w-full text-center font-bold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                                        {plan.cta}
                                    </a>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
                 <AnimatedSection className="text-center mt-20">
                     <p className="text-zinc-400">Need a custom solution?</p>
                     <a href="#/quote-calculator" onClick={(e) => handleNavClick(e, '#/quote-calculator')} className="mt-2 inline-block text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
                        Use the Quote Calculator &rarr;
                     </a>
                </AnimatedSection>
            </div>
        </div>
    );
};

export default PlansPage;
