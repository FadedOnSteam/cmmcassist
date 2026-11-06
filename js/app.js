(function () {
  "use strict";

  var DATA = window.CMMC_L1;
  var STORE_KEY = "cmmcassist.l1.answers." + DATA.version;
  var answers = load();

  /* ---------- storage (per-browser convenience only) ---------- */
  function load() {
    try {
      var raw = window.localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) || {} : {};
    } catch (e) { return {}; }
  }
  function save() {
    try { window.localStorage.setItem(STORE_KEY, JSON.stringify(answers)); } catch (e) { /* ignore */ }
  }
  function clearSaved() {
    try { window.localStorage.removeItem(STORE_KEY); } catch (e) { /* ignore */ }
  }

  /* ---------- tabs ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  var panelIds = tabs.map(function (t) { return t.dataset.panel; });

  function showPanel(id, focusTab) {
    if (panelIds.indexOf(id) === -1) id = "level-1";
    tabs.forEach(function (t) {
      var on = t.dataset.panel === id;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.dataset.panel).hidden = !on;
      if (on && focusTab) t.focus();
    });
  }

  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () {
      if (location.hash !== "#" + t.dataset.panel) history.replaceState(null, "", "#" + t.dataset.panel);
      showPanel(t.dataset.panel);
    });
    t.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === "Home") next = tabs[0];
      if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) {
        e.preventDefault();
        history.replaceState(null, "", "#" + next.dataset.panel);
        showPanel(next.dataset.panel, true);
      }
    });
  });

  window.addEventListener("hashchange", function () {
    showPanel(location.hash.slice(1));
    window.scrollTo(0, 0);
  });

  /* ---------- build the Level 1 questions ---------- */
  var container = document.getElementById("l1-questions");
  var total = DATA.practices.length;
  var num = 0;

  DATA.families.forEach(function (fam) {
    var items = DATA.practices.filter(function (p) { return p.family === fam.code; });
    if (!items.length) return;

    var group = document.createElement("section");
    group.className = "family";
    var h = document.createElement("h2");
    h.className = "family-title";
    h.innerHTML = '<span class="family-code"></span><span class="family-name"></span>';
    h.querySelector(".family-code").textContent = fam.code;
    h.querySelector(".family-name").textContent = fam.name;
    group.appendChild(h);

    if (fam.description) {
      var desc = document.createElement("p");
      desc.className = "family-desc";
      desc.textContent = fam.description;
      group.appendChild(desc);
    }

    items.forEach(function (p) {
      num += 1;
      var key = p.id;
      var fs = document.createElement("fieldset");
      fs.className = "q";
      fs.dataset.id = key;

      var legend = document.createElement("legend");
      legend.innerHTML = '<span class="q-num"></span><span class="q-text"></span>';
      legend.querySelector(".q-num").textContent = num + ".";
      legend.querySelector(".q-text").textContent = p.question;
      fs.appendChild(legend);

      var choices = document.createElement("div");
      choices.className = "choices";
      ["yes", "no"].forEach(function (val) {
        var inputId = key + "-" + val;
        var input = document.createElement("input");
        input.type = "radio";
        input.name = key;
        input.value = val;
        input.id = inputId;
        input.checked = answers[key] === val;
        var label = document.createElement("label");
        label.htmlFor = inputId;
        label.className = "choice choice-" + val;
        label.textContent = val === "yes" ? "Yes" : "No";
        choices.appendChild(input);
        choices.appendChild(label);
      });
      fs.appendChild(choices);

      var det = document.createElement("details");
      det.className = "req";
      det.innerHTML = '<summary>Official requirement</summary><p></p>';
      det.querySelector("p").textContent = p.requirement;
      fs.appendChild(det);

      group.appendChild(fs);
    });
    container.appendChild(group);
  });

  /* ---------- progress ---------- */
  var form = document.getElementById("l1-form");
  var seeBtn = document.getElementById("see-results");
  var hint = document.getElementById("results-hint");
  var results = document.getElementById("results");

  document.getElementById("progress-total").textContent = total;

  function answeredCount() {
    return DATA.practices.filter(function (p) { return answers[p.id] === "yes" || answers[p.id] === "no"; }).length;
  }

  function updateProgress() {
    var n = answeredCount();
    document.getElementById("progress-count").textContent = n;
    document.getElementById("progress-fill").style.width = (n / total * 100) + "%";
    seeBtn.disabled = n < total;
    hint.textContent = n < total
      ? "Answer all " + total + " questions to see your results (" + (total - n) + " left)."
      : "All questions answered.";
    DATA.practices.forEach(function (p) {
      var fs = form.querySelector('fieldset[data-id="' + p.id + '"]');
      if (fs) fs.classList.toggle("answered", !!answers[p.id]);
    });
  }

  form.addEventListener("change", function (e) {
    if (e.target && e.target.type === "radio") {
      answers[e.target.name] = e.target.value;
      save();
      updateProgress();
      if (!results.hidden) renderResults(false);
    }
  });

  /* ---------- results ---------- */
  function renderResults(scroll) {
    var gaps = DATA.practices.filter(function (p) { return answers[p.id] !== "yes"; });
    var met = total - gaps.length;
    var title = document.getElementById("results-title");
    var summary = document.getElementById("results-summary");
    var gapsEl = document.getElementById("gaps");

    results.classList.toggle("is-ready", gaps.length === 0);
    document.getElementById("score-fill").style.width = (met / total * 100) + "%";

    if (gaps.length === 0) {
      title.textContent = "All 15 requirements met";
      summary.textContent = "Based on your answers, your company meets every Level 1 requirement. Before you affirm in SPRS, make sure you could show evidence for each answer: an account list, a visitor log, antivirus settings, and so on.";
      gapsEl.innerHTML = "";
      return finish(scroll);
    }

    title.textContent = met + " of " + total + " requirements met";
    summary.textContent = gaps.length === 1
      ? "You have 1 gap to close before you can claim Level 1. It’s listed below with the official requirement it maps to."
      : "You have " + gaps.length + " gaps to close before you can claim Level 1. They’re listed below with the official requirement each one maps to.";

    gapsEl.innerHTML = "";
    var h = document.createElement("h3");
    h.className = "gaps-title";
    h.textContent = "Gaps to close";
    gapsEl.appendChild(h);

    var list = document.createElement("ol");
    list.className = "gap-list";
    DATA.families.forEach(function (fam) {
      gaps.filter(function (p) { return p.family === fam.code; }).forEach(function (p) {
        var li = document.createElement("li");
        li.className = "gap";
        li.innerHTML =
          '<p class="gap-meta"><span class="gap-id"></span><span class="gap-fam"></span></p>' +
          '<p class="gap-q"></p><p class="gap-req"></p>';
        li.querySelector(".gap-id").textContent = p.id;
        li.querySelector(".gap-fam").textContent = fam.name;
        li.querySelector(".gap-q").textContent = p.question;
        li.querySelector(".gap-req").textContent = "Requirement: " + p.requirement;
        list.appendChild(li);
      });
    });
    gapsEl.appendChild(list);
    finish(scroll);
  }

  function finish(scroll) {
    results.hidden = false;
    if (scroll) {
      results.scrollIntoView({ behavior: "smooth", block: "start" });
      results.focus({ preventScroll: true });
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (answeredCount() === total) renderResults(true);
  });

  document.getElementById("reset").addEventListener("click", function () {
    answers = {};
    clearSaved();
    Array.prototype.forEach.call(form.querySelectorAll('input[type="radio"]'), function (r) { r.checked = false; });
    results.hidden = true;
    updateProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("edit-answers").addEventListener("click", function () {
    var first = form.querySelector("fieldset");
    if (first) first.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.getElementById("print").addEventListener("click", function () { window.print(); });

  /* ---------- start ---------- */
  showPanel(location.hash.slice(1) || "level-1");
  updateProgress();
})();
