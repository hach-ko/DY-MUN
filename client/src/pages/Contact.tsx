import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Users, Instagram, ExternalLink } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="py-24 bg-gradient-to-b from-background to-muted/20 flex justify-center"
    >
      <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Reach out to our team for any inquiries or support regarding DYMUN.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Information */}
        <ScrollReveal>
          <div className="space-y-8">
            {/* Team Card */}
            <div className="p-6 bg-card rounded-lg shadow-lg text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-semibold text-card-foreground mb-4">
                Our Team
              </h3>
              <div className="text-left">
                <p className="text-muted-foreground font-semibold">
                  Aayan Kumar, Secretary General
                </p>
                <p className="text-muted-foreground">+91 86574 40454</p>
                <p className="text-muted-foreground font-semibold mt-4">
                  Yuvraj Behera, Deputy Joint Secretary General
                </p>
                <p className="text-muted-foreground">+91 86578 40015</p>
                <p className="text-muted-foreground font-semibold mt-4">
                  Suvirr Menon, Deputy Joint Secretary General
                </p>
                <p className="text-muted-foreground">+91 93219 91723</p>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-6 bg-card rounded-lg shadow-lg text-center">
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-semibold text-card-foreground mb-4">
                Email
              </h3>
              <p className="text-muted-foreground">
                General Inquiries: dymun@dypisnerul.in
              </p>
            </div>

            {/* WhatsApp Card */}
            <div className="p-6 bg-card rounded-lg shadow-lg text-center">
              <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-semibold text-card-foreground mb-4">
                WhatsApp
              </h3>
              <p className="text-muted-foreground">Quick Support: +91 86574 40454</p>
            </div>

            {/* Location Card */}
            <div className="p-6 bg-card rounded-lg shadow-lg text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-semibold text-card-foreground mb-4">
                Location
              </h3>
              <p className="text-muted-foreground">D Y Patil International School</p>
              <p className="text-muted-foreground">Sector 7, Nerul, Navi Mumbai</p>
              <p className="text-muted-foreground">Maharashtra 400706</p>
              <a
                href="https://maps.app.goo.gl/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent text-sm flex items-center justify-center mt-4"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                View Directions
              </a>
            </div>

            {/* Social Media Card */}
            <div className="p-6 bg-card rounded-lg shadow-lg text-center">
              <Instagram className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-semibold text-card-foreground mb-4">
                Social Media
              </h3>
              <a
                href="https://instagram.com/dymun.nerul"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors duration-200"
                data-testid="social-link-instagram"
              >
                <Instagram className="w-5 h-5 mx-auto" />
              </a>
            </div>

            {/* Quick Registration Card */}
            <div className="p-6 bg-card rounded-lg shadow-lg text-center">
              <h3 className="font-serif text-2xl font-semibold text-card-foreground mb-4">
                Ready to Register?
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Secure your spot at DYMUN and join delegates from around the world in this diplomatic journey.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeMv3_996f1ifqRyloEstNA5F-BPhCszbtgJ-ksbORin-f_UQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent transition-all duration-300 inline-flex items-center shadow hover:shadow-md"
                data-testid="contact-register-button"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Registration Form
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </motion.div>
  );
}