export const logo = `${process.env.REACT_APP_CDN_URL}/global/images/logo.png`;

// element
export const div = document.createElement("div");

// regex

export const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const regexForName = /^[A-Z a-z]{4,29}$/;
export const regexForUser =
  /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
