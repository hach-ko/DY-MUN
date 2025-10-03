import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LoginDialog from "./LoginDialog";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, logout, login } = useAuth();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/committees", label: "Committees" },
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact" },
    { href: "/executivecommittee", label: "Executive Committee" },
    { href: "/executiveboard", label: "Executive Board" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/" data-testid="logo-link">
            <h1 className="text-lg font-bold text-primary cursor-pointer font-poppins">
              DYMUN
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-6 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link text-foreground hover:text-primary px-2 py-1 text-xs font-medium transition-colors duration-200 ${
                    isActive(item.href) ? "active" : ""
                  }`}
                  data-testid={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  {item.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`nav-link text-foreground hover:text-primary px-2 py-1 text-xs font-medium transition-colors duration-200 flex items-center gap-1 ${
                      isActive("/dashboard") ? "active" : ""
                    }`}
                    data-testid="nav-dashboard"
                  >
                    <User size={14} />
                    Dashboard
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="text-xs h-7 flex items-center gap-1"
                    data-testid="button-logout-desktop"
                  >
                    <LogOut size={14} />
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setIsLoginOpen(true)}
                  className="text-xs h-7"
                  data-testid="button-login-desktop"
                >
                  Login
                </Button>
              )}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeMv3_996f1ifqRyloEstNA5F-BPhCszbtgJ-ksbORin-f_UQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground px-4 py-1 rounded-md text-xs font-medium hover:bg-accent transition-colors duration-200"
                data-testid="register-button-desktop"
              >
                Register Now
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-foreground hover:text-primary focus:outline-none focus:text-primary"
              data-testid="mobile-menu-button"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="md:hidden bg-card border-t border-border fixed top-14 left-0 w-full h-screen z-40"
            data-testid="mobile-menu"
          >
            <div className="px-3 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="text-foreground hover:text-primary block px-2 py-1 text-sm font-medium"
                  data-testid={`mobile-nav-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  {item.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={closeMobileMenu}
                    className="text-foreground hover:text-primary block px-2 py-1 text-sm font-medium flex items-center gap-2"
                    data-testid="mobile-nav-dashboard"
                  >
                    <User size={16} />
                    Dashboard
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="w-full mt-2 flex items-center gap-2 justify-center"
                    data-testid="button-logout-mobile"
                  >
                    <LogOut size={16} />
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setIsLoginOpen(true);
                    closeMobileMenu();
                  }}
                  className="w-full mt-2"
                  data-testid="button-login-mobile"
                >
                  Login
                </Button>
              )}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeMv3_996f1ifqRyloEstNA5F-BPhCszbtgJ-ksbORin-f_UQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground block px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors duration-200 mt-3"
                data-testid="register-button-mobile"
              >
                Register Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginDialog 
        open={isLoginOpen} 
        onOpenChange={setIsLoginOpen}
        onLoginSuccess={login}
      />
    </nav>
  );
}