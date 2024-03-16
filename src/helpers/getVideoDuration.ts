export function getVideoDuration(duration: number) {
  const numberFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });

  const seconds = Math.floor(duration % 60);
  const minutes = Math.floor(duration / 60) % 60;
  const hours = Math.floor(duration / 3600);

  if (hours <= 0) {
    return `${minutes}:${numberFormatter.format(seconds)}`;
  } else if (hours > 0) {
    return `${hours}:${numberFormatter.format(
      minutes
    )}:${numberFormatter.format(seconds)}`;
  }
}
