const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
if (toggle && nav) toggle.addEventListener("click", () => nav.classList.toggle("open"));

const grid = document.getElementById("request-grid");
const empty = document.getElementById("empty-state");
const tabs = Array.from(document.querySelectorAll(".tab"));
let allRequests = [];

function makeText(tag, className, value) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = value == null ? "" : String(value);
  return element;
}

function renderRequests(filter) {
  if (!grid) return;
  grid.replaceChildren();

  const now = Date.now();
  const requests = allRequests.filter((request) => {
    const amount = Number(request.amount);
    const expiry = request.expiresAt ? new Date(request.expiresAt).getTime() : Infinity;
    const validExpiry = Number.isFinite(expiry) && expiry > now;
    const approved = request.approved === true;
    const validAmount = Number.isFinite(amount) && amount > 0 && amount <= 10000;
    const matchesFilter = filter === "all" || amount <= Number(filter);
    return approved && validAmount && validExpiry && matchesFilter;
  });

  requests.forEach((request) => {
    const card = document.createElement("article");
    card.className = "request-card";
    card.dataset.amount = String(Number(request.amount));

    const top = document.createElement("div");
    top.className = "card-top";
    top.append(
      makeText("span", "pill", request.category || "Community support"),
      makeText("span", "sample", request.status || "Open")
    );

    const bottom = document.createElement("div");
    bottom.className = "card-bottom";
    bottom.append(
      makeText("strong", "", `₹${Number(request.amount).toLocaleString("en-IN")} requested`),
      makeText("span", "", request.statusNote || "Request reviewed")
    );

    card.append(
      top,
      makeText("div", "request-symbol", "₹"),
      makeText("h3", "", request.title || "Request for help"),
      makeText("p", "", request.summary || ""),
      bottom
    );

    if (request.publicContactUrl) {
      try {
        const url = new URL(request.publicContactUrl);
        if (url.protocol === "https:") {
          const link = makeText("a", "text-link", "Learn more ↗");
          link.href = url.href;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          card.append(link);
        }
      } catch (_) {
        // Ignore malformed public links.
      }
    }
    grid.append(card);
  });

  if (empty) {
    empty.hidden = requests.length > 0;
    empty.textContent = requests.length
      ? ""
      : "No approved requests are listed in this section yet. Please check back later.";
  }
}

async function loadRequests() {
  if (!grid) return;
  try {
    // cache: no-store helps visitors see recently updated request data.
    const response = await fetch("./requests.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Could not load requests.json (${response.status})`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("requests.json must contain a JSON array.");
    allRequests = data;
    renderRequests("all");
  } catch (error) {
    allRequests = [];
    renderRequests("all");
    if (empty) empty.textContent = "Requests could not be loaded. Check that requests.json is in the same folder as index.html and contains valid JSON.";
    console.error("HelpKaro23 request loading error:", error);
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    renderRequests(tab.dataset.filter || "all");
  });
});

loadRequests();
