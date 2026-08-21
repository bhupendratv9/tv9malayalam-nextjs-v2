import { Children } from "react";

export default function LayoutRightSidebar({ children }) {
  const items = Children.toArray(children);

  // const leftSidebar = items.filter(
  //   (child) => child?.props?.section?.position === "left-sidebar"
  // );

  const mainContent = items.filter(
    (child) => child?.props?.section?.position === "main"
  );

  const rightSidebar = items.filter(
    (child) => child?.props?.section?.position === "right-sidebar"
  );

  return (
    <main className="container">
      <div
        className={`mainWrapper ${
          rightSidebar.length > 0 ? "has-right-sidebar" : ""
        }`}
      >
        
        <section className="mainCol">
          {mainContent}
        </section>

        <aside className="rhsCol">
          {rightSidebar}
        </aside>

        {/* {rightSidebar.length > 0 && (
          <aside className="right-sidebar">
            {rightSidebar}
          </aside>
        )} */}


      </div>
    </main>
  );
}