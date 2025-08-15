'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SlideInAnimation from '../animations/SlideInAnimation';

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface ServiceSectionProps {
  services: ServiceItem[];
  title: string;
  subtitle?: string;
}

export default function ServiceSection({ 
  services, 
  title, 
  subtitle 
}: ServiceSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      },
    },
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-orange-400 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-blue-400 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-purple-400 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={titleVariants}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p 
              variants={titleVariants}
              className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <SlideInAnimation
              key={index}
              direction={index % 2 === 0 ? 'up' : 'right'}
              delay={index * 0.15}
              duration={0.8}
              coverColor={service.color}
              className="group"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-slate-200 h-full">
                {/* Icon */}
                <div className="mb-6 relative">
                  <div 
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                    style={{ backgroundColor: service.color }}
                  >
                    {service.icon}
                  </div>
                  <div 
                    className="absolute -inset-2 rounded-lg opacity-20 blur-sm"
                    style={{ backgroundColor: service.color }}
                  ></div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                  {service.description}
                </p>

                {/* Hover Effect Line */}
                <div className="mt-6 pt-4 border-t border-slate-100 group-hover:border-slate-200 transition-colors">
                  <div 
                    className="h-1 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ backgroundColor: service.color }}
                  ></div>
                </div>
              </div>
            </SlideInAnimation>
          ))}
        </div>

        {/* Call to Action */}
        <SlideInAnimation
          direction="up"
          delay={services.length * 0.15 + 0.3}
          duration={0.8}
          coverColor="#f29600"
          className="mt-16 text-center"
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-orange-600 hover:to-orange-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More About Our Services
          </motion.button>
        </SlideInAnimation>
      </div>
    </section>
  );
}
