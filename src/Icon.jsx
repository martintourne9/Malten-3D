// One stroke system across navigation, services, catalog and contact actions.
const paths = {
  arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
  'arrow-right': <path d="M4 12h16m-6-6 6 6-6 6" />,
  box: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="M3 8v9l9 5 9-5V8M12 13v9M7.5 5.5l9 5" /></>,
  pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  message: <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3H13a8.5 8.5 0 0 1 8 8v.5Z" />,
  whatsapp: <><path d="m4 16-1 5 5-1a9 9 0 1 0-4-4Z" /><path d="m8.4 7.2 1.4 2.5-1 1.1a9 9 0 0 0 4.4 4.4l1.1-1 2.5 1.4c-.4 1.6-1.5 2-3 1.4a12.9 12.9 0 0 1-6.8-6.8c-.6-1.5-.2-2.6 1.4-3Z" /></>,
  code: <><rect x="2" y="3" width="20" height="18" rx="3" /><path d="M2 8h20m-13 4-3 2.5 3 2.5m6-5 3 2.5-3 2.5" /><path d="M6 5.5h.01M9 5.5h.01" /></>,
  wrench: <path d="M20.5 7.5a5.5 5.5 0 0 1-7.1 6.8l-6.3 6.3a2.3 2.3 0 0 1-3.2-3.2l6.3-6.3a5.5 5.5 0 0 1 6.8-7.1l-3.5 3.5 3 3 4-3Z" />,
  gift: <><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M5 12v9h14v-9M12 8v13" /><path d="M12 8H8a3 3 0 1 1 3-3l1 3Zm0 0h4a3 3 0 1 0-3-3l-1 3Z" /></>,
  lamp: <><path d="M8 3h8l4 11H4L8 3Zm4 11v7m-5 0h10m1-7v4" /></>,
  store: <><path d="M4 10v11h16V10M3 7l2-4h14l2 4v3a3 3 0 0 1-4 2 3 3 0 0 1-5 0 3 3 0 0 1-5 0 3 3 0 0 1-4-2V7Zm0 0h18" /><path d="M9 21v-6h6v6" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  vase: <><path d="M8 3h8m-7 0v4c0 3-4 5-4 9a5 5 0 0 0 5 5h4a5 5 0 0 0 5-5c0-4-4-6-4-9V3M6 14h12" /></>,
  leaf: <><path d="M20 3C9 2 3 7 4 14s14 8 16-11Z" /><path d="M3 21 15 9" /></>,
  pencil: <><path d="m15 4 5 5M4 15 16 3a2.1 2.1 0 0 1 3 0l2 2a2.1 2.1 0 0 1 0 3L9 20l-6 1 1-6Z" /><path d="m4 15 5 5" /></>,
  droplet: <path d="M12 3C10 7 5 11 5 15a7 7 0 0 0 14 0c0-4-5-8-7-12Zm-3 12a3 3 0 0 0 3 3" />,
}

export default function Icon({ name, className = '' }) {
  return <svg className={`icon ${className}`.trim()} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name] || paths.box}</svg>
}
