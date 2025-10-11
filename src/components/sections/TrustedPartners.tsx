import { motion } from "framer-motion";

const TrustedPartners = () => {
  const partners = [
    { name: "Google Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
    { name: "Microsoft Azure", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" },
    { name: "NVIDIA", logo: "https://upload.wikimedia.org/wikipedia/en/2/21/Nvidia_logo.svg" },
    { name: "Amazon Web Services", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg" },
  ];

  const clients = [
    "Fortune 500 Company A",
    "Global Healthcare Leader",
    "International Bank Corp",
    "Smart City Initiative",
    "Automotive Giant",
    "Tech Unicorn Startup",
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 glow-text-secondary">
            Trusted by Industry Leaders
          </h2>
          
          {/* Partner Logos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center mb-16">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center justify-center h-16 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all group"
              >
                <div className="w-full h-full flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                  <span className="text-lg font-semibold">{partner.name}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Client Success Stories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client, index) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/30 text-center"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">✓</span>
                </div>
                <h3 className="font-semibold text-sm text-muted-foreground">{client}</h3>
                <p className="text-xs text-muted-foreground/70 mt-1">Successful AI Implementation</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedPartners;