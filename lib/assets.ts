/**
 * Central asset manifest. All media is self-hosted under /public
 * (local brand assets + premium Pexels imagery/video, optimized for web).
 */

export const VIDEO = {
  tech: "/video/tech.mp4", // teal network nodes — ambient backdrop
  sphere: "/video/sphere.mp4", // floating green sphere — object moment
  reelSocial: "/video/reel-social.mp4", // social platform icons reel
  reelTestimonial: "/video/reel-testimonial.mp4", // client testimonial reel
} as const;

export const ASSET = {
  billboard: "/assets/billboard-skincare.jpg", // OOH skincare campaign
  poster: "/assets/poster-production.jpg", // creative production poster
  feed: "/assets/feed-branding.jpg", // social feed / branding
  socialNight: "/assets/social-night.jpg", // creator at night w/ app icons
  socialGlow: "/assets/social-glow.jpg", // phone glow, FB/IG
  appContent: "/assets/app-content.jpg", // apps flying from phone
} as const;

export const IMG = {
  creativeTeam: "/img/creative-team.jpg",
  agencyMeeting: "/img/agency-meeting.jpg",
  editorStudio: "/img/editor-studio.jpg",
  fashionCampaign: "/img/fashion-campaign.jpg",
  productLux: "/img/product-lux.jpg",
  filmingSet: "/img/filming-set.jpg",
  creatorPhone: "/img/creator-phone.jpg",
  founderPortrait: "/img/founder-portrait.jpg",
  womanCreative: "/img/woman-creative.jpg",
  neonPortrait: "/img/neon-portrait.jpg",
  abstractColor: "/img/abstract-color.jpg",
  contentCreator: "/img/content-creator.jpg",
} as const;
