export const scrollToTarget = (id: string) => {
  setTimeout(() => {
    const element = document.getElementById(id);
    console.log(element, "element by id");
    element?.scrollIntoView();
    element?.scrollIntoView(false);
    element?.scrollIntoView({ block: "end" });
    element?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, 10);
};
