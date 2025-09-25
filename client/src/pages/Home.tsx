import { motion } from "framer-motion";
import { Link } from "wouter";
import { Globe, Scale, Handshake, Heart, MessageCircle, Users, Award, Clock, Network } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="hero-bg min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Icons */}
        <div className="absolute inset-0 opacity-5">
          <Globe className="absolute top-10 left-10 w-16 h-16 text-primary" />
          <Scale className="absolute top-32 right-20 w-12 h-12 text-primary" />
          <Handshake className="absolute bottom-32 left-32 w-14 h-14 text-primary" />
          <Heart className="absolute bottom-20 right-10 w-16 h-16 text-primary" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
             DYPIS Presents<br />
              <span className="text-primary">DYMUN 2025</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              An exciting platform for students to sharpen their Model United Nations skills in a real-world setting. 
              Step into the shoes of global leaders over two immersive days.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeMv3_996f1ifqRyloEstNA5F-BPhCszbtgJ-ksbORin-f_UQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105"
                data-testid="hero-register-button"
              >
                Register for DYMUN
              </a>
              <Link
                href="/about"
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                data-testid="hero-learn-more-button"
              >
                Learn More
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                Why Choose DYMUN?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience diplomacy, debate, and negotiation like never before
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageCircle className="w-10 h-10" />,
                title: "Real-World Debates",
                description: "Engage in authentic diplomatic discussions on pressing global issues that matter today.",
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "Collaborative Learning",
                description: "Work with delegates from diverse backgrounds to find solutions to complex challenges.",
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Professional Development",
                description: "Develop essential skills in public speaking, negotiation, and international relations.",
              },
              {
                icon: <Clock className="w-10 h-10" />,
                title: "Two-Day Immersion",
                description: "Intensive program designed to maximize learning and networking opportunities.",
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Recognition",
                description: "Outstanding delegates receive certificates and recognition for their contributions.",
              },
              {
                icon: <Network className="w-10 h-10" />,
                title: "Global Network",
                description: "Build lasting connections with future leaders from around the world.",
              },
            ].map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-card p-8 rounded-lg card-hover">
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <h3 className="font-serif text-2xl font-semibold text-card-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Shape Tomorrow?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join DYMUN and become part of the next generation of global leaders.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeMv3_996f1ifqRyloEstNA5F-BPhCszbtgJ-ksbORin-f_UQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-12 py-4 rounded-lg text-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105 inline-block"
              data-testid="cta-register-button"
            >
              Begin Your Journey
            </a>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  );
}
