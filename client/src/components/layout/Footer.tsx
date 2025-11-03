import { Link } from "react-router-dom";
import { Brain, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", path: "/about" },
      { name: "Our Team", path: "/about#team" },
      { name: "Careers", path: "/careers" },
      { name: "News", path: "/research" },
    ],
    solutions: [
      { name: "Face Recognition", path: "/projects/face-recognition" },
      { name: "Smart Parking", path: "/projects/smart-parking" },
      { name: "RAG for LLMs", path: "/projects/rag-llms" },
      { name: "AI Animation", path: "/projects/ai-animation" },
    ],
    resources: [
      { name: "Research Papers", path: "/research" },
      { name: "Case Studies", path: "/research#case-studies" },
      { name: "Documentation", path: "/docs" },
      { name: "API Reference", path: "/api" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
      { name: "Security", path: "/security" },
    ],
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/hekfa" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/company/hekfa" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com/hekfa_ai" },
  ];

  return (
    <footer className="relative mt-32 border-t border-border/50 bg-slate-900 text-gray-300">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50" />
      
      <div className="relative container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <Brain className="h-10 w-10 text-primary animate-glow-pulse" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold glow-text text-gray-100">Hekfa</span>
                <span className="text-sm text-gray-400 font-mono">
                  AI Division
                </span>
              </div>
            </Link>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Pioneering the future of artificial intelligence through cutting-edge 
              research in neural networks, machine learning, and computer vision 
              technologies that transform industries worldwide.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@hekfa.ai</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-4 w-4 text-primary" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-gray-100 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="font-semibold text-gray-100 mb-4">Solutions</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-gray-100 mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-gray-100 mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-8 bg-border/50" />

        {/* Bottom Footer */}
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          <div className="text-gray-400 text-sm">
            © {currentYear} Hekfa AI Division. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                variant="ghost"
                size="sm"
                asChild
                className="text-muted-foreground hover:text-primary"
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4 text-gray-300" />
                </a>
              </Button>
            ))}
          </div>

          {/* Newsletter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Stay updated:</span>
            <Button variant="outline" size="sm" className="btn-ghost-neural">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;