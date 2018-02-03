/**
extract a title string from a larger markdown string

returns null or empty string when title exists
*/
export default function (markdown) {
  const match = markdown.match(/^# (.+)/i)
  return match && match[1] && match[1].trim()
}
