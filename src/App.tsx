import { useEffect, useMemo, useRef, useState } from "react";
import {
  faBookOpen,
  faCheck,
  faClipboard,
  faCode,
  faFilter,
  faLayerGroup,
  faMagnifyingGlass,
  faStar,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import { categories, templates, templateSources, type TemplateItem } from "./data/templates";

const sourceKinds = {
  Local: "Curated Pack",
  Reference: "Template Pack",
  Influence: "Creator Pack",
};

type SnippetFormat = "raw" | "vscode" | "sublime";

const snippetFormats: { value: SnippetFormat; label: string; copyLabel: string }[] = [
  { value: "raw", label: "Raw", copyLabel: "Copy" },
  { value: "vscode", label: "VS Code JSON", copyLabel: "Copy JSON" },
  { value: "sublime", label: "Sublime", copyLabel: "Copy Sublime" },
];

const headlineLinks = [
  { label: "Templates", href: "#templates" },
  { label: "Packs", href: "#sources" },
  { label: "Guide", href: "#guide" },
  { label: "Library", href: "#library" },
];

function readSavedTemplates() {
  try {
    return new Set(JSON.parse(localStorage.getItem("savedTemplates") ?? "[]") as string[]);
  } catch {
    return new Set<string>();
  }
}

function scoreTemplate(item: TemplateItem, query: string) {
  if (!query) return 1;
  const haystack = [
    item.title,
    item.category,
    item.source,
    item.summary,
    item.complexity,
    item.tags.join(" "),
    item.code,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query) ? 1 : 0;
}

function Icon({ icon, size = 16 }: { icon: IconProp; size?: number }) {
  return <FontAwesomeIcon icon={icon} style={{ width: size, height: size }} aria-hidden="true" />;
}

function snippetTrigger(item: TemplateItem) {
  return item.id.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
}

function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cdataSafe(value: string) {
  return value.replaceAll("]]>", "]]]]><![CDATA[>");
}

function escapeVsCodeSnippetBody(line: string) {
  return line.replace(/\\/g, "\\\\").replace(/\$/g, "\\$").replace(/}/g, "\\}");
}

function escapeSublimeSnippetBody(value: string) {
  return value.replace(/\$/g, "\\$");
}

function scopeForLanguage(language: string) {
  const normalized = language.toLowerCase();
  if (normalized.includes("shell")) return "source.shell";
  if (normalized.includes("java")) return "source.java";
  if (normalized.includes("python")) return "source.python";
  return "source.c++";
}

function buildVsCodeSnippet(item: TemplateItem) {
  return JSON.stringify(
    {
      [item.title]: {
        prefix: snippetTrigger(item),
        body: item.code.split("\n").map(escapeVsCodeSnippetBody),
        description: `${item.title} - ${item.summary}`,
      },
    },
    null,
    2,
  );
}

function buildSublimeSnippet(item: TemplateItem) {
  return `<snippet>
  <content><![CDATA[${cdataSafe(escapeSublimeSnippetBody(item.code))}]]></content>
  <tabTrigger>${xmlEscape(snippetTrigger(item))}</tabTrigger>
  <scope>${scopeForLanguage(item.language)}</scope>
  <description>${xmlEscape(`${item.title} - ${item.summary}`)}</description>
</snippet>`;
}

