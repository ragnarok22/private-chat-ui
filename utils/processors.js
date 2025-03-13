export const getInitials = (username) => {
  const names = username.split(" ");
  const initials = names.map((name) => name.charAt(0)).join("");
  return initials;
};
