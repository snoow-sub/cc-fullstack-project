// src/utils/datetimeFormatter.js

export function convertFormatDatetimeForLesson(lesson) {
  const formatDate = lesson.date.split("T")[0];
  const formatStarttimeHour = lesson.start_time.split(":")[0];
  const formatStarttimeMinite = lesson.start_time.split(":")[1];
  const formatEndtimeHour = lesson.end_time.split(":")[0];
  const formatEndtimeMinite = lesson.end_time.split(":")[1];

  return `${formatDate} ${formatStarttimeHour}:${formatStarttimeMinite}-${formatEndtimeHour}:${formatEndtimeMinite}`;
}
