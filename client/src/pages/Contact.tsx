import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Users, Twitter, Instagram, Linkedin, Facebook, ExternalLink } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function Contact() {
  const faqs = [
    {
      question: "What experience level is required?",
      answer: "DYMUN welcomes delegates of all experience levels, from complete beginners to seasoned MUN participants. Our program is designed to support learning at every stage.",
    },
    {
      question: "What should I bring to the conference?",
      answer: "Bring formal business attire, notebooks, pens, laptop/tablet for research, and most importantly, your enthusiasm for diplomatic engagement!",
    },
    {
      question: "How are country assignments made?",
      answer: "Country assignments are made based on your preferences indicated in the registration form and balanced across committees to ensure diverse representation.",
    },
    {
      question: "Are meals provided during the conference?",
      answer: "Yes! All meals, including lunch and dinner on both days, plus refreshments during breaks are included in your registration fee.",
    },
    {
      question: "Can I register with friends?",
      answer: "Absolutely! You can indicate in your registration if you'd like to be placed in the same committee as friends, though we can't guarantee the same country assignments.",
    },
    {
      question: "What if I need to cancel my registration?",
      answer: "Cancellations made 30 days before the event receive a full refund minus processing fees. Please contact us as soon as possible if you need to cancel.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get in touch with our team for any questions or support you need
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <ScrollReveal>
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-primary mt-1">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">info@dymun.org</p>
                    <p className="text-muted-foreground">registration@dymun.org</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-primary mt-1">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-muted-foreground text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-primary mt-1">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground">International Conference Center</p>
                    <p className="text-muted-foreground">123 Diplomatic Avenue</p>
                    <p className="text-muted-foreground">Global City, GC 12345</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-primary mt-1">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Social Media</h3>
                    <div className="flex space-x-4 mt-2">
                      {[
                        { icon: <Twitter className="w-5 h-5" />, href: "#" },
                        { icon: <Instagram className="w-5 h-5" />, href: "#" },
                        { icon: <Linkedin className="w-5 h-5" />, href: "#" },
                        { icon: <Facebook className="w-5 h-5" />, href: "#" },
                      ].map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          className="text-primary hover:text-accent transition-colors duration-200"
                          data-testid={`social-link-${index}`}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Registration */}
              <div className="mt-12 p-6 bg-card rounded-lg">
                <h3 className="font-serif text-2xl font-semibold text-card-foreground mb-4">
                  Ready to Register?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Don't wait - secure your spot at DYMUN today and join delegates from around the world.
                </p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeMv3_996f1ifqRyloEstNA5F-BPhCszbtgJ-ksbORin-f_UQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent transition-all duration-300 inline-flex items-center"
                  data-testid="contact-register-button"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Registration Form
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* FAQ Section */}
          <ScrollReveal delay={0.2}>
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-card p-6 rounded-lg">
                    <h4 className="font-semibold text-card-foreground mb-2">{faq.question}</h4>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </motion.div>
  );
}
