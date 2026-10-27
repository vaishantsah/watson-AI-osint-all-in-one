import {
  siChessdotcom,
  siDocker,
  siGithub,
  siHabr,
  siMedium,
  siPinterest,
  siReddit,
  siSoundcloud,
  siStackoverflow,
  siSteam,
  siTelegram,
  siTwitch,
  type SimpleIcon,
} from 'simple-icons'

// Real brand marks from Simple Icons (CC0), keyed by site name in mock data.
const icons: Record<string, SimpleIcon> = {
  GitHub: siGithub,
  Reddit: siReddit,
  Steam: siSteam,
  Twitch: siTwitch,
  Medium: siMedium,
  Telegram: siTelegram,
  Pinterest: siPinterest,
  'Stack Overflow': siStackoverflow,
  'Chess.com': siChessdotcom,
  SoundCloud: siSoundcloud,
  Habr: siHabr,
  'Docker Hub': siDocker,
}

export function BrandIcon({ site, className = '' }: { site: string; className?: string }) {
  const icon = icons[site]
  if (!icon) return null
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={icon.path} />
    </svg>
  )
}
