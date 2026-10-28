import logo from '../assets/logo.png'

// The supplied artwork has its own dark backdrop; `lighten` blending lets it sit on the site background.
export default function Logo({ className = 'h-12', priority = false }) {
  return (
    <img
      src={logo}
      alt="Reps Thrive: Your Fitness Redefined"
      width="560"
      height="265"
      loading={priority ? 'eager' : 'lazy'}
      className={`logo-blend w-auto select-none ${className}`}
      draggable="false"
    />
  )
}
