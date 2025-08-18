export function calculateTimeLeft(date) {
  const diff = new Date(date) - new Date();
  if (diff <= 0) return "Over, Focus Mains";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  return { days, hours };
  
}
