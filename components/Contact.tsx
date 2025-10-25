import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div className="py-24 pt-36 min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Get In Touch</h2>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
              Have a project in mind, a question, or just want to say hello? We’d love to hear from you.
            </p>
          </div>
        </AnimatedSection>

        {/* Two Column Section: Image + Form */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <AnimatedSection delay="delay-200">
            <div className="w-full h-full">
              <img
                src="https://kumospace.mo.cloudinary.net/https://content.kumospace.com/hubfs/iStock-1412778148.jpg?tx=w_responsive:fallback-max-width_1159;fallback-max-width-mobile_720"
                alt="Contact Us"
                className="rounded-xl object-cover w-full h-full shadow-lg border border-indigo-500/50"
              />
            </div>
          </AnimatedSection>

          {/* Right Form */}
          <AnimatedSection delay="delay-400">
            {submitted ? (
              <div className="bg-white/5 border border-indigo-500/30 p-12 rounded-xl text-center">
                <h3 className="text-3xl font-bold text-white mb-3">Thank You!</h3>
                <p className="text-zinc-300">Your message has been sent. We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 rounded-xl shadow-lg space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">Full Name</label>
                  <input type="text" name="name" id="name" required className="w-full bg-white/5 border-2 border-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">Email Address</label>
                  <input type="email" name="email" id="email" required className="w-full bg-white/5 border-2 border-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">Message</label>
                  <textarea name="message" id="message" rows={5} required className="w-full bg-white/5 border-2 border-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" onChange={handleChange}></textarea>
                </div>
                <div className="text-center pt-2">
                  <button type="submit" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-10 rounded-lg shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105 text-lg">
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </AnimatedSection>
        </div>

        {/* Quote Section */}
        <AnimatedSection delay="delay-600">
          <div className="mt-24 text-center px-6">
            <p className="text-indigo-400 italic text-xl lg:text-2xl relative inline-block max-w-3xl mx-auto">
              <span className="absolute -left-20 -top-4 text-6xl lg:text-8xl font-bold text-indigo-600/30 select-none">"</span>
              Innovation distinguishes between a leader and a follower.
              <span className="absolute -right-14 -bottom-14 text-6xl lg:text-8xl font-bold text-indigo-600/30 select-none">"</span>
            </p>
            <p className="text-zinc-400 mt-4 text-lg">— Steve Jobs</p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ContactPage;
