import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import api from '@/lib/axiosConfig';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, MessageSquare, Users, Handshake, Wrench, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // <<-- Skeleton اضافه شد
import FloatingParticles from "@/components/effects/FloatingParticles";
import { toast } from "sonner";

// --- 1. تعریف Interfaceها برای داده‌های داینامیک ---
interface ContactInfoItem {
  title: string;
  description: string;
  value: string;
  icon: string; // نام آیکون به صورت رشته دریافت می‌شود
  link: string;
}

interface Office {
  city: string;
  country: string;
  address: string;
  phone: string;
  type: string;
}

const iconMap: { [key: string]: React.ElementType } = {
  Mail,
  Phone,
  MapPin,
  Clock,
};

const Contact = () => {
  // State برای مدیریت داده‌های فرم
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    inquiryType: '',
    message: '',
  });

  // State برای مدیریت وضعیت ارسال فرم (برای نمایش لودینگ)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [contactInfo, setContactInfo] = useState<ContactInfoItem[]>([]);
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const response = await api.get('/config');
        setContactInfo(response.data.contactInfo);
        setOffices(response.data.globalOffices);
        setError(null);
      } catch (err) {
        setError('Failed to load contact information.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await api.post('/contact', formData);
      if (response.status === 201) {
        toast.success("Message sent successfully!", {
          description: "Our team will get back to you shortly.",
        });
        setFormData({
          firstName: '', lastName: '', email: '', company: '', inquiryType: '', message: '',
        });
      }
    } catch (error) {
      toast.error("Failed to send message.", {
        description: "Please try again later or contact us directly via email.",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inquiryTypes = [
    { title: "General Inquiry", description: "Questions about our AI solutions and services", icon: MessageSquare, color: "primary" },
    { title: "Partnership", description: "Collaboration and business partnership opportunities", icon: Handshake, color: "secondary" },
    { title: "Technical Support", description: "Technical assistance and implementation support", icon: Wrench, color: "accent" },
    { title: "Careers", description: "Join our team of AI innovators", icon: Users, color: "primary" },
  ];

  
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <FloatingParticles count={30} />
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 px-4 py-2">
              <MessageSquare className="h-4 w-4 mr-2" /> Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
              Let's Build the Future of{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">AI Together</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business with cutting-edge AI solutions? Our team of experts is here to help you navigate the future of artificial intelligence.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <Card key={i} className="neural-card"><CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent></Card>
              ))
            ) : (
              contactInfo.map((info, index) => {
                const IconComponent = iconMap[info.icon];
                return (
                  <motion.div key={info.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }}>
                    <Card className="neural-card text-center h-full">
                      <CardContent className="p-6">
                        <div className="p-3 rounded-lg bg-primary/10 w-fit mx-auto mb-4">
                          {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                        </div>
                        <h3 className="font-semibold mb-2">{info.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{info.description}</p>
                        <div className="text-sm font-medium text-primary">{info.value}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Contact Form & Inquiry Types */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <Card className="neural-card">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 glow-text-secondary">Send Us a Message</h2>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" className="mt-2" value={formData.firstName} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" className="mt-2" value={formData.lastName} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john.doe@company.com" className="mt-2" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Your Company Name" className="mt-2" value={formData.company} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select onValueChange={handleSelectChange} value={formData.inquiryType} required>
                        <SelectTrigger className="mt-2"><SelectValue placeholder="Select inquiry type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                          <SelectItem value="Partnership">Partnership</SelectItem>
                          <SelectItem value="Technical Support">Technical Support</SelectItem>
                          <SelectItem value="Careers">Careers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Tell us about your project or inquiry..." rows={5} className="mt-2" value={formData.message} onChange={handleInputChange} required />
                    </div>
                    <Button type="submit" className="btn-neural w-full" disabled={isSubmitting}>
                      {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>) : ("Send Message")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Inquiry Types */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="mb-8"><h2 className="text-2xl font-bold mb-4 glow-text-secondary">How Can We Help?</h2><p className="text-muted-foreground">Choose the type of inquiry that best matches your needs, and we'll connect you with the right team member.</p></div>
              <div className="space-y-4">
                {inquiryTypes.map((type, index) => (
                  <motion.div key={type.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                    <Card className="neural-card cursor-pointer group"><CardContent className="p-6"><div className="flex items-start space-x-4"><div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"><type.icon className="h-6 w-6 text-primary" /></div><div><h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{type.title}</h3><p className="text-muted-foreground text-sm">{type.description}</p></div></div></CardContent></Card>
                  </motion.div>
                ))}
              </div>
              <Card className="neural-card mt-8"><CardContent className="p-6"><h3 className="font-semibold mb-4">Quick Response</h3><p className="text-muted-foreground text-sm mb-4">We typically respond to inquiries within 24 hours. For urgent matters, please call us directly.</p><Button variant="outline" className="btn-ghost-neural">Schedule a Call</Button></CardContent></Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text-secondary">Our Global Presence</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">With offices around the world, we're positioned to serve clients across different time zones and regions.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              [...Array(3)].map((_, i) => (
                 <Card key={i} className="neural-card"><CardContent className="p-8"><Skeleton className="h-32 w-full" /></CardContent></Card>
              ))
            ) : (
              offices.map((office, index) => (
                <motion.div key={office.city} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.1 }}>
                  <Card className="neural-card h-full">
                    <CardContent className="p-8 text-center">
                      <Badge variant="outline" className="mb-4">{office.type}</Badge>
                      <h3 className="text-xl font-semibold mb-2">{office.city}</h3>
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
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <FloatingParticles count={20} />
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text">Ready to Start Your AI Journey?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Don't wait to revolutionize your business. Contact us today and discover how AI can transform your operations.</p>
            <Button className="btn-neural">Get Started Today</Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;