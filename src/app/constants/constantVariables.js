export const div = document.createElement("div");

//regex

export const regexForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export const regexForName = RegExp(/^[A-Z a-z]{4,29}$/);
export const regexForUser = RegExp(
  /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/
);
