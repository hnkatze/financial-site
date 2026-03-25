import { describe, it, expect } from 'vitest';
import { siteData } from './site';
import { navigation } from './navigation';
import { services } from './services';
import { testimonials } from './testimonials';
import { team } from './team';
import { partners } from './partners';
import { footerData } from './footer';
import { pagesSeo } from './pages-seo';
import { homeContent } from './content/home';
import { aboutContent } from './content/about';
import { servicesPageContent } from './content/services-page';
import { contactContent } from './content/contact';
import { calculatorContent } from './content/calculator';
import { headerContent } from './content/header';

describe('site data', () => {
  it('has required fields', () => {
    expect(siteData.name).toBeTruthy();
    expect(siteData.url).toMatch(/^https?:\/\//);
    expect(siteData.telephone).toBeTruthy();
    expect(siteData.address.city).toBeTruthy();
    expect(siteData.address.country).toBeTruthy();
  });

  it('has social links as array', () => {
    expect(Array.isArray(siteData.social)).toBe(true);
    expect(siteData.social.length).toBeGreaterThan(0);
  });
});

describe('navigation', () => {
  it('has at least 3 nav items', () => {
    expect(navigation.length).toBeGreaterThanOrEqual(3);
  });

  it('all items have label and href', () => {
    for (const item of navigation) {
      expect(item.label).toBeTruthy();
      expect(item.href).toMatch(/^\//);
    }
  });

  it('includes home link', () => {
    expect(navigation.some((item) => item.href === '/')).toBe(true);
  });
});

describe('services', () => {
  it('has at least 3 services', () => {
    expect(services.length).toBeGreaterThanOrEqual(3);
  });

  it('each service has required fields', () => {
    for (const service of services) {
      expect(service.id).toBeTruthy();
      expect(service.title).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(service.icon).toBeTruthy();
      expect(service.features.length).toBeGreaterThan(0);
      expect(service.href).toMatch(/^\/services#/);
    }
  });

  it('service IDs are unique', () => {
    const ids = services.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('testimonials', () => {
  it('has at least 2 testimonials', () => {
    expect(testimonials.length).toBeGreaterThanOrEqual(2);
  });

  it('each testimonial has required fields', () => {
    for (const t of testimonials) {
      expect(t.name).toBeTruthy();
      expect(t.content).toBeTruthy();
      expect(t.rating).toBeGreaterThanOrEqual(1);
      expect(t.rating).toBeLessThanOrEqual(5);
    }
  });
});

describe('team members', () => {
  it('has at least 2 members', () => {
    expect(team.length).toBeGreaterThanOrEqual(2);
  });

  it('each member has name, role, and bio', () => {
    for (const member of team) {
      expect(member.name).toBeTruthy();
      expect(member.role).toBeTruthy();
      expect(member.bio).toBeTruthy();
    }
  });
});

describe('partners', () => {
  it('has at least 2 partners', () => {
    expect(partners.length).toBeGreaterThanOrEqual(2);
  });

  it('each partner has a name', () => {
    for (const partner of partners) {
      expect(partner.name).toBeTruthy();
    }
  });
});

describe('footer data', () => {
  it('has service links', () => {
    expect(footerData.sections.services.links.length).toBeGreaterThan(0);
  });

  it('has company links', () => {
    expect(footerData.sections.company.links.length).toBeGreaterThan(0);
  });

  it('all links have label and href', () => {
    const allLinks = [
      ...footerData.sections.services.links,
      ...footerData.sections.company.links,
      ...footerData.sections.legal.links,
    ];
    for (const link of allLinks) {
      expect(link.label).toBeTruthy();
      expect(link.href).toBeTruthy();
    }
  });
});

describe('pages SEO', () => {
  const pages = ['home', 'about', 'services', 'contact', 'calculator'] as const;

  it('has SEO for all pages', () => {
    for (const page of pages) {
      expect(pagesSeo[page]).toBeDefined();
    }
  });

  it('each page has title and description', () => {
    for (const page of pages) {
      expect(pagesSeo[page].title).toBeTruthy();
      expect(pagesSeo[page].description).toBeTruthy();
      expect(pagesSeo[page].title.length).toBeLessThanOrEqual(70);
      expect(pagesSeo[page].description.length).toBeLessThanOrEqual(160);
    }
  });
});

describe('home content', () => {
  it('hero has all required fields', () => {
    expect(homeContent.hero.title).toBeTruthy();
    expect(homeContent.hero.titleAccent).toBeTruthy();
    expect(homeContent.hero.subtitle).toBeTruthy();
    expect(homeContent.hero.primaryCta.text).toBeTruthy();
    expect(homeContent.hero.primaryCta.href).toMatch(/^\//);
    expect(homeContent.hero.secondaryCta.text).toBeTruthy();
  });

  it('features has 4 items with icons', () => {
    expect(homeContent.features.items).toHaveLength(4);
    for (const item of homeContent.features.items) {
      expect(item.icon).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(item.description).toBeTruthy();
    }
  });

  it('stats has 4 items', () => {
    expect(homeContent.stats.items).toHaveLength(4);
  });

  it('CTA has both buttons', () => {
    expect(homeContent.cta.primaryCta.text).toBeTruthy();
    expect(homeContent.cta.secondaryCta.text).toBeTruthy();
  });
});

describe('about content', () => {
  it('mission has title and paragraphs', () => {
    expect(aboutContent.mission.title).toBeTruthy();
    expect(aboutContent.mission.paragraphs.length).toBeGreaterThan(0);
  });

  it('values has at least 4 items', () => {
    expect(aboutContent.values.items.length).toBeGreaterThanOrEqual(4);
    for (const value of aboutContent.values.items) {
      expect(value.title).toBeTruthy();
      expect(value.description).toBeTruthy();
    }
  });

  it('timeline has milestones in chronological order', () => {
    const years = aboutContent.timeline.milestones.map((m) => parseInt(m.year));
    for (let i = 1; i < years.length; i++) {
      expect(years[i]).toBeGreaterThanOrEqual(years[i - 1]);
    }
  });
});

describe('contact content', () => {
  it('form has fields with labels', () => {
    const { fields } = contactContent.form;
    expect(fields.name.label).toBeTruthy();
    expect(fields.email.label).toBeTruthy();
    expect(fields.phone.label).toBeTruthy();
    expect(fields.subject.label).toBeTruthy();
    expect(fields.message.label).toBeTruthy();
  });

  it('form has subject options', () => {
    expect(contactContent.form.fields.subject.options.length).toBeGreaterThan(0);
  });

  it('form has success message', () => {
    expect(contactContent.form.success.title).toBeTruthy();
    expect(contactContent.form.success.text).toBeTruthy();
  });
});

describe('calculator content', () => {
  it('has tips array', () => {
    expect(calculatorContent.tips.items.length).toBeGreaterThan(0);
    for (const tip of calculatorContent.tips.items) {
      expect(tip.title).toBeTruthy();
      expect(tip.description).toBeTruthy();
    }
  });
});

describe('header content', () => {
  it('has logo text and CTA', () => {
    expect(headerContent.logoText).toBeTruthy();
    expect(headerContent.ctaText).toBeTruthy();
    expect(headerContent.ctaHref).toMatch(/^\//);
  });
});

describe('Spanish accents validation', () => {
  it('no "ano" without ñ in content', () => {
    const allText = JSON.stringify(homeContent) + JSON.stringify(aboutContent);
    // "ano" as standalone word (not part of another word like "mano")
    expect(allText).not.toMatch(/\bano\b/i);
    expect(allText).not.toMatch(/\banos\b/i);
  });

  it('uses proper accents in common financial terms', () => {
    const allText = JSON.stringify(homeContent) + JSON.stringify(services);
    // Should find accented versions
    expect(allText).toContain('Préstamo');
    expect(allText).toContain('Asesoría');
  });
});
