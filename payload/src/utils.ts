export const isAdmin = ({ req: { user } }): boolean => {
  return user?.Role?.name === "Admin" || false;
};
