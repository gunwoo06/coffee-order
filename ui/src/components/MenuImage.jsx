import { useState } from 'react'

function resolveSrc(src) {
  if (!src) return ''
  if (typeof src === 'string') return src
  if (typeof src === 'object' && src.default) return src.default
  return ''
}

export default function MenuImage({ src, alt, className }) {
  const [failed, setFailed] = useState(false)
  const url = resolveSrc(src)

  if (failed || !url) {
    return (
      <div className={`menu-image-fallback ${className ?? ''}`} role="img" aria-label={alt}>
        <span aria-hidden="true">☕</span>
      </div>
    )
  }

  return (
    <img
      src={url}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
