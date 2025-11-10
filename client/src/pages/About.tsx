import React, { useState, useEffect } from 'react';
import api from '@/lib/axiosConfig';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Users, Award, Lightbulb, Shield, Globe, Linkedin, Ticket, CalendarDays, MapPin, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingParticles from "@/components/effects/FloatingParticles";
import { Skeleton } from "@/components/ui/skeleton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// --- Interfaces ---
interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  boothNumber?: string;
  registrationUrl?: string;
}
interface TeamMember {
  _id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  specialty?: string;
  linkedinUrl?: string;
}
interface CompanyStat {
  value: string;
  label: string;
}
interface SiteConfig {
  companyStats: CompanyStat[];
}

const About = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [teamResponse, eventsResponse, configResponse] = await Promise.all([
          api.get('/team'),
          api.get('/events'),
          api.get('/config')
        ]);
        setTeamMembers(teamResponse.data);
        setEvents(eventsResponse.data);
        setSiteConfig(configResponse.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch page data. Please ensure the server is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statIcons = [Brain, Users, Award, Lightbulb];
  const values = [
    { title: "Innovation First", description: "We push the boundaries of what's possible with AI, always staying at the forefront of technological advancement.", icon: Lightbulb },
    { title: "Ethical AI", description: "We develop AI solutions that are transparent, fair, and designed to augment human capabilities responsibly.", icon: Shield },
    { title: "Global Impact", description: "Our solutions address real-world challenges and create positive impact across industries worldwide.", icon: Globe },
    { title: "Excellence Driven", description: "We maintain the highest standards in research, development, and delivery of AI solutions.", icon: Award },
  ];
  const expertise = [
    "Deep Neural Network Architectures", "Computer Vision & Image Processing", "Natural Language Processing",
    "Reinforcement Learning Systems", "Edge AI & Real-time Processing", "Ethical AI Development",
    "MLOps & Production Deployment", "Custom AI Solution Design",
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <FloatingParticles count={30} />
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 px-4 py-2"><Brain className="h-4 w-4 mr-2" />About Hekfa AI Division</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">Pioneering the Future of <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Artificial Intelligence</span></h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">We are Hekfa's specialized AI division, comprising visionary researchers, engineers, and innovators dedicated to pushing the boundaries of artificial intelligence and creating transformative solutions.</p>
          </motion.div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {loading ? (
              [...Array(4)].map((_, index) => (
                <Card key={index} className="neural-card text-center p-6"><CardContent className="p-0"><Skeleton className="h-8 w-8 rounded-full mx-auto mb-4" /><Skeleton className="h-8 w-1/2 mx-auto mb-2" /><Skeleton className="h-4 w-3/4 mx-auto" /></CardContent></Card>
              ))
            ) : siteConfig?.companyStats?.map((stat, index) => {
                const IconComponent = statIcons[index] || Lightbulb;
                return (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }}>
                    <Card className="neural-card text-center p-6"><CardContent className="p-0"><IconComponent className="h-8 w-8 text-primary mx-auto mb-4" /><div className="text-3xl font-bold glow-text mb-2">{stat.value}</div><div className="text-sm text-muted-foreground">{stat.label}</div></CardContent></Card>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text-secondary">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">At Hekfa AI, we believe that artificial intelligence should augment human capabilities, not replace them. Our mission is to develop ethical, transparent, and powerful AI solutions that solve real-world problems and create positive impact across industries.</p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">From healthcare diagnostics to autonomous systems, from financial analysis to creative applications, we harness the power of neural networks, machine learning, and computer vision to build the intelligent systems of tomorrow.</p>
              <div className="mb-8"><h3 className="text-xl font-semibold mb-4">Our Expertise</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-3">{expertise.map((skill) => (<div key={skill} className="flex items-center"><div className="w-2 h-2 rounded-full bg-primary mr-3" /><span className="text-muted-foreground">{skill}</span></div>))}</div></div>
              <Button asChild className="btn-neural"><Link to="/projects">Explore Our Work</Link></Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" /><FloatingParticles count={15} /><div className="absolute inset-0 flex items-center justify-center"><img src="/images/unnamed.jpg" alt="hello" /></div></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text-secondary">Our Values</h2><p className="text-lg text-muted-foreground max-w-2xl mx-auto">The principles that guide our AI research and development</p></motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{values.map((value, index) => (<motion.div key={value.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.1 }}><Card className="neural-card text-center h-full"><CardContent className="p-8"><div className="p-4 rounded-lg bg-primary/10 w-fit mx-auto mb-6"><value.icon className="h-8 w-8 text-primary" /></div><h3 className="text-xl font-semibold mb-4">{value.title}</h3><p className="text-muted-foreground leading-relaxed">{value.description}</p></CardContent></Card></motion.div>))}</div>
        </div>
      </section>

      {/* --- Team Section --- */}
      <section className="py-20 relative" id="team">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text-secondary">Meet Our Team</h2><p className="text-lg text-muted-foreground max-w-2xl mx-auto">World-class AI researchers and engineers driving innovation</p></motion.div>
          <div className="relative w-full max-w-6xl mx-auto">{loading && (<div className="flex overflow-x-hidden">{[...Array(4)].map((_, i) => (<div key={i} className="min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/4 px-2"><Card className="neural-card overflow-hidden"><Skeleton className="aspect-[3/4] w-full" /><CardContent className="p-6"><Skeleton className="h-5 w-3/4 mb-2" /><Skeleton className="h-4 w-1/2 mb-3" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6 mt-1" /></CardContent></Card></div>))}</div>)}{error && <p className="text-center text-red-500 text-lg">{error}</p>}{!loading && !error && teamMembers.length > 0 && (<Carousel opts={{ align: "start", loop: teamMembers.length > 4 }} className="w-full"><CarouselContent className="-ml-4">{teamMembers.map((member) => (<CarouselItem key={member._id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"><div className="p-1 h-full"><motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="h-full"><Card className="neural-card overflow-hidden h-full flex flex-col"><div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-secondary/20 relative"><img src={`${import.meta.env.VITE_API_URL}${member.imageUrl}`} alt={member.name} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" /><div className="absolute bottom-4 left-4 right-4">{member.specialty && <Badge variant="secondary">{member.specialty}</Badge>}</div></div><CardContent className="p-6 flex-grow flex flex-col"><div className="flex justify-between items-start"><div><h3 className="text-lg font-semibold mb-1">{member.name}</h3><p className="text-primary text-sm mb-3">{member.role}</p></div>{member.linkedinUrl && (<a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors ml-2 flex-shrink-0"><Linkedin className="h-5 w-5" /></a>)}</div><p className="text-muted-foreground text-sm leading-relaxed mt-auto">{member.bio}</p></CardContent></Card></motion.div></div></CarouselItem>))}</CarouselContent><CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-background/60 backdrop-blur-sm hover:bg-background/80 border-primary/20 hover:border-primary/50 disabled:opacity-30" /><CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-background/60 backdrop-blur-sm hover:bg-background/80 border-primary/20 hover:border-primary/50 disabled:opacity-30" /></Carousel>)}</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative"><FloatingParticles count={20} /><div className="container mx-auto px-6 text-center"><motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}><h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text">Join Us in Shaping the Future</h2><p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Whether you're looking to collaborate, join our team, or transform your business with AI, we'd love to hear from you.</p><div className="flex flex-col sm:flex-row gap-4 justify-center"><Button asChild className="btn-neural"><Link to="/contact">Contact Us</Link></Button><Button asChild variant="outline" className="btn-ghost-neural"><Link to="/research">View Our Research</Link></Button></div></motion.div></div></section>
      
      {/* Upcoming Events Section */}
      <section className="py-20 relative" id="events">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text-secondary">Join Us at Upcoming Events</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">We actively participate in leading industry conferences and workshops. Connect with us and see our technology in action.</p>
          </motion.div>
          {loading && (<div className="space-y-6">
            {
              [...Array(2)].map((_, i) => (
              <Card key={i} className="neural-card">
                <CardContent className="p-6">
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>))
            }
        </div>
      )}
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}
      {!loading && !error && events.length > 0 && (
        <div className="max-w-4xl mx-auto space-y-6">
          {events.map((event, index) => (
            <motion.div key={event._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.1 }}>
              <Card className="neural-card">
                <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2 text-muted-foreground text-sm mb-4">
                      <span className="flex items-center"><CalendarDays className="h-4 w-4 mr-2 text-primary" />
                      {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-primary" />{event.location}</span>
                      {event.boothNumber && <span className="flex items-center">
                        <Building2 className="h-4 w-4 mr-2 text-primary" />Booth: {event.boothNumber}</span>}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                  {/* {event.registrationUrl && (
                    <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                      <Button asChild className="btn-neural"><a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">Register Now</a></Button>
                    </div>
                  )} */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>)}
        {!loading && !error && events.length === 0 && (
          <p className="text-center text-muted-foreground text-lg">There are no upcoming events scheduled at the moment. Please check back later.</p>
        )}
      </div>
    </section>
    </div>
  );
};

export default About;