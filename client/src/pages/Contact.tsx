import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, MessageSquare, Users, Handshake, Wrench } from "lucide-react";
import FloatingParticles from "@/components/effects/FloatingParticles";

const Contact = () => {
  const contactInfo = [
    {
      title: "Email Us",
      description: "Get in touch via email",
      value: "contact@hekfa.ai",
      icon: Mail,
      link: "mailto:contact@hekfa.ai",
    },
    {
      title: "Call Us",
      description: "Speak with our team",
      value: "+1 (555) 123-4567",
      icon: Phone,
      link: "tel:+15551234567",
    },
    {
      title: "Visit Us",
      description: "Our headquarters",
      value: "San Francisco, CA",
      icon: MapPin,
      link: "#",
    },
    {
      title: "Business Hours",
      description: "Monday - Friday",
      value: "9:00 AM - 6:00 PM PST",
      icon: Clock,
      link: "#",
    },
  ];

  const inquiryTypes = [
    {
      title: "General Inquiry",
      description: "Questions about our AI solutions and services",
      icon: MessageSquare,
      color: "primary",
    },
    {
      title: "Partnership",
      description: "Collaboration and business partnership opportunities",
      icon: Handshake,
      color: "secondary",
    },
    {
      title: "Technical Support",
      description: "Technical assistance and implementation support",
      icon: Wrench,
      color: "accent",
    },
    {
      title: "Careers",
      description: "Join our team of AI innovators",
      icon: Users,
      color: "primary",
    },
  ];

  const offices = [
    {
      city: "San Francisco",
      country: "United States",
      address: "123 Innovation Drive, San Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      type: "Headquarters",
    },
    {
      city: "London",
      country: "United Kingdom",
      address: "45 Tech Square, London EC2A 3LT",
      phone: "+44 20 7123 4567",
      type: "European Office",
    },
    {
      city: "Singapore",
      country: "Singapore",
      address: "78 AI Hub, Singapore 018956",
      phone: "+65 6123 4567",
      type: "Asia Pacific Office",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <FloatingParticles count={30} />
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge 
              variant="outline" 
              className="mb-6 border-primary/30 text-primary bg-primary/10 px-4 py-2"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Get in Touch
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
              Let's Build the Future of{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                AI Together
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business with cutting-edge AI solutions? 
              Our team of experts is here to help you navigate the future of artificial intelligence.
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="neural-card text-center h-full">
                  <CardContent className="p-6">
                    <div className="p-3 rounded-lg bg-primary/10 w-fit mx-auto mb-4">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{info.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{info.description}</p>
                    <div className="text-sm font-medium text-primary">{info.value}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Inquiry Types */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="neural-card">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 glow-text-secondary">
                    Send Us a Message
                  </h2>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@company.com"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        placeholder="Your Company Name"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="careers">Careers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project or inquiry..."
                        rows={5}
                        className="mt-2"
                      />
                    </div>

                    <Button className="btn-neural w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Inquiry Types */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 glow-text-secondary">
                  How Can We Help?
                </h2>
                <p className="text-muted-foreground">
                  Choose the type of inquiry that best matches your needs, 
                  and we'll connect you with the right team member.
                </p>
              </div>

              <div className="space-y-4">
                {inquiryTypes.map((type, index) => (
                  <motion.div
                    key={type.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="neural-card cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <type.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                              {type.title}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className="neural-card mt-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Quick Response</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    We typically respond to inquiries within 24 hours. 
                    For urgent matters, please call us directly.
                  </p>
                  <Button variant="outline" className="btn-ghost-neural">
                    Schedule a Call
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text-secondary">
              Our Global Presence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              With offices around the world, we're positioned to serve clients 
              across different time zones and regions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="neural-card h-full">
                  <CardContent className="p-8 text-center">
                    <Badge variant="outline" className="mb-4">
                      {office.type}
                    </Badge>
                    <h3 className="text-xl font-semibold mb-2">
                      {office.city}
                    </h3>
                    <p className="text-muted-foreground mb-4">{office.country}</p>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-center space-x-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{office.address}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{office.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <FloatingParticles count={20} />
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text">
              Ready to Start Your AI Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't wait to revolutionize your business. Contact us today 
              and discover how AI can transform your operations.
            </p>
            <Button className="btn-neural">
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;