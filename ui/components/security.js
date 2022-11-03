export const isSecure = () => {
  const attachShadow = String(Element.prototype.attachShadow);
  return attachShadow.indexOf('native') !== -1;
};