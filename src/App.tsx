import { useEffect, useMemo, useRef, useState } from "react";
import { categories, categoryOrder, CategoryKey, works, Work } from "./data";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4";
const EMAIL = "tangchao_2025@163.com";

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash || "#/");

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return hash;
}

function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let index = 0;
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          setDone(true);
          window.clearInterval(interval);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

function BackgroundVideo({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevX = useRef<number | null>(null);
  const targetTime = useRef(0);
  const seeking = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const sensitivity = 0.8;

    const clamp = (value: number) => Math.min(Math.max(value, 0), video.duration || 0);

    const seekToTarget = () => {
      if (!video.duration || seeking.current) return;
      if (Math.abs(video.currentTime - targetTime.current) < 0.02) return;
      seeking.current = true;
      video.currentTime = clamp(targetTime.current);
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!video.duration) {
        prevX.current = event.clientX;
        return;
      }
      if (prevX.current === null) {
        prevX.current = event.clientX;
        targetTime.current = video.currentTime;
        return;
      }
      const delta = event.clientX - prevX.current;
      prevX.current = event.clientX;
      targetTime.current = clamp(
        targetTime.current + (delta / window.innerWidth) * sensitivity * video.duration,
      );
      seekToTarget();
    };

    const onSeeked = () => {
      seeking.current = false;
      seekToTarget();
    };

    const onLoadedMetadata = () => {
      targetTime.current = video.duration * 0.36;
      video.currentTime = targetTime.current;
    };

    window.addEventListener("mousemove", onMouseMove);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={`hero-video ${className}`}
      src={VIDEO_URL}
      muted
      playsInline
      preload="auto"
    />
  );
}

