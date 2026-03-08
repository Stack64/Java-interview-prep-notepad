"use client";

import React, { useEffect, useMemo, useState } from "react";

type Section = {
  step: string;
  title: string;
  accent: string;
  tag: string;
  items: string[];
};

const data: Section[] = [
  {
    step: "Step 01",
    title: "Core Java",
    accent: "#2d6a4f",
    tag: "Foundation",
    items: [
      "Data Types & Primitives",
      "Loops & Conditionals",
      "OOP — Encapsulation, Inheritance, Polymorphism, Abstraction",
      "Interfaces vs Abstract Classes",
      "final, finally, finalize() difference",
      "Exception Handling — checked vs unchecked, hierarchy",
      "try-with-resources & multi-catch",
      "String Pool concept & immutability",
      "Collections Framework — List, Set, Map, Queue",
      "ArrayList vs LinkedList",
      "HashMap internals — Hashing, Buckets, Collision",
      "HashMap vs ConcurrentHashMap",
      "HashSet vs TreeSet",
      "Comparable vs Comparator",
      "How to sort a Map",
      "equals() vs hashCode() contract",
    ],
  },
  {
    step: "Step 02",
    title: "Java 8+ Features",
    accent: "#1d3d6e",
    tag: "Modern Java",
    items: [
      "Lambda Expressions",
      "Functional Interfaces (@FunctionalInterface)",
      "Default methods in Interfaces",
      "Streams API — filter, map, reduce, collect",
      "Stream vs Parallel Stream",
      "Optional — why and when to use",
      "Method References",
      "New Date/Time API (java.time)",
      "Java 11 features (var, String methods)",
      "Java 17 features (Records, Sealed classes, Pattern matching)",
    ],
  },
  {
    step: "Step 03",
    title: "Advanced Java",
    accent: "#7b2d8b",
    tag: "Deep Dive",
    items: [
      "Multithreading — Thread lifecycle",
      "synchronized vs ReentrantLock",
      "volatile keyword",
      "ExecutorService & Thread Pool",
      "Callable vs Runnable",
      "Future & CompletableFuture",
      "ConcurrentHashMap internals",
      "JVM Memory Model — Heap, Stack, Metaspace",
      "Garbage Collection types & how GC works",
      "How to capture Heap / Thread dumps",
      "Debugging high CPU / memory in JVM",
      "Immutable class — how to design",
      "Serialization & Deserialization",
      "Reflection API",
      "Annotations & how they work",
      "Design Patterns — Singleton, Factory, Builder, Observer",
      "Singleton class (write from scratch)",
    ],
  },
  {
    step: "Step 04",
    title: "Spring Framework & Spring Boot",
    accent: "#b5420a",
    tag: "Framework",
    items: [
      "What is Spring? Why use it?",
      "Spring Core & IoC Container",
      "Dependency Injection — how it works internally",
      "@Component vs @Service vs @Repository vs @Controller",
      "How Autowiring works in Spring",
      "What is Auto Configuration?",
      "Spring Boot vs Spring — key differences",
      "SpringApplication.run() — what happens step by step",
      "@Transactional — propagation & isolation levels",
      "JPA vs Hibernate",
      "Spring Data JPA basics",
      "Global Exception Handling (@ControllerAdvice)",
      "REST API Development",
      "Difference between REST and SOAP",
      "What is a RESTful API?",
      "HTTP vs HTTPS",
      "Spring Security overview",
      "Securing REST APIs with JWT & OAuth2",
    ],
  },
  {
    step: "Step 05",
    title: "Microservices",
    accent: "#1a6b6b",
    tag: "Architecture",
    items: [
      "Microservices vs Monolith — pros & cons",
      "Inter-service communication — REST / Kafka / RabbitMQ",
      "Service Discovery — Eureka concept",
      "API Gateway — why it's important",
      "Distributed Transactions — Saga Pattern",
      "Circuit Breaker — Resilience4j concept",
      "Handling data consistency across services",
      "Centralized Logging & Monitoring",
      "Kafka consumers — exactly-once vs at-least-once",
      "Idempotent consumers & offset management",
      "Transactional producers in Kafka",
      "Idempotency, Race conditions, Retry logic",
      "Distributed locking strategies",
    ],
  },
  {
    step: "Step 06",
    title: "Database & SQL",
    accent: "#8b6914",
    tag: "Data",
    items: [
      "SQL — DDL, DML basics",
      "Types of JOINs (INNER, LEFT, RIGHT, FULL)",
      "WHERE vs HAVING",
      "DELETE vs TRUNCATE vs DROP",
      "Normalization (1NF, 2NF, 3NF)",
      "Indexing — Clustered vs Non-clustered",
      "Query Optimization techniques",
      "Indexes — when to add, when they hurt",
      "N+1 query problem & how to fix",
      "Lock contention & isolation levels",
      "Transactions — ACID properties",
      "Query: 2nd highest salary",
      "NoSQL Basics — MongoDB",
      "Redis — caching, TTL, eviction",
      "Cache Penetration, Breakdown, Avalanche — and fixes",
    ],
  },
  {
    step: "Step 07",
    title: "DSA & Coding",
    accent: "#5c2d91",
    tag: "Problem Solving",
    items: [
      "Find duplicates in a list of strings",
      "Palindrome check",
      "Anagram check",
      "Longest common prefix",
      "Missing integer in consecutive array",
      "Move all zeroes to end of array",
      "Best time to buy & sell stock (maximize profit)",
      "Coin change problem (minimum coins)",
      "Longest increasing subsequence",
      "Combination Sum II (recursion)",
      "Reverse-add palindrome problem",
      "Dijkstra's algorithm",
      "Java Streams: filter odd numbers, multiply, sum",
    ],
  },
  {
    step: "Step 08",
    title: "System Design & DevOps",
    accent: "#8b1a1a",
    tag: "Senior",
    items: [
      "Design a URL shortener (Bitly-style)",
      "Design a news aggregator",
      "Fraud detection model for transactions",
      "Database design for ride-sharing",
      "Data warehouse for online retailer",
      "Failure handling — Redis crash, DB replication lag, traffic spike",
      "Git & GitHub — branching, PR workflow",
      "CI/CD Basics — Jenkins, GitHub Actions",
      "Docker — containers vs VMs",
      "Kubernetes fundamentals",
      "How to find server crash reasons",
      "How to find server memory issues",
      "Works in staging, fails in prod — debugging checklist",
      "DB slow after deployment — root cause analysis",
      "JUnit & Mockito — unit testing",
      "Integration Testing",
      "Logging — SLF4J, Logback",
      "Code Quality — SonarQube, Clean Code",
    ],
  },
];

