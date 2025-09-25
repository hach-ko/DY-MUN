import { motion } from "framer-motion";
import { useState } from "react";
import { BookOpen, FileText, Video, Download, Play, ExternalLink, Globe, Newspaper, TrendingUp, Scale, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ScrollReveal from "@/components/ScrollReveal";
import { committeeResources } from "@/data/resources";
import { committeeGroups } from "@/data/committees";

export default function Resources() {
  const [selectedCommittee, setSelectedCommittee] = useState("All Committees");
  
  // Get all committee names for the dropdown
  const allCommittees = ["All Committees", ...committeeGroups.flatMap(group => 
    group.committees.map(committee => committee.name)
  )];
  
  const currentResources = committeeResources[selectedCommittee] || committeeResources["All Committees"];

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
              Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Everything you need to excel at DYMUN and beyond
            </p>
            
            {/* Committee Filter */}
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Filter className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">Filter by Committee:</span>
              </div>
              <Select value={selectedCommittee} onValueChange={setSelectedCommittee}>
                <SelectTrigger className="w-full" data-testid="committee-filter-select">
                  <SelectValue placeholder="Select a committee" />
                </SelectTrigger>
                <SelectContent>
                  {allCommittees.map((committee) => (
                    <SelectItem key={committee} value={committee} data-testid={`committee-option-${committee.toLowerCase().replace(/\s+/g, '-')}`}>
                      {committee}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </ScrollReveal>

        {/* Resource Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {currentResources.map((category, index) => (
            <ScrollReveal key={`${selectedCommittee}-${index}`} delay={index * 0.1}>
              <div className="bg-card p-8 rounded-lg card-hover">
                <div className="text-primary mb-4">
                  <category.icon className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-card-foreground mb-4">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                <div className="space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.href || "#"}
                      className="block text-primary hover:text-accent transition-colors duration-200 flex items-center"
                      data-testid={`resource-${category.title.toLowerCase().replace(/\s+/g, "-")}-${linkIndex}`}
                    >
                      <link.icon className="w-4 h-4" />
                      <span className="ml-2">{link.text}</span>
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Featured Resources */}
        <ScrollReveal>
          <div className="bg-muted p-12 rounded-lg mb-16">
            <h2 className="font-serif text-4xl font-bold text-foreground text-center mb-8">
              Featured Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-lg">
                <h4 className="font-serif text-xl font-semibold text-card-foreground mb-3">
                  Complete MUN Preparation Kit
                </h4>
                <p className="text-muted-foreground mb-4">
                  Everything you need to prepare for your first Model UN conference, including research methods, 
                  speaking tips, and country profiles.
                </p>
                <a
                  href="#"
                  className="text-primary hover:text-accent font-semibold transition-colors duration-200 flex items-center"
                  data-testid="preparation-kit-download"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Download Kit
                </a>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <h4 className="font-serif text-xl font-semibold text-card-foreground mb-3">
                  Global Issues Database
                </h4>
                <p className="text-muted-foreground mb-4">
                  Comprehensive database of current global issues with detailed analysis, statistics, 
                  and multiple perspectives for informed debates.
                </p>
                <a
                  href="#"
                  className="text-primary hover:text-accent font-semibold transition-colors duration-200 flex items-center"
                  data-testid="global-issues-database"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Access Database
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Quick Links */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: "UN Official Site",
                link: "https://www.un.org",
              },
              {
                icon: <Newspaper className="w-8 h-8" />,
                title: "UN News",
                link: "https://news.un.org",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "World Bank Data",
                link: "https://data.worldbank.org",
              },
              {
                icon: <Scale className="w-8 h-8" />,
                title: "ICJ Resources",
                link: "https://www.icj-cij.org",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-card p-6 rounded-lg card-hover">
                  <div className="text-primary mb-3 flex justify-center">{item.icon}</div>
                  <h4 className="font-semibold text-card-foreground mb-2">{item.title}</h4>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent text-sm"
                    data-testid={`external-link-${item.title.toLowerCase().replace(" ", "-")}`}
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal>
          <div className="text-center mt-20">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-6">Ready to Prepare?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Use these resources to excel at DYMUN and become a confident, effective delegate.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeMv3_996f1ifqRyloEstNA5F-BPhCszbtgJ-ksbORin-f_UQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105"
              data-testid="resources-register-button"
            >
              Register Now
            </a>
          </div>
        </ScrollReveal>
      </div>
    </motion.div>
  );
}
