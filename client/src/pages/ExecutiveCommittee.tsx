import { motion } from "framer-motion";
import { Users } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function ExecutiveCommittee() {
  const secretariat = [
    {
      name: "Aayan Kumar",
      role: "Secretary General",
      description: "Leading DYMUN with 5+ years of MUN experience and passion for diplomacy.",
      photo: "https://your-image-url.com/aayan.jpg",
    },
    {
      name: "Yuvraj Behera",
      role: "Deputy Joint Secretary General",
      description: "Yuvraj works closely with the Secretariat to facilitate seamless coordination across all committees. Their role involves supporting both the Executive Board and delegates, ensuring the conference operates flawlessly.",
      photo: "https://your-image-url.com/yuvraj.jpg",
    },
    {
      name: "Suvirr Menon",
      role: "Deputy Joint Secretary General",
      description: "Suvirr co-leads from the front, leveraging international Model United Nations experience to ensure smooth conference execution. They oversee committees and serve as a vital bridge between the Executive Board and delegates.",
      photo: "https://your-image-url.com/suvirr.jpg",
    },
    {
      name: "REDACTED",
      role: "REDACTED",
      description: "Details will be announced soon.",
      photo: "https://your-image-url.com/redacted1.jpg",
    },
    {
      name: "REDACTED",
      role: "REDACTED",
      description: "Details will be announced soon.",
      photo: "https://your-image-url.com/redacted2.jpg",
    },
    {
      name: "REDACTED",
      role: "REDACTED",
      description: "Details will be announced soon.",
      photo: "https://your-image-url.com/redacted3.jpg",
    },
    {
      name: "REDACTED",
      role: "REDACTED",
      description: "Details will be announced soon.",
      photo: "https://your-image-url.com/redacted4.jpg",
    },
    {
      name: "REDACTED",
      role: "REDACTED",
      description: "Details will be announced soon.",
      photo: "https://your-image-url.com/redacted5.jpg",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="py-24 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Executive Committee
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Meet the dedicated team behind DYMUN, committed to creating an unforgettable Model United Nations experience.
            </p>
          </div>
        </ScrollReveal>

        {/* Secretariat Section */}
        <ScrollReveal delay={0.4}>
          <div className="mb-20">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Meet the Secretariat
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {secretariat.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ duration: 0.3 }}
                  data-testid={`secretariat-member-${member.name.toLowerCase().replace(" ", "-")}`}
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mt-6 mb-4 border-4 border-primary shadow"
                  />
                  <div className="p-6 text-center">
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2">{member.name}</h3>
                    <p className="text-primary font-semibold mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal delay={0.6}>
          <div className="text-center mt-24">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Join the DYMUN Experience
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Be part of a transformative Model United Nations conference led by our passionate Executive Board.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeMv3_996f1ifqRyloEstNA5F-BPhCszbtgJ-ksbORin-f_UQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-10 py-4 rounded-lg text-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              data-testid="executive-board-register-button"
            >
              Register for DYMUN
            </a>
          </div>
        </ScrollReveal>
      </div>
    </motion.div>
  );
}