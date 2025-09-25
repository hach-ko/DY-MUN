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
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
              Our Committees
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore diverse committees across different grade levels, each addressing critical global issues
            </p>
          </div>
        </ScrollReveal>

        {/* Committee Groups */}
        {committeeGroups.map((group, groupIndex) => (
          <ScrollReveal key={group.title} delay={groupIndex * 0.2}>
            <div className="mb-16">
              {/* Group Header */}
              <div className="text-center mb-12">
                <Badge className={`${group.badge} text-lg px-4 py-2 mb-4`}>
                  {group.title}
                </Badge>
                <div className={`h-1 w-32 bg-gradient-to-r ${group.color} mx-auto rounded-full`}></div>
              </div>

              {/* Committee Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.committees.map((committee, index) => (
                  <Dialog key={committee.name}>
                    <DialogTrigger asChild>
                      <motion.div
                        className="bg-card rounded-lg overflow-hidden card-hover cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        data-testid={`committee-card-${committee.name.toLowerCase().replace(" ", "-")}`}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={committee.img}
                            alt={committee.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white font-serif text-xl font-bold mb-1">
                              {committee.name}
                            </h3>
                            <p className="text-primary text-sm">
                              {committee.level}
                            </p>
                          </div>
                        </div>
                        <div className="p-6">
                          <h4 className="text-card-foreground font-semibold mb-2 line-clamp-2">
                            {committee.subtitle}
                          </h4>
                          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                            {committee.topic}
                          </p>
                          <div className="flex items-center text-primary text-sm">
                            <Users className="w-4 h-4 mr-2" />
                            Chair: {committee.chair}
                          </div>
                        </div>
                      </motion.div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-serif text-foreground">
                          {committee.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <img
                          src={committee.img}
                          alt={committee.name}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">Committee:</h4>
                            <p className="text-muted-foreground">{committee.subtitle}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">Topic:</h4>
                            <p className="text-muted-foreground">{committee.topic}</p>
                          </div>
                          {committee.overview && (
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">Overview:</h4>
                              <p className="text-muted-foreground leading-relaxed">{committee.overview}</p>
                            </div>
                          )}
                          <div className="flex items-center space-x-6 pt-4 border-t border-border">
                            <div className="flex items-center text-primary">
                              <Trophy className="w-4 h-4 mr-2" />
                              <span className="text-sm">Level: {committee.level}</span>
                            </div>
                            <div className="flex items-center text-primary">
                              <Users className="w-4 h-4 mr-2" />
                              <span className="text-sm">Chair: {committee.chair}</span>
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
            <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
              Ready to Join a Committee?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Choose your committee and register now to be part of this diplomatic experience.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeMv3_996f1ifqRyloEstNA5F-BPhCszbtgJ-ksbORin-f_UQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105"
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