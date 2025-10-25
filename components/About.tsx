import React from 'react';
import AnimatedSection from './AnimatedSection';
import InnovationIcon from './icons/InnovationIcon';
import CollaborationIcon from './icons/CollaborationIcon';
import QualityIcon from './icons/QualityIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import TwitterIcon from './icons/TwitterIcon';

const values = [
  {
    icon: InnovationIcon,
    title: 'Innovation',
    description:
      "We constantly explore new technologies and AI-driven solutions to push the boundaries of what's possible on the web.",
  },
  {
    icon: CollaborationIcon,
    title: 'Collaboration',
    description:
      'We believe the best results come from a true partnership with our clients, built on communication and shared goals.',
  },
  {
    icon: QualityIcon,
    title: 'Quality',
    description:
      'From pixel-perfect design to robust, scalable code, we are committed to the highest standards of craftsmanship.',
  },
];

/*
const team = [
  {
    image: 'img/team/member-1.jpg',
    name: 'Rohit Saini',
    title: 'Founder & Lead Engineer',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    image: 'img/team/member-2.jpg',
    name: 'Maria Garcia',
    title: 'Head of Design',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    image: 'img/team/member-3.jpg',
    name: 'David Chen',
    title: 'Senior Frontend Developer',
    social: { twitter: '#', linkedin: '#' },
  },
];
*/

const AboutPage: React.FC = () => {
  return (
    <div className="py-24 pt-36 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              We are Sainetix
            </h2>
            <p className="text-lg text-zinc-400">
              A passionate team of developers and designers dedicated to building the future of the web. We
              leverage cutting-edge AI and proven technologies to create digital experiences that are not just
              functional, but exceptional.
            </p>
          </div>
        </AnimatedSection>

        {/* Core Values Section */}
        <div className="py-24">
          <AnimatedSection>
            <h3 className="text-3xl font-bold text-center text-white mb-12">Our Core Values</h3>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={`delay-${index * 200}`}>
                <div className="flex flex-col h-full p-8 bg-white/5 border border-indigo-500/50 rounded-xl transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-900/20 text-center">
                  <div className="mb-5 w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto">
                    <value.icon className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{value.title}</h4>
                  <p className="text-zinc-400">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/*
        // Team Section commented out for future use
        <div className="py-24">
          <AnimatedSection>
            <h3 className="text-3xl font-bold text-center text-white mb-12">Meet Our Team</h3>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <AnimatedSection key={member.name} delay={`delay-${index * 200}`}>
                <div className="flex flex-col items-center p-6 bg-white/5 border border-indigo-500/50 rounded-xl transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-900/20">
                  <div className="relative w-32 h-32 mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover border-2 border-indigo-500"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-white">{member.name}</h4>
                  <p className="text-zinc-400 mb-3">{member.title}</p>
                  <div className="flex space-x-4">
                    <a href={member.social.twitter} className="text-indigo-400 hover:text-indigo-300">
                      <TwitterIcon className="w-5 h-5" />
                    </a>
                    <a href={member.social.linkedin} className="text-indigo-400 hover:text-indigo-300">
                      <LinkedInIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default AboutPage;
