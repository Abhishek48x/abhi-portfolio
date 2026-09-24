import React, { useState } from "react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});

function createParticleBurst(x, y) {

  const ring = document.createElement("span");

ring.className = "click-ring";
ring.style.left = `${x}px`;
ring.style.top = `${y}px`;

document.body.appendChild(ring);

setTimeout(() => {
  ring.remove();
}, 500);

  const colors = ["#ffffff", "#a78bfa", "#38bdf8"];

  for (let i = 0; i < 18; i++) {
    const particle = document.createElement("span");

    particle.className = "click-particle";

    const angle = Math.random() * Math.PI * 2;
    const distance = 35 + Math.random() * 55;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
    particle.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 650);
  }
}

function createCursorGlow(x, y) {
  const glow = document.createElement("span");

  glow.className = "cursor-glow";
  glow.style.left = `${x}px`;
  glow.style.top = `${y}px`;

  document.body.appendChild(glow);

  setTimeout(() => {
    glow.remove();
  }, 350);
}

React.useEffect(() => {
  const handleClick = (event) => {
    createParticleBurst(event.clientX, event.clientY);
  };

  document.addEventListener("click", handleClick);

  return () => {
    document.removeEventListener("click", handleClick);
  };
}, []);

React.useEffect(() => {
  let glowTimer = null;
  let lastX = 0;
  let lastY = 0;

  const handleMove = (event) => {
    const distance = Math.hypot(
      event.clientX - lastX,
      event.clientY - lastY
    );

    if (distance < 12) return;

    lastX = event.clientX;
    lastY = event.clientY;

    if (glowTimer) return;

    glowTimer = requestAnimationFrame(() => {
      createCursorGlow(event.clientX, event.clientY);
      glowTimer = null;
    });
  };

  const handleTouch = (event) => {
    const touch = event.touches[0];

    if (touch) {
      createCursorGlow(touch.clientX, touch.clientY);
    }
  };

  document.addEventListener("mousemove", handleMove);
  document.addEventListener("touchmove", handleTouch, {
    passive: true,
  });

  return () => {
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("touchmove", handleTouch);

    if (glowTimer) {
      cancelAnimationFrame(glowTimer);
    }
  };
}, []);

