import React, { useState } from 'react';
import type { Project } from '../types';
import AnimatedSection from './AnimatedSection';
import TagIcon from './icons/TagIcon';

// Mock data for projects
const projectsData: Project[] = [
  {
    image: 'https://quantaleap.ai/wp-content/uploads/2023/08/Home-page-pic2-1.png.webp',
    title: 'QuantumLeap AI Platform',
    category: 'Web App',
    description: 'A cutting-edge web application for data visualization and machine learning model deployment, built with Next.js and a custom design system.'
  },
  {
    image: 'https://s3.envato.com/files/646255774/Preview.__large_preview.jpg',
    title: 'InnovateX E-commerce',
    category: 'E-commerce',
    description: 'A high-performance e-commerce platform with AI-powered product recommendations and a seamless checkout experience.'
  },
  {
    image: 'https://oppora.ai/assets/images/product/details/sales-crm.png',
    title: 'TechFlow CRM',
    category: 'Web App',
    description: 'A bespoke CRM system designed to streamline sales and customer support workflows, featuring real-time data synchronization.'
  },
  {
    image: 'https://content.jdmagicbox.com/comp/ernakulam/d2/0484px484.x484.200106104557.e9d2/catalogue/candor-aura-wellness-home-health-care-ponekkara-ernakulam-home-nursing-services-1bp43v7846.jpg',
    title: 'Aura Wellness',
    category: 'Branding',
    description: 'A complete branding and website design project for a new wellness brand, focusing on a calm and intuitive user experience.'
  },
  {
    image: 'https://frontendatscale.com/blog-assets/hybrid-frontend-architecture-cms-screenshot.webp',
    title: 'Starlight CMS',
    category: 'CMS Integration',
    description: 'A headless WordPress integration for a major publishing client, enabling content delivery to multiple platforms via a custom API.'
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMAOmJvB6k_UBTc_Q5ZnhdsxzTe3btWbtXHnQRtwftt20afxUWv7jC8PQ8Cw0JMN9IHGc&usqp=CAU',
    title: 'ConnectSphere',
    category: 'Web App',
    description: 'A social networking platform for professionals, with a focus on real-time chat and collaborative project spaces.'
  },
];

const categories = ['All', ...Array.from(new Set(projectsData.map(p => p.category)))];

const WorkPage: React.FC = () => {
    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All' ? projectsData : projectsData.filter(p => p.category === filter);

    return (
        // Updated background to match footer
        <div className="py-24 pt-36 bg-zinc-950">
            <div className="container max-w-7xl mx-auto px-6">
                <AnimatedSection>
                    <h2 className="text-4xl lg:text-5xl font-bold text-center text-white mb-4 tracking-tight">Featured Work</h2>
                    <p className="text-lg text-zinc-400 text-center max-w-3xl mx-auto mb-12">
                        We partner with forward-thinking brands to create digital experiences that are both beautiful and impactful.
                    </p>
                </AnimatedSection>
                
                <AnimatedSection delay="delay-200">
                    <div className="flex justify-center flex-wrap gap-3 mb-12">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${filter === category ? 'bg-indigo-600 text-white' : 'bg-white/10 text-zinc-300 hover:bg-white/20'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <AnimatedSection key={project.title} delay={`delay-${(index * 100) + 300}`}>
                            <div className="group relative bg-white/5 rounded-xl shadow-lg border border-white/10 overflow-hidden transition-all duration-300 hover:border-indigo-500/50 hover:-translate-y-2">
                                <div className="aspect-video overflow-hidden">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <TagIcon className="w-4 h-4 text-indigo-400" />
                                        <span className="text-sm text-indigo-400 font-semibold">{project.category}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                    <p className="text-zinc-400 text-sm">{project.description}</p>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WorkPage;
