import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Trophy } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { committeeGroups } from "@/data/committees";

export default function Committees() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="py-20 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-5 tracking-tight">
              Our Committees
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover our diverse committees spanning various grade levels, tackling pressing global challenges.
            </p>
          </div>
        </ScrollReveal>

        {/* Committee Groups */}
        {committeeGroups.map((group, groupIndex) => (
          <ScrollReveal key={group.title} delay={groupIndex * 0.3}>
            <div className="mb-16">
              {/* Group Header */}
              <div className="text-center mb-10">
                <Badge className="bg-white text-black text-base px-4 py-1.5 mb-3 font-bold shadow-sm">
                  {group.title}
                </Badge>
                <div className="h-1 w-32 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
              </div>

              {/* Committee Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.committees.map((committee, index) => (
                  <Dialog key={committee.name}>
                    <DialogTrigger asChild>
                      <motion.div
                        className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-300"
                        whileHover={{ scale: 1.03, y: -5 }}
                        transition={{ duration: 0.3 }}
                        data-testid={`committee-card-${committee.name.toLowerCase().replace(" ", "-")}`}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={committee.img}
                            alt={committee.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <h3 className="text-white font-serif text-xl font-bold mb-1">
                              {committee.name}
                            </h3>
                            <p className="text-white font-bold text-xs">
                              {committee.level}
                            </p>
                          </div>
                        </div>
                        <div className="p-5">
                          <h4 className="text-card-foreground font-semibold text-base mb-2 line-clamp-2">
                            {committee.subtitle}
                          </h4>
                          <p className="text-muted-foreground text-xs line-clamp-3 mb-3 leading-relaxed">
                            {committee.topic}
                          </p>
                          <div className="flex items-center text-primary text-xs">
                            <Users className="w-3.5 h-3.5 mr-1.5" />
                            Chair: {committee.chair}
                          </div>
                        </div>
                      </motion.div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-lg sm:max-w-xl custom-scrollbar">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-serif text-foreground">
                          {committee.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-5">
                        <img
                          src={committee.img}
                          alt={committee.name}
                          className="w-full h-60 object-cover rounded-lg shadow-sm"
                        />
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-foreground mb-1 text-sm">Committee:</h4>
                            <p className="text-muted-foreground text-sm">{committee.subtitle}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-1 text-sm">Topic:</h4>
                            <p className="text-muted-foreground text-sm">{committee.topic}</p>
                          </div>
                          {committee.overview && (
                            <div>
                              <h4 className="font-semibold text-foreground mb-1 text-sm">Overview:</h4>
                              <p className="text-muted-foreground text-sm leading-relaxed">{committee.overview}</p>
                            </div>
                          )}
                          <div className="flex items-center space-x-6 pt-3 border-t border-border">
                            <div className="flex items-center text-primary">
                              <Trophy className="w-3.5 h-3.5 mr-1.5" />
                              <span className="text-xs font-bold text-white">Level: {committee.level}</span>
                            </div>
                            <div className="flex items-center text-primary">
                              <Users className="w-3.5 h-3.5 mr-1.5" />
                              <span className="text-xs">Chair: {committee.chair}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}

        {/* Call to Action */}
        <ScrollReveal>
          <div className="text-center mt-20">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-5 tracking-tight">
              Join a Committee Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Select your committee and register now to engage in this transformative diplomatic experience.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeMv3_996f1ifqRyloEstNA5F-BPhCszbtgJ-ksbORin-f_UQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-base font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              data-testid="committees-register-button"
            >
              Register for DYMUN
            </a>
          </div>
        </ScrollReveal>
      </div>
    </motion.div>
  );
}