React.useEffect(() => {
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}, []);
  
  return (
    <div className="app">
      {/* Navbar */}
      <header className="navbar">
  <a href="#home" className="logo">
    ABHI<span>.</span>
  </a>

  <nav className="nav-links">
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#skills">Skills</a>
    <a href="#projects">Projects</a>
    <a href="#work">Work</a>
    <a href="#contact">Contact</a>
  </nav>

  <a href="#contact" className="nav-button">
    Let's Talk
  </a>

  <button
  className={`mobile-menu-button ${menuOpen ? "active" : ""}`}
  onClick={() => setMenuOpen(!menuOpen)}
  aria-label={menuOpen ? "Close menu" : "Open menu"}
  aria-expanded={menuOpen}
>
  <span></span>
  <span></span>
</button>
</header>

{menuOpen && (
  <div className="mobile-menu">
    <a href="#home" onClick={() => setMenuOpen(false)}>
      Home
    </a>

    <a href="#about" onClick={() => setMenuOpen(false)}>
      About
    </a>

    <a href="#skills" onClick={() => setMenuOpen(false)}>
      Skills
    </a>

    <a href="#projects" onClick={() => setMenuOpen(false)}>
      Projects
    </a>

    <a href="#work" onClick={() => setMenuOpen(false)}>
      Work
    </a>

    <a href="#contact" onClick={() => setMenuOpen(false)}>
      Contact
    </a>
  </div>
)}

      {/* Hero */}
       <main>

<section id="home" className="hero">
  <div className="hero-content">

    <div className="hero-status">
      <span className="status-dot"></span>
      Available for new projects
    </div>

    <p className="hero-label">
      SOFTWARE DESIGNER • DEVELOPER • VIDEO EDITOR
    </p>

    <h1>
      I turn ideas into
      <span> digital reality.</span>
    </h1>

    <p className="hero-description">
      I'm ABHI — a software designer, developer and professional video
      editor focused on creating modern digital products, powerful web
      experiences and high-quality visual content.
    </p>

    <div className="hero-buttons">
      <a href="#projects" className="primary-button">
        Explore My Work
        <span>↗</span>
      </a>

      <a href="#contact" className="secondary-button">
        Let's Work Together
      </a>
    </div>

    <div className="hero-socials">
      <a
  href="https://github.com/Abhishek48x"
  target="_blank"
  rel="noreferrer"
  aria-label="GitHub"
>
  GitHub
</a>

      <a href="#" aria-label="LinkedIn">
        LinkedIn
      </a>

      <a
  href="https://www.instagram.com/Abhishek48z/"
  target="_blank"
  rel="noreferrer"
  aria-label="Instagram"
>
  Instagram
</a>
    
    </div>

  </div>

  <div className="hero-card">

    <div className="hero-orbit orbit-one"></div>
    <div className="hero-orbit orbit-two"></div>

    <div className="hero-card-center">
  <div className="hero-initial">A</div>

  <div className="hero-badge">
    <span></span>
    CREATIVE BUILDER
  </div>
</div>

    <div className="hero-card-content">
      <span>FOCUS</span>

      <h3>
        Design.
        <br />
        Code.
        <br />
        Create.
      </h3>

      <p>
        Building digital experiences with technology and creativity.
      </p>
    </div>

  </div>
</section>

        {/* About */}
<section
  id="about"
  className={`section about-section ${
    visibleSections.about ? "section-visible" : ""
  }`}
>
  <div className="about-heading">
    <p className="section-label">01 — ABOUT ME</p>

    <h2>
      I build.
      <br />
      I design.
      <br />
      I create.
    </h2>
  </div>

  <div className="about-content">
    <p className="about-intro">
      I'm ABHI, a software designer, developer and professional video
      editor who enjoys turning ideas into complete digital experiences.
    </p>

    <p className="section-text">
      My work sits at the intersection of technology, design and creativity.
      I can take an idea from concept and interface design to development,
      visual content and the final polished product.
    </p>

    <div className="about-stats">
      <div className="stat">
        <strong>01</strong>
        <span>Software Design</span>
      </div>

      <div className="stat">
        <strong>02</strong>
        <span>Web Development</span>
      </div>

      <div className="stat">
        <strong>03</strong>
        <span>Video Editing</span>
      </div>

      <div className="stat">
        <strong>04</strong>
        <span>Creative Technology</span>
      </div>
    </div>
  </div>
</section>

        {/* Skills */}
<section
  id="skills"
  className={`section skills-section ${
    visibleSections.skills ? "section-visible" : ""
  }`}
>
  <div className="skills-header">
    <div>
      <p className="section-label">02 — SKILLS & EXPERTISE</p>

      <h2>
        Tools I use to
        <span> bring ideas to life.</span>
      </h2>
    </div>

    <p className="skills-description">
      A mix of development, software design and creative production that
      lets me work across the complete digital workflow.
    </p>
  </div>

  <div className="skills-list">

    <div className="skill-row">
      <div className="skill-number">01</div>

      <div className="skill-main">
        <h3>Software & Web Development</h3>

        <p>
          Building modern websites, web applications and complete digital
          products with clean architecture and responsive interfaces.
        </p>

        <div className="skill-tags">
          <span>JavaScript</span>
          <span>React</span>
          <span>HTML</span>
          <span>CSS</span>
          <span>Supabase</span>
          <span>GitHub</span>
        </div>
      </div>

      <div className="skill-arrow">↗</div>
    </div>


    <div className="skill-row">
      <div className="skill-number">02</div>

      <div className="skill-main">
        <h3>Software & UI Design</h3>

        <p>
          Designing interfaces and digital experiences with a focus on
          usability, visual hierarchy and modern interaction.
        </p>

        <div className="skill-tags">
          <span>UI Design</span>
          <span>UX</span>
          <span>Responsive Design</span>
          <span>Prototyping</span>
        </div>
      </div>

      <div className="skill-arrow">↗</div>
    </div>


    <div className="skill-row">
      <div className="skill-number">03</div>

      <div className="skill-main">
        <h3>Professional Video Editing</h3>

        <p>
          Creating polished video content with strong pacing, transitions,
          visual storytelling, sound design and attention to detail.
        </p>

        <div className="skill-tags">
          <span>Video Editing</span>
          <span>Motion</span>
          <span>Color</span>
          <span>Storytelling</span>
        </div>
      </div>

      <div className="skill-arrow">↗</div>
    </div>


    <div className="skill-row">
      <div className="skill-number">04</div>

      <div className="skill-main">
        <h3>Creative Technology</h3>

        <p>
          Combining code, design and creativity to experiment with games,
          interactive experiences, automation and new digital ideas.
        </p>

        <div className="skill-tags">
          <span>Creative Coding</span>
          <span>Interactive</span>
          <span>Automation</span>
          <span>Digital Products</span>
        </div>
      </div>

      <div className="skill-arrow">↗</div>
    </div>

  </div>
</section>

        {/* Projects */}
        <section
  id="projects"
  className={`section projects-section ${
    visibleSections.projects ? "section-visible" : ""
  }`}
>
  <div className="projects-header">
    <div>
      <p className="section-label">03 — SELECTED PROJECTS</p>

      <h2>
        Things I've
        <span> built.</span>
      </h2>
    </div>

    <p className="projects-description">
      A selection of software, web applications and digital products
      created from concept to implementation.
    </p>
  </div>

  <div className="projects-showcase">

    {/* Project 01 */}
    <article className="project-item project-featured">
      <div className="project-visual nexa-visual">
        <div className="project-window">
          <div className="window-bar">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="nexa-screen">
            <div className="nexa-logo">NEXA</div>

            <div className="nexa-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div className="visual-glow"></div>
      </div>

      <div className="project-info">
        <div className="project-meta">
  <span>01</span>
  <span>WEB APPLICATION</span>

  <span className="project-status status-development">
    <span></span>
    IN DEVELOPMENT
  </span>
</div>

        <h3>Nexa</h3>

        <p>
          A modern social platform designed and developed with a focus on
          user experience, interaction and scalable web architecture.
        </p>

        <div className="project-tech">
          <span>React</span>
          <span>JavaScript</span>
          <span>Supabase</span>
          <span>UI/UX</span>
        </div>

        <div className="project-action project-development-action">
  Currently in Development
  <span>●</span>
</div>
      </div>
    </article>


    {/* Project 02 */}
    <article className="project-item reverse">
      <div className="project-visual abhi-visual">
        <div className="project-interface">
          <div className="interface-header">
            <strong>ABHI EDITZ</strong>
            <span>CLIENT DASHBOARD</span>
          </div>

          <div className="interface-content">
            <div className="interface-sidebar"></div>

            <div className="interface-main">
              <div className="interface-card large"></div>

              <div className="interface-row">
                <div className="interface-card"></div>
                <div className="interface-card"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="visual-glow"></div>
      </div>

      <div className="project-info">
        <div className="project-meta">
  <span>02</span>
  <span>SOFTWARE PLATFORM</span>

  <span className="project-status status-live">
    <span></span>
    LIVE
  </span>
</div>

        <h3>ABHI EDITZ</h3>

        <p>
          A client-focused video editing platform built around project
          submissions, file delivery, revisions, notifications and
          communication.
        </p>

        <div className="project-tech">
          <span>React</span>
          <span>Supabase</span>
          <span>Authentication</span>
          <span>Storage</span>
        </div>

        <a
  href="https://abhi-editz.vercel.app"
  target="_blank"
  rel="noreferrer"
  className="project-action"
>
  View Project <span>↗</span>
</a>
      </div>
    </article>


    {/* Project 03 */}
<article className="project-item">
  <div className="project-visual watch-visual">
    <div className="watch-interface">
      <div className="watch-top">
        <span>MY WATCH</span>
        <span>LIVE</span>
      </div>

      <div className="watch-content">
        <div className="watch-title">
          WATCH
          <br />
          SOMETHING
          <br />
          GREAT.
        </div>

        <div className="watch-line"></div>

        <div className="watch-play">🩷</div>
      </div>
    </div>

    <div className="visual-glow"></div>
  </div>

  <div className="project-info">
    <div className="project-meta">
  <span>03</span>
  <span>WEB PROJECT</span>

  <span className="project-status status-live">
    <span></span>
    LIVE
  </span>
</div>

    <h3>My Watch Site</h3>

    <p>
      A modern web experience built for discovering and watching digital
      content with a clean interface and focused user experience.
    </p>

    <div className="project-tech">
      <span>React</span>
      <span>JavaScript</span>
      <span>Web</span>
      <span>UI/UX</span>
    </div>

    <a
      href="https://my-watch-site.vercel.app/"
      target="_blank"
      rel="noreferrer"
      className="project-action"
    >
      View Project <span>↗</span>
    </a>
  </div>
</article>

  </div>
</section>

        {/* Work */}
<section
  id="work"
  className={`section work-section ${
    visibleSections.work ? "section-visible" : ""
  }`}
>
  <div className="work-header">
    <div>
      <p className="section-label">04 — CREATIVE WORK</p>

      <h2>
        Visuals that
        <span> tell a story.</span>
      </h2>
    </div>

    <p className="work-description">
      Professional video editing focused on pacing, storytelling, motion,
      sound design and visual impact.
    </p>
  </div>

  <div className="video-showcase">
    {/* Featured Video */}
<article className="video-card video-featured">
  <div className="video-preview">
    <video
      className="portfolio-video"
      src="/videos/featured-edit.mp4"
      controls
      preload="metadata"
    />
  </div>

  <div className="video-info">
    <div>
      <span className="video-category">01 / FEATURED EDIT</span>
      <h3>Cinematic Visual Edit</h3>
    </div>

    <span className="video-arrow">↗</span>
  </div>
</article>

    {/* Short Form */}
  
<article className="video-card">
  <div className="video-preview short-video">
    <video
      className="portfolio-video"
      src="/videos/short-form-edit.mp4"
      controls
      preload="metadata"
    />
  </div>

  <div className="video-info">
    <div>
      <span className="video-category">02 / SHORT FORM</span>
      <h3>Social Content</h3>
    </div>

    <span className="video-arrow">↗</span>
  </div>
</article>

    {/* Motion */}
    <article className="video-card">
  <div className="video-preview short-video">
    <video
      className="portfolio-video"
      src="/videos/motion-edit.mp4"
      controls
      preload="metadata"
    />
  </div>

  <div className="video-info">
    <div>
      <span className="video-category">03 / MOTION</span>
      <h3>Motion & Visual Effects</h3>
    </div>

    <span className="video-arrow">↗</span>
  </div>
</article>
  </div>

  <div className="work-bottom">
    <p>
      More edits and creative work can be added here as the portfolio grows.
    </p>

    <a href="#contact">
      Work With Me <span>↗</span>
    </a>
  </div>
</section>

        {/* Contact */}
<section
  id="contact"
  className={`section contact-section ${
    visibleSections.contact ? "section-visible" : ""
  }`}
>
  <div className="contact-top">
    <p className="section-label">05 — CONTACT</p>

    <span className="contact-status">
      <span></span>
      Available for new projects
    </span>
  </div>

  <div className="contact-content">
    <div className="contact-heading">
      <h2>
        Let's build
        <span> something great.</span>
      </h2>

      <p>
        Have a project, idea or collaboration in mind? Tell me about it.
        I’m always interested in building something meaningful.
      </p>
    </div>

    <a href="mailto:Abhishekprajapat851@gmail.com" className="contact-email">
      <span>Abhishekprajapat851@gmail.com</span>
      <span>↗</span>
    </a>
  </div>

  <div className="contact-links">
    <a
  href="https://github.com/Abhishek48x"
  target="_blank"
  rel="noreferrer"
  aria-label="GitHub"
>
  GitHub <span>↗</span>
</a>

    <a href="#" aria-label="LinkedIn">
      LinkedIn <span>↗</span>
    </a>

    <a
  href="https://www.instagram.com/Abhishek48z/"
  target="_blank"
  rel="noreferrer"
  aria-label="Instagram"
>
      Instagram <span>↗</span>
    </a>
  </div>
</section>
      </main>

      <footer className="footer">
  <div className="footer-main">
    <div className="logo">
      ABHI<span>.</span>
    </div>

    <p>
      Software Designer · Developer · Video Editor · Digital Creator
    </p>
  </div>

  <div className="footer-bottom">
    <p>© 2026 ABHI. All rights reserved.</p>

    <a href="#home">
      Back to top <span>↑</span>
    </a>
  </div>
</footer>
    </div>
  );
}

export default App;