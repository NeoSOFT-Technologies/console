// element
export const div = document.createElement("div");

// regex

export const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const regexForName = /^[ A-Za-z]{4,29}$/;
export const regexForUser =
  /^[\dA-Za-z]([._-](?![._-])|[\dA-Za-z]){3,18}[\dA-Za-z]$/;
export const regForPassword = /^[\d!$%&*@A-Za-z]{8,15}$/;
