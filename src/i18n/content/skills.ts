import type { Locale } from "../config";
import type { SkillId } from "@/data/skills";

/**
 * One sentence per skill, naming the project it was used on and the specific
 * job it did there.
 *
 * The rule these are written to: a sentence that would be equally true on
 * anyone else's portfolio is not worth the hover. "Component architecture" is
 * a claim; "the Revio owner dashboard and ArMenu's menu editor" is checkable —
 * both are linked from the projects section, so a reader can go and look.
 *
 * Where no project backs a skill — Python, n8n, Supabase — the sentence says
 * what it is actually for instead of inventing a credit. A reviewer who spots
 * one invented claim stops believing the other seventeen.
 *
 * Length: the detail rail is `text-xs` inside `pb-26`, so roughly three lines.
 * Past about 130 characters a sentence starts colliding with the chips above.
 *
 * Keyed by `SkillId`, so adding a skill without a Turkish sentence — or leaving
 * a sentence behind after deleting one — fails the build rather than the page.
 */
export type SkillCopy = Record<SkillId, string>;

const SKILL_COPY: Record<Locale, SkillCopy> = {
  en: {
    "csharp-dotnet":
      "The API behind all four products — .NET 8 for FitApp and Revio, .NET 10 for ArMenu, EF Core throughout.",
    mysql:
      "FitApp's and Revio's schema: EF Core migrations, and indexes added from query plans rather than from guesses.",
    postgresql:
      "ArMenu's database, with row-level security so one restaurant can never read another's menu.",
    python:
      "Not in the products — in the scripts around them: data wrangling and one-off glue between services.",
    "rest-api-design":
      "FitApp's single contract, consumed by iOS, Android and web without one platform-specific branch.",
    typescript:
      "Revio's and ArMenu's dashboards and this site — strict mode, no `any`, the type layer as the documentation.",
    react:
      "The Revio owner dashboard and ArMenu's menu editor, the second of those on React 19.",
    nextjs:
      "FitApp's web client and this site — App Router, server components, a deliberately small client bundle.",
    javascript:
      "Underneath the TypeScript: the runtime semantics you still have to know once the types are compiled away.",
    tailwindcss:
      "Revio, ArMenu and this site — design tokens as CSS variables, so dark mode needs no second stylesheet.",
    "swift-swiftui":
      "FitApp's iOS client — MVVM, Swift Charts for the progress views, async/await in the networking layer.",
    "kotlin-android":
      "FitApp's Android client, and the BT Support request tracker that runs on Firebase with no server of its own.",
    git: "Branch per feature, and commits that explain why rather than what — this repository's history is the sample.",
    docker:
      "ArMenu's chiseled .NET image and Revio's container; this site ships the same way, onto a Hetzner host.",
    n8n: "Not one of the products here but the operations around one — workflow automation for a small business.",
    supabase:
      "Postgres, auth and storage for prototypes that do not justify writing and hosting an API of their own.",
    firebase:
      "Realtime data and auth for the BT Support Android client, which is why it needs no backend of its own.",
    vercel:
      "Where this site was first deployed. It now runs on my own Docker host, and the code still supports both.",
  },
  tr: {
    "csharp-dotnet":
      "Dört ürünün de API'si — FitApp ve Revio'da .NET 8, ArMenu'de .NET 10, hepsinde EF Core.",
    mysql:
      "FitApp ve Revio'nun şeması: EF Core migration'ları ve tahminle değil sorgu planına bakarak eklenen indeksler.",
    postgresql:
      "ArMenu'nün veritabanı; satır düzeyi güvenlikle bir restoran diğerinin menüsünü hiçbir koşulda okuyamıyor.",
    python:
      "Ürünlerin içinde değil, çevresindeki betiklerde: veri düzenleme ve servisler arası tek seferlik tutkal kod.",
    "rest-api-design":
      "FitApp'in tek sözleşmesi; iOS, Android ve web onu tek bir platforma özel dal açmadan tüketiyor.",
    typescript:
      "Revio ve ArMenu panelleri ile bu site — strict mod, `any` yok; tip katmanı dokümantasyonun kendisi.",
    react:
      "Revio'nun işletme paneli ve ArMenu'nün menü editörü; ikincisi React 19 üzerinde.",
    nextjs:
      "FitApp'in web istemcisi ve bu site — App Router, server component'ler, bilerek küçük tutulan istemci paketi.",
    javascript:
      "TypeScript'in altındaki katman: tipler derlenip gittiğinde hâlâ bilmen gereken çalışma zamanı davranışı.",
    tailwindcss:
      "Revio, ArMenu ve bu site — CSS değişkeni olarak tasarım token'ları, ikinci bir stil dosyası olmadan karanlık mod.",
    "swift-swiftui":
      "FitApp'in iOS istemcisi — MVVM, ilerleme ekranlarında Swift Charts, ağ katmanında async/await.",
    "kotlin-android":
      "FitApp'in Android istemcisi ve kendi sunucusu olmadan Firebase üzerinde çalışan BT Destek talep takip aracı.",
    git: "Özellik başına dal ve ne yaptığını değil neden yaptığını anlatan commit'ler — örneği bu reponun geçmişi.",
    docker:
      "ArMenu'nün chiseled .NET imajı ve Revio'nun konteyneri; bu site de aynı yolla bir Hetzner sunucusuna çıkıyor.",
    n8n: "Buradaki ürünlerden biri değil, birinin etrafındaki operasyon — küçük bir işletme için iş akışı otomasyonu.",
    supabase:
      "Kendi API'sini yazmayı ve barındırmayı hak etmeyen prototipler için Postgres, kimlik doğrulama ve depolama.",
    firebase:
      "BT Destek Android istemcisi için gerçek zamanlı veri ve kimlik doğrulama — bu yüzden kendi arka ucu yok.",
    vercel:
      "Bu sitenin ilk yayına çıktığı yer. Şimdi kendi Docker sunucumda çalışıyor, kod ikisini de destekliyor.",
  },
};

export function getSkillCopy(locale: Locale): SkillCopy {
  return SKILL_COPY[locale];
}
