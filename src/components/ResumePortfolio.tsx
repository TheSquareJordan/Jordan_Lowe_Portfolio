"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ResumePortfolio.module.css";

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link: string;
};

type Certification = {
  id: string;
  name: string;
  issuer: string;
};

type PortfolioData = {
  projects: Project[];
  certifications: Certification[];
  skills: string[];
};

type AddMode = "project" | "certification" | "skill" | null;
type Theme = "light" | "dark";

const STORAGE_KEY = "jordan-lowe-portfolio-v1";
const THEME_KEY = "jordan-lowe-portfolio-theme";
const PROJECT_SEED_KEY = "jordan-lowe-portfolio-project-seed-v3";
const SKILLS_SEED_KEY = "jordan-lowe-portfolio-skills-seed-v1";
const webSkills = ["HTML", "CSS", "JavaScript", "React"];

const barbershopProject: Project = {
  id: "vintage-barbershop",
  title: "Vintage Barbershop Website",
  description:
    "A classic barbershop website featuring grooming services, an appointment calendar, and a responsive customer experience.",
  technologies: "HTML, CSS, JavaScript",
  link: "/barbershop/index.html",
};

const beansPlaceProject: Project = {
  id: "beans-place",
  title: "The Beans Place Coffee Store",
  description:
    "A premium coffee storefront featuring coffees from around the world, product browsing, and an interactive shopping cart.",
  technologies: "React, Vite, JavaScript",
  link: "/beans-place/index.html",
};

const furnitureProject: Project = {
  id: "era-furniture-landscape",
  title: "ERA Furniture & Landscape",
  description:
    "A responsive outdoor living website showcasing patio furniture, landscape features, and backyard gathering spaces.",
  technologies: "HTML, CSS, JavaScript",
  link: "/furniture/index.html",
};

const initialData: PortfolioData = {
  projects: [barbershopProject, beansPlaceProject, furnitureProject],
  certifications: [
    { id: "security-plus", name: "CompTIA Security+", issuer: "" },
    {
      id: "systems-admin",
      name: "Systems Administration & Security",
      issuer: "Centriq Training",
    },
    {
      id: "information-assurance",
      name: "Information Assurance Certification",
      issuer: "Missouri Army National Guard",
    },
    {
      id: "dsgs-a",
      name: "All Source Intelligence Analyst",
      issuer: "Missouri Army National Guard",
    },
  ],
  skills: [
    "Systems administration",
    "Windows Server",
    "Linux",
    "PowerShell",
    "VMware & virtualization",
    "Active Directory",
    "Network troubleshooting",
    "Patch management",
    "SharePoint",
    "SQL & Oracle databases",
    "ArcGIS & FalconView",
    "Configuration management",
    "Cybersecurity",
    "Knowledge management",
    "Python",
    "Tableau",
    ...webSkills,
  ],
};

const projectArtwork: Record<string, { image: string; alt: string; label: string }> = {
  "vintage-barbershop": {
    image: "/barbershop/assets/images/hero.jpg",
    alt: "Vintage barbershop website preview",
    label: "CRAFT & COMMUNITY",
  },
  "beans-place": {
    image: "/beans-place/assets/Colombian-Supremo-Bag-BbW_6Nqy.png",
    alt: "Coffee product from The Beans Place",
    label: "A BETTER DAILY BREW",
  },
  "era-furniture-landscape": {
    image: "/furniture/image/Outside%20Furniture%20Card2.jpeg",
    alt: "Outdoor patio furniture and garden",
    label: "ROOM TO LIVE OUTSIDE",
  },
};

