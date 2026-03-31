import { useSelector } from "react-redux";

export default function useUserProfile() {
  const { user } = useSelector((state) => state.user);
  return user;
}
