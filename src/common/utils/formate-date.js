export default function formateDate(timestamp) {
  return timestamp?.toDate().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
