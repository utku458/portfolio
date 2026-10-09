import type { Locale } from "../config";

/**
 * Keys are stable identifiers, not display strings: the Turkish file is matched
 * against the English one by `ExperienceId` and `EducationId`, so renaming a job
 * title cannot quietly orphan its translation.
 */
export type ExperienceId = "innova-bilisim";
export type EducationId = "medipol-mis" | "arel-computer-programming";
export type SpokenLanguageId = "turkish" | "english" | "japanese";

export interface ProfileCopy {
  readonly title: string;
  readonly headline: string;
  readonly bio: readonly string[];
  readonly socialLabel: {
    readonly github: string;
    readonly linkedin: string;
    readonly email: string;
  };
  readonly languageName: Record<SpokenLanguageId, string>;
  readonly experience: Record<
    ExperienceId,
    { readonly role: string; readonly summary: string; readonly achievements: readonly string[] }
  >;
  readonly education: Record<
    EducationId,
    { readonly degree: string; readonly field: string; readonly note: string }
  >;
}

const PROFILE_COPY: Record<Locale, ProfileCopy> = {
  en: {
    title: "Full-Stack Developer",
    headline:
      "I build multi-platform systems — one .NET API at the centre, native iOS, Android and React clients around it.",
    bio: [
      "I'm a full-stack developer based in İstanbul. I arrived here through two complementary routes: an Associate degree in Computer Programming at İstanbul Arel, and Management Information Systems at İstanbul Medipol. That mix is why I tend to start from the business process and work back to the architecture, instead of the other way around.",
      "Most of what I build is multi-platform. A C# .NET API with a MySQL store sits in the middle, and Kotlin, Swift and React clients sit around it. Designing that boundary well — one contract, three very different consumers — is the part of the job I enjoy most.",
      "I also automate the unglamorous parts. n8n workflows, NFC-driven review collection and WebAR menus all started as a small-business problem someone described to me in a single sentence.",
    ],
    socialLabel: {
      github: "GitHub profile",
      linkedin: "LinkedIn profile",
      email: "Send an email",
    },
    languageName: {
      turkish: "Turkish",
      english: "English",
      japanese: "Japanese",
    },
    experience: {
      "innova-bilisim": {
        role: "IT Support Intern",
        summary:
          "Twelve months inside the IT operations of a large systems integrator — nine months long-term plus a three-month placement.",
        achievements: [
          "Handled first- and second-line support requests for internal users, reproducing issues before escalating them.",
          "Worked day to day inside an enterprise ticketing and asset-tracking process — the direct reason I later built a request-tracking tool of my own.",
        ],
      },
    },
    education: {
      "medipol-mis": {
        degree: "Bachelor's Degree",
        field: "Management Information Systems",
        note: "Where the analytical half comes from: process modelling, data management and reading a business requirement before writing code for it.",
      },
      "arel-computer-programming": {
        degree: "Associate Degree",
        field: "Computer Programming",
        note: "The engineering foundation: algorithms, databases and object-oriented design.",
      },
    },
  },
  tr: {
    title: "Full-Stack Geliştirici",
    headline:
      "Çok platformlu sistemler kuruyorum — merkezde tek bir .NET API, çevresinde native iOS, Android ve React istemciler.",
    bio: [
      "İstanbul'da yaşayan bir full-stack geliştiriciyim. Buraya birbirini tamamlayan iki yoldan geldim: İstanbul Arel'de Bilgisayar Programcılığı ön lisansı ve İstanbul Medipol'de Yönetim Bilişim Sistemleri. Bu karışım, tersi yerine önce iş sürecinden başlayıp mimariye doğru çalışmamın sebebi.",
      "Yaptığım işlerin çoğu çok platformlu. Ortada MySQL ile çalışan bir C# .NET API, çevresinde Kotlin, Swift ve React istemciler duruyor. O sınırı iyi tasarlamak — tek sözleşme, birbirinden çok farklı üç tüketici — işin en keyif aldığım kısmı.",
      "Bir de işin parlak olmayan kısımlarını otomatikleştiriyorum. n8n akışları, NFC ile yorum toplama ve WebAR menüler; hepsi birinin bana tek cümleyle anlattığı bir küçük işletme problemi olarak başladı.",
    ],
    socialLabel: {
      github: "GitHub profili",
      linkedin: "LinkedIn profili",
      email: "E-posta gönder",
    },
    languageName: {
      turkish: "Türkçe",
      english: "İngilizce",
      japanese: "Japonca",
    },
    experience: {
      "innova-bilisim": {
        role: "BT Destek Stajyeri",
        summary:
          "Büyük bir sistem entegratörünün BT operasyonlarında on iki ay — dokuz ay uzun dönem, artı üç aylık staj.",
        achievements: [
          "Şirket içi kullanıcıların birinci ve ikinci seviye destek taleplerini karşıladım; yukarı taşımadan önce sorunu kendim tekrar ürettim.",
          "Kurumsal bir talep takip ve envanter sürecinin içinde günlük olarak çalıştım — sonradan kendi talep takip aracımı yazmamın doğrudan sebebi bu.",
        ],
      },
    },
    education: {
      "medipol-mis": {
        degree: "Lisans",
        field: "Yönetim Bilişim Sistemleri",
        note: "Analitik tarafın geldiği yer: süreç modelleme, veri yönetimi ve kod yazmadan önce bir iş gereksinimini okuyabilmek.",
      },
      "arel-computer-programming": {
        degree: "Ön Lisans",
        field: "Bilgisayar Programcılığı",
        note: "Mühendislik temeli: algoritmalar, veritabanları ve nesne yönelimli tasarım.",
      },
    },
  },
};

export function getProfileCopy(locale: Locale): ProfileCopy {
  return PROFILE_COPY[locale];
}
