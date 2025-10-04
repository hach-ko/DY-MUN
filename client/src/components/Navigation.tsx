import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LoginDialog from "./LoginDialog";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, logout, login } = useAuth();

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

  const handleLoginSuccess = async () => {
    await login();
    setLocation("/dashboard");
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" data-testid="logo-link">
            <h1 className="text-xl md:text-2xl font-bold text-primary cursor-pointer font-poppins hover:opacity-80 transition-opacity">
              DYMUN
            </h1>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
                data-testid={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                    isActive("/dashboard")
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                  data-testid="nav-dashboard"
                >
                  <User size={16} />
                  Dashboard
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="flex items-center gap-2 h-9"
                  data-testid="button-logout-desktop"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLoginOpen(true)}
                className="h-9"
                data-testid="button-login-desktop"
              >
                Login
              </Button>
            )}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeMv3_996f1ifqRyloEstNA5F-BPhCszbtgJ-ksbORin-f_UQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-5 py-2 rounded-md text-sm font-semibold hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
              data-testid="register-button-desktop"
            >
              Register Now
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            {user && (
              <Link
                href="/dashboard"
                className="text-foreground hover:text-primary transition-colors"
                data-testid="mobile-dashboard-icon"
              >
                <User size={20} />
              </Link>
            )}
            <button
              onClick={toggleMobileMenu}
              className="text-foreground hover:text-primary focus:outline-none transition-colors p-2"
              data-testid="mobile-menu-button"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-background border-t border-border shadow-lg"
            data-testid="mobile-menu"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-primary/5 hover:text-primary"
                  }`}
                  data-testid={`mobile-nav-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 mt-4 border-t border-border space-y-3">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={closeMobileMenu}
                      className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                        isActive("/dashboard")
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-primary/5 hover:text-primary"
                      }`}
                      data-testid="mobile-nav-dashboard"
                    >
                      <User size={20} />
                      Dashboard
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        logout();
                        closeMobileMenu();
                      }}
                      className="w-full flex items-center gap-2 justify-center h-11"
                      data-testid="button-logout-mobile"
                    >
                      <LogOut size={20} />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      setIsLoginOpen(true);
                      closeMobileMenu();
                    }}
                    variant="outline"
                    className="w-full h-11"
                    data-testid="button-login-mobile"
                  >
                    Login
                  </Button>
                )}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeMv3_996f1ifqRyloEstNA5F-BPhCszbtgJ-ksbORin-f_UQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="bg-primary text-primary-foreground w-full block text-center px-5 py-3 rounded-lg text-base font-semibold hover:bg-primary/90 transition-all duration-200 shadow-sm"
                  data-testid="register-button-mobile"
                >
                  Register Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginDialog 
        open={isLoginOpen} 
        onOpenChange={setIsLoginOpen}
        onLoginSuccess={handleLoginSuccess}
      />
    </nav>
  );
}
