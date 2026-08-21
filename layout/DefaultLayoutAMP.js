export function splitSections(sections = []) {
  const normalizedSections = Array.isArray(sections) ? sections : [];

  const headerSections = normalizedSections.filter(
    (section) => section.position === "header"
  );

  const contentSections = normalizedSections.filter(
    (section) => section.position !== "header" && section.position !== "footer"
  );

  const footerSections = normalizedSections.filter(
    (section) => section.position === "footer"
  );

  const hasRightSidebar = contentSections.some(
    (section) => section.position === "right-sidebar"
  );

  const mainSections = contentSections.filter(
    (section) => section.position !== "right-sidebar"
  );

  const rightSidebarSections = contentSections.filter(
    (section) => section.position === "right-sidebar"
  );

  return {
    headerSections,
    contentSections,
    footerSections,
    hasRightSidebar,
    mainSections,
    rightSidebarSections,
  };
}