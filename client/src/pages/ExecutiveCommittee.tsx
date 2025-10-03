import { motion } from "framer-motion";
import { Users } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";

export default function ExecutiveCommittee() {
  const secretariat = [
    {
      name: "Aayan Kumar",
      role: "Secretary General",
      description: "Leading DYMUN with 5+ years of MUN experience and passion for diplomacy.",
      photo: "/ec/aayan.jpg",
    },
    {
      name: "Yuvraj Behera",
      role: "Deputy Joint Secretary General",
      description: "Yuvraj works closely with the Secretariat to facilitate seamless coordination across all committees. Their role involves supporting both the Executive Board and delegates, ensuring the conference operates flawlessly.",
      photo: "/ec/yuvraj.jpg",
    },
    {
      name: "Suvirr Menon",
      role: "Deputy Joint Secretary General",
      description: "Suvirr co-leads from the front, leveraging international Model United Nations experience to ensure smooth conference execution. They oversee committees and serve as a vital bridge between the Executive Board and delegates.",
      photo: "/ec/suvirr.jpg",
    },
    {
      name: "Ruveer",
      role: "REDACTED",
      description: "Details will be announced soon.",
      photo: "/ec/ruveer.jpg",
    },
    {
      name: "Krisha",
      role: "REDACTED",
      description: "Details will be announced soon.",
      photo: "/ec/krisha.jpg",
    },
    {
      name: "Atharva",
      role: "REDACTED",
      description: "Details will be announced soon.",
      photo: "/ec/atharva.jpg",
    },
    {
      name: "Zaina",
      role: "REDACTED",
      description: "Details will be announced soon.",
      photo: "/ec/zaina.jpg",
    },
    {
      name: "Swarupa",
      role: "REDACTED",
      description: "Details will be announced soon.",
      photo: "/ec/swarupa.jpg",
    },
  ];

  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (key) => {
    setLoadedImages((prev) => ({ ...prev, [key]: true }));
  };

  const MemberCard = ({ member, index }) => (
    <motion.div
      key={index}
      className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center max-w-xs"
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.3 }}
      data-testid={`secretariat-member-${member.name.toLowerCase().replace(" ", "-")}`}
    >
      <div className="relative w-24 h-24 mt-6 mb-4">
        {!loadedImages[`member-${member.name}`] && (
          <div className="absolute inset-0 flex items-center justify-center bg-card rounded-full">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <img
          src={member.photo}
          alt={member.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow"
          onLoad={() => handleImageLoad(`member-${member.name}`)}
          style={{ display: loadedImages[`member-${member.name}`] ? 'block' : 'none' }}
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="font-serif text-xl font-bold text-foreground mb-2">{member.name}</h3>
        <p className="text-primary font-semibold mb-3">{member.role}</p>
        <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
      </div>
    </motion.div>
  );

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
            <div className="space-y-8">
              {/* Aayan Row */}
              <div className="flex flex-wrap justify-center gap-8">
                <MemberCard member={secretariat[0]} index={0} />
              </div>
              {/* Suvirr and Yuvraj Row */}
              <div className="flex flex-wrap justify-center gap-8">
                <MemberCard member={secretariat[1]} index={1} />
                <MemberCard member={secretariat[2]} index={2} />
              </div>
              {/* Ruveer Row */}
              <div className="flex flex-wrap justify-center gap-8">
                <MemberCard member={secretariat[3]} index={3} />
              </div>
              {/* Krisha and Atharva Row */}
              <div className="flex flex-wrap justify-center gap-8">
                <MemberCard member={secretariat[4]} index={4} />
                <MemberCard member={secretariat[5]} index={5} />
              </div>
              {/* Zaina and Swarupa Row */}
              <div className="flex flex-wrap justify-center gap-8">
                <MemberCard member={secretariat[6]} index={6} />
                <MemberCard member={secretariat[7]} index={7} />
              </div>
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