function formatTemplate(item: TemplateItem, format: SnippetFormat) {
  if (format === "vscode") return buildVsCodeSnippet(item);
  if (format === "sublime") return buildSublimeSnippet(item);
  return item.code;
}

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [source, setSource] = useState("All");
  const [selectedId, setSelectedId] = useState(templates[0].id);
  const [copiedId, setCopiedId] = useState("");
  const [snippetFormat, setSnippetFormat] = useState<SnippetFormat>("raw");
  const [saved, setSaved] = useState<Set<string>>(() => readSavedTemplates());
  const [onlySaved, setOnlySaved] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimers = useRef<number[]>([]);

  const sourceOptions = useMemo(
    () => ["All", ...Array.from(new Set(templates.map((item) => item.source)))],
    [],
  );

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTemplates = useMemo(() => {
    return templates.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesSource = source === "All" || item.source === source;
      const matchesSaved = !onlySaved || saved.has(item.id);
      return matchesCategory && matchesSource && matchesSaved && scoreTemplate(item, normalizedQuery);
    });
  }, [category, normalizedQuery, onlySaved, saved, source]);

  const selected = useMemo(() => {
    return (
      filteredTemplates.find((item) => item.id === selectedId) ??
      filteredTemplates[0] ??
      templates.find((item) => item.id === selectedId) ??
      templates[0]
    );
  }, [filteredTemplates, selectedId]);

  const featuredTemplates = useMemo(() => templates.filter((item) => item.featured), []);

  const sourcePacks = useMemo(() => {
    return templateSources.map((item) => {
      const packTemplates = templates.filter((template) => template.source === item.name);
      return {
        ...item,
        count: packTemplates.length,
        firstTemplateId: packTemplates[0]?.id,
      };
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("savedTemplates", JSON.stringify(Array.from(saved)));
  }, [saved]);

  useEffect(() => {
    return () => {
      transitionTimers.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  async function copyTemplate(item: TemplateItem) {
    await navigator.clipboard.writeText(formatTemplate(item, snippetFormat));
    setCopiedId(`${item.id}:${snippetFormat}`);
    window.setTimeout(() => setCopiedId(""), 1600);
  }

  function toggleSaved(id: string) {
    setSaved((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function chooseTemplate(id: string) {
    if (id === selected.id) return;

    transitionTimers.current.forEach((timer) => window.clearTimeout(timer));
    setIsTransitioning(true);

    transitionTimers.current = [
      window.setTimeout(() => setSelectedId(id), 380),
      window.setTimeout(() => setIsTransitioning(false), 1120),
    ];
  }

  function openSourcePack(sourceName: string, firstTemplateId?: string) {
    setSource(sourceName);
    setCategory("All");
    setOnlySaved(false);
    if (firstTemplateId) chooseTemplate(firstTemplateId);
  }

  return (
    <div className="app-shell">
      <div className="pixel-loader" aria-hidden="true">
        {Array.from({ length: 48 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      {isTransitioning ? (
        <div className="pixel-transition" aria-hidden="true">
          {Array.from({ length: 80 }, (_, index) => (
            <span key={index} style={{ animationDelay: `${(index % 10) * 16 + Math.floor(index / 10) * 10}ms` }} />
          ))}
        </div>
      ) : null}

      <header className="topbar">
        <a className="brand" href="#" aria-label="Snippex home">
          <span className="brand-mark">
            <Icon icon={faCode} size={22} />
          </span>
          <span>
            <strong>Snippex</strong>
            <small>Snippet archive</small>
          </span>
        </a>

        <nav className="source-nav" aria-label="Page sections">
          {headlineLinks.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero-band" id="templates" aria-labelledby="page-title">
          <div className="hero-pixels" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <div className="hero-copy">
            <p className="eyebrow">
              <Icon icon={faWandMagicSparkles} size={16} />
              Competitive programming archive
            </p>
            <h1 id="page-title">Snippex</h1>
            <p className="hero-line">
              Chinmay's curated snippets, clean contest classics, and copy-ready templates arranged as a brutal little
              algorithm machine.
            </p>
          </div>

          <div className="hero-stats" aria-label="Library statistics">
            <span>
              <strong>{templates.length}</strong>
              snippets
            </span>
            <span>
              <strong>{categories.length - 1}</strong>
              domains
            </span>
            <span>
              <strong>{templateSources.length}</strong>
              packs
            </span>
          </div>
        </section>

        <section className="control-panel" aria-label="Template filters">
          <label className="search-box">
            <Icon icon={faMagnifyingGlass} size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search prefix sum, dsu, binary search..."
            />
          </label>

          <label className="select-wrap">
            <Icon icon={faFilter} size={17} />
            <span>Category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="select-wrap">
            <Icon icon={faLayerGroup} size={17} />
            <span>Source</span>
            <select value={source} onChange={(event) => setSource(event.target.value)}>
              {sourceOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <button
            className={`saved-toggle ${onlySaved ? "is-active" : ""}`}
            type="button"
            aria-pressed={onlySaved}
            onClick={() => setOnlySaved((value) => !value)}
            title="Show saved templates"
          >
            <Icon icon={faStar} size={17} />
            Saved
          </button>
        </section>

        <section className="source-strip" id="sources" aria-label="Template packs">
          {sourcePacks.map((item) => (
            <button
              className={`source-card ${source === item.name ? "is-selected" : ""}`}
              key={item.name}
              type="button"
              onClick={() => openSourcePack(item.name, item.firstTemplateId)}
              title={`Show ${item.name} templates`}
            >
              <div>
                <span className={`kind kind-${item.kind.toLowerCase()}`}>
                  {sourceKinds[item.kind]}
                </span>
                <h2>{item.name}</h2>
                <p>{item.note}</p>
              </div>
              <span className="pack-meta">{item.count} templates</span>
            </button>
          ))}
        </section>

        <section className="guide-panel" id="guide" aria-labelledby="guide-title">
          <div className="guide-heading">
            <span>
              <Icon icon={faBookOpen} size={17} />
              Editor Guide
            </span>
            <h2 id="guide-title">Add Snippex Templates To Your Editor</h2>
          </div>

          <div className="guide-grid">
            <article className="guide-card">
              <div className="guide-card-head">
                <Icon icon={faCode} size={20} />
                <h3>VS Code</h3>
              </div>
              <ol>
                <li>Select a template and set the format to VS Code JSON.</li>
                <li>Copy JSON, then open Configure User Snippets.</li>
                <li>Choose cpp.json and paste the snippet object inside the outer braces.</li>
                <li>Type the trigger in a C++ file and press Tab.</li>
              </ol>
            </article>

            <article className="guide-card">
              <div className="guide-card-head">
                <Icon icon={faClipboard} size={20} />
                <h3>Sublime Text</h3>
              </div>
              <ol>
                <li>Select a template and set the format to Sublime.</li>
                <li>Copy Sublime, then open Tools, Developer, New Snippet.</li>
                <li>Replace the file contents with the copied snippet.</li>
                <li>Save it in Packages/User with a .sublime-snippet name.</li>
              </ol>
            </article>

            <aside className="guide-current" aria-label="Current snippet trigger">
              <span>Current Trigger</span>
              <strong>{snippetTrigger(selected)}</strong>
              <p>{selected.title}</p>
            </aside>
          </div>
        </section>

        <section className="workspace" id="library" aria-label="Template browser">
          <aside className="template-rail">
            <div className="rail-heading">
              <span>
                <Icon icon={faBookOpen} size={17} />
                Templates
              </span>
              <strong>{filteredTemplates.length}</strong>
            </div>

            <div className="featured-stack" aria-label="Featured templates">
              {featuredTemplates.slice(0, 4).map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`feature-pill ${selected.id === item.id ? "is-selected" : ""}`}
                  onClick={() => chooseTemplate(item.id)}
                >
                  <span>{item.category}</span>
                  {item.title}
                </button>
              ))}
            </div>

            <div className="template-list">
              {filteredTemplates.map((item) => (
                <button
                  type="button"
                  className={`template-row ${selected.id === item.id ? "is-selected" : ""}`}
                  key={item.id}
                  onClick={() => chooseTemplate(item.id)}
                >
                  <span className="row-main">
                    <strong>{item.title}</strong>
                    <small>{item.summary}</small>
                  </span>
                  <span className="row-meta">
                    <span>{item.level}</span>
                    <span>{item.category}</span>
                  </span>
                </button>
              ))}

              {filteredTemplates.length === 0 ? (
                <p className="empty-state">No templates match the current filters.</p>
              ) : null}
            </div>
          </aside>

          <article className="reader">
            <div className="reader-head">
              <div>
                <span className="template-source">{selected.source}</span>
                <h2>{selected.title}</h2>
                <p>{selected.summary}</p>
              </div>

              <div className="reader-actions">
                <button
                  type="button"
                  className={`icon-button ${saved.has(selected.id) ? "is-saved" : ""}`}
                  onClick={() => toggleSaved(selected.id)}
                  title={saved.has(selected.id) ? "Remove from saved" : "Save template"}
                  aria-label={saved.has(selected.id) ? "Remove from saved" : "Save template"}
                >
                  <Icon icon={faStar} size={18} />
                </button>

                <label className="format-select" title="Snippet format">
                  <span>Format</span>
                  <select
                    value={snippetFormat}
                    onChange={(event) => setSnippetFormat(event.target.value as SnippetFormat)}
                  >
                    {snippetFormats.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  type="button"
                  className="copy-button"
                  onClick={() => copyTemplate(selected)}
                  title="Copy template"
                >
                  {copiedId === `${selected.id}:${snippetFormat}` ? (
                    <Icon icon={faCheck} size={18} />
                  ) : (
                    <Icon icon={faClipboard} size={18} />
                  )}
                  {copiedId === `${selected.id}:${snippetFormat}`
                    ? "Copied"
                    : snippetFormats.find((item) => item.value === snippetFormat)?.copyLabel}
                </button>
              </div>
            </div>

            <div className="meta-grid" aria-label="Template metadata">
              <span>
                <strong>Complexity</strong>
                {selected.complexity}
              </span>
              <span>
                <strong>Language</strong>
                {selected.language}
              </span>
              <span>
                <strong>Level</strong>
                {selected.level}
              </span>
              <span>
                <strong>Lines</strong>
                {selected.code.split("\n").length}
              </span>
            </div>

            <div className="tag-row" aria-label="Tags">
              {selected.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <pre className="code-block" aria-label={`${selected.title} code`}>
              {selected.code.split("\n").map((line, index) => (
                <code key={`${selected.id}-${index}`}>
                  <span className="line-number">{index + 1}</span>
                  <span className="code-line">{line || " "}</span>
                </code>
              ))}
            </pre>

            {selected.notes?.length ? (
              <div className="notes">
                <h3>Notes</h3>
                {selected.notes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            ) : null}

          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
