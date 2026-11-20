/**
 * Team members. Each published member gets a card on the Team page and a
 * profile page at /<lang>/team/<slug>/.
 *
 * To add a person: copy a draft entry, fill in both languages, set `draft: false`.
 * Only publish people who have agreed to be listed.
 * Docs: docs/features/team-profiles.md
 */
import type { Locale } from '../lib/paths';

export interface MemberCopy {
  name: string;
  role: string;
  /** One or two sentences for the card. */
  bio: string;
  /** Longer introduction for the profile page. */
  about: string;
  skills: string[];
  experience: string[];
}

export interface TeamMember {
  /** URL segment, lowercase letters, digits and dashes only. */
  slug: string;
  /** Shown in the avatar circle until a photo is added. */
  initial: string;
  /** Optional photo path under /public, e.g. "/team/bryan.jpg". */
  photo?: string;
  /** Drafts are not built into the site. */
  draft: boolean;
  links: {
    linkedin?: string;
    github?: string;
  };
  copy: Record<Locale, MemberCopy>;
}

export const TEAM: TeamMember[] = [
  {
    slug: 'bryan',
    initial: 'B',
    draft: false,
    links: {
      linkedin: 'https://www.linkedin.com/in/phanducthinh',
      // github: 'https://github.com/<username>',  // add when the account exists
    },
    copy: {
      en: {
        name: 'Phan Đức Thịnh (Bryan)',
        role: 'Fullstack software engineer',
        bio: '5+ years building web and mobile apps, from mobile and TV apps to web apps and AI features.',
        about:
          'Bryan is a fullstack software engineer with 5+ years of experience building web and mobile apps. His work covers mobile and TV apps with video playback, web apps built with Vue.js, and a generative-AI image app. He is completing an M.Sc. in Data Science at HUST and brings AI and data skills into product work.',
        skills: ['Mobile apps', 'Web apps', 'Java', 'Android', 'Vue.js', 'Android TV', 'Video streaming', 'Machine learning'],
        experience: [
          'Software engineer, web & mobile apps · 2024 – present',
          'Software engineer, mobile apps, web apps & generative AI · 2022 – 2024',
          'B.Sc. Computer Science, HUST · M.Sc. Data Science, HUST (in progress)',
        ],
      },
      vi: {
        name: 'Phan Đức Thịnh (Bryan)',
        role: 'Kỹ sư phần mềm fullstack',
        bio: 'Hơn 5 năm phát triển ứng dụng web và di động, từ ứng dụng di động, TV đến web app và tính năng AI.',
        about:
          'Bryan là kỹ sư phần mềm fullstack với hơn 5 năm kinh nghiệm phát triển ứng dụng web và di động. Anh đã làm ứng dụng di động và TV có trình phát video, ứng dụng web với Vue.js và ứng dụng tạo ảnh bằng AI. Anh đang học Thạc sĩ Khoa học Dữ liệu tại ĐH Bách khoa Hà Nội và đưa kỹ năng AI, dữ liệu vào sản phẩm.',
        skills: ['Ứng dụng di động', 'Ứng dụng web', 'Java', 'Android', 'Vue.js', 'Android TV', 'Video streaming', 'Học máy'],
        experience: [
          'Kỹ sư phần mềm, ứng dụng web & di động · 2024 – nay',
          'Kỹ sư phần mềm, ứng dụng di động, web & AI tạo sinh · 2022 – 2024',
          'Cử nhân Khoa học Máy tính, ĐHBK Hà Nội · Thạc sĩ Khoa học Dữ liệu, ĐHBK Hà Nội (đang học)',
        ],
      },
    },
  },
  // ---- Draft slots: fill in and set draft: false when the person agrees to be listed ----
  draftMember('fullstack-engineer', 'Fullstack engineer', 'Kỹ sư fullstack'),
  draftMember('ai-engineer', 'AI / ML engineer', 'Kỹ sư AI / ML'),
  draftMember('business-analyst', 'Business analyst', 'Chuyên viên phân tích nghiệp vụ'),
];

function draftMember(slug: string, roleEn: string, roleVi: string): TeamMember {
  return {
    slug,
    initial: '?',
    draft: true,
    links: {},
    copy: {
      en: { name: '[Member name]', role: roleEn, bio: '[Short bio]', about: '[Longer introduction]', skills: [], experience: [] },
      vi: { name: '[Tên thành viên]', role: roleVi, bio: '[Giới thiệu ngắn]', about: '[Giới thiệu chi tiết]', skills: [], experience: [] },
    },
  };
}

/** Members that appear on the site. */
export function publishedMembers(): TeamMember[] {
  return TEAM.filter((m) => !m.draft);
}