const experience = [
  {
    role: "Systems Administrator",
    company: "Puyenpa LLC",
    dates: "Dec 2022 — Present",
    description:
      "Keep systems, servers, and virtual environments reliable, secure, and ready for the people who depend on them.",
    highlights: [
      "Lead desktop and helpdesk support while resolving hardware, software, and infrastructure issues.",
      "Maintain virtual servers, automation, backups, and disaster-recovery processes.",
      "Manage system administration, contractor access, and helpdesk knowledge resources.",
    ],
  },
  {
    role: "Knowledge Manager",
    company: "S2 Analytical",
    dates: "May 2022 — Oct 2022",
    description:
      "Connected teams, tools, and institutional knowledge across collaborative IT projects.",
    highlights: [
      "Created SharePoint and Microsoft Teams resources and documented repeatable procedures.",
      "Supported Azure, Active Directory, Intel Share, and stakeholder collaboration.",
      "Led project meetings and demonstrations; contributed to business analysis with Tableau.",
    ],
  },
  {
    role: "Configuration Manager",
    company: "Vectrus",
    dates: "Aug 2021 — May 2022",
    description:
      "Supported application configuration, data integration, and infrastructure change efforts.",
    highlights: [
      "Coordinated configuration and migration testing across production and development environments.",
      "Supported patching, virtualization, application updates, and stakeholder planning.",
      "Mapped network architecture and assisted development teams through the SDLC.",
    ],
  },
  {
    role: "Systems Administrator",
    company: "TEKsystems",
    dates: "May 2021 — Aug 2021",
    description:
      "Delivered systems and endpoint support in mission-focused environments.",
    highlights: [
      "Installed, maintained, and troubleshot servers, workstations, and mission-planning equipment.",
      "Supported patching, cloning, hardware refreshes, and client/server implementations.",
      "Coordinated technical improvements with service teams and stakeholders.",
    ],
  },
  {
    role: "Support Services Representative",
    company: "Summit Technologies",
    dates: "May 2020 — May 2021",
    description:
      "Provided hands-on support for mission-critical equipment, applications, and users.",
    highlights: [
      "Used SCCM and PowerShell to support patching, system updates, and endpoint configuration.",
      "Troubleshot network, server, and mission-planning equipment issues.",
      "Worked with Cloud One support staff to diagnose application and deployment issues.",
    ],
  },
  {
    role: "FMV Analyst",
    company: "NGA — TPGS",
    dates: "Feb 2019 — Feb 2020",
    description:
      "Combined geospatial tools, imagery, and data analysis in support of intelligence work.",
    highlights: [
      "Performed near-real-time analysis using ArcGIS, FalconView, and multi-source intelligence.",
      "Updated map data and satellite imagery and supported classified workstation operations.",
      "Queried intelligence data and supported Oracle and MySQL database administration.",
    ],
  },
  {
    role: "Intelligence Analyst (35F20)",
    company: "Missouri Army National Guard",
    dates: "May 2013 — May 2019",
    description:
      "Served as an intelligence analyst, instructor, and soldier in the Missouri Army National Guard.",
    highlights: [
      "Analyzed intelligence data and prepared reporting to support military requirements.",
      "Trained soldiers as a DSGS-A certified instructor and practiced information assurance.",
      "Activated for domestic operations and deployed in an infantry role.",
    ],
  },
];

const education = [
  {
    degree: "B.S. Criminal Justice Administration",
    school: "Park University",
    year: "2017",
  },
  {
    degree: "A.A.S. Intelligence Analysis",
    school: "Cochise College",
    year: "2014",
  },
  {
    degree: "Systems Administration & Security",
    school: "Centriq Training",
    year: "2020",
  },
  {
    degree: "Full Stack Web Development",
    school: "ERA Solutions",
    year: "2026",
  },
];

function isPortfolioData(value: unknown): value is PortfolioData {
  if (!value || typeof value !== "object") return false;
  const data = value as {
    projects?: unknown;
    certifications?: unknown;
    skills?: unknown;
  };

  return (
    Array.isArray(data.projects) &&
    data.projects.every(
      (item) =>
        item &&
        typeof item === "object" &&
        "id" in item &&
        typeof item.id === "string" &&
        "title" in item &&
        typeof item.title === "string" &&
        "description" in item &&
        typeof item.description === "string" &&
        "technologies" in item &&
        typeof item.technologies === "string" &&
        "link" in item &&
        typeof item.link === "string",
    ) &&
    Array.isArray(data.certifications) &&
    data.certifications.every(
      (item) =>
        item &&
        typeof item === "object" &&
        "id" in item &&
        typeof item.id === "string" &&
        "name" in item &&
        typeof item.name === "string" &&
        "issuer" in item &&
        typeof item.issuer === "string",
    ) &&
    Array.isArray(data.skills) &&
    data.skills.every((item) => typeof item === "string")
  );
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function ThemeIcon({ theme }: { theme: Theme }) {
  return theme === "light" ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" />
    </svg>
  );
}

