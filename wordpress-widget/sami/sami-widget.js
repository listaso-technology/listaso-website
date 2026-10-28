/* Listaso SAMI widget: behavior ported from the Next.js page (SamiExampleSelector,
   SamiConversation, SamiFaqAccordion, HomeMotion). Vanilla JS, scoped to #listaso-sami. */
(function () {
  var root = document.getElementById("listaso-sami");
  if (!root || root.getAttribute("data-lsm-ready")) return;
  root.setAttribute("data-lsm-ready", "1");

  var P = "lsm-";
  var CV = P + "SamiConversation-module__xp7AqW__";
  var EX = P + "SamiExamples-module__cPJdeG__";
  var QUESTIONS = [{"label":"Example of SAMI identifying inactive customers and preparing an Excel report","name":"SAMI","tag":"Illustrative purposes only","question":"Which customers haven't ordered in 60 days?","answer":"14 customers. The 3 who bought the most last quarter:","rows":[{"customer":"Customer 1","amount":"$4,210"},{"customer":"Customer 2","amount":"$3,880"},{"customer":"Customer 3","amount":"$2,940"}],"file":"inactive-customers.xlsx","followUp":"Export the full inactive-customer list to Excel.","inputPlaceholder":"Type your question…"},{"label":"Illustrative SAMI response about products running low","name":"SAMI","tag":"Illustrative purposes only","question":"Which products are running low?","answer":"3 products are below their minimum stock level:","rows":[{"label":"Queso fresco","value":"8 cases"},{"label":"Horchata 1 gal","value":"11 cases"},{"label":"Crema 32 oz","value":"5 cases"}],"file":"low-stock-review.pdf","followUp":"Prepare a stock review as a PDF.","inputPlaceholder":"Type your question…"},{"label":"Illustrative SAMI response about top customers","name":"SAMI","tag":"Illustrative purposes only","question":"Who are my top 10 customers this quarter?","answer":"Here are the top 3 of 10 customers by sales this quarter:","rows":[{"customer":"Customer 1","amount":"$18,420"},{"customer":"Customer 2","amount":"$16,780"},{"customer":"Customer 3","amount":"$14,350"}],"file":"top-10-customers.xlsx","followUp":"Export all 10 customers to Excel.","inputPlaceholder":"Type your question…"},{"label":"Illustrative SAMI response about sales by representative","name":"SAMI","tag":"Illustrative purposes only","question":"How much did each rep sell last week?","answer":"Last week's sales by representative:","rows":[{"label":"Alex Rivera","value":"$12,460"},{"label":"Maya Torres","value":"$10,850"},{"label":"Jordan Lee","value":"$9,320"}],"file":"weekly-rep-sales.pdf","followUp":"Prepare a PDF summary for the team.","inputPlaceholder":"Type your question…"},{"label":"Illustrative SAMI response about overdue invoices","name":"SAMI","tag":"Illustrative purposes only","question":"Which invoices are more than 30 days past due?","answer":"3 invoices in this sample are over 30 days past due:","rows":[{"label":"INV-2048 · Customer 1","value":"$1,280"},{"label":"INV-2051 · Customer 2","value":"$940"},{"label":"INV-2057 · Customer 3","value":"$615"}],"file":"overdue-invoices.pdf","followUp":"Put the overdue invoice list in a PDF.","inputPlaceholder":"Type your question…"},{"label":"Illustrative SAMI response about backorders","name":"SAMI","tag":"Illustrative purposes only","question":"What's on backorder, and who is waiting for it?","answer":"These backordered products have customers waiting:","rows":[{"label":"Queso fresco","value":"Customer 1"},{"label":"Horchata 1 gal","value":"Customer 2"},{"label":"Crema 32 oz","value":"Customer 3"}],"file":"backorders-by-customer.xlsx","followUp":"Export the backorders by customer to Excel.","inputPlaceholder":"Type your question…"}];
  var REPORT_ICON = '<svg viewBox="0 0 1024 1024" width="20" height="20" fill="currentColor" focusable="false" aria-hidden="true"><path d="M869.75 377.54c0-6.75-2.7-13.5-7.29-18.36l-246.51-263.52s0 0 0 0l-6.75-7.020c-5.13-5.4-12.15-8.64-19.71-8.64h-257.85c-97.74 0-177.39 79.65-177.39 177.66v508.95c0 98.010 79.65 177.39 177.39 177.39h360.45c98.010 0 177.66-79.65 177.66-177.39v-389.070zM623.24 182.6l163.62 174.69h-63.72c-55.080 0-99.63-44.82-99.63-99.63v-75.060zM692.36 890h-360.72c-68.040 0-123.39-55.35-123.39-123.39v-508.95c0-68.040 55.35-123.66 123.39-123.66h237.6v123.66c0 84.78 68.85 153.63 153.63 153.63h92.88v355.32c0 68.040-55.35 123.39-123.66 123.39z"/><path d="M341.9 664.010h76.68c8.499 0 15.39 6.891 15.39 15.39v76.68c0 8.499-6.891 15.39-15.39 15.39h-76.68c-8.499 0-15.39-6.891-15.39-15.39v-76.68c0-8.499 6.891-15.39 15.39-15.39z"/><path d="M478.25 590.57h67.5c11.033 0 19.98 8.947 19.98 19.98v141.21c0 11.033-8.947 19.98-19.98 19.98h-67.5c-11.033 0-19.98-8.947-19.98-19.98v-141.21c0-11.033 8.947-19.98 19.98-19.98z"/><path d="M614.6 497.69h58.32c13.568 0 24.57 11.002 24.57 24.57v224.64c0 13.568-11.002 24.57-24.57 24.57h-58.32c-13.568 0-24.57-11.002-24.57-24.57v-224.64c0-13.568 11.002-24.57 24.57-24.57z"/></svg>';
  var DELAYS = [0, 1200, 750, 850, 550, 550, 900, 950, 700, 4200, 560];
  var OUTRO = 10;
  var reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reduceMotion = reduceQuery.matches;
  var hasIO = "IntersectionObserver" in window;

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }
  function rowParts(row) {
    return { label: row.customer || row.label, value: row.amount || row.value };
  }

  /* ---------- Conversation ---------- */
  var stage = root.querySelector("." + EX + "stage");
  var template = stage && stage.querySelector("." + CV + "frame");
  var prompts = [].slice.call(root.querySelectorAll("." + EX + "prompt"));

  function Conversation(example) {
    var frame = template.cloneNode(true);
    var heading = frame.querySelector("." + CV + "heading small");
    if (heading) heading.textContent = example.tag;
    var sr = frame.querySelector(".lsm-sr-only");
    if (sr) {
      var rows = example.rows.map(function (r) { var p = rowParts(r); return p.label + ": " + p.value; }).join(". ");
      sr.textContent = example.label + ": " + example.question + " " + example.answer + " " + rows +
        (example.file ? " " + example.followUp + " Sample file: " + example.file + ". Preview only." : "");
    }
    var sequence = frame.querySelector("." + CV + "sequence");
    var input = frame.querySelector("." + CV + "input");
    var inputText = input.querySelector("span");
    var send = input.querySelector("." + CV + "send");
    inputText.textContent = example.inputPlaceholder;
    var messages = sequence.querySelector("." + CV + "messages");
    messages.innerHTML = "";

    var phase = 1, timer = null, inView = !hasIO, hovered = false, destroyed = false, nodes = {}, observer = null;

    function typing(key) {
      var t = el("div", CV + "typing");
      t.appendChild(el("i")); t.appendChild(el("i")); t.appendChild(el("i"));
      nodes[key] = t; messages.appendChild(t);
    }
    function drop(key) { if (nodes[key]) { nodes[key].remove(); delete nodes[key]; } }

    function render() {
      var visibleRows = phase < 4 ? 0 : Math.min(phase - 3, example.rows.length);
      if (!nodes.q) {
        nodes.q = el("div", CV + "message " + CV + "outgoing " + CV + "sent", example.question);
        messages.appendChild(nodes.q);
      }
      if (phase === 2 && !nodes.t1) typing("t1");
      if (phase >= 3) {
        drop("t1");
        if (!nodes.a) {
          nodes.a = el("div", CV + "message " + CV + "incoming");
          nodes.a.appendChild(el("p", null, example.answer));
          nodes.rowsDone = 0;
          messages.appendChild(nodes.a);
        }
        for (; nodes.rowsDone < visibleRows; nodes.rowsDone++) {
          var r = rowParts(example.rows[nodes.rowsDone]);
          var row = el("div", CV + "row");
          row.appendChild(el("span", null, r.label));
          row.appendChild(el("strong", null, r.value));
          nodes.a.appendChild(row);
        }
      }
      if (phase >= 7 && example.followUp && !nodes.f) {
        nodes.f = el("div", CV + "message " + CV + "outgoing", example.followUp);
        messages.appendChild(nodes.f);
      }
      if (phase === 8 && !nodes.t2) typing("t2");
      if (phase >= 9 && example.file && !nodes.r) {
        drop("t2");
        var pdf = /\.pdf$/.test(example.file);
        var m = el("div", CV + "message " + CV + "incoming " + CV + "reportMessage");
        m.appendChild(el("p", null, pdf ? "Your sample PDF report is ready." : "Your sample Excel report is ready."));
        var rep = el("span", CV + "report");
        var ic = el("span", CV + "reportIcon"); ic.setAttribute("aria-hidden", "true"); ic.innerHTML = REPORT_ICON;
        var det = el("span", CV + "reportDetails");
        det.appendChild(el("strong", null, example.file));
        det.appendChild(el("small", null, "Illustrative preview · no download"));
        var ty = el("span", CV + "reportType", pdf ? "PDF" : "XLSX"); ty.setAttribute("aria-hidden", "true");
        rep.appendChild(ic); rep.appendChild(det); rep.appendChild(ty);
        m.appendChild(rep);
        nodes.r = m; messages.appendChild(m);
      }
      if (phase === OUTRO) sequence.setAttribute("data-outro", "true"); else sequence.removeAttribute("data-outro");
      if (phase === 1) send.classList.add(CV + "sending"); else send.classList.remove(CV + "sending");
    }

    function reset() {
      messages.innerHTML = ""; nodes = {}; phase = 1; render();
    }
    function schedule() {
      window.clearTimeout(timer);
      if (destroyed || reduceMotion || !inView || document.hidden || hovered) return;
      timer = window.setTimeout(function () {
        if (phase === OUTRO) reset(); else { phase += 1; render(); }
        schedule();
      }, DELAYS[phase]);
    }

    if (reduceMotion) { phase = 9; }
    render();

    if (hasIO) {
      observer = new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting; schedule();
      }, { rootMargin: "0px 0px -12%", threshold: 0.3 });
      observer.observe(frame);
    }
    frame.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") { hovered = true; schedule(); } });
    frame.addEventListener("pointerleave", function () { hovered = false; schedule(); });
    var onVis = function () { schedule(); };
    document.addEventListener("visibilitychange", onVis);

    return {
      el: frame,
      destroy: function () {
        destroyed = true; window.clearTimeout(timer);
        document.removeEventListener("visibilitychange", onVis);
        if (observer) observer.disconnect();
      }
    };
  }

  if (stage && template && prompts.length) {
    var current = stage.querySelector("." + EX + "stageCurrent");
    var stageTag = current.nextElementSibling; // caption under the chat ("Illustrative data")
    var currentConv = null, active = 0, prevTimeout = null;
    template.parentNode.removeChild(template);
    currentConv = Conversation(QUESTIONS[0]);
    current.appendChild(currentConv.el);

    var select = function (index) {
      if (index === active) return;
      window.clearTimeout(prevTimeout);
      var old = stage.querySelector("." + EX + "stagePrevious");
      if (old) old.remove();
      var prev = el("div", EX + "stagePrevious");
      prev.setAttribute("aria-hidden", "true");
      prev.appendChild(currentConv.el);
      currentConv.destroy();
      stage.insertBefore(prev, current);
      stage.removeChild(current);
      current = el("div", EX + "stageCurrent");
      currentConv = Conversation(QUESTIONS[index]);
      current.appendChild(currentConv.el);
      stage.insertBefore(current, stageTag);
      if (stageTag) stageTag.textContent = QUESTIONS[index].tag;
      prompts[active].setAttribute("aria-pressed", "false"); prompts[active].removeAttribute("data-active");
      prompts[index].setAttribute("aria-pressed", "true"); prompts[index].setAttribute("data-active", "true");
      active = index;
      prevTimeout = window.setTimeout(function () { prev.remove(); }, 300);
    };
    prompts.forEach(function (btn, i) {
      btn.addEventListener("focus", function () { select(i); });
      btn.addEventListener("click", function () { select(i); });
      btn.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") select(i); });
    });
  }


  /* ---------- SAMI mark: intro video (optional), then rotation (SamiLogoMark) ---------- */
  (function () {
    var mark = root.querySelector('[class*="SamiLogoMark-module__"][data-playing]');
    if (!mark) return;
    var poster = mark.querySelector("img");
    var video = mark.querySelector("video");
    if (!poster) return;
    var scope = mark.closest("[data-sami-motion-scope]") || mark;
    var videoSrc = root.getAttribute("data-video-src");
    var VIDEO_TYPE = 'video/webm; codecs="vp9"';
    if (video && videoSrc) video.src = videoSrc;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    var fineHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    var coarse = window.matchMedia("(hover: none), (pointer: coarse)");
    var compact = window.matchMedia("(max-width: 47.999rem)");
    var inViewM = false, hovered = false, playing = false;
    var unavailable = !video || !videoSrc || !video.canPlayType(VIDEO_TYPE);
    var introComplete = unavailable, frame = 0, last = 0, angle = 0, velocity = 0;
    var autoTarget = unavailable ? 360 : null, returning = null, introFallback = 0;

    // The hero text waits for the entrance video (CSS keys on data-intro), with a 6 s safety net.
    function revealText() { window.clearTimeout(introFallback); mark.setAttribute("data-intro", "complete"); }
    if (!unavailable && !reduced.matches) {
      mark.setAttribute("data-intro", "pending");
      introFallback = window.setTimeout(revealText, 6000);
    }

    function canPlay() { return !unavailable && !reduced.matches && !document.hidden && inViewM; }
    function shouldRotate() {
      return introComplete && !playing && !reduced.matches && !document.hidden && inViewM &&
        (autoTarget !== null || coarse.matches || compact.matches || hovered);
    }
    function draw(now) {
      var elapsed = last ? Math.min(40, now - last) : 0;
      last = now;
      if (shouldRotate()) {
        var rev = coarse.matches || compact.matches ? 12000 : 8500;
        velocity += (360 / rev - velocity) * Math.min(1, elapsed / 500);
        angle += velocity * elapsed;
        if (autoTarget !== null && angle >= autoTarget) {
          if (!coarse.matches && !compact.matches && !hovered) { angle = autoTarget; velocity = 0; }
          autoTarget = null;
        }
      } else if (returning) {
        var progress = Math.min(1, (now - returning.start) / 1200);
        var sq = progress * progress, cu = sq * progress;
        angle = (2 * cu - 3 * sq + 1) * returning.angle + (cu - 2 * sq + progress) * returning.velocity * 1200 + (-2 * cu + 3 * sq) * returning.target;
        if (progress === 1) { angle = returning.target; velocity = 0; returning = null; }
      }
      poster.style.transform = "rotate(" + angle + "deg)";
      if (shouldRotate() || returning) frame = window.requestAnimationFrame(draw);
      else { frame = 0; last = 0; mark.setAttribute("data-rotating", "false"); }
    }
    function syncRotation() {
      if (reduced.matches) {
        window.cancelAnimationFrame(frame); frame = 0; last = 0; angle = 0; velocity = 0; autoTarget = null; returning = null;
        poster.style.transform = "rotate(0deg)"; mark.setAttribute("data-rotating", "false"); return;
      }
      if (!inViewM || document.hidden) {
        window.cancelAnimationFrame(frame); frame = 0; last = 0; returning = null; mark.setAttribute("data-rotating", "false"); return;
      }
      if (shouldRotate()) {
        returning = null; mark.setAttribute("data-rotating", "true");
        if (!frame) frame = window.requestAnimationFrame(draw);
        return;
      }
      var target = Math.round(angle / 360) * 360;
      if (!returning && Math.abs(target - angle) > 0.01) returning = { start: performance.now(), angle: angle, velocity: velocity, target: target };
      if (returning) { mark.setAttribute("data-rotating", "true"); if (!frame) frame = window.requestAnimationFrame(draw); }
      else mark.setAttribute("data-rotating", "false");
    }
    function settle(completed) {
      if (video) video.pause();
      playing = false;
      if (completed) { revealText(); introComplete = true; autoTarget = Math.round(angle / 360) * 360 + 360; }
      mark.setAttribute("data-playing", "false");
      syncRotation();
    }
    function playOnce() {
      if (playing || !canPlay()) return;
      playing = true;
      try {
        video.currentTime = 0;
        var pr = video.play();
        if (pr && pr.catch) pr.catch(function (err) {
          var aborted = err && err.name === "AbortError";
          if (!aborted) unavailable = true;
          settle(!aborted);
        });
      } catch { unavailable = true; settle(true); }
    }
    function updateMotion() {
      if (!canPlay() && playing) settle();
      if (canPlay() && !introComplete && !playing) playOnce();
      syncRotation();
    }
    if (video) {
      video.addEventListener("playing", function () {
        if (!canPlay()) { settle(); return; }
        mark.setAttribute("data-playing", "true"); syncRotation();
      });
      video.addEventListener("ended", function () { settle(true); });
      video.addEventListener("error", function () { unavailable = true; settle(true); });
    }
    scope.addEventListener("pointerenter", function (e) {
      if (!fineHover.matches || e.pointerType === "touch") return;
      hovered = true; if (introComplete) playOnce(); syncRotation();
    });
    scope.addEventListener("pointerleave", function () { hovered = false; syncRotation(); });
    document.addEventListener("visibilitychange", updateMotion);
    [reduced, coarse, compact].forEach(function (q) { q.addEventListener("change", updateMotion); });
    if (hasIO) {
      new IntersectionObserver(function (entries) { inViewM = entries[0].isIntersecting; updateMotion(); }, { threshold: 0.25 }).observe(mark);
    } else { inViewM = true; updateMotion(); }
  })();

  /* ---------- FAQ accordion ---------- */
  var faqButtons = [].slice.call(root.querySelectorAll("[aria-controls^='sami-faq-answer-']"));
  if (faqButtons.length) {
    var open = 0, hoverFaq = false, focusFaq = false, paused = false, faqTimer = null;
    var faqBox = faqButtons[0].closest("div").parentNode;
    var setOpen = function (i) {
      open = i;
      faqButtons.forEach(function (b, n) {
        var on = n === i;
        b.setAttribute("aria-expanded", on ? "true" : "false");
        var ans = document.getElementById(b.getAttribute("aria-controls"));
        if (ans) { ans.setAttribute("aria-hidden", on ? "false" : "true"); if (on) ans.setAttribute("data-open", "true"); else ans.removeAttribute("data-open"); }
        var plus = b.querySelector("[aria-hidden='true']");
        if (plus) plus.classList.toggle(P + "rotate-45", on);
      });
    };
    var faqSchedule = function () {
      window.clearInterval(faqTimer);
      if (reduceMotion || hoverFaq || focusFaq || paused || faqButtons.length < 2) return;
      faqTimer = window.setInterval(function () { setOpen((open + 1) % faqButtons.length); }, 9000);
    };
    faqButtons.forEach(function (b, i) {
      b.addEventListener("click", function () { setOpen(i); paused = true; faqSchedule(); });
    });
    faqBox.addEventListener("mouseenter", function () { hoverFaq = true; faqSchedule(); });
    faqBox.addEventListener("mouseleave", function () { hoverFaq = false; faqSchedule(); });
    faqBox.addEventListener("focusin", function () { focusFaq = true; faqSchedule(); });
    faqBox.addEventListener("focusout", function (e) { if (!faqBox.contains(e.relatedTarget)) { focusFaq = false; faqSchedule(); } });
    setOpen(0); faqSchedule();
  }

  /* ---------- Zoho form: resize message scoped to this form and origin ---------- */
  var zohoFrame = root.querySelector('iframe[src*="forms.zohopublic.com"]');
  if (zohoFrame) {
    var zohoUrl = new URL(zohoFrame.src);
    var zohoId = (zohoUrl.pathname.match(/\/formperma\/([A-Za-z0-9_-]+)$/) || [])[1];
    if (zohoId) {
      window.addEventListener("message", function (e) {
        if (e.origin !== zohoUrl.origin || e.source !== zohoFrame.contentWindow || typeof e.data !== "string") return;
        var parts = e.data.split("|");
        if ((parts.length !== 2 && parts.length !== 3) || parts[0] !== zohoId || !/^\d+$/.test(parts[1])) return;
        var h = Number(parts[1]) + 15;
        if (h >= 250 && h <= 5000) zohoFrame.style.height = h + "px";
      });
    }
  }

  /* ---------- Scroll reveals (HomeMotion) ---------- */
  if (!reduceMotion && hasIO) {
    var reveals = [].slice.call(root.querySelectorAll("[data-reveal]"));
    var sections = [].slice.call(root.querySelectorAll("[data-story-section]"));
    reveals.forEach(function (n) {
      var b = n.getBoundingClientRect();
      if (b.top < window.innerHeight * 0.92 && b.bottom > 0) n.setAttribute("data-revealed", "true");
    });
    root.classList.add("lsm-motion-ready");
    var revealIO = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.setAttribute("data-revealed", "true"); obs.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -12%", threshold: 0.14 });
    var storyIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        sections.forEach(function (s) {
          s.setAttribute("data-story-state", s === e.target ? "active" : s.getAttribute("data-story-state") || "future");
        });
      });
    }, { rootMargin: "-34% 0px -48%", threshold: 0 });
    reveals.forEach(function (n) { if (n.getAttribute("data-revealed") !== "true") revealIO.observe(n); });
    sections.forEach(function (s) { storyIO.observe(s); });
  }
})();
