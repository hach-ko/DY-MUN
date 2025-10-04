import { Link } from "wouter";
import { Twitter, Instagram, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">DYMUN</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Empowering the next generation of global leaders through immersive Model United Nations experiences.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/dymun.nerul/" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  data-testid={`footer-social-${index}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/resources", label: "Resources" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>dymun@dypisnerul.in</li>
              <li>+91 86574 40454</li>
              <li>D Y Patil International School</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2025 DYMUN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