function AddItemDialog({
  mode,
  onClose,
  onAddProject,
  onAddCertification,
  onAddSkill,
}: {
  mode: Exclude<AddMode, null>;
  onClose: () => void;
  onAddProject: (project: Project) => void;
  onAddCertification: (certification: Certification) => void;
  onAddSkill: (skill: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [extra, setExtra] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const labels = {
    project: "Add a project",
    certification: "Add a certification",
    skill: "Add a skill",
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (mode === "project") {
      let safeLink = "";
      if (link.trim()) {
        try {
          const parsed = new URL(link);
          if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
            throw new Error("Unsupported protocol");
          }
          safeLink = parsed.toString();
        } catch {
          setError("Enter a complete web address beginning with https://.");
          return;
        }
      }

      onAddProject({
        id: createId(),
        title: title.trim(),
        description: detail.trim(),
        technologies: extra.trim(),
        link: safeLink,
      });
    } else if (mode === "certification") {
      onAddCertification({
        id: createId(),
        name: title.trim(),
        issuer: detail.trim(),
      });
    } else {
      onAddSkill(title.trim());
    }

    onClose();
  }

  return (
    <div
      className={styles.dialogBackdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="dialog-title"
        aria-modal="true"
        className={styles.dialog}
        role="dialog"
      >
        <div className={styles.dialogHeading}>
          <div>
            <span className={styles.eyebrow}>YOUR PORTFOLIO</span>
            <h2 id="dialog-title">{labels[mode]}</h2>
          </div>
          <button
            aria-label="Close dialog"
            className={styles.closeButton}
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
        <form className={styles.dialogForm} onSubmit={handleSubmit}>
          <label>
            {mode === "project"
              ? "Project name"
              : mode === "certification"
                ? "Certification name"
                : "Skill"}
            <input
              autoFocus
              onChange={(event) => setTitle(event.target.value)}
              placeholder={
                mode === "project"
                  ? "e.g. Home lab dashboard"
                  : mode === "certification"
                    ? "e.g. AWS Certified Cloud Practitioner"
                    : "e.g. Docker"
              }
              required
              value={title}
            />
          </label>
          {mode !== "skill" && (
            <label>
              {mode === "project" ? "What did you build?" : "Issuing organization"}
              {mode === "project" ? (
                <textarea
                  onChange={(event) => setDetail(event.target.value)}
                  placeholder="A short description of the project and its impact"
                  required
                  rows={3}
                  value={detail}
                />
              ) : (
                <input
                  onChange={(event) => setDetail(event.target.value)}
                  placeholder="Optional"
                  value={detail}
                />
              )}
            </label>
          )}
          {mode === "project" && (
            <>
              <label>
                Tools & technologies
                <input
                  onChange={(event) => setExtra(event.target.value)}
                  placeholder="e.g. Python, Docker, AWS"
                  value={extra}
                />
              </label>
              <label>
                Project link
                <input
                  onChange={(event) => setLink(event.target.value)}
                  placeholder="https://"
                  type="url"
                  value={link}
                />
              </label>
            </>
          )}
          {error && (
            <p className={styles.formError} role="alert">
              {error}
            </p>
          )}
          <div className={styles.dialogActions}>
            <button
              className={styles.cancelButton}
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button className={styles.primaryButton} type="submit">
              Save {mode}
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default function ResumePortfolio() {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [theme, setTheme] = useState<Theme>("light");
  const [addMode, setAddMode] = useState<AddMode>(null);
  const [storageReady, setStorageReady] = useState(false);
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add(styles.revealed));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (isPortfolioData(parsed)) {
          const projectWasSeeded =
            window.localStorage.getItem(PROJECT_SEED_KEY) === "true";
          const skillsWereSeeded =
            window.localStorage.getItem(SKILLS_SEED_KEY) === "true";
          setData({
            ...parsed,
            projects:
              projectWasSeeded ||
              (parsed.projects.some((project) => project.id === barbershopProject.id) &&
                parsed.projects.some((project) => project.id === beansPlaceProject.id) &&
                parsed.projects.some((project) => project.id === furnitureProject.id))
                ? parsed.projects
                : [
                    ...[barbershopProject, beansPlaceProject, furnitureProject].filter(
                      (seedProject) =>
                        !parsed.projects.some(
                          (project) => project.id === seedProject.id,
                        ),
                    ),
                    ...parsed.projects,
                  ],
            skills: skillsWereSeeded
              ? parsed.skills
              : Array.from(new Set([...parsed.skills, ...webSkills])),
          });
        }
      }
      window.localStorage.setItem(PROJECT_SEED_KEY, "true");
      window.localStorage.setItem(SKILLS_SEED_KEY, "true");
      const savedTheme = window.localStorage.getItem(THEME_KEY);
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error("Could not load saved portfolio settings.", error);
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Could not save portfolio changes in this browser.", error);
    }
  }, [data, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      console.error("Could not save the selected color theme.", error);
    }
  }, [theme, storageReady]);

  function removeProject(id: string) {
    setData((current) => ({
      ...current,
      projects: current.projects.filter((project) => project.id !== id),
    }));
  }

  function removeCertification(id: string) {
    setData((current) => ({
      ...current,
      certifications: current.certifications.filter((item) => item.id !== id),
    }));
  }

  function removeSkill(skill: string) {
    setData((current) => ({
      ...current,
      skills: current.skills.filter((item) => item !== skill),
    }));
  }

  return (
    <main className={styles.portfolio} data-theme={theme}>
      <div className={styles.grain} aria-hidden="true" />
      <header className={styles.siteHeader}>
        <a aria-label="Jordan Lowe home" className={styles.wordmark} href="#top">
          <span className={styles.mark}>JL</span>
          <span>JORDAN LOWE</span>
        </a>
        <nav aria-label="Main navigation" className={styles.navigation}>
          <a href="#projects">Work</a>
          <a href="#about">About</a>
          <a href="#experience">Journey</a>
          <a href="#credentials">Toolkit</a>
        </nav>
        <button
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          className={styles.themeButton}
          onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
          type="button"
        >
          <ThemeIcon theme={theme} />
          <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
        </button>
      </header>

      <section className={styles.hero} data-reveal id="top">
        <div className={styles.heroCopy}>
          <div className={styles.heroBadges}>
            <div className={styles.availability}>
              <span className={styles.statusDot} />
              IT SYSTEMS • WEB PROJECTS • PEOPLE
            </div>
            <span className={styles.clearanceBadge}>
              <span aria-hidden="true">✦</span>
              TS/SCI WITH CI POLYGRAPH
            </span>
          </div>
          <p className={styles.heroOverline}>VETERAN · BUILDER · PROBLEM SOLVER</p>
          <h1>
            Curious by nature.
            <br />
            <span>Mission-minded.</span>
          </h1>
          <p className={styles.heroDescription}>
            I&apos;m Jordan Lowe. I bring people, ideas, and technology together
            to make useful things work — from dependable systems to creative
            projects built with care.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#projects">
              Explore what I make <span aria-hidden="true">↘</span>
            </a>
            <a className={styles.textLink} href="mailto:lowerise@gmail.com">
              Get in touch <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className={styles.heroFacts}>
            <div>
              <span className={styles.factNumber}>6+</span>
              <span className={styles.factLabel}>years solving problems</span>
            </div>
            <div>
              <span className={styles.factNumber}>{data.projects.length}</span>
              <span className={styles.factLabel}>live projects</span>
            </div>
            <div>
              <span className={styles.factNumber}>1</span>
              <span className={styles.factLabel}>curious mind</span>
            </div>
          </div>
        </div>
        <div aria-label="Jordan Lowe portrait" className={styles.heroArtwork}>
          <div className={styles.artHalo} />
          <div className={styles.artGrid} />
          <div className={styles.artCore}>
            <Image
              alt="Jordan Lowe"
              className={styles.profilePhoto}
              fill
              priority
              sizes="(max-width: 680px) 48vw, 25vw"
              src="/images/jordan-lowe.jpeg"
            />
          </div>
          <div className={`${styles.artNote} ${styles.noteTop}`}>
            <span>01 / APPROACH</span>
            <strong>People first.<br />Mission always.</strong>
          </div>
          <div className={`${styles.artNote} ${styles.noteBottom}`}>
            <span>02 / FOCUS</span>
            <strong>Reliable systems<br />for real-world work.</strong>
          </div>
          <span className={styles.artCoordinate}>38° 37&apos; N&nbsp; / &nbsp;90° 12&apos; W</span>
        </div>
        <a className={styles.scrollCue} href="#about">
          <span /> SCROLL A LITTLE FURTHER
        </a>
      </section>

      <section className={styles.projectsSection} data-reveal id="projects">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.eyebrow}>SELECTED WORK · 01—03</span>
            <h2>Curiosity, made tangible.</h2>
            <p className={styles.projectIntro}>
              Different ideas, different worlds — all made with intention.
            </p>
          </div>
          <button
            className={styles.outlineButton}
            onClick={() => setAddMode("project")}
            type="button"
          >
            <span aria-hidden="true">+</span> Add a project
          </button>
        </div>
        {data.projects.length ? (
          <div className={styles.projectGrid}>
            {data.projects.map((project) => (
              <article className={styles.projectCard} key={project.id}>
                {projectArtwork[project.id] && (
                  <a
                    aria-label={`Open ${project.title}`}
                    className={styles.projectVisual}
                    href={project.link}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Image
                      alt={projectArtwork[project.id].alt}
                      className={styles.projectImage}
                      fill
                      sizes="(max-width: 680px) 90vw, (max-width: 1000px) 45vw, 30vw"
                      src={projectArtwork[project.id].image}
                    />
                    <span className={styles.projectVisualLabel}>
                      {projectArtwork[project.id].label}
                    </span>
                    <span className={styles.projectVisualArrow} aria-hidden="true">
                      ↗
                    </span>
                  </a>
                )}
                <div className={styles.projectCardContent}>
                  <div className={styles.projectCardTop}>
                    <span className={styles.projectSymbol} aria-hidden="true">✳</span>
                    <button
                      aria-label={`Remove ${project.title}`}
                      className={styles.removeButton}
                      onClick={() => removeProject(project.id)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.technologies && (
                    <div className={styles.projectTags}>
                      {project.technologies.split(",").map((technology) => (
                        <span key={technology}>{technology.trim()}</span>
                      ))}
                    </div>
                  )}
                  {project.link && (
                    <a
                      className={styles.projectLink}
                      href={project.link}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Visit the project <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyProjects}>
            <span className={styles.emptyIcon} aria-hidden="true">✳</span>
            <div>
              <h3>Your next project starts here.</h3>
              <p>
                Add a lab, a tool, or a team win. Your projects are saved in this
                browser so you can keep building your portfolio over time.
              </p>
            </div>
            <button
              className={styles.textLink}
              onClick={() => setAddMode("project")}
              type="button"
            >
              Add your first project <span aria-hidden="true">↗</span>
            </button>
          </div>
        )}
      </section>

      <section className={styles.aboutSection} data-reveal id="about">
        <div className={styles.sectionIntro}>
          <span className={styles.eyebrow}>A LITTLE ABOUT ME</span>
          <h2>Good work starts<br />with good people.</h2>
        </div>
        <div className={styles.aboutContent}>
          <p>
            My career has moved between military intelligence, mission
            operations, and IT infrastructure. Those experiences taught me to
            listen closely, solve problems methodically, and take ownership
            through the finish line.
          </p>
          <p>
            Today, I support the systems and teams that keep work moving —
            from endpoint troubleshooting and server administration to
            documentation, collaboration, and continuous improvement.
          </p>
          <div className={styles.traitList}>
            <span>Army veteran</span>
            <span>Former law enforcement</span>
            <span>Former collegiate athlete</span>
            <span>TS/SCI with CI Polygraph</span>
          </div>
          <a className={styles.contactLine} href="mailto:lowerise@gmail.com">
            <span>Have a project or opportunity in mind?</span>
            <strong>Let&apos;s talk <span aria-hidden="true">↗</span></strong>
          </a>
        </div>
      </section>

      <section className={styles.experienceSection} data-reveal id="experience">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.eyebrow}>THE PATH THAT GOT ME HERE</span>
            <h2>A Few Chapters</h2>
          </div>
          <p>Tap a chapter to explore the people, places, and problem-solving behind my work.</p>
        </div>
        <div className={styles.timeline}>
          {experience.map((job, index) => (
            <article className={styles.job} key={`${job.company}-${job.role}`}>
              <div className={styles.jobIndex}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i />
              </div>
              <div className={styles.jobBody}>
                <div className={styles.jobMeta}>
                  <span>{job.company}</span>
                  <span>{job.dates}</span>
                </div>
                <h3>
                  <button
                    aria-controls={`chapter-details-${index}`}
                    aria-expanded={expandedExperience === index}
                    className={styles.jobToggle}
                    onClick={() =>
                      setExpandedExperience((current) =>
                        current === index ? null : index,
                      )
                    }
                    type="button"
                  >
                    {job.role}
                    <span aria-hidden="true">
                      {expandedExperience === index ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <p className={styles.jobDescription}>{job.description}</p>
                <div
                  className={styles.jobDetails}
                  hidden={expandedExperience !== index}
                  id={`chapter-details-${index}`}
                >
                  <ul>
                    {job.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <span
                className={`${styles.jobArrow} ${expandedExperience === index ? styles.jobArrowOpen : ""}`}
                aria-hidden="true"
              >
                ↗
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.credentialsSection} data-reveal id="credentials">
        <div className={styles.credentialsColumn}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>THE TOOLKIT</span>
              <h2>What I bring</h2>
            </div>
            <button
              aria-label="Add certification"
              className={styles.smallAddButton}
              onClick={() => setAddMode("certification")}
              type="button"
            >
              +
            </button>
          </div>
          <div className={styles.certList}>
            {data.certifications.map((certification) => (
              <article className={styles.certItem} key={certification.id}>
                <span className={styles.certCheck} aria-hidden="true">✓</span>
                <div>
                  <h3>{certification.name}</h3>
                  {certification.issuer && <p>{certification.issuer}</p>}
                </div>
                <button
                  aria-label={`Remove ${certification.name}`}
                  className={styles.removeButton}
                  onClick={() => removeCertification(certification.id)}
                  type="button"
                >
                  ×
                </button>
              </article>
            ))}
            <button
              className={styles.addTextButton}
              onClick={() => setAddMode("certification")}
              type="button"
            >
              + Add certification
            </button>
          </div>
          <div className={styles.educationBlock}>
            <span className={styles.eyebrow}>EDUCATION</span>
            {education.map((item) => (
              <div className={styles.educationItem} key={item.school}>
                <span>{item.year}</span>
                <div>
                  <h3>{item.degree}</h3>
                  <p>{item.school}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.skillsColumn}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>TOOLS OF THE TRADE</span>
              <h2>Skills & tools</h2>
            </div>
            <button
              aria-label="Add skill"
              className={styles.smallAddButton}
              onClick={() => setAddMode("skill")}
              type="button"
            >
              +
            </button>
          </div>
          <p className={styles.skillsIntro}>
            A practical toolkit shaped by hands-on support and mission-focused work.
          </p>
          <div className={styles.skillList}>
            {data.skills.map((skill) => (
              <span className={styles.skillTag} key={skill}>
                {skill}
                <button
                  aria-label={`Remove ${skill}`}
                  onClick={() => removeSkill(skill)}
                  type="button"
                >
                  ×
                </button>
              </span>
            ))}
            <button
              className={styles.skillAddTag}
              onClick={() => setAddMode("skill")}
              type="button"
            >
              + Add a skill
            </button>
          </div>
          <div className={styles.skillsNote}>
            <span className={styles.noteIcon} aria-hidden="true">✳</span>
            <p>
              From Windows and Linux administration to GIS, cloud services, and
              collaboration platforms — adaptable by design, grounded in the
              fundamentals.
            </p>
          </div>
        </div>
      </section>

      <footer className={styles.siteFooter}>
        <a className={styles.wordmark} href="#top">
          <span className={styles.mark}>JL</span>
          <span>JORDAN LOWE</span>
        </a>
        <p>Built on service. Ready for what&apos;s next.</p>
        <span className={styles.copyright}>© {new Date().getFullYear()} Jordan Lowe</span>
      </footer>

      {addMode && (
        <AddItemDialog
          mode={addMode}
          onAddCertification={(certification) =>
            setData((current) => ({
              ...current,
              certifications: [...current.certifications, certification],
            }))
          }
          onAddProject={(project) =>
            setData((current) => ({
              ...current,
              projects: [...current.projects, project],
            }))
          }
          onAddSkill={(skill) =>
            setData((current) => ({
              ...current,
              skills: current.skills.includes(skill)
                ? current.skills
                : [...current.skills, skill],
            }))
          }
          onClose={() => setAddMode(null)}
        />
      )}
    </main>
  );
}
