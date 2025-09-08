"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Menu, X } from "lucide-react"; // ✅ Add icons for mobile menu
import {
  Github,
  Linkedin,
  MapPin,
  Mail,
  Phone,
  Facebook,
  Monitor,
  Smartphone,
  Figma,
} from "lucide-react";

// Add global declaration for window.emailjs
declare global {
  interface Window {
    emailjs: typeof emailjs;
  }
}

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [emailJsLoaded, setEmailJsLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // ✅ New state for mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Modal state for certifications
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [modalImageAlt, setModalImageAlt] = useState("");

  const openModal = (src: string, alt: string) => {
    setModalImageSrc(src);
    setModalImageAlt(alt);
    setModalOpen(true);
  };

  const closeModal = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
      setModalImageSrc("");
      setModalImageAlt("");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => setEmailJsLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!emailJsLoaded) {
      console.error("EmailJS library not loaded.");
      setStatus("error");
      return;
    }

    setStatus("sending");

    const serviceId = "service_hj82tib"; // Replace
    const templateId = "template_zr0el5e"; // Replace
    const publicKey = "pOYADk-qDd95pCXyI"; // Replace

    window.emailjs.send(serviceId, templateId, formData, publicKey).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      },
      (error) => {
        console.log("FAILED...", error);
        setStatus("error");
      }
    );
  };

  function renderTerminalOutput(): React.ReactNode {
    const steps = [
      {
        title: "Initial Consultation",
        output: [
          "👋 Welcome! Let's discuss your project goals, requirements, and vision.",
          "✔️ Understanding your needs and expectations.",
        ],
      },
      {
        title: "Prototyping & Design",
        output: [
          "📝 Creating wireframes and design prototypes.",
          "🎨 Collaborating on UI/UX decisions.",
        ],
      },
      {
        title: "Development",
        output: [
          "💻 Coding the application using chosen technologies.",
          "🔄 Regular updates and feedback loops.",
        ],
      },
      {
        title: "Testing & Quality Assurance",
        output: [
          "🧪 Running tests to ensure reliability and performance.",
          "✅ Fixing bugs and polishing features.",
        ],
      },
      {
        title: "Deployment",
        output: [
          "🚀 Deploying the application to production.",
          "🌐 Setting up hosting and domain.",
        ],
      },
      {
        title: "Review & Finalization",
        output: [
          "🔍 Final review and walkthrough.",
          "📦 Delivering the finished product.",
        ],
      },
      {
        title: "Ongoing Support",
        output: [
          "🔧 Providing maintenance and support.",
          "📈 Helping with future updates and improvements.",
        ],
      },
    ];

    const step = steps[activeStep - 1];
    return (
      <>
        <span className="text-yellow-400">$ {step.title}</span>
        {step.output.map((line, idx) => (
          <div key={idx} className="pl-4">{line}</div>
        ))}
      </>
    );
  }
  return (
    <main className="bg-gray-900 text-white min-h-screen">
      {/* ✅ Responsive Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <h1 className="font-bold text-xl text-yellow-400">KT</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="hover:text-yellow-400 transition-colors">
              About Me
            </a>
            <a href="#services" className="hover:text-yellow-400 transition-colors">
              Services
            </a>
            <a href="#skills" className="hover:text-yellow-400 transition-colors">
              Skills & Technologies
            </a>
            <a
              href="#experience"
              className="hover:text-yellow-400 transition-colors"
            >
              Experience
            </a>
            <a href="#projects" className="hover:text-yellow-400 transition-colors">
              Projects
            </a>
            <a
              href="#certifications"
              className="hover:text-yellow-400 transition-colors"
            >
              Certifications
            </a>
            <a href="#contact" className="hover:text-yellow-400 transition-colors">
              Contact
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-gray-800 px-6 py-4 space-y-4">
            <a href="#about" className="block hover:text-yellow-400 transition-colors">
              About Me
            </a>
            <a href="#services" className="block hover:text-yellow-400 transition-colors">
              Services
            </a>
            <a href="#skills" className="block hover:text-yellow-400 transition-colors">
              Skills & Technologies
            </a>
            <a href="#experience" className="block hover:text-yellow-400 transition-colors">
              Experience
            </a>
            <a href="#projects" className="block hover:text-yellow-400 transition-colors">
              Projects
            </a>
            <a
              href="#certifications"
              className="block hover:text-yellow-400 transition-colors"
            >
              Certifications
            </a>
            <a href="#contact" className="block hover:text-yellow-400 transition-colors">
              Contact
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-20 pt-32 pb-20 max-w-7xl mx-auto">
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-light">
              Hi, I'm <span className="text-yellow-400 font-medium">Ken Tuei</span>
            </h1>
            <p className="text-xl text-gray-300">
              I hold a degree in{" "}
              <span className="text-yellow-400">Software Engineering</span> and
              I'm passionate about{" "}
              <span className="text-yellow-400">Software Development</span>,{" "}
              <span className="text-yellow-400">Cloud Computing</span>, and{" "}
              <span className="text-yellow-400">Web Technologies</span>.
            </p>
            <p className="text-lg text-gray-300">
              I'm also a{" "}
              <span className="text-yellow-400">
                certified IBM Cloud Practitioner
              </span>
              .
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-3 border-2 border-yellow-400 text-yellow-400 rounded hover:bg-yellow-400 hover:text-gray-900 transition-colors">
              View Projects
            </button>
            <a
              href="https://macro.com/app/pdf/230ff6b9-e298-4bfa-ad83-30c071cbad36?pdf_page_number=1&pdf_page_y=0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-gray-600 text-gray-300 rounded hover:bg-gray-800 transition-colors inline-block text-center"
            >
              View Resume
            </a>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col items-center gap-8">
          <div className="relative">
            <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-gray-700">
              <img
                src="/profile.jpg"
                alt="Ken Tuei"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const img = e.target as HTMLImageElement
                  img.style.display = 'none';
                  (img.nextElementSibling as HTMLElement).style.display = 'flex';
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center" style={{display: 'none'}}>
                <span className="text-6xl font-bold text-white">KT</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-light tracking-wider text-gray-300 mb-2">KEN TUEI</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-4"></div>
            <p className="text-xl text-gray-400">Full Stack Web Developer</p>
            <div className="flex gap-4 mt-6 justify-center">
              <a href="https://github.com/KenTuei" className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors group">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/ken-kipkirui-tuei-2965271b8" className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors group">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light mb-6">
            About <span className="text-yellow-400">Me</span>
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-gray-700 mx-auto">
              <img
                src="/profile.jpg"
                alt="Ken Tuei"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                  (img.nextElementSibling as HTMLElement).style.display = 'flex';
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center" style={{display: 'none'}}>
                <span className="text-4xl font-bold text-white">KT</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              Hello! I'm Ken - a <span className="text-yellow-400">Full-Stack Web Developer</span> and{' '}
              <span className="text-yellow-400">IT Professional</span> passionate about building functional and visually appealing web applications. I specialize in integrating modern web technologies to create data-driven solutions.
            </p>
            <p>
              Proficient in <span className="text-yellow-400">JavaScript (React.js, Angular)</span>,{' '}
              <span className="text-yellow-400">Python (Flask)</span>, <span className="text-yellow-400">SQL</span>, and cloud technologies. I also work with tools like modern frameworks and development best practices.
            </p>
            <p>
              I'm a <span className="text-yellow-400">certified IBM Cloud Practitioner</span> and currently open to exciting new opportunities - feel free to reach out!
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-6">
            My <span className="text-yellow-400">Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-gray-700 rounded-full">
              <Monitor className="w-10 h-10 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-yellow-400">Web Development</h3>
            <p className="text-gray-400">I build responsive and high-performance websites and web applications using modern technologies.</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-gray-700 rounded-full">
              <Smartphone className="w-10 h-10 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-yellow-400">Mobile App Development</h3>
            <p className="text-gray-400">I create cross-platform mobile applications that work seamlessly on both iOS and Android devices.</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-gray-700 rounded-full">
              <Figma className="w-10 h-10 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-yellow-400">Full-Stack Development</h3>
            <p className="text-gray-400">I build comprehensive, end-to-end web applications, handling both the front-end user interface and the back-end server logic and databases.</p>
          </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section id="work-process" className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-6">
            My <span className="text-yellow-400">Work Process</span>
          </h2>
        </div>

        <div className="flex flex-col gap-8">
            <div className="flex flex-wrap justify-between items-center gap-4">
                {/* Dynamically render step tabs */}
                {[
                  "Initial Consultation",
                  "Prototyping & Design",
                  "Development",
                  "Testing & Quality Assurance",
                  "Deployment",
                  "Review & Finalization",
                  "Ongoing Support",
                ].map((step, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveStep(index + 1)}
                      className={`flex-1 min-w-[80px] sm:min-w-[100px] text-center cursor-pointer transition-transform duration-200 ${
                        activeStep === index + 1 ? 'scale-105' : ''
                      }`}
                    >
                        <div
                          className={`rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-1 text-lg font-bold ${
                            activeStep === index + 1
                                ? "bg-yellow-400 text-gray-900"
                                : "bg-gray-700 text-gray-300"
                          }`}
                        >
                            {index + 1}
                        </div>
                        <h3 className="text-sm font-medium">{step}</h3>
                    </div>
                ))}
            </div>
          
            {/* Terminal Output */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 font-mono text-sm leading-relaxed">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-2">
                <p className="text-white font-semibold">
                  user@kentuei:~$
                </p>
                {renderTerminalOutput()}
              </div>
            </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-6">
            Skills & <span className="text-yellow-400">Technologies</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Languages */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <h3 className="text-2xl font-semibold mb-6 text-yellow-400">Languages</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center relative">
                  <div className="text-white font-bold text-lg">5</div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-400 rounded-sm flex items-center justify-center">
                    <div className="text-white text-xs font-bold">H</div>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-lg">HTML5</span>
                  <p className="text-sm text-gray-400">Markup Language</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <div className="text-black font-bold text-2xl">JS</div>
                </div>
                <div>
                  <span className="font-medium text-lg">JavaScript</span>
                  <p className="text-sm text-gray-400">Programming Language</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-yellow-400 rounded-lg flex items-center justify-center">
                  <div className="text-white font-bold text-xl">Py</div>
                </div>
                <div>
                  <span className="font-medium text-lg">Python</span>
                  <p className="text-sm text-gray-400">Programming Language</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <div className="text-white font-bold text-lg">SQL</div>
                </div>
                <div>
                  <span className="font-medium text-lg">SQL</span>
                  <p className="text-sm text-gray-400">Database Language</p>
                </div>
              </div>
            </div>
          </div>

          {/* Frameworks & Libraries */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <h3 className="text-2xl font-semibold mb-6 text-yellow-400">Frameworks & Libraries</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center border-2 border-white">
                  <div className="text-white font-bold text-lg">FL</div>
                </div>
                <div>
                  <span className="font-medium text-lg">Flask</span>
                  <p className="text-sm text-gray-400">Python Web Framework</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <div className="text-white font-bold text-lg">R</div>
                </div>
                <div>
                  <span className="font-medium text-lg">React</span>
                  <p className="text-sm text-gray-400">JavaScript Library</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                  <div className="text-white font-bold text-lg">SA</div>
                </div>
                <div>
                  <span className="font-medium text-lg">SQLAlchemy</span>
                  <p className="text-sm text-gray-400">Python SQL Toolkit</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                  <div className="text-white font-bold text-lg">A</div>
                </div>
                <div>
                  <span className="font-medium text-lg">Angular</span>
                  <p className="text-sm text-gray-400">TypeScript Framework</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <h3 className="text-2xl font-semibold mb-6 text-yellow-400">Tools & Technologies</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                  <div className="text-white font-bold text-lg">Git</div>
                </div>
                <div>
                  <span className="font-medium text-lg">Git</span>
                  <p className="text-sm text-gray-400">Version Control</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <div className="text-white font-bold text-lg">TW</div>
                </div>
                <div>
                  <span className="font-medium text-lg">Tailwind CSS</span>
                  <p className="text-sm text-gray-400">CSS Framework</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <div className="text-white font-bold text-lg">IBM</div>
                </div>
                <div>
                  <span className="font-medium text-lg">IBM</span>
                  <p className="text-sm text-gray-400">Cloud Platform</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <div className="text-white font-bold text-lg">CSS</div>
                </div>
                <div>
                  <span className="font-medium text-lg">CSS3</span>
                  <p className="text-sm text-gray-400">Styling Language</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-6">
            Professional <span className="text-yellow-400">Experience</span>
          </h2>
        </div>

        <div className="space-y-12">
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-semibold text-yellow-400">Freelance Web Developer</h3>
                <p className="text-lg text-gray-400">Nairobi, Kenya</p>
              </div>
              <span className="text-gray-400">Feb 2024 - Dec 2024</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Worked on various client projects, building and maintaining web applications tailored to client requirements</li>
              <li>Developed responsive user interfaces using React and Tailwind CSS</li>
              <li>Ensured timely delivery of features while maintaining code quality and usability standards</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-semibold text-yellow-400">IT Attaché</h3>
                <p className="text-lg text-gray-400">National Health Insurance Fund (NHIF)</p>
              </div>
              <span className="text-gray-400">Jan 2024 - Dec 2024</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Assisted in troubleshooting and resolving hardware, software, and network issues across NHIF offices</li>
              <li>Participated in collecting, cleaning, and organizing healthcare data for analysis and reporting</li>
              <li>Assisted in generating periodic reports</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-semibold text-yellow-400">Guest & Staff</h3>
                <p className="text-lg text-gray-400">Ministry of Education (Kenya Music Festival)</p>
              </div>
              <span className="text-gray-400">2023 - 2024</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Attended the 97th Kenya Music Festival (National Level) and contributed to activities celebrating music, arts, and culture</li>
              <li>Participated in the 2nd Kenya Music Festival International Conference, engaging with stakeholders on the role of creative industries in sustainable development</li>
              <li>Awarded a Certificate of Appreciation and a Certificate of Participation for active involvement and contribution</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
<section id="projects" className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
  <div className="text-center mb-16">
    <h2 className="text-4xl font-light mb-6">
      Featured <span className="text-yellow-400">Projects</span>
    </h2>
  </div>
  
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Moringa School Marketplace */}
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20 group">
      <div className="relative overflow-hidden">
        <img
          src="https://i.ibb.co/LzgD1LTm/cyber-monday-shopping-sales.jpg"
          alt="Moringa School Marketplace"
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full">Full Stack</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-yellow-400">Moringa School Marketplace</h3>
        <p className="text-gray-300 mb-4 text-sm leading-relaxed">
          A web-based platform designed to help Moringa School students showcase, sell, and monetize their final capstone projects. Features secure authentication, project listings with search filters, admin approval panel, and M-Pesa integration.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-cyan-600 text-white text-xs rounded">React</span>
          <span className="px-2 py-1 bg-teal-600 text-white text-xs rounded">Tailwind CSS</span>
          <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Python Flask</span>
          <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">M-Pesa API</span>
        </div>
        <div className="flex gap-3">
          <a 
            href="https://github.com/Dean14692-prog/Moringa-Marketplace" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition-colors"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4"><path fillRule="evenodd" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.809 1.305 3.493.998.108-.778.418-1.305.762-1.606-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.465-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.652 1.652.241 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.61.802.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" clipRule="evenodd"></path></svg>
            GitHub
          </a>
          <a
            href="YOUR_LIVE_DEMO_LINK_HERE" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 font-semibold text-sm rounded hover:bg-yellow-500 transition-colors"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-2.5-4c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z"></path></svg>
            Live Demo
          </a>
        </div>
      </div>
    </div>

    {/* Coffee Shop OOP Model */}
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20 group">
      <div className="relative overflow-hidden">
        <img
          src="https://i.ibb.co/8nKF0Jhk/COFEE.jpg"
          alt="Coffee Shop OOP Model"
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">Python OOP</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-yellow-400">Coffee Shop OOP Model</h3>
        <p className="text-gray-300 mb-4 text-sm leading-relaxed">A Python-based object-oriented model for a coffee shop, designed to demonstrate object-oriented programming principles.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded">Python</span>
          <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">OOP</span>
        </div>
        <div className="flex gap-3">
          <a 
            href="https://github.com/KenTuei/Coffee_Shop" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition-colors"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4"><path fillRule="evenodd" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.809 1.305 3.493.998.108-.778.418-1.305.762-1.606-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.465-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.652 1.652.241 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.61.802.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" clipRule="evenodd"></path></svg>
            GitHub
          </a>
          <a
            href="YOUR_LIVE_DEMO_LINK_HERE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 font-semibold text-sm rounded hover:bg-yellow-500 transition-colors"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-2.5-4c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z"></path></svg>
            Live Demo
          </a>
        </div>
      </div>
    </div>

    {/* Vivid Cosmetics */}
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20 group">
      <div className="relative overflow-hidden">
        <img
          src="https://i.ibb.co/q3DVd6nR/VIVID.jpg"
          alt="ECOM API"
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full">Backend API</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-yellow-400">Vivid Cosmetics</h3>
        <p className="text-gray-300 mb-4 text-sm leading-relaxed">
          A JavaScript-based frontend project for an online makeup store tailored for women. Designed a modern, responsive UI for product browsing and shopping. Implemented a simulated e-commerce experience with product listings and cart functionality. Focused on enhancing user experience with dynamic interactions.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Python Flask</span>
          <span className="px-2 py-1 bg-red-800 text-white text-xs rounded">SQLAlchemy</span>
          <span className="px-2 py-1 bg-gray-600 text-white text-xs rounded">SQLite</span>
          <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded">REST API</span>
        </div>
        <div className="flex gap-3">
          <a 
            href="https://github.com/KenTuei/Vivid-Vibe-Cosmetics" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition-colors"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4"><path fillRule="evenodd" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.809 1.305 3.493.998.108-.778.418-1.305.762-1.606-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.465-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.652 1.652.241 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.61.802.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" clipRule="evenodd"></path></svg>
            GitHub
          </a>
          <a
            href="YOUR_LIVE_DEMO_LINK_HERE" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 font-semibold text-sm rounded hover:bg-yellow-500 transition-colors"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-2.5-4c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z"></path></svg>
            Live Demo
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

       {/* Certifications Section */}
      <section id="certifications" className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-6">
            <span className="text-yellow-400">Certifications</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* IBM Certificate */}
          <div
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20 group cursor-pointer"
            onClick={() =>
              openModal(
                "/aws-cloud-practitioner.jpg",
                "IBM Certified Cloud Practitioner"
              )
            }
          >
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src="/aws-cloud-practitioner.jpg"
                alt="IBM Certified Cloud Practitioner"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = "none";
                  if (img.nextElementSibling) {
                    (img.nextElementSibling as HTMLElement).style.display = "flex";
                  }
                }}
              />
              <div
                className="w-full h-48 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg"
                style={{ display: "none" }}
              >
                IBM Certificate
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-yellow-400">
              IBM Certified Cloud Practitioner
            </h3>
            <p className="text-sm text-gray-400 mb-2">Amazon Web Services</p>
            <p className="text-xs text-gray-500">Issued: November 2024</p>
          </div>

          {/* Moringa School Certificate */}
          <div
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20 group cursor-pointer"
            onClick={() =>
              openModal(
                "/moringa-software-engineering.jpeg",
                "Software Engineering Certificate - Moringa School"
              )
            }
          >
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src="/moringa-software-engineering.jpeg"
                alt="Software Engineering Certificate - Moringa School"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = "none";
                  if (img.nextElementSibling) {
                    (img.nextElementSibling as HTMLElement).style.display = "flex";
                  }
                }}
              />
              <div
                className="w-full h-48 bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white font-bold text-lg"
                style={{ display: "none" }}
              >
                Moringa Certificate
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-yellow-400">
              Software Engineering Certificate
            </h3>
            <p className="text-sm text-gray-400 mb-2">Moringa School</p>
            <p className="text-xs text-gray-500">Issued: August 2024</p>
          </div>

          {/* Certificate of Appreciation */}
          <div
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20 group cursor-pointer"
            onClick={() =>
              openModal(
                "/kenya-music-festival-appreciation.jpeg",
                "Certificate of Appreciation - Kenya Music Festival"
              )
            }
          >
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src="/kenya-music-festival-appreciation.jpeg"
                alt="Certificate of Appreciation - Kenya Music Festival"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = "none";
                  if (img.nextElementSibling) {
                    (img.nextElementSibling as HTMLElement).style.display = "flex";
                  }
                }}
              />
              <div
                className="w-full h-48 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-lg"
                style={{ display: "none" }}
              >
                Appreciation Certificate
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-yellow-400">
              Certificate of Appreciation
            </h3>
            <p className="text-sm text-gray-400 mb-2">
              Ministry of Education - Kenya
            </p>
            <p className="text-xs text-gray-500">
              97th Kenya Music Festival (National Level)
            </p>
          </div>

          {/* Certificate of Participation */}
          <div
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20 group cursor-pointer"
            onClick={() =>
              openModal(
                "/kenya-music-festival-participation.jpeg",
                "Certificate of Participation - Kenya Music Festival Conference"
              )
            }
          >
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src="/kenya-music-festival-participation.jpeg"
                alt="Certificate of Participation - Kenya Music Festival Conference"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = "none";
                  if (img.nextElementSibling) {
                    (img.nextElementSibling as HTMLElement).style.display = "flex";
                  }
                }}
              />
              <div
                className="w-full h-48 bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white font-bold text-lg"
                style={{ display: "none" }}
              >
                Participation Certificate
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-yellow-400">
              Certificate of Participation
            </h3>
            <p className="text-sm text-gray-400 mb-2">Kenya Music Festival</p>
            <p className="text-xs text-gray-500">2nd International Conference</p>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-6">
            Get <span className="text-yellow-400">In Touch</span>
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Details */}
          <div className="lg:w-1/3 space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-yellow-400">Location</h4>
                <p className="text-gray-400">Nairobi, Kenya</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-yellow-400">Email</h4>
                <p className="text-gray-400">kentuei05@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-yellow-400">Phone</h4>
                <p className="text-gray-400">+254115728094</p>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="https://github.com/KenTuei" className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors group">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/ken-kipkirui-tuei-2965271b8" className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors group">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/ken.tuei.whittle?mibextid=wwXIfr&rdid=4ydSz1mdGnQlitUl&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CFRPuZQyo%2F%3Fmibextid%3DwwXIfr" className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors group">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
          {/* Contact Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-3 bg-gray-900 border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-3 bg-gray-900 border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 bg-gray-900 border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 bg-gray-900 border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 text-gray-900 font-semibold bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              {status === "success" && (
                <p className="mt-4 text-green-500 text-center">Message sent successfully!</p>
              )}
              {status === "error" && (
                <p className="mt-4 text-red-500 text-center">Good Thankyou</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 px-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Ken Tuei. All Rights Reserved.</p>
      </footer>
      
      {/* Certification Modal */}
      {modalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4" 
          onClick={closeModal}
        >
          <div className="relative max-w-2xl max-h-[90vh] rounded-lg overflow-hidden">
            <img 
              src={modalImageSrc} 
              alt={modalImageAlt} 
              className="w-full h-auto" 
            />
            <button 
              className="absolute top-4 right-4 text-white text-3xl font-bold p-2 leading-none" 
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
