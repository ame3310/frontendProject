const BACKEND_URL =
  import.meta.env.VITE_BACKEND_STATIC_URL || "http://localhost:3000";

export const getAvatarUrl = (user) => {
  return user?.avatar
    ? `${BACKEND_URL}/uploads/${user.avatar}`
    : "/default-avatar.png";
};
