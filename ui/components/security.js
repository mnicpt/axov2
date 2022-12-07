export const isSecure = (element) => {
  const userModifyIsSafe =
    window.getComputedStyle(element)['user-modify'] !== 'read-write' &&
    window.getComputedStyle(element)['-moz-user-modify'] !== 'read-write' &&
    window.getComputedStyle(element)['-webkit-user-modify'] !== 'read-write';
    
  const designModeIsOff = document.designMode === 'off';
  const shadowRootIsNull = element.shadowRoot === null;

  return userModifyIsSafe && designModeIsOff && shadowRootIsNull;
};

export const preventSecurityOverrides = () => {
  document.execCommand('contentReadOnly', false, 'true');

  window.addEventListener('DOMContentLoaded', e => {
    const execCommand = document.execCommand;
    document.execCommand = (commandId, showUI, value) => {
      return execCommand('contentReadOnly', false, 'true');
    };
  });
};