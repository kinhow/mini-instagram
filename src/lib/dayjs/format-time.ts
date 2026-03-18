import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function formatRelativeTime(dateString: string): string {
  return dayjs(dateString).fromNow();
}
