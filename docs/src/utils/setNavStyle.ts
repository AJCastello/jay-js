function setNavStyle(id: string){
  const allItems = document.querySelectorAll(".docs-article-topics") as NodeListOf<HTMLElement>;
  allItems.forEach((item) => {
    if (item.getAttribute("href") === `#${id}`) {
      item.classList.add("text-primary", "border-l-2", "border-primary");
      item.classList.remove("border-transparent");
    } else {
      item.classList.remove("text-primary", "border-l-2", "border-primary");
      item.classList.add("border-transparent");
    }
  });
}

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("h2.doc-section") as NodeListOf<HTMLElement>;
  const docsSectionProgress = document.querySelector(".docs-section-progress") as HTMLElement;
  let currentSection = "";
  sections.forEach((section) => {
    const sectionClientRect = section.getBoundingClientRect()
    const docsSectionProgressClientRect = docsSectionProgress.getBoundingClientRect()
    if (docsSectionProgressClientRect.top > sectionClientRect.top) {
      currentSection = section.id;
    }
  });  
  setNavStyle(currentSection);
});