export function isTextFieldFocused() {
  const element = document.activeElement as any ;

  if (element) {
    return (
      (element.tagName.toLowerCase() === "input" && element.type === "text") ||
      element.tagName.toLowerCase() === "textarea"
    );
  }
  return false;
}

