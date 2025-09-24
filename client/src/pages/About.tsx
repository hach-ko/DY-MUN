import { motion } from "framer-motion";
import { Target, Eye, GraduationCap, Globe, Handshake, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
              About DYMUN
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Fostering diplomatic excellence and global understanding through immersive Model UN experiences
            </p>
          </div>
        </ScrollReveal>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <ScrollReveal>
            <div className="bg-card p-8 rounded-lg">
              <div className="text-primary mb-6">
                <Target className="w-10 h-10" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-card-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To provide students with an authentic and engaging platform where they can develop critical thinking,
                diplomatic skills, and a deeper understanding of global affairs through realistic Model United Nations simulations.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-card p-8 rounded-lg">
              <div className="text-primary mb-6">
                <Eye className="w-10 h-10" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-card-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To empower the next generation of global leaders by creating a space where young minds can collaborate,
                debate, and develop solutions to the world's most pressing challenges through diplomatic dialogue.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* What Makes Us Different */}
        <ScrollReveal>
          <div className="mb-20">
            <h2 className="font-serif text-4xl font-bold text-foreground text-center mb-12">
              What Makes DYMUN Special
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <GraduationCap className="w-12 h-12" />,
                  title: "Educational Excellence",
                  description: "Our program is designed by educators and diplomacy experts to ensure the highest quality learning experience.",
                },
                {
                  icon: <Globe className="w-12 h-12" />,
                  title: "Global Perspective",
                  description: "Address real-world issues from multiple cultural and political perspectives, fostering global understanding.",
                },
                {
                  icon: <Handshake className="w-12 h-12" />,
                  title: "Mentorship",
                  description: "Learn from experienced MUN participants and diplomatic professionals who guide your development.",
                },
              ].map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="text-primary mb-4 flex justify-center">{item.icon}</div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Program Details */}
        <ScrollReveal>
          <div className="bg-muted py-16 px-8 rounded-lg">
            <h2 className="font-serif text-4xl font-bold text-foreground text-center mb-12">
              Program Structure
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  Day 1: Foundation & Preparation
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    "Opening ceremonies and delegate registration",
                    "Committee assignments and position papers",
                    "Research sessions and strategy development",
                    "Initial committee sessions and caucusing",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  Day 2: Debate & Resolution
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    "Formal debate sessions and negotiations",
                    "Draft resolution writing and amendments",
                    "Voting procedures and final resolutions",
                    "Closing ceremonies and awards",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal>
          <div className="text-center mt-20">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
              Join the Diplomatic Revolution
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Be part of a community that's shaping the future of international relations and global cooperation.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeMv3_996f1ifqRyloEstNA5F-BPhCszbtgJ-ksbORin-f_UQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105"
              data-testid="about-register-button"
            >
              Register Today
            </a>
          </div>
        </ScrollReveal>
      </div>
    </motion.div>
  );
}
