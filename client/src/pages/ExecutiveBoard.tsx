import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const ExecutiveBoard = () => {
  const chairs = [
    { role: 'Chair of Harry Potter', name: 'To be announced' },
    { role: 'Chair of Disney', name: 'To be announced' },
    { role: 'Chair of FIFA', name: 'To be announced' },
    { role: 'Chair of CTC', name: 'To be announced' },
    { role: 'Chair of UNOOSA', name: 'To be announced' },
    { role: 'Chair of IPL', name: 'To be announced' },
    { role: 'Chair of SDG 5', name: 'To be announced' },
    { role: 'Chair of ECOFIN', name: 'To be announced' },
    { role: 'Chair of UNSC', name: 'To be announced' },
    { role: 'Chair of AIPPM', name: 'To be announced' },
    { role: 'Chair of ICJ', name: 'To be announced' },
    { role: 'Chair of HCC', name: 'To be announced' },
    { role: 'Chair of IP', name: 'To be announced' },
  ];

  return (
    <div className="container mx-auto px-4">
      {/* Distinguished Chairs Section */}
      <ScrollReveal delay={0.5}>
        <div className="mb-20">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Our Distinguished Chairs/Co-Chairs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {chairs.map((chair, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
                data-testid={`chair-${chair.role.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {chair.role}
                </h3>
                <p className="text-muted-foreground italic">{chair.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default ExecutiveBoard;