import React, { useState, useEffect } from 'react';
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
import { useTranslation } from "react-i18next";
import { selectLocalized } from "@/lib/utils";

// --- 1. تعریف Interfaceها برای داده‌های داینامیک ---
interface ContactInfoItem {
  title: string;
  description: string;
  value: string;
  titleFa?: string;
  descriptionFa?: string;
  valueFa?: string;
  icon: string; // نام آیکون به صورت رشته دریافت می‌شود
  link: string;
}

interface Office {
  city: string;
  country: string;
  address: string;
  phone: string;
  type: string;
  cityFa?: string;
  countryFa?: string;
  addressFa?: string;
  typeFa?: string;
}

const iconMap: { [key: string]: React.ElementType } = {
  Mail,
  Phone,
  MapPin,
  Clock,
};

const Contact = () => {
  const { t, i18n } = useTranslation();
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
    { title: t("contact.form.inquiryGeneral") || "General Inquiry", description: t("contact.form.inquiryGeneralDesc") || "Questions about our AI solutions and services", icon: MessageSquare, color: "primary" },
    { title: t("contact.form.inquiryPartner") || "Partnership", description: t("contact.form.inquiryPartnerDesc") || "Collaboration and business partnership opportunities", icon: Handshake, color: "secondary" },
    { title: t("contact.form.inquirySupport") || "Technical Support", description: t("contact.form.inquirySupportDesc") || "Technical assistance and implementation support", icon: Wrench, color: "accent" },
    { title: t("contact.form.inquiryCareers") || "Careers", description: t("contact.form.inquiryCareersDesc") || "Join our team of AI innovators", icon: Users, color: "primary" },
  ];

  
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <FloatingParticles count={30} />
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 px-4 py-2">
              <MessageSquare className="h-4 w-4 mr-2" /> {t("contact.hero.badge")}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
              {t("contact.hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("contact.hero.subtitle")}
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
                        <h3 className="font-semibold mb-2">
                          {selectLocalized(info, "title", i18n.language) ?? info.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {selectLocalized(info, "description", i18n.language) ?? info.description}
                        </p>
                        <div className="text-sm font-medium text-primary">
                          {selectLocalized(info, "value", i18n.language) ?? info.value}
                        </div>
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
                  <h2 className="text-2xl font-bold mb-6 glow-text-secondary">
                    {t("contact.form.title")}
                  </h2>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">{t("contact.form.firstName")}</Label>
                        <Input id="firstName" className="mt-2" value={formData.firstName} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">{t("contact.form.lastName")}</Label>
                        <Input id="lastName" className="mt-2" value={formData.lastName} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">{t("contact.form.email")}</Label>
                      <Input id="email" type="email" className="mt-2" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="company">{t("contact.form.company")}</Label>
                      <Input id="company" className="mt-2" value={formData.company} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="inquiryType">{t("contact.form.inquiryType")}</Label>
                      <Select onValueChange={handleSelectChange} value={formData.inquiryType} required>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder={t("contact.form.inquiryType")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General Inquiry">{t("contact.form.inquiryGeneral")}</SelectItem>
                          <SelectItem value="Partnership">{t("contact.form.inquiryPartner")}</SelectItem>
                          <SelectItem value="Technical Support">{t("contact.form.inquirySupport")}</SelectItem>
                          <SelectItem value="Careers">{t("contact.form.inquiryCareers")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="message">{t("contact.form.message")}</Label>
                      <Textarea id="message" rows={5} className="mt-2" value={formData.message} onChange={handleInputChange} required />
                    </div>
                    <Button type="submit" className="btn-neural w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("contact.form.submitting")}
                        </>
                      ) : (
                        t("contact.form.submit")
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Inquiry Types */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 glow-text-secondary">
                  {t("contact.inquiry.title")}
                </h2>
                <p className="text-muted-foreground">
                  {t("contact.inquiry.description")}
                </p>
              </div>
              <div className="space-y-4">
                {inquiryTypes.map((type, index) => (
                  <motion.div key={type.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                    <Card className="neural-card cursor-pointer group"><CardContent className="p-6"><div className="flex items-start space-x-4"><div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"><type.icon className="h-6 w-6 text-primary" /></div><div><h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{type.title}</h3><p className="text-muted-foreground text-sm">{type.description}</p></div></div></CardContent></Card>
                  </motion.div>
                ))}
              </div>
              <Card className="neural-card mt-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">
                    {t("contact.inquiry.quickResponseTitle")}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {t("contact.inquiry.quickResponseBody")}
                  </p>
                  <Button variant="outline" className="btn-ghost-neural">
                    {t("contact.inquiry.scheduleCall")}
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
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text-secondary">
              {t("contact.offices.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("contact.offices.subtitle")}
            </p>
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
                      <Badge variant="outline" className="mb-4">
                        {selectLocalized(office, "type", i18n.language) ?? office.type}
                      </Badge>
                      <h3 className="text-xl font-semibold mb-2">
                        {selectLocalized(office, "city", i18n.language) ?? office.city}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {selectLocalized(office, "country", i18n.language) ?? office.country}
                      </p>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-center space-x-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">
                            {selectLocalized(office, "address", i18n.language) ?? office.address}
                          </span>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text">
              {t("contact.cta.title")}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("contact.cta.subtitle")}
            </p>
            <Button className="btn-neural">
              {t("contact.cta.button")}
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;