const STORAGE_KEY = "java_prep_v1";
const THEME_KEY = "java_prep_theme_v1";
const CIRCUMFERENCE = 2 * Math.PI * 30;

type CompletionState = Record<string, boolean>;
type Filter = "all" | "pending" | "done";
type Theme = "light" | "dark";

function getItemId(sectionIndex: number, itemIndex: number) {
  return `s${sectionIndex}_i${itemIndex}`;
}

export default function HomePage() {
  const [completion, setCompletion] = useState<CompletionState>({});
  const [filter, setFilter] = useState<Filter>("all");
  const [hydrated, setHydrated] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Set<number>>(
    new Set()
  );
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCompletion(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    try {
      const storedTheme = window.localStorage.getItem(THEME_KEY);
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme: Theme =
        storedTheme === "light" || storedTheme === "dark"
          ? (storedTheme as Theme)
          : prefersDark
          ? "dark"
          : "light";
      setTheme(initialTheme);
      if (initialTheme === "dark") {
        document.body.classList.add("theme-dark");
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completion));
    } catch {
      // ignore
    }
  }, [completion, hydrated]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const body = document.body;
    if (theme === "dark") {
      body.classList.add("theme-dark");
    } else {
      body.classList.remove("theme-dark");
    }
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const { total, done } = useMemo(() => {
    let t = 0;
    let d = 0;
    data.forEach((section, si) =>
      section.items.forEach((_, ii) => {
        t += 1;
        if (completion[getItemId(si, ii)]) d += 1;
      })
    );
    return { total: t, done: d };
  }, [completion]);

  const pct = total ? Math.round((done / total) * 100) : 0;
  const strokeDashoffset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;

  const getSectionDoneCount = (sectionIndex: number) =>
    data[sectionIndex].items.filter((_, ii) =>
      completion[getItemId(sectionIndex, ii)]
    ).length;

  const toggleItem = (sectionIndex: number, itemIndex: number) => {
    const id = getItemId(sectionIndex, itemIndex);
    setCompletion((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleSectionCollapse = (sectionIndex: number) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionIndex)) next.delete(sectionIndex);
      else next.add(sectionIndex);
      return next;
    });
  };

  const resetAll = () => {
    if (typeof window !== "undefined" && !window.confirm("Reset all progress?"))
      return;
    setCompletion({});
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div>
      <div className="header">
        <div className="header-left">
          <h1>
            Java Interview
            <br />
            Prep Notepad
          </h1>
          <p>Tick off topics as you study · Sequenced by priority</p>
        </div>
        <div className="progress-ring-wrap">
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle className="track" cx="36" cy="36" r="30" />
            <circle
              className="fill"
              id="ring"
              cx="36"
              cy="36"
              r="30"
              style={{
                strokeDasharray: CIRCUMFERENCE,
                strokeDashoffset,
              }}
            />
            <text id="ring-pct" x="36" y="37">
              {pct}%
            </text>
          </svg>
          <span id="ring-label">Complete</span>
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <svg
              className="theme-toggle-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2a6 6 0 0 0-6 6c0 2.02.74 3.37 1.67 4.47.4.48.84 1 .97 1.39L9 15v1.25c0 .41.34.75.75.75h4.5A.75.75 0 0 0 15 16.25V15l.36-.14c.14-.39.57-.91.97-1.39C17.26 11.37 18 10.02 18 8a6 6 0 0 0-6-6Zm-2 18.25c0 .41.34.75.75.75h2.5a.75.75 0 0 0 0-1.5h-2.5a.75.75 0 0 0-.75.75Zm1.75 2.25a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5h-.5Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="controls">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
        <button
          className={`filter-btn ${filter === "done" ? "active" : ""}`}
          onClick={() => setFilter("done")}
        >
          Done
        </button>
        <button className="reset-btn" id="resetAll" onClick={resetAll}>
          ↺ Reset all
        </button>
      </div>

      <div className="notepad" id="notepad">
        {data.map((section, si) => {
          const sectionDone = getSectionDoneCount(si);
          const hasMatch =
            filter === "all"
              ? true
              : section.items.some((_, ii) => {
                  const checked = completion[getItemId(si, ii)];
                  if (filter === "done") return checked;
                  if (filter === "pending") return !checked;
                  return true;
                });

          const isCollapsed = collapsedSections.has(si);

          return (
            <div
              key={section.title}
              className={`section${!hasMatch ? " hidden" : ""}${
                isCollapsed ? " collapsed" : ""
              }`}
              style={{ ["--accent" as any]: section.accent }}
            >
              <div
                className="section-header"
                onClick={() => toggleSectionCollapse(si)}
              >
                <span className="section-step">{section.step}</span>
                <span className="section-title">{section.title}</span>
                <span className="section-meta">
                  {sectionDone}/{section.items.length} done
                </span>
                <span className="chevron">▾</span>
              </div>
              <div className="items-list">
                {section.items.map((text, ii) => {
                  const id = getItemId(si, ii);
                  const isDone = !!completion[id];
                  return (
                    <div
                      key={id}
                      className={`item${isDone ? " done" : ""}`}
                      onClick={() => toggleItem(si, ii)}
                    >
                      <div className="cb">{isDone ? "✓" : ""}</div>
                      <div className="item-text">{text}</div>
                      <div className="item-tag">{section.tag}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="footer">
        <span id="done-count">
          {done} of {total} topics complete
        </span>
        <span>Java Interview Prep {new Date().getFullYear()}</span>
      </div>
    </div>
  );
}
