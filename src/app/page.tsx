// src/app/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Bed,
  Bath,
  User,
  Square,
  MapPin,
  Search,
  ArrowRight,
  MessageCircle,
  Sun,
  Moon,
  Instagram,
  Facebook,
  Phone,
  Mail,
  Home as HomeIcon,
  Building2,
  Award,
  Users,
  Music,
} from "lucide-react";

// Sample Properties
const properties = [
  {
    id: 1,
    title: "Bungalow to Let",
    price: 3300000,
    location: "Ogunwenyin Annual",
    beds: 4,
    baths: 4,
    fee: 30,
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070",
  },
  {
    id: 2,
    title: "Standard Flat to Let",
    price: 900000,
    location: "Obagie Community",
    beds: 3,
    baths: 4,
    fee: 30,
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053",
  },
  {
    id: 3,
    title: "Standard Flat to Let",
    price: 1300000,
    location: "Okhoromi",
    beds: 2,
    baths: 2,
    fee: 20,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
  },
  {
    id: 4,
    title: "Self Con Apartment",
    price: 900000,
    location: "Okhoromi",
    beds: 1,
    baths: 1,
    fee: 20,
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070",
  },
  {
    id: 5,
    title: "Luxury Duplex",
    price: 3874000,
    location: "Okhoromi",
    beds: 3,
    baths: 3,
    fee: 20,
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b03e7?q=80&w=2070",
  },
  {
    id: 6,
    title: "Standard Flat to Let",
    price: 1350000,
    location: "Okhoromi",
    beds: 2,
    baths: 2,
    fee: 30,
    img: "https://images.unsplash.com/photo-1600566753376-2da6f6a75fd8?q=80&w=2070",
  },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("all");
  const [price, setPrice] = useState("all");
  const [beds, setBeds] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Dark Mode Persistence
  useEffect(() => {
    const saved = localStorage.getItem("peem-dark-mode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = saved === "true" || (saved === null && prefersDark);
    setDarkMode(shouldBeDark);
    if (shouldBeDark) document.documentElement.classList.add("dark");
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("peem-dark-mode", String(newMode));
    document.documentElement.classList.toggle("dark", newMode);
  };

  // Smooth Scroll
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Filter Properties
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(search.toLowerCase()) ||
        property.location.toLowerCase().includes(search.toLowerCase());
      const matchesLocation = location === "all" || property.location.toLowerCase().includes(location.toLowerCase());
      const matchesPrice =
        price === "all" ||
        (price === "under150" && property.price < 150000000) ||
        (price === "150to400" && property.price >= 150000000 && property.price <= 400000000) ||
        (price === "over400" && property.price > 400000000);
      const matchesBeds = beds === "all" || property.beds >= Number(beds);
      return matchesSearch && matchesLocation && matchesPrice && matchesBeds;
    });
  }, [search, location, price, beds]);

  const formatPrice = (amount: number) => `₦${(amount / 1000000).toFixed(0)}M`;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message Sent Successfully!", {
      description: "Our team will contact you within 24 hours.",
    });
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-950 text-white" : "bg-white text-gray-900"}`}>
      {/* === NAVBAR – Mobile Hamburger + Responsive Search === */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/95 dark:bg-gray-950/95 backdrop-blur">
       <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
         {/* Logo */}
          <button onClick={() => scrollToSection("hero")} className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition">
              P
            </div>
            <span className="text-lg lg:text-lg sm:text-sm font-bold text-green-700 dark:text-green-400">Peem Real Estate Enterprise</span>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10 text-lg font-medium">
           <button onClick={() => scrollToSection("hero")} className="hover:text-green-600 dark:hover:text-green-400">Home</button>
           <button onClick={() => scrollToSection("about")} className="hover:text-green-600 dark:hover:text-green-400">About</button>
           <button onClick={() => scrollToSection("properties")} className="hover:text-green-600 dark:hover:text-green-400">Properties</button>
           <button onClick={() => scrollToSection("contact")} className="hover:text-green-600 dark:hover:text-green-400">Contact</button>
          </div>

          {/* Right Side: Search Icon (mobile) + Dark Mode + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Tiny Search Icon on Mobile */}
            <button
              onClick={() => setMobileSearchOpen(true)}
              className="lg:hidden"
              aria-label="Open search"
            >
             <Search className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Dark Mode Toggle */}
            <Sun className="h-5 w-5 text-yellow-500 dark:hidden" />
            <Moon className="h-5 w-5 hidden dark:block text-gray-300" />
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />

            {/* Hamburger Menu (Mobile Only) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="space-y-1">
               <span className="block w-7 h-0.5 bg-gray-800 dark:bg-white"></span>
               <span className="block w-7 h-0.5 bg-gray-800 dark:bg-white"></span>
               <span className="block w-7 h-0.5 bg-gray-800 dark:bg-white"></span>
              </div>
           </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
         <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-b"
          >
           <div className="px-6 py-4 space-y-3">
             <button onClick={() => { scrollToSection("hero"); setMobileMenuOpen(false); }} className="block w-full text-left text-lg hover:text-green-600">Home</button>
             <button onClick={() => { scrollToSection("about"); setMobileMenuOpen(false); }} className="block w-full text-left text-lg hover:text-green-600">About</button>
             <button onClick={() => { scrollToSection("properties"); setMobileMenuOpen(false); }} className="block w-full text-left text-lg hover:text-green-600">Properties</button>
             <button onClick={() => { scrollToSection("contact"); setMobileMenuOpen(false); }} className="block w-full text-left text-lg hover:text-green-600">Contact</button>
            </div>
          </motion.div>
        )}
      </nav>
        {/* MOBILE SEARCH POPUP – appears when search icon is tapped */}
         {mobileSearchOpen && (
          <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-x-0 top-20 z-50 bg-white dark:bg-gray-900 border-b shadow-lg px-6 py-5 lg:hidden"
        >
        <div className="max-w-2xl mx-auto">
        <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
        <Input
          placeholder="Search properties, locations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 h-12 text-lg"
          autoFocus
        />
        <button
          onClick={() => setMobileSearchOpen(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          aria-label="Close search"
        >
          ×
        </button>
      </div>
    </div>
  </motion.div>
)}

        {/* HERO SECTION – Background Image + Reduced Font Size */}
        <section
           id="hero"
           className="relative h-screen flex items-center justify-center bg-cover bg-center bg-fixed bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070')]"
          >
          <div className="absolute inset-0 bg-linear-to-br from-green-950/95 via-green-900/90 to-emerald-950/90" />
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Peem Real Estate Enterprise
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl font-light mb-10 max-w-3xl mx-auto"
            >
              Discover luxury living in Benin, Edo State and beyond. Your dream home is just one click away.
            </motion.p>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ delay: 1.1 }}>
              <Button
                size="lg"
                onClick={() => scrollToSection("properties")}
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-7 text-lg font-medium"
              >
                Explore Properties <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* SEARCH BAR – Smaller & Elegant on ALL Devices */}
        <section className="sticky top-20 z-40 bg-gray-50 dark:bg-gray-900 border-b py-5 sm:hidden lg:block">
          <div className="max-w-4xl mx-auto px-6"> {/* ← Reduced from max-w-7xl to max-w-5xl */}
            {/* Compact grid – 1 column mobile, 4 columns desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="search-bar"
                  placeholder="Search properties..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-11 h-11 lg:h-12 text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                />
              </div>

             {/* Location */}
             <Select value={location} onValueChange={setLocation}>
               <SelectTrigger className="h-11 lg:h-12 text-base">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="lekki">Lekki</SelectItem>
                  <SelectItem value="ikoyi">Ikoyi</SelectItem>
                  <SelectItem value="victoria">Victoria Island</SelectItem>
                  <SelectItem value="banana">Banana Island</SelectItem>
                  <SelectItem value="abuja">Abuja</SelectItem>
                </SelectContent>
              </Select>

             {/* Price */}
             <Select value={price} onValueChange={setPrice}>
               <SelectTrigger className="h-11 lg:h-12 text-base">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="under150">Under ₦150M</SelectItem>
                  <SelectItem value="150to400">₦150M – ₦400M</SelectItem>
                  <SelectItem value="over400">Over ₦400M</SelectItem>
                </SelectContent>
              </Select>

              {/* Beds */}
              <Select value={beds} onValueChange={setBeds}>
                <SelectTrigger className="h-11 lg:h-12 text-base">
                   <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="3">3+ Beds</SelectItem>
                  <SelectItem value="4">4+ Beds</SelectItem>
                  <SelectItem value="5">5+ Beds</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count – Smaller & Centered */}
            <div className="mt-4 text-center">
              <Badge className="bg-green-600 text-white px-5 py-1.5 text-sm lg:text-base">
                {filteredProperties.length} Properties Found
              </Badge>
            </div>
          </div>
        </section>
             
        {/* ABOUT SECTION – Animates on Every Scroll */}
        <section id="about" className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-16 text-gray-900 dark:text-white"
            >
              Why Choose Peem Real Estate?
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { icon: Building2, title: "10+ Years Experience", desc: "Trusted by thousands across Nigeria" },
                { icon: Award, title: "Award-Winning Service", desc: "Best Real Estate Agency 2024" },
                { icon: Users, title: "24/7 Expert Support", desc: "Always here when you need us" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.2, duration: 0.7 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-12 h-12 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROPERTIES GRID – Animates on Every Scroll */}
        <section id="properties" className="py-20 px-6 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
              Featured Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all h-full bg-white dark:bg-gray-800 border-0">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={property.img}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition" />
                      <Badge className="absolute top-4 right-4 bg-green-600 text-white">FOR SALE</Badge>
                      <p className="absolute bottom-4 left-4 text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition">
                        {formatPrice(property.price)}
                      </p>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{property.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 text-base">
                        <MapPin className="w-4 h-4" /> {property.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-gray-700 dark:text-gray-300">
                        <span><Bed className="inline w-4 h-4 mr-1" /> {property.beds} Beds</span>
                        <span><Bath className="inline w-4 h-4 mr-1" /> {property.baths} Baths</span>
                        <span><User className="inline w-4 h-4 mr-1" /> {property.fee}%</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 bg-green-700 dark:bg-green-900 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Let’s Find Your Dream Home</h2>
            <form onSubmit={handleContactSubmit} className="space-y-6 max-w-xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <Input placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-white/10 border-white/20 placeholder:text-white/70" required />
                <Input placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-white/10 border-white/20 placeholder:text-white/70" required />
              </div>
              <Input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-white/10 border-white/20 placeholder:text-white/70" required />
              <Textarea placeholder="Tell us what you're looking for..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="bg-white/10 border-white/20 placeholder:text-white/70 min-h-32" required />
              <Button type="submit" size="lg" className="w-full bg-white text-green-700 hover:bg-gray-100 text-xl py-8 font-medium">
                Send Message <MessageCircle className="ml-3 h-6 w-6" />
              </Button>
            </form>
          </div>
        </section>

        {/* WHATSAPP FLOATING BUTTON */}
        <a
          href="https://wa.me/2348000000000?text=Hi%20Peem%20Real%20Estate!"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Peem Real Estate on WhatsApp"
          title="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full p-5 shadow-lg hover:scale-110 transition"
        >
          <MessageCircle className="h-8 w-8" />
        </a>

        {/* FOOTER – Logo, Links, Social Media */}
        <footer className="bg-gray-900 dark:bg-black text-white py-16">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="text-center md:text-left">
              <button onClick={() => scrollToSection("hero")} className="flex items-center justify-center md:justify-start gap-4 mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-4xl font-bold text-white">P</div>
                <span className="text-md md:text-md lg:text-md font-bold text-green-400">Peem Real Estate Enterprise</span>
              </button>
              <p className="text-gray-400">Luxury redefined in Nigerian real estate, We Sell, We Buy, We Design Properties.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3 text-gray-400">
                <li><button onClick={() => scrollToSection("hero")} className="hover:text-green-400 transition">Home</button></li>
                <li><button onClick={() => scrollToSection("about")} className="hover:text-green-400 transition">About Us</button></li>
                <li><button onClick={() => scrollToSection("properties")} className="hover:text-green-400 transition">Properties</button></li>
                <li><button onClick={() => scrollToSection("contact")} className="hover:text-green-400 transition">Contact</button></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Contact Info</h3>
              <p className="flex items-center gap-3 text-gray-400 mb-3"><Phone className="w-5 h-5" /> +234 812 xxxx xxx</p>
              <p className="flex items-center gap-3 text-gray-400 mb-3"><Mail className="w-5 h-5" /> xxxxxxxxxxxx.com</p>
              <p className="flex items-center gap-3 text-gray-400 mb-3">
                <MapPin className="w-5 h-5" /> Shop 7, xxxxx xxxxxx xxxx, 
                 Off Ohkuoromi Community, X.X.X, Benin City, Edo State, Nigeria
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Follow Us</h3>
              <div className="flex gap-6">
                <a href="https://instagram.com/peemrealestate" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-pink-500 transition">
                  <Instagram className="w-8 h-8" />
                </a>
                <a
                  href="https://tiktok.com/@peemrealestate"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="text-gray-400 hover:text-white transition"
                >
                <Music className="w-8 h-8" /> {/* TikTok icon */}
                </a>
                <a href="https://facebook.com/peemrealestate" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-blue-500 transition">
                  <Facebook className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500 mt-12">© 2025 Peem Real Estate. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}