function Navbar({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [open, setOpen] = useState(false);
  const links = categoryOrder.map((key) => [`#/category/${key}`, categories[key].label] as const);

  return (
    <>
      <nav className={`navbar ${tone === "light" ? "navbar-light" : ""}`}>
        <a className="nav-logo" href="#/" onClick={() => setOpen(false)}>
          <span>唐朝(R)</span>
          <span className="nav-star">✳︎</span>
        </a>
        <div className="nav-center">
          {links.map(([href, label], index) => (
            <span key={href}>
              <a href={href}>{label}</a>
              {index < links.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
        <a className="nav-cta" href="#/about">
          关于我
        </a>
        <button
          className={`hamburger ${open ? "open" : ""}`}
          aria-label="打开导航"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a href="#/about" onClick={() => setOpen(false)}>
          关于我
        </a>
      </div>
    </>
  );
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="1.5" y="3.5" width="7" height="7" stroke="currentColor" />
      <rect x="3.5" y="1.5" width="7" height="7" stroke="currentColor" />
    </svg>
  );
}

function HomePage() {
  const { displayed, done } = useTypewriter(
    "欢迎来到唐朝的个人作品集。这里收录我的摄影、影像、设计与AIGC创作实践。",
  );
  const [actionsVisible, setActionsVisible] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setActionsVisible(true), 400);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      <section className="mainframe-hero">
        <BackgroundVideo />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="blur-label">
            你好，我是唐朝。
            <br />
            视觉设计 / 内容创作 / AIGC实验
          </div>
          <p className="typewriter">
            {displayed}
            {!done && <span className="cursor" />}
          </p>
          <div className={`hero-actions ${actionsVisible ? "visible" : ""}`}>
            {categoryOrder.map((key) => (
              <a className="pill pill-white" href={`#/category/${key}`} key={key}>
                看{categories[key].label}
              </a>
            ))}
            <button className="pill pill-outline" onClick={() => navigator.clipboard?.writeText(EMAIL)}>
              <span>
                Reach us: <span className="underline">{EMAIL}</span>
              </span>
              <CopyIcon />
            </button>
          </div>
        </div>
      </section>
      <section className="section home-work-section">
        <div className="section-head">
          <h2 className="section-title">作品分类</h2>
        </div>
        <div className="home-groups">
          {categoryOrder.map((key) => (
            <section className="category-strip" key={key}>
              <div className="category-title">
                <a href={`#/category/${key}`}>{categories[key].label}</a>
              </div>
              <div className="works-grid">
                {getHomeWorks(key).map((work) => (
                  <WorkCard key={work.id} work={work} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}

function getHomeWorks(categoryKey: CategoryKey) {
  const categoryWorks = works.filter((work) => work.category === categoryKey);
  const featured = categoryWorks.filter((work) => work.featured);
  const rest = categoryWorks.filter((work) => !work.featured);
  return [...featured, ...rest].slice(0, 2);
}

function Media({ work, detail = false }: { work: Work; detail?: boolean }) {
  if (work.mediaType === "video") {
    if (detail) {
      return (
        <video
          src={work.cover}
          controls
          playsInline
          preload="auto"
        />
      );
    }
    // 网格视图：用封面图立即显示，不用 lazy
    if (work.poster) {
      return <img src={work.poster} alt={work.title} />;
    }
    return (
      <video
        src={work.cover}
        muted
        loop
        playsInline
        preload="none"
      />
    );
  }
  return <img src={work.cover} alt={work.title} loading="lazy" />;
}

function WorkCard({ work }: { work: Work }) {
  return (
    <a className={`work-card ${work.layout === "tall" ? "tall" : "wide-card"}`} href={`#/work/${work.id}`}>
      <div className="work-media">
        <Media work={work} />
      </div>
      <div className="work-caption">
        <span>{work.title}</span>
        <small>{categories[work.category].label}</small>
      </div>
    </a>
  );
}

function CategoryPage({ categoryKey }: { categoryKey: CategoryKey }) {
  const category = categories[categoryKey] || categories.photo;
  const categoryWorks = works.filter((work) => work.category === categoryKey);

  return (
    <>
      <section className="section page-hero">
        <div className="page-kicker">{category.en}</div>
        <h1 className="page-title">{category.label}</h1>
      </section>
      <section className="section category-section">
        <div className={`works-grid wide category-grid category-${categoryKey}`}>
          {categoryWorks.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </section>
    </>
  );
}

function WorkPage({ workId }: { workId: string }) {
  const work = works.find((item) => item.id === workId) || works[0];
  const siblings = works.filter((item) => item.category === work.category);
  const currentIndex = siblings.findIndex((item) => item.id === work.id);
  const prevWork = siblings[(currentIndex - 1 + siblings.length) % siblings.length];
  const nextWork = siblings[(currentIndex + 1) % siblings.length];
  const nextCategory =
    categoryOrder[(categoryOrder.findIndex((item) => item === work.category) + 1) % categoryOrder.length];

  return (
    <section className="detail-page">
      {work.mediaType !== "video" && <BackgroundVideo className="detail-back-video" />}
      <div className="detail-backdrop" />
      <div className="detail-shell">
        <div className="detail-intro">
          <div>
            <div className="blur-label detail-blur">
              {categories[work.category].en}
              <br />
              {categories[work.category].label}
            </div>
            <h1 className="detail-title">{work.title}</h1>
          </div>
          <p className="detail-copy">{work.description}</p>
          <div className="detail-primary-actions">
            <a className="pill pill-white" href="#/">
              返回主页面
            </a>
            <a className="pill pill-white" href={`#/category/${nextCategory}`}>
              前往下一板块
            </a>
          </div>
        </div>

        <div className="detail-media">
          <div className="media-frame">
            <Media work={work} detail />
          </div>
          <div className="gallery-actions">
            <a className="ghost-button" href={`#/work/${prevWork.id}`}>
              上一作品
            </a>
            <a className="ghost-button" href={`#/work/${nextWork.id}`}>
              下一作品
            </a>
            <a className="ghost-button" href={`#/category/${work.category}`}>
              返回{categories[work.category].label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="section page-hero about-page">
      <div className="page-kicker">About</div>
      <h1 className="page-title">关于我</h1>
      <div className="about-layout">
        <div className="about-card">
          <span>姓名</span>
          <strong>唐朝</strong>
        </div>
        <div className="about-card">
          <span>邮箱</span>
          <strong>{EMAIL}</strong>
        </div>
        <div className="about-panel">
          <h2>个人介绍</h2>
          <p>专注视觉设计/内容创作，擅长独立完成整套作品产出，注重细节与完整逻辑，持续学习AI相关新工具与行业知识。</p>
        </div>
        <div className="about-panel">
          <h2>业余爱好</h2>
          <p>视觉拍摄、AIGC创意创作、书籍阅读、影片赏析、旅游</p>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const hash = useHashRoute();
  const [, routeSection] = hash.split("/");
  const navTone = routeSection === "category" || routeSection === "about" ? "light" : "dark";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [hash]);

  const page = useMemo(() => {
    const [, section, value] = hash.split("/");
    if (!section) return <HomePage />;
    if (section === "category" && value in categories) {
      return <CategoryPage categoryKey={value as CategoryKey} />;
    }
    if (section === "work") return <WorkPage workId={value} />;
    if (section === "about") return <AboutPage />;
    return <HomePage />;
  }, [hash]);

  return (
    <>
      <Navbar tone={navTone} />
      <main>{page}</main>
    </>
  );
}
