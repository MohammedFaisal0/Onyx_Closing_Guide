// Utilities
const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => [...el.querySelectorAll(q)];

const state = {
  theme: localStorage.getItem("onyx_theme") || "dark",
  checks: JSON.parse(localStorage.getItem("onyx_checks") || "{}"),
};

function setTheme(theme){
  if(theme === "light"){
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
  state.theme = theme;
  localStorage.setItem("onyx_theme", theme);
}

// Enhanced Accordion with smooth animations
function bindAccordions(){
  $$(".accordion-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const accordion = btn.closest(".bg-white, .dark\\:bg-gray-800, .card-hover");
      if(accordion) {
        const isOpening = !accordion.classList.contains("open");
        accordion.classList.toggle("accordion");
        accordion.classList.toggle("open");
        
        const body = accordion.querySelector(".accordion-body");
        if(body) {
          if(isOpening) {
            body.classList.remove("hidden");
            // Smooth scroll to accordion if opening
            setTimeout(() => {
              const rect = accordion.getBoundingClientRect();
              if(rect.top < 100) {
                window.scrollTo({
                  top: window.pageYOffset + rect.top - 120,
                  behavior: "smooth"
                });
              }
            }, 100);
          } else {
            body.classList.add("hidden");
          }
        }
        
        // Add ripple effect
        const ripple = document.createElement("span");
        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.3);
          width: 100px;
          height: 100px;
          margin-top: -50px;
          margin-right: -50px;
          animation: ripple 0.6s;
          pointer-events: none;
        `;
        btn.style.position = "relative";
        btn.style.overflow = "hidden";
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      }
    });
  });
}
function setAllAcc(open){
  $$(".accordion-btn").forEach(btn => {
    const accordion = btn.closest(".bg-white, .dark\\:bg-gray-800");
    if(accordion) {
      if(open) {
        accordion.classList.add("accordion", "open");
        const body = accordion.querySelector(".accordion-body");
        if(body) body.classList.remove("hidden");
      } else {
        accordion.classList.remove("open");
        const body = accordion.querySelector(".accordion-body");
        if(body) body.classList.add("hidden");
      }
    }
  });
}

// Enhanced Copy buttons with animations
function bindCopy(){
  $$(".copyBtn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const text = btn.dataset.copy || "";
      const originalContent = btn.innerHTML;
      
      try{
        await navigator.clipboard.writeText(text);
        
        // Success animation
        btn.innerHTML = '<span class="inline-flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>تم النسخ</span>';
        btn.classList.add("bg-emerald-100", "text-emerald-700", "border-emerald-300");
        btn.classList.remove("bg-white", "text-gray-700", "border-gray-200");
        
        // Add scale animation
        btn.style.transform = "scale(1.05)";
        setTimeout(() => {
          btn.style.transform = "";
        }, 200);
        
        setTimeout(() => {
          btn.innerHTML = originalContent;
          btn.classList.remove("bg-emerald-100", "text-emerald-700", "border-emerald-300");
          btn.classList.add("bg-white", "text-gray-700", "border-gray-200");
        }, 2000);
      }catch(e){
        // Error state
        btn.innerHTML = "❌ خطأ";
        btn.classList.add("bg-red-100", "text-red-700", "border-red-300");
        setTimeout(() => {
          btn.innerHTML = originalContent;
          btn.classList.remove("bg-red-100", "text-red-700", "border-red-300");
        }, 2000);
      }
    });
  });
}

// Enhanced Scrollspy + progress with smooth behavior
function bindScroll(){
  const bar = $("#readBar");
  const header = $("#mainHeader");
  const tocLinks = $$(".tocLink");
  const sections = tocLinks
    .map(a => $(a.getAttribute("href")))
    .filter(Boolean);

  let ticking = false;
  let lastScrollTop = 0;
  
  function onScroll(){
    if(!ticking){
      window.requestAnimationFrame(()=>{
        const doc = document.documentElement;
        const scrollTop = window.pageYOffset || doc.scrollTop;
        const scrolled = scrollTop / (doc.scrollHeight - doc.clientHeight);
        
        // Progress bar
        if(bar) {
          bar.style.transform = `scaleX(${Math.min(1, Math.max(0, scrolled))})`;
        }

        // Header scroll effect
        if(header) {
          if(scrollTop > 50) {
            header.classList.add("scrolled");
            header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
          } else {
            header.classList.remove("scrolled");
            header.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
          }
        }

        // Active section detection
        let current = sections[0];
        for(const s of sections){
          const rect = s.getBoundingClientRect();
          if(rect.top <= 150) current = s;
        }
        
        // Update active TOC link with smooth transition
        tocLinks.forEach(a => {
          const isActive = a.getAttribute("href") === `#${current.id}`;
          a.classList.toggle("active", isActive);
        });
        
        const activeText = $("#activeSectionText");
        if(activeText) {
          activeText.textContent = current ? current.querySelector("h3")?.textContent || "جاهز" : "جاهز";
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, {passive:true});
  onScroll();
  
  // Smooth scroll for anchor links
  tocLinks.forEach(link => {
    link.addEventListener("click", (e)=>{
      const href = link.getAttribute("href");
      if(href.startsWith("#")){
        const target = $(href);
        if(target){
          e.preventDefault();
          const offset = 100;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // Smooth scroll for header checklist link
  const checklistLink = document.querySelector('a[href="#checklist"]');
  if(checklistLink){
    checklistLink.addEventListener("click", (e)=>{
      const target = $("#checklist");
      if(target){
        e.preventDefault();
        const offset = 100;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  }
}

// Checklist persistence
function bindChecklist(){
  const boxes = $$(`#checklist input[type="checkbox"]`);
  boxes.forEach((box, idx)=>{
    const key = `c_${idx}`;
    box.checked = !!state.checks[key];
    box.addEventListener("change", ()=>{
      state.checks[key] = box.checked;
    });
  });

  $("#saveChecks").addEventListener("click", ()=>{
    localStorage.setItem("onyx_checks", JSON.stringify(state.checks));
    $("#checkSavedMsg").textContent = "تم الحفظ ✅";
    setTimeout(()=> $("#checkSavedMsg").textContent = "", 1200);
  });

  $("#resetChecks").addEventListener("click", ()=>{
    if(!confirm("متأكد تريد تصفير العلامات؟")) return;
    state.checks = {};
    boxes.forEach(b=> b.checked = false);
    localStorage.setItem("onyx_checks", JSON.stringify(state.checks));
  });
}

// Sidebar collapse
// Sidebar collapse removed: collapse button and JS handler deleted

// Back to top
function bindBackTop(){
  $("#backToTop").addEventListener("click", ()=>{
    window.scrollTo({top:0, behavior:"smooth"});
  });
}

// Expand/collapse all
function bindGlobalAcc(){
  const expandBtn = $("#expandAll");
  const collapseBtn = $("#collapseAll");
  if(expandBtn) expandBtn.addEventListener("click", ()=> setAllAcc(true));
  if(collapseBtn) collapseBtn.addEventListener("click", ()=> setAllAcc(false));
}

// Enhanced Header: theme toggle with animation
function bindTheme(){
  // Bind any element with the `.theme-toggle` class
  $$(".theme-toggle").forEach(btn => {
    btn.addEventListener("click", (e)=>{
      e.preventDefault();
      const newTheme = state.theme === "dark" ? "light" : "dark";
      
      // Add click animation
      btn.style.transform = "scale(0.9)";
      setTimeout(() => {
        btn.style.transform = "";
        setTheme(newTheme);
      }, 150);
    });
  });
}

// Intersection Observer for scroll animations
function initScrollAnimations(){
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  $$(".card-hover, section, article").forEach(el => {
    el.classList.add("fade-in-on-scroll");
    observer.observe(el);
  });
}

// Enhanced initialization
(function init(){
  setTheme(state.theme);
  bindTheme();
  bindAccordions();
  bindCopy();
  bindScroll();
  bindChecklist();
  bindBackTop();
  bindGlobalAcc();
  
  // Initialize scroll animations after a short delay
  setTimeout(() => {
    initScrollAnimations();
  }, 100);
  
  // Add loaded class to body for entrance animations
  document.body.classList.add("loaded");
})();
