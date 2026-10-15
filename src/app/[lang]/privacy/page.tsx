import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { getLocale, type Locale } from "@/i18n";

/**
 * Privacy policy of CareerPilot, the personal job-search tool that reads the
 * owner's Gmail. Google's OAuth consent screen links here, so the page must
 * state exactly what the app does with Google data — no more, no less.
 */
type Policy = {
  title: string;
  updated: string;
  intro: string;
  sections: ReadonlyArray<{ heading: string; body: readonly string[] }>;
};

const contact = "altinayutku0@gmail.com";

const policies: Record<Locale, Policy> = {
  en: {
    title: "CareerPilot — Privacy Policy",
    updated: "Last updated: 15 October 2026",
    intro:
      "CareerPilot is a personal tool built and used by Utku Altınay to find internship and junior job postings and to apply to them. It is not offered to the public: the only Google account it accesses is its owner's.",
    sections: [
      {
        heading: "Google data the app accesses",
        body: [
          "Read access (gmail.readonly): job-alert e-mails from job boards (for example Kariyer.net, Indeed and LinkedIn alerts), from which the posting title, company, location and link are extracted; and replies in the threads of applications CareerPilot sent, of which the sender and the first 300 characters are kept to show that a company answered.",
          "Send access (gmail.send): application e-mails to companies, each one reviewed and approved by the owner before it is sent.",
          "CareerPilot does not delete, modify or label e-mails, and does not read any other message.",
        ],
      },
      {
        heading: "How the data is used",
        body: [
          "Extracted posting text is scored against the owner's CV and used to draft application text. For this, the posting text is sent to Anthropic's Claude API. E-mail addresses and other personal content from the mailbox are not part of what is sent.",
          "Google data is not sold, not used for advertising, and not shared with anyone else.",
          "CareerPilot's use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.",
        ],
      },
      {
        heading: "Storage and retention",
        body: [
          "Data is stored in a database on a private server operated by the owner and in its backups. The OAuth token is kept in a file readable only by the application.",
          "Data is kept for as long as the owner uses the tool and is deleted on request.",
        ],
      },
      {
        heading: "Revoking access",
        body: [
          "Access can be revoked at any time at https://myaccount.google.com/permissions. After that, CareerPilot can no longer read or send e-mail.",
        ],
      },
      {
        heading: "Contact",
        body: [`Questions about this policy: ${contact}`],
      },
    ],
  },
  tr: {
    title: "CareerPilot — Gizlilik Politikası",
    updated: "Son güncelleme: 15 Ekim 2026",
    intro:
      "CareerPilot, Utku Altınay'ın staj ve junior ilanlarını bulmak ve bunlara başvurmak için geliştirdiği ve yalnızca kendisinin kullandığı kişisel bir araçtır. Herkese açık bir hizmet değildir: eriştiği tek Google hesabı sahibininkidir.",
    sections: [
      {
        heading: "Uygulamanın eriştiği Google verileri",
        body: [
          "Okuma izni (gmail.readonly): İş ilanı sitelerinden gelen uyarı e-postaları (örneğin Kariyer.net, Indeed ve LinkedIn uyarıları); bunlardan ilan başlığı, şirket, konum ve bağlantı çıkarılır. Ayrıca CareerPilot'un gönderdiği başvuruların yazışmalarına gelen yanıtlar; bunların yalnızca göndereni ve ilk 300 karakteri, şirketin yanıt verdiğini göstermek için saklanır.",
          "Gönderme izni (gmail.send): Şirketlere başvuru e-postaları; her biri gönderilmeden önce sahibi tarafından incelenip onaylanır.",
          "CareerPilot e-posta silmez, değiştirmez, etiketlemez ve başka hiçbir iletiyi okumaz.",
        ],
      },
      {
        heading: "Verilerin kullanımı",
        body: [
          "Çıkarılan ilan metni sahibinin özgeçmişiyle karşılaştırılarak puanlanır ve başvuru metni taslağı için kullanılır. Bunun için ilan metni Anthropic'in Claude API'sine gönderilir. E-posta adresleri ve posta kutusundaki diğer kişisel içerik gönderilmez.",
          "Google verileri satılmaz, reklam için kullanılmaz ve kimseyle paylaşılmaz.",
          "CareerPilot'un Google API'lerinden aldığı bilgileri kullanması ve aktarması, Sınırlı Kullanım (Limited Use) koşulları dahil Google API Hizmetleri Kullanıcı Verileri Politikası'na uygundur.",
        ],
      },
      {
        heading: "Saklama süresi",
        body: [
          "Veriler, sahibinin işlettiği özel bir sunucudaki veritabanında ve yedeklerinde tutulur. OAuth anahtarı yalnızca uygulamanın okuyabildiği bir dosyada saklanır.",
          "Veriler araç kullanıldığı sürece tutulur ve talep edildiğinde silinir.",
        ],
      },
      {
        heading: "Erişimi geri alma",
        body: [
          "Erişim https://myaccount.google.com/permissions adresinden her an geri alınabilir. Sonrasında CareerPilot e-posta okuyamaz ve gönderemez.",
        ],
      },
      {
        heading: "İletişim",
        body: [`Bu politika hakkında sorular: ${contact}`],
      },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: policies[locale].title,
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: { en: "/en/privacy", tr: "/tr/privacy", "x-default": "/en/privacy" },
    },
  };
}

export default async function PrivacyPolicy() {
  const policy = policies[await getLocale()];

  return (
    <article className="py-14 sm:py-20">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{policy.title}</h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{policy.updated}</p>
        <p className="mt-8 max-w-(--measure-prose) text-lg leading-relaxed text-muted-foreground text-pretty-balance">
          {policy.intro}
        </p>
        <div className="mt-12 space-y-10">
          {policy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
              <div className="mt-4 space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="max-w-(--measure-prose) leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}
