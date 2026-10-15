# SEO + GEO Yol Haritası
**Siteler:** utkualtinay.com · kuaforvahidezafer.com.tr
**Tarih:** 15 Ekim 2026
**Yöntem:** Canlı sitelerin ham HTML'i (JS çalıştırmadan, yani bir AI crawler'ının gördüğü haliyle), robots.txt, sitemap.xml ve llms.txt durumu ile tarayıcıda render edilmiş içerik incelendi.

Hazır dosyalar `dosyalar/` klasöründe:

| Dosya | Hedef konum |
|---|---|
| `dosyalar/utkualtinay/robots.txt` | `public/robots.txt` (veya `app/robots.ts` ile üret) |
| `dosyalar/utkualtinay/llms.txt` · `llms-full.txt` | `public/` |
| `dosyalar/kuafor/robots.txt` · `llms.txt` · `llms-full.txt` | `public/` |

---

## 0. Mevcut Durum Denetimi (Bulgular)

### utkualtinay.com: sağlam temel, entity katmanı yok

| Kontrol | Durum | Not |
|---|---|---|
| SSR/SSG (Next.js) | ✅ | Ham HTML'de ~148 KB metin var, botlar her şeyi okuyabiliyor |
| `<title>`, meta description, canonical | ✅ | |
| hreflang `en` / `tr` / `x-default` | ✅ | |
| OpenGraph + Twitter Card (1200×630) | ✅ | |
| **JSON-LD (Person / ProfilePage / WebSite)** | ⚠️ **Kısmi** | *Düzeltme:* İlk denetimde "yok" yazılmıştı, hatalıydı. Sitede bir Person bloğu ve proje sayfalarında birer SoftwareSourceCode bloğu vardı. Ama `@id` bağlantısı yoktu, proje URL'lerinde dil öneki eksikti ve kapalı kaynak projeler de SoftwareSourceCode olarak işaretlenmişti. **15 Ekim 2026'da bu sorunlar giderildi.** |
| **llms.txt** | ❌ 404 | |
| robots.txt | ⚠️ | `Disallow: /documents/`, CV PDF'ini botlardan saklıyor (aşağıda tartışılıyor) |
| Demo URL'leri | ⚠️ | `*.46.225.37.55.sslip.io` güven/otorite sinyali olarak zayıf, entity'ye bağlanmıyor |
| Blog / teknik yazı | ❌ | Topical authority (konu otoritesi) üretecek içerik yok |

### kuaforvahidezafer.com.tr: kritik render sorunu

| Kontrol | Durum | Not |
|---|---|---|
| **Ham HTML içeriği** | ❌ **KRİTİK** | Vite + React SPA. Sunucu yalnızca `<div id="root"></div>` döndürüyor (1.9 KB). **GPTBot, ClaudeBot, PerplexityBot ve OAI-SearchBot JavaScript çalıştırmaz**, yani adres, saatler ve hizmetler bu botlar için **yok**. Googlebot render eder ama gecikmeli |
| Title + meta description | ✅ | Statik HTML'de mevcut |
| `og:image` | ❌ | Yorum satırında (TODO). WhatsApp/Instagram paylaşımlarında görsel çıkmıyor |
| JSON-LD (HairSalon) | ❌ Yok | |
| llms.txt | ❌ 404 | |
| Sayfa mimarisi | ❌ | Tek sayfa (`#hizmetler`, `#iletisim`). Her hizmet için ayrı URL yok, bu yüzden "Fatih saç boyası" gibi sorgularda sıralanacak sayfa yok |
| Görseller | ❌ | Tek görsel **Unsplash stok fotoğrafı**. Görsel SEO değeri sıfır, özgünlük sinyali negatif |
| Fiyat bilgisi | ❌ | AI motorları "fiyatı ne kadar?" sorularında kaynak gösteremiyor |
| Adres | ⚠️ | "Molla Gürani Mah., Erseven Sokağı, 34093 Fatih/İstanbul": **bina/kapı numarası yok**. Google İşletme Profili (GBP) ile birebir aynı olmalı |
| Konumlandırma | ⚠️ | Site kendini **"Kadın Kuaförü"** olarak tanımlıyor. Brief'te geçen **"erkek berberi"** sitede hiç yok (bkz. Bölüm 2.1 uyarısı) |

> **Öncelik sırası:** Kuaför sitesinin SPA → statik HTML (prerender/SSG) dönüşümü, bu dokümandaki **tek en etkili** iş. O yapılmadan JSON-LD dışındaki GEO taktiklerinin AI botlarına etkisi çok sınırlı kalır.

---

# BÖLÜM 1: utkualtinay.com (Kişisel Marka / Yazılımcı Portföyü)

## 1.1 Arama ve AI Arama Niyeti Analizi

### Sorgu kümeleri (semantic clusters)

İsim sorguları dışında kişisel portföyler için gerçekçi hedef, **niş + konum + stack** kesişimidir. "Full stack developer" gibi kısa ve genel kuyrukta (short-tail) LinkedIn, Indeed ve ajanslarla yarışılamaz.

| Küme | Niyet | Örnek sorgular (TR / EN) | Hedef sayfa |
|---|---|---|---|
| **A: Marka / İsim** | Navigasyonel | "Utku Altınay", "Utku Altınay developer", "utku458 github" | `/en`, `/tr` |
| **B: İşe alım** | Ticari (recruiter) | ".NET developer İstanbul", "C# full stack developer Türkiye", "SwiftUI Kotlin .NET developer", "junior full stack developer Istanbul open to work" | `/en`, `/tr` + `/en/about` |
| **C: Freelance** | İşlemsel | "freelance .NET API geliştirici", "QR menü yazılımı geliştirici", "NFC müşteri geri bildirim sistemi", "SaaS MVP geliştirme İstanbul" | `/tr/hizmetler` (yeni) |
| **D: Vaka analizi / teknik** | Bilgisel | "multi-tenant SaaS .NET 8 mimarisi", "SignalR real-time Expo app", "WebAR QR menu", "one .NET API multiple native clients" | `/en/projects/*` + blog |
| **E: Ürün** | Navigasyonel/Ticari | "Revio NFC", "ArMenu QR menü AR" | Proje sayfaları ↔ revioapp.com.tr |

**Long-tail blog konu fikirleri** (D kümesi; LLM'lerin alıntıladığı içerik türü bu):
1. "Tek bir .NET 8 API ile SwiftUI, Kotlin ve Next.js istemcilerini beslemek: sözleşme-öncelikli mimari" (FitApp)
2. "Multi-tenant SaaS'ta tenant izolasyonu: EF Core global query filter vs. ayrı şema" (Revio)
3. "Tarayıcıda AR menü: model-viewer, USDZ/GLB ve QR akışı" (ArMenu)
4. "SignalR + Expo: masaüstü RPG için gerçek zamanlı oturum senkronizasyonu" (TTRPG Companion)
5. "NFC NDEF etiketleriyle müşteri geri bildirimi toplamak: donanımdan dashboard'a" (Revio)
6. "Hangfire + OpenTelemetry ile .NET arka plan işlerini gözlemlemek"

Her yazı = bir soruya net cevap, bir mimari diyagram, ölçülebilir sonuç. LLM'ler "how to X with Y" sorularında tam olarak bu yapıyı alıntılar.

### LLM'lerin bir geliştiriciyi "güvenilir" saymasını sağlayan sinyaller (E-E-A-T → Entity)

LLM'ler "kim bu kişi?" sorusuna **birden fazla bağımsız kaynakta tutarlı biçimde geçen** bilgiyle cevap verir. Hedef, aynı kimliği (isim + unvan + konum + stack) her yerde **birebir aynı ifadeyle** tekrarlamak.

| Sinyal | Eylem | Etki |
|---|---|---|
| **Tutarlı "entity cümlesi"** | Her profilde aynı tek cümle: *"Utku Altınay, İstanbul'da yaşayan full-stack geliştirici. Merkezinde C# .NET API'si olan; iOS (SwiftUI), Android (Kotlin) ve React/Next.js istemcileri bulunan çok platformlu sistemler geliştiriyor."* | Çok yüksek |
| GitHub profil README | Aynı cümle + utkualtinay.com linki + pinlenmiş 6 repo (her birinde README, demo linki, mimari şeması) | Yüksek |
| GitHub repo hijyeni | `ar-menu` ve `BT-Destek` dışındakileri de (mümkünse) public yap veya "case study" reposu aç. Her repoda `homepage` alanı → ilgili proje sayfası | Yüksek |
| LinkedIn | Headline = entity cümlesinin kısası; "Featured" bölümüne case study linkleri; Website alanı → utkualtinay.com | Yüksek |
| Cross-posting | Blog yazılarını **dev.to / Hashnode / Medium**'a `canonical_url` ile kopyala. Bu platformlar LLM eğitim ve arama verisinde yoğun temsil ediliyor | Yüksek |
| Ürün siteleri | revioapp.com.tr footer: "Geliştiren: Utku Altınay" → utkualtinay.com (+ Organization schema'da `founder`) | Orta-yüksek |
| Demo alan adları | `*.sslip.io` → `fitapp.utkualtinay.com`, `armenu.utkualtinay.com` gibi alt alan adları. Her demo, kök entity'ye link verir | Orta |
| Topluluk | Stack Overflow cevapları, GitHub'da açık kaynak PR'ları, NuGet/npm paketi (küçük bir util bile olsa), meetup konuşmaları | Orta (birikimli) |
| Product Hunt / Peerlist | Revio ve ArMenu için launch sayfası | Orta |
| Wikidata | Bireysel geliştiriciler için notability eşiği belirsiz; kendi yarattığın öğe silinebilir. **Bağımsız basın/konferans kaynağı oluşmadan önerilmez** | Düşük/riskli |

---

## 1.2 GEO & Bilgi Grafiği (Knowledge Graph) Entegrasyonu

### Mimari: tek `@graph`, sabit `@id`'ler

Tüm sayfalar aynı Person'a `@id` ile referans verir: `https://utkualtinay.com/#person`. Böylece Google ve LLM'ler her sayfada "aynı varlık" sinyali alır. Tekrar eden, birbiriyle çelişebilecek Person blokları oluşmaz.

```
#person ◄── #website.publisher
   ▲            ▲
   │            │
/en#profilepage.mainEntity     /en/projects/revio#project.author / creator
```

### 1) Ana sayfa (`/en`): Person + WebSite + ProfilePage

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://utkualtinay.com/#person",
      "name": "Utku Altınay",
      "alternateName": ["Utku Altinay", "utku458"],
      "url": "https://utkualtinay.com/en",
      "image": {
        "@type": "ImageObject",
        "url": "https://utkualtinay.com/images/utku-altinay.jpg",
        "width": 800,
        "height": 800
      },
      "jobTitle": "Full-Stack Developer",
      "description": "Full-stack developer in İstanbul building multi-platform systems: a C# .NET API at the centre, with native iOS (SwiftUI), Android (Kotlin) and React/Next.js clients around it.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "İstanbul",
        "addressCountry": "TR"
      },
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "İstanbul Medipol Üniversitesi" },
        { "@type": "CollegeOrUniversity", "name": "İstanbul Arel Üniversitesi" }
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "degree",
          "name": "Associate Degree in Computer Programming",
          "recognizedBy": { "@type": "CollegeOrUniversity", "name": "İstanbul Arel Üniversitesi" }
        }
      ],
      "knowsAbout": [
        "C#", ".NET", "ASP.NET Core", "Entity Framework Core", "REST API design",
        "SignalR", "Redis", "Hangfire", "MediatR", "OpenTelemetry",
        "PostgreSQL", "MySQL", "TypeScript", "React", "Next.js", "Tailwind CSS",
        "SwiftUI", "Kotlin", "Android SDK", "React Native", "Expo",
        "Docker", "Supabase", "Firebase", "n8n", "NFC", "WebAR",
        "Multi-tenant SaaS architecture"
      ],
      "knowsLanguage": [
        { "@type": "Language", "name": "Turkish", "alternateName": "tr" },
        { "@type": "Language", "name": "English", "alternateName": "en" },
        { "@type": "Language", "name": "Japanese", "alternateName": "ja" }
      ],
      "seeks": {
        "@type": "Demand",
        "description": "Full-time full-stack / .NET developer roles and selective freelance projects"
      },
      "sameAs": [
        "https://github.com/utku458",
        "https://www.linkedin.com/in/utku-alt%C4%B1nay-7620b3336/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://utkualtinay.com/#website",
      "url": "https://utkualtinay.com/",
      "name": "Utku Altınay",
      "description": "Portfolio and case studies of Utku Altınay, full-stack developer (.NET, React, SwiftUI, Kotlin).",
      "inLanguage": ["en", "tr"],
      "publisher": { "@id": "https://utkualtinay.com/#person" }
    },
    {
      "@type": "ProfilePage",
      "@id": "https://utkualtinay.com/en#profilepage",
      "url": "https://utkualtinay.com/en",
      "name": "Utku Altınay — Full-Stack Developer",
      "inLanguage": "en",
      "isPartOf": { "@id": "https://utkualtinay.com/#website" },
      "mainEntity": { "@id": "https://utkualtinay.com/#person" },
      "dateCreated": "2025-01-01T00:00:00+03:00",
      "dateModified": "2026-10-15T00:00:00+03:00",
      "hasPart": [
        { "@id": "https://utkualtinay.com/en/projects/fitapp#project" },
        { "@id": "https://utkualtinay.com/en/projects/revio#project" },
        { "@id": "https://utkualtinay.com/en/projects/armenu#project" },
        { "@id": "https://utkualtinay.com/en/projects/ttrpg-companion#project" },
        { "@id": "https://utkualtinay.com/en/projects/bt-support#project" }
      ]
    }
  ]
}
</script>
```

> ⚠️ **Doğrula, sonra yayınla:**
> - **`image`:** Gerçek bir profil fotoğrafı yolu ver (kare, ≥ 400 px). Entity tanıma için yüzlü fotoğraf çok etkili.
> - **`alumniOf`:** İstersen üniversitelere `"sameAs": "https://www.wikidata.org/wiki/Q…"` ekle. Q-numarasını wikidata.org'da **kendin bulup doğrula**. Yanlış ID, seni yanlış kuruma bağlar.
> - **`dateCreated`:** Sitenin gerçek yayın tarihini yaz.
> - **`/tr` sayfası:** Aynı graph'ı `"inLanguage": "tr"`, `url`/`@id` = `/tr` ve Türkçe `name`/`description` ile kullan. `#person` `@id`'si **aynı kalmalı**.
> - **Eksik profiller:** Varsa X/Twitter, Stack Overflow, dev.to ve Peerlist profillerini `sameAs`'e ekle. Yalnızca gerçekten aktif profiller girsin.

### 2) Vaka analizi sayfası (`/en/projects/revio`): TechArticle + WebApplication

Kaynak kodu public olmayan projeler için `SoftwareSourceCode` **kullanma**. Doğru tip `SoftwareApplication` ya da `WebApplication`'dır. Vaka analizi sayfasının kendisi `TechArticle` olur.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": "https://utkualtinay.com/en/projects/revio#article",
      "headline": "Revio: a multi-tenant SaaS for NFC-based customer feedback",
      "description": "Case study: how Revio collects customer feedback through NFC tags and routes it into a multi-tenant .NET dashboard.",
      "url": "https://utkualtinay.com/en/projects/revio",
      "inLanguage": "en",
      "author": { "@id": "https://utkualtinay.com/#person" },
      "publisher": { "@id": "https://utkualtinay.com/#person" },
      "isPartOf": { "@id": "https://utkualtinay.com/#website" },
      "datePublished": "2025-01-15T00:00:00+03:00",
      "dateModified": "2026-10-15T00:00:00+03:00",
      "image": "https://utkualtinay.com/en/projects/revio/opengraph-image",
      "about": { "@id": "https://utkualtinay.com/en/projects/revio#project" },
      "keywords": ["multi-tenant SaaS", "NFC", "NDEF", ".NET 8", "customer feedback"]
    },
    {
      "@type": "WebApplication",
      "@id": "https://utkualtinay.com/en/projects/revio#project",
      "name": "Revio",
      "url": "https://www.revioapp.com.tr/",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "Multi-tenant SaaS that collects customer feedback through NFC tags.",
      "creator": { "@id": "https://utkualtinay.com/#person" },
      "author": { "@id": "https://utkualtinay.com/#person" },
      "dateCreated": "2025-01"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://utkualtinay.com/en" },
        { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://utkualtinay.com/en#projects" },
        { "@type": "ListItem", "position": 3, "name": "Revio", "item": "https://utkualtinay.com/en/projects/revio" }
      ]
    }
  ]
}
</script>
```

> Gerçek ve yayınlanmış bir fiyatlandırma varsa `WebApplication`'a `offers` (`Offer` + `price` + `priceCurrency`) ekle. Yoksa ekleme. Uydurma fiyat, structured data ihlalidir.

### 3) Açık kaynak proje (`/en/projects/armenu`): SoftwareSourceCode

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "@id": "https://utkualtinay.com/en/projects/armenu#project",
  "name": "ArMenu",
  "description": "Multi-tenant QR menus with in-browser augmented reality previews of dishes.",
  "codeRepository": "https://github.com/utku458/ar-menu",
  "url": "https://utkualtinay.com/en/projects/armenu",
  "programmingLanguage": ["C#", "TypeScript"],
  "runtimePlatform": [".NET 8", "Web browser"],
  "author": { "@id": "https://utkualtinay.com/#person" },
  "creator": { "@id": "https://utkualtinay.com/#person" },
  "dateCreated": "2026-09",
  "targetProduct": {
    "@type": "WebApplication",
    "name": "ArMenu",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web"
  }
}
</script>
```

> `programmingLanguage` ve `runtimePlatform` değerlerini repodaki gerçek dosyalara bakarak düzelt. Repoda LICENSE varsa `"license": "https://opensource.org/licenses/MIT"` (veya ilgili lisans) ekle. BT Support (`github.com/utku458/BT-Destek`) için aynı şablonu `"programmingLanguage": "Kotlin"`, `"runtimePlatform": "Android"` ile kullan.

### 4) Next.js'te enjekte etme (App Router)

```tsx
// src/lib/seo/JsonLdScript.tsx
type JsonLd = Record<string, unknown>;

export function JsonLdScript({ data }: { data: JsonLd }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify XSS'e karşı güvenli değildir: "<" karakterini kaçır
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
```

```tsx
// src/app/[locale]/page.tsx (özet)
import { JsonLdScript } from "@/lib/seo/JsonLdScript";
import { buildProfileGraph } from "@/lib/seo/profileGraph"; // locale'e göre graph üreten saf fonksiyon

export default async function Page({ params }: { params: Promise<{ locale: "en" | "tr" }> }) {
  const { locale } = await params;
  return (
    <>
      <JsonLdScript data={buildProfileGraph(locale)} />
      {/* ... */}
    </>
  );
}
```

Doğrulama: **Rich Results Test** (search.google.com/test/rich-results) + **Schema Markup Validator** (validator.schema.org). Her deploy'da bir kez kontrol et.

---

## 1.3 İçerik Mimarisi ve Bilgi Mimarisi

### Önerilen URL yapısı

```
/en                      → ProfilePage (mevcut)
/en/about                → YENİ: uzun biyografi + "Hızlı bilgiler" tablosu + SSS
/en/projects/{slug}      → TechArticle vaka analizleri (mevcut, şablonla zenginleştir)
/en/blog/{slug}          → YENİ: teknik yazılar (BlogPosting)
/en/services             → YENİ (opsiyonel): freelance hizmetleri (Service)
/en/cv                   → YENİ: CV'nin HTML versiyonu (PDF yerine/yanında)
/tr/...                  → aynı yapı, Türkçe
```

### LLM'ler için "alıntılanabilir" içerik prensipleri

LLM'ler sayfayı **parçalara (chunk)** böler ve her parçayı bağımsız olarak değerlendirir. Bu yüzden her bölüm **bağlamından koparıldığında da anlamlı** olmalı.

1. **Kendi kendine yeten paragraflar:** "Bu proje..." yerine "Revio, ...". Zamir yerine varlık adını tekrarla.
2. **Başlık = soru, ilk cümle = cevap.** H2'yi soru gibi yaz, hemen altındaki ilk cümle 40–60 kelimelik net cevap olsun.
3. **TL;DR kutusu sayfanın en üstünde.** 3–5 madde, sayılarla.
4. **Sayılar ve özel isimler:** "hızlı" değil "p95 yanıt süresi 120 ms", "birçok müşteri" değil "3 işletme, 1.200 geri bildirim". Ölçemediğin metrik yazma.
5. **Tablolar:** Teknoloji yığını, karşılaştırmalar ve zaman çizelgesi tabloyla verilsin. LLM'ler tabloları çok iyi ayrıştırır.
6. **Semantik HTML:** `<article>`, `<section>`, `<h2>`, `<dl>`, `<table>`, `<figure><figcaption>`. Görsel diyagramların yanına mutlaka metin açıklama ekle.
7. **Tarih damgası:** "Son güncelleme: 15 Ekim 2026" görünür olsun ve `dateModified` ile eşleşsin. AI arama motorları tazeliği ağırlıklandırır.

### "Hakkımda" sayfası şablonu (`/en/about`)

```markdown
# About Utku Altınay

**TL;DR**
- Full-stack developer based in İstanbul, Türkiye.
- Builds multi-platform systems: one C# .NET API serving SwiftUI (iOS), Kotlin (Android) and React/Next.js clients.
- Shipped products: Revio (NFC feedback SaaS), ArMenu (AR QR menus), FitApp, TTRPG Companion.
- Open to full-time roles and selective freelance work.

## Quick facts
| | |
|---|---|
| Location | İstanbul, Türkiye (UTC+3) |
| Primary stack | C# / .NET 8, PostgreSQL, React / Next.js, SwiftUI, Kotlin |
| Education | Management Information Systems — İstanbul Medipol Üniversitesi (ongoing); Associate degree, Computer Programming — İstanbul Arel Üniversitesi |
| Languages | Turkish (native), English (professional), Japanese (elementary) |
| Availability | Full-time roles · selective freelance |
| Contact | utkualtinay.com/en#contact · github.com/utku458 · LinkedIn |

## Who is Utku Altınay?
Utku Altınay is a full-stack developer in İstanbul who designs systems around a single
C# .NET API with native iOS, Android and web clients. [2–3 cümle daha: neden bu mimari, hangi problemi çözüyor]

## What does Utku Altınay specialise in?
[Multi-tenant SaaS, real-time (SignalR), NFC/WebAR gibi niş alanlar, her biri 1 cümle + ilgili proje linki]

## FAQ
### Is Utku Altınay available for freelance work?
Yes. Utku takes on selective freelance projects, typically .NET API back-ends, MVPs with a mobile client, or [...].

### What technologies does Utku Altınay use most?
[...]
```

> FAQ bölümünü sayfada **görünür** tut. Google, 2023'ten beri FAQ rich result'larını yalnızca otorite sitelerde gösteriyor. Ama Q&A formatı LLM alıntılanabilirliği için hâlâ çok değerli. `FAQPage` schema eklemek zararsızdır, ancak rich result bekleme.

### Vaka analizi (Case Study) şablonu: "Problem → Çözüm → Yığın → Metrikler"

```markdown
# Revio — Multi-tenant NFC customer-feedback SaaS

> **TL;DR:** Revio lets businesses collect customer feedback by tapping an NFC tag.
> Built by Utku Altınay with a .NET 8 API, PostgreSQL and a Next.js dashboard.
> Result: [ölçülebilir sonuç, örn. "X işletme, Y geri bildirim, Z ms p95"].

| | |
|---|---|
| **Role** | Solo full-stack developer (architecture, API, web, mobile) |
| **Timeline** | Jan 2025 – present |
| **Stack** | .NET 8 · EF Core · PostgreSQL · Redis · Next.js · Tailwind · NFC (NDEF) |
| **Links** | [Live](https://www.revioapp.com.tr/) · [Source](...) |
| **Last updated** | 15 Oct 2026 |

## The problem
[Kim, neyi, neden yapamıyordu? 1 paragraf, mümkünse bir sayı ile. Örn. "Paper feedback forms returned <2% response rate."]

## Constraints
- [Örn. tenant'lar arası veri izolasyonu zorunlu]
- [Örn. NFC etiketi uygulama yüklemeden çalışmalı]

## The solution
### Architecture
<figure>
  <img src="/projects/revio/architecture.webp" alt="Revio architecture: NFC tag opens a tenant-scoped URL, the .NET 8 API writes feedback to PostgreSQL and pushes it to the Next.js dashboard">
  <figcaption>Request flow from NFC tap to dashboard.</figcaption>
</figure>
[Diyagramı metinle de anlat: LLM'ler görseli okuyamayabilir]

### Key decisions
| Decision | Alternatives considered | Why |
|---|---|---|
| Shared DB + tenant column with EF Core global query filters | Schema-per-tenant, DB-per-tenant | [gerekçe] |
| [...] | [...] | [...] |

## Results (metrics)
| Metric | Value |
|---|---|
| [Active tenants] | [n] |
| [Feedback collected] | [n] |
| [p95 API latency] | [ms] |
| [Lighthouse performance] | [score] |

## What I would do differently
[1 paragraf. Dürüst öz-değerlendirme, "Experience" sinyalinin en güçlü kanıtıdır]

## FAQ
### How does Revio work without an app?
[...]
```

---

## 1.4 Teknik SEO

### Core Web Vitals hedefleri (mobil, p75, CrUX)

| Metrik | Hedef | Next.js'e özel aksiyon |
|---|---|---|
| **LCP** | < 2.5 s (hedef < 1.8 s) | Hero görseli varsa `next/image` + `priority`; fontlar `next/font` ile self-host. H1'deki `animate-fade-up` başlangıç `opacity:0` ise LCP'yi geciktirir. LCP elementinde animasyonu `transform`'a sınırla veya kaldır |
| **INP** | < 200 ms | Client component'leri minimize et; Framer Motion'ı `LazyMotion` + `domAnimation` ile yükle |
| **CLS** | < 0.1 | Tüm görsellerde `width/height`; font fallback metrik ayarı (`next/font` otomatik yapar) |
| **TTFB** | < 800 ms | Proje ve blog sayfaları için SSG (`generateStaticParams`) |

Ana sayfa HTML'i ham haliyle **344 KB**. Uzun listeleri server component'te tut, inline büyük JSON'lardan kaçın. Ölçmek için:

```bash
npx unlighthouse --site https://utkualtinay.com
```

### robots.txt

Hazır dosya: [`dosyalar/utkualtinay/robots.txt`](dosyalar/utkualtinay/robots.txt). Detaylı açıklama Bölüm 3.1'de.

**`/documents/` kararı:** Şu anki `Disallow: /documents/` CV PDF'ini tüm botlardan saklıyor. İki seçenek var:
- **(Önerilen)** `/en/cv` adında bir **HTML CV sayfası** oluştur ve indexlenebilir bırak. PDF'i `Disallow`'da tutabilirsin. LLM'ler HTML'i PDF'ten çok daha iyi parçalar.
- Telefon/adres gibi kişisel veri içermiyorsa PDF'i de aç.

### Sitemap

`app/sitemap.ts` ile üret. Her URL'de `lastModified` olsun ve **`alternates.languages`** ile `en`/`tr` eşleşmesi tanımlansın:

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from "next";

const SITE_URL = "https://utkualtinay.com";
const LOCALES = ["en", "tr"] as const;
const PROJECT_SLUGS = ["fitapp", "revio", "armenu", "ttrpg-companion", "bt-support"] as const;

function localizedEntry(path: string, lastModified: Date): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}/en${path}`,
    lastModified,
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    localizedEntry("", now),
    ...PROJECT_SLUGS.map((slug) => localizedEntry(`/projects/${slug}`, now)),
  ];
}
```

> `lastModified` için `new Date()` yerine içeriğin gerçek güncellenme tarihini (MDX frontmatter / git log) kullan. Her build'de değişen tarih, Google'ın bu sinyale güvenini düşürür.

### OpenGraph / Twitter: mevcut iyi, eksikler

- Proje sayfalarına **sayfa başına** dinamik OG görseli ekle: `app/[locale]/projects/[slug]/opengraph-image.tsx`. Görselde proje adı, stack ikonları ve isim olsun.
- `og:type` proje/blog sayfalarında `article` olsun; `article:published_time`, `article:modified_time` ve `article:author` eklensin.
- `og:locale:alternate` (`tr_TR`) eklenmeli.

```ts
// app/[locale]/projects/[slug]/page.tsx → generateMetadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProject(locale, slug);
  const url = `${SITE_URL}/${locale}/projects/${slug}`;
  return {
    title: `${project.name} — Case Study | Utku Altınay`,
    description: project.summary, // 140–160 karakter, problem + sonuç içersin
    alternates: {
      canonical: url,
      languages: { en: `${SITE_URL}/en/projects/${slug}`, tr: `${SITE_URL}/tr/projects/${slug}` },
    },
    openGraph: {
      type: "article",
      url,
      publishedTime: project.publishedAt,
      modifiedTime: project.updatedAt,
      authors: [`${SITE_URL}/${locale}`],
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? ["en_US"] : ["tr_TR"],
    },
  };
}
```

### Utku için 30 günlük eylem listesi

| # | Eylem | Süre |
|---|---|---|
| 1 | Person + WebSite + ProfilePage JSON-LD (`/en`, `/tr`) | 2 saat |
| 2 | Proje sayfalarına TechArticle + SoftwareApplication/SourceCode + Breadcrumb | 3 saat |
| 3 | `robots.txt` ve `llms.txt`/`llms-full.txt` deploy | 30 dk |
| 4 | Cloudflare → **AI Crawl Control**: GPTBot/ClaudeBot/PerplexityBot'un **engellenmediğini** doğrula (Bölüm 3.1) | 15 dk |
| 5 | GitHub profil README + LinkedIn headline'ını "entity cümlesi" ile eşitle | 1 saat |
| 6 | Vaka analizlerini şablona göre yeniden yaz (önce Revio ve ArMenu) | 2 gün |
| 7 | `/en/about` + `/en/cv` HTML sayfaları | 1 gün |
| 8 | Demo'ları `*.utkualtinay.com` alt alan adlarına taşı | yarım gün |
| 9 | İlk 2 blog yazısı + dev.to/Hashnode canonical cross-post | 1 hafta |
| 10 | GSC + Bing Webmaster Tools doğrulama, sitemap gönderimi, GA4 AI kanal grubu | 1 saat |

---

# BÖLÜM 2: kuaforvahidezafer.com.tr (Yerel İşletme)

## 2.0 Önce bunu düzelt: SPA → statik HTML

Sunucu şu an AI botlarına boş bir kabuk döndürüyor. Seçenekler (Vite + React yapısı korunarak):

| Seçenek | Efor | Not |
|---|---|---|
| **A. `vite-react-ssg`** | Düşük-orta | Mevcut React bileşenleri korunur; her route build-time'da HTML'e render edilir |
| **B. Astro'ya taşıma** | Orta | Broşür site için ideal: varsayılan sıfır JS, React bileşenleri "island" olarak kullanılabilir. **Uzun vadede önerilen** |
| C. Prerender servisi (prerender.io vb.) | Düşük | Bot-only HTML, cloaking riskine yakın. Önerilmez |
| D. Next.js (SSG) | Orta | Çalışır ama bu ölçekteki bir site için ağır |

**Doğrulama komutu** (düzeltme sonrası adres ve hizmet metni ham HTML'de görünmeli; `0` dönerse botlar hâlâ içeriği göremiyor demektir):

```bash
curl -sL -A "GPTBot" https://www.kuaforvahidezafer.com.tr/ | grep -c "Erseven"
```

## 2.1 Yerel SEO ve Google Haritalar Stratejisi

> ⚠️ **Konumlandırma uyarısı ("erkek berberi"):** Site bugün kendini *"butik bir kadın kuaförü"* olarak tanımlıyor; hizmet listesinde erkek kesimi, sakal tıraşı vb. yok. **"Bıyık" hizmeti kadın yüz kılı alımı bağlamında.**
> - Salon gerçekten erkek müşteriye hizmet veriyorsa: sitede ayrı bir "Erkek Kuaförü" bölümü ve hizmet sayfası aç, GBP'ye ikincil kategori olarak **"Berber"** ekle.
> - Vermiyorsa: **"erkek berberi" anahtar kelimesini hedefleme.** Google ve LLM'ler beyan edilen hizmetle gerçek yorumları karşılaştırır; uyumsuzluk hem sıralamayı hem güveni düşürür.
>
> Aşağıdaki plan "kadın kuaförü" odaklı yazıldı; erkek hizmeti varsa ilgili satırlar ♂ ile işaretlendi.

### Hedef anahtar kelimeler

Salon **Molla Gürani Mahallesi**'nde. Burası Fındıkzade/Çapa aksına yakın. Google'ın yerel paketi (Local Pack) yakınlık temelli çalıştığından en yüksek dönüşüm **mahalle/semt adı + hizmet** kombinasyonlarında gelir.

| Küme | Anahtar kelimeler | Hedef URL |
|---|---|---|
| **Çekirdek** | fatih kuaför, fatih kadın kuaförü, fındıkzade kuaför, çapa kuaför, molla gürani kuaför, kuaför vahide zafer | `/` |
| **Renk** | fatih saç boyası, fındıkzade röfle, fatih dip boya, balyaj / ombre fatih, beyaz kapatma | `/hizmetler/sac-boyasi`, `/hizmetler/rofle` |
| **Kesim** | fatih saç kesimi, kadın saç kesimi fındıkzade, kat kesim / küt kesim fatih | `/hizmetler/sac-kesimi` |
| **El-ayak** | fatih manikür pedikür, fındıkzade manikür | `/hizmetler/manikur`, `/hizmetler/pedikur` |
| **Yüz** | fatih kaş alma, kaş şekillendirme fındıkzade, iple bıyık alma fatih | `/hizmetler/kas-ve-biyik` |
| **Niyet** | yakınımdaki kuaför, randevulu kuaför fatih, cumartesi açık kuaför fatih (pazar kapalı olduğundan "pazar açık" sorgularını hedefleme) | `/`, `/iletisim` |
| **Etkinlik** (sunuluyorsa) | gelin saçı fatih, nişan topuzu fındıkzade, fön fatih | `/hizmetler/topuz-fon` |
| ♂ (sunuluyorsa) | fatih erkek kuaförü, fındıkzade berber | `/hizmetler/erkek-kesim` |

### Önerilen site mimarisi

```
/                          → HairSalon ana sayfa (NAP, saatler, hizmet özeti, yorumlar, SSS)
/hizmetler                 → OfferCatalog listesi
/hizmetler/sac-kesimi      → Service sayfası (fiyat aralığı, süre, SSS, önce/sonra galerisi)
/hizmetler/sac-boyasi
/hizmetler/rofle
/hizmetler/manikur
/hizmetler/pedikur
/hizmetler/kas-ve-biyik
/galeri                    → özgün çalışma fotoğrafları (ImageObject)
/hakkimizda                → Vahide Zafer'in hikâyesi, deneyim yılı, salonun kuruluşu (E-E-A-T)
/sss                       → 15–25 soru
/iletisim                  → harita embed, yol tarifi (tramvay/metro/otopark)
```

### Hizmet sayfası metin şablonu (`/hizmetler/sac-boyasi`)

```markdown
# Fatih'te Saç Boyası — Kuaför Vahide Zafer

**Kısaca:** Kuaför Vahide Zafer, Fatih Molla Gürani Mahallesi'nde (Fındıkzade) randevuyla çalışan
bir kadın kuaförüdür. Dip boya, komple renk değişimi ve beyaz kapatma uygular.
Fiyatlar saç uzunluğuna göre [X–Y TL] arasındadır; işlem süresi [1,5–3 saat].

| | |
|---|---|
| Fiyat aralığı | [X – Y TL] (saç uzunluğu ve kullanılan ürüne göre) |
| Süre | [90 – 180 dk] |
| Kullanılan ürünler | [Gerçekte kullanılan profesyonel boya markaları] |
| Randevu | WhatsApp: +90 538 883 72 46 · Pzt–Cuma 09:00–19:00, Cmt 09:00–18:00 |
| Adres | Molla Gürani Mah., Erseven Sk. No:[?], 34093 Fatih/İstanbul |

## Saç boyası nasıl uygulanıyor?
1. **Renk danışmanlığı:** Ten alt tonunuza ve mevcut saç renginize göre ton seçimi.
2. **Saç analizi:** Daha önce boya/açıcı kullanıldıysa porozite kontrolü.
3. **Uygulama:** [...]
4. **Bakım ve fön:** [...]

## Sık sorulan sorular
### Fatih'te saç boyası fiyatı ne kadar?
Kuaför Vahide Zafer'de dip boya [X TL]'den, komple boya [Y TL]'den başlar. Kesin fiyat saç uzunluğuna göre randevuda belirlenir.

### Boya ne kadar kalıcı olur?
[...]

### Hamilelikte saç boyası yaptırabilir miyim?
[Sorumlu bir cevap; doktora danışılmasını öner]

### Randevusuz gelebilir miyim?
Salon randevuyla çalışır. WhatsApp'tan yazarak aynı gün için uygunluk sorabilirsiniz.

<!-- Galeri: yalnızca salonda çekilmiş, müşteri izni alınmış fotoğraflar -->
```

### Google İşletme Profili (GBP) optimizasyonu: kontrol listesi

| Alan | Ne yapılmalı |
|---|---|
| **İşletme adı** | Tabeladaki gerçek ad: "Kuaför Vahide Zafer". Ada anahtar kelime eklemek ("Fatih En İyi Kuaför" gibi) **yasak**, profil askıya alınabilir |
| **Birincil kategori** | **Kuaför** (Hair salon) veya **Güzellik salonu**. Ciroya en çok katkı veren hizmete göre seç |
| **İkincil kategoriler** | Kadın kuaförü (varsa), Manikür/Tırnak salonu, Ağda/Kaş salonu (uygunsa). ♂ Berber yalnızca gerçekten sunuluyorsa |
| **Adres** | Kapı numarasıyla birlikte, sitedeki ve tüm dizinlerdeki ile **karakter karakter aynı** |
| **Telefon** | +90 538 883 72 46 (sitedekiyle aynı). Sabit hat varsa birincil o, mobil ek numara |
| **Web sitesi** | `https://www.kuaforvahidezafer.com.tr/?utm_source=google&utm_medium=organic&utm_campaign=gbp` (GA4'te GBP trafiğini ayırır) |
| **Randevu linki** | `https://wa.me/905388837246?text=Merhaba%2C%20randevu%20almak%20istiyorum.` |
| **Saatler** | Pzt–Cuma 09:00–19:00 · Cmt 09:00–18:00 · Paz kapalı. **Resmi/dini bayramlar için "özel saatler"** mutlaka girilsin |
| **Hizmetler** | Her hizmet ayrı kalem + açıklama + fiyat ("başlangıç fiyatı" girilebilir) |
| **Özellikler** | "Kadınlar tarafından işletilen" (doğruysa), "Randevu gerekli", erişilebilirlik, ödeme yöntemleri |
| **İşletme açıklaması** | 750 karakter (aşağıda taslak) |
| **Fotoğraflar** | Haftada 3–5 yeni foto: dış cephe (tabela okunur), iç mekân, ekip, önce/sonra. **Logo + kapak** ayarlı |
| **Gönderiler (Posts)** | Haftada 1: kampanya, yeni çalışma, sezon trendi. CTA = "Ara" veya "Randevu" |
| **Soru-Cevap** | Sık soruları (fiyat, otopark, randevu süresi) cevapla. Google bu özelliği zaman zaman kısıtlıyor; aktifse kullan |

**GBP açıklama taslağı (≤ 750 karakter):**

```text
Kuaför Vahide Zafer, İstanbul Fatih'te, Molla Gürani Mahallesi'nde (Fındıkzade) randevuyla çalışan butik bir kadın kuaförüdür. Saç kesimi, saç boyası, dip boya, röfle, manikür, pedikür, kaş şekillendirme ve bıyık alma hizmetleri sunuyoruz. Her uygulamayı yüz hatlarınıza, saç dokunuza ve ten alt tonunuza göre planlıyor, her müşteriyle tek tek ilgileniyoruz. [YYYY'den beri] bölgede hizmet veren salonumuz Pazartesi–Cuma 09:00–19:00, Cumartesi 09:00–18:00 saatlerinde açıktır. Randevu için WhatsApp veya telefonla ulaşabilirsiniz: 0538 883 72 46.
```

### İnceleme (review) stratejisi

LLM'ler "en iyi kuaför" sorusunu cevaplarken **yorum sayısı, puan, tazelik ve yorum metnindeki hizmet/semt kelimelerini** kullanır. Örneğin "Fındıkzade'de röfle yaptırdım, ton çok iyi oldu" gibi bir yorum, "fındıkzade röfle" sorgusu için doğrudan kanıttır.

1. **Kısa link + QR:** GBP → "Yorum iste" linkini al. Kasaya ve aynanın yanına QR kartı koy: *"Memnun kaldıysanız 30 saniyenizi ayırır mısınız?"*
2. **WhatsApp takip mesajı (işlemden 2–3 saat sonra):**
   ```text
   Merhaba [Ad] Hanım, bugün bizi tercih ettiğiniz için teşekkür ederiz 🌸
   [Hizmet] sonucundan memnun kaldıysanız Google'da kısa bir yorum bırakırsanız çok seviniriz:
   [GBP yorum linki]
   Sorunuz olursa buradan yazabilirsiniz. — Kuaför Vahide Zafer
   ```
3. **Hedef:** Ayda 8–15 yeni yorum. Sabit akış, tek seferlik 50 yorumdan daha değerlidir.
4. **Her yoruma 48 saat içinde yanıt ver.** Hizmet ve semt adını doğal biçimde geçir: *"Röfle sonucunuzu beğenmenize çok sevindik, Fındıkzade'deki salonumuzda tekrar görüşmek üzere."*
5. **Olumsuz yorum:** Savunmacı olmadan özür dile, çözüm öner, konuyu özele (telefona) taşı.
6. **🚫 Yasak:** Yorum karşılığı indirim/hediye (Google politikası ihlali), sahte yorum, personele yorum yazdırmak, yalnızca mutlu müşterilerden yorum istemek ("review gating").

### NAP tutarlılığı ve yerel dizinler

**Kanonik NAP** (tüm platformlarda karakter karakter aynı olmalı):

```text
Kuaför Vahide Zafer
Molla Gürani Mah., Erseven Sk. No:[KAPI NO], 34093 Fatih/İstanbul
+90 538 883 72 46
https://www.kuaforvahidezafer.com.tr/
```

| Platform | Neden önemli | Öncelik |
|---|---|---|
| Google Business Profile | Google Haritalar, Gemini, AI Overviews | 🔴 |
| **Apple Business Connect** | Apple Haritalar, Siri | 🔴 |
| **Bing Places for Business** | Bing ve Microsoft Copilot; ChatGPT'nin web aramasında da Bing verisi rol oynuyor | 🔴 |
| Yandex Business (Yandex Haritalar) | Türkiye'de harita kullanımı yüksek | 🟠 |
| Instagram (`@kuaforvahidezafer`) | Bio'da NAP + site linki; konum etiketi; Highlights = hizmetler | 🟠 |
| Foursquare | POI verisi birçok harita ve veri sağlayıcısına dağıtılıyor | 🟠 |
| Facebook sayfası | Ek NAP kaynağı | 🟡 |
| Armut.com / kuaför randevu platformları | Üçüncü taraf yorum + "en iyi X" listeleri. LLM'lerin "liste" kaynakları | 🟡 |
| Yerel haber / mahalle blogları / "Fatih'te kuaförler" listeleri | AI motorlarının "en iyi" cevaplarında alıntıladığı **3. taraf kaynaklar** | 🟡 (Bölüm 2.2) |

---

## 2.2 GEO (Yapay Zeka Araması) Optimizasyonu

### AI motorları "Fatih'te en iyi kadın kuaförü kim?" sorusunu nasıl cevaplar?

| Motor | Ana veri kaynakları |
|---|---|
| **Google AI Overviews / AI Mode / Gemini** | Google Haritalar (GBP, yorumlar), indekslenmiş web sayfaları |
| **ChatGPT Search** | Kendi crawler'ı (OAI-SearchBot) + 3. taraf arama/harita sağlayıcıları; yerel sonuçlarda yorum siteleri ve listeler |
| **Perplexity** | Kendi indeksi (PerplexityBot) + web araması; liste/blog içeriklerini sık alıntılar |
| **Claude** | Web araması (Claude-SearchBot / Claude-User); alıntıladığı sayfaların okunabilir HTML'i şart |
| **Copilot** | Bing + Bing Places |

**Sonuç:** "Tavsiye edilmek" için 3 katman gerekir:
1. **Kendi sitende** makinece okunabilir, net olgular (SSR HTML + JSON-LD + llms.txt).
2. **Harita profillerinde** güçlü ve tutarlı veri (GBP, Apple, Bing, Yandex) + taze yorumlar.
3. **Üçüncü taraf bahsedilmeler (mentions):** Salon adının, semt ve hizmet kelimeleriyle birlikte başka sitelerde geçmesi.

### Taktikler

**1) "Cevap olarak yazılmış" ana sayfa bloğu.** H1'in hemen altında görünür bir "Hızlı bilgiler" bloğu olsun. LLM'ler bu tür olgu bloklarını doğrudan alıntılar:

```html
<section aria-labelledby="hizli-bilgi">
  <h2 id="hizli-bilgi">Kuaför Vahide Zafer hakkında kısa bilgi</h2>
  <p>
    <strong>Kuaför Vahide Zafer</strong>, İstanbul Fatih'te, Molla Gürani Mahallesi'nde
    (Fındıkzade) randevuyla çalışan butik bir kadın kuaförüdür.
    Saç kesimi, saç boyası, röfle, manikür, pedikür, kaş şekillendirme ve bıyık alma hizmetleri sunar.
  </p>
  <dl>
    <dt>Adres</dt><dd>Molla Gürani Mah., Erseven Sk. No:[?], 34093 Fatih/İstanbul</dd>
    <dt>Çalışma saatleri</dt><dd>Pazartesi–Cuma 09:00–19:00 · Cumartesi 09:00–18:00 · Pazar kapalı</dd>
    <dt>Randevu</dt><dd>WhatsApp veya telefon: +90 538 883 72 46</dd>
    <dt>Fiyat aralığı</dt><dd>[Kaş: X TL'den · Saç kesimi: Y TL'den · Boya: Z TL'den]</dd>
    <dt>Ulaşım</dt><dd>[En yakın tramvay/metro durağı ve yürüme süresi]</dd>
    <dt>Deneyim</dt><dd>[YYYY'den beri hizmet veriyor]</dd>
  </dl>
</section>
```

**2) Uzmanlıkları "varlık"a (entity) dönüştür.** Soyut ifadeler yerine AI'ın eşleyebileceği **somut terimler** kullan. Yalnızca **gerçekten sunulan** hizmetleri yaz:

| Soyut (kaçın) | Somut (kullan) |
|---|---|
| "renklendirme hizmetleri" | dip boya, komple boya, beyaz kapatma, röfle, balyaj, ombre, tonlama (toner), bağ onarıcı bakım |
| "kesim" | küt kesim, kat kesim, bob, lob, perçem, uç alma, fön |
| "bakım protokolleri" | keratin bakımı, saç maskesi, sıcak yağ bakımı |
| "kaş" | iple kaş alma, cımbızla şekillendirme, kaş laminasyonu |
| "kaliteli ürünler" | **Gerçek marka adları** (salonda kullanılan profesyonel seriler) |

Her terim `hasOfferCatalog` içinde ayrı bir `Service` olarak (bkz. 2.3) ve kendi sayfasında H2 olarak yer almalı.

**3) Soru-odaklı SSS sayfası (`/sss`).** AI sorgularının birebir karşılığı olan sorular:

```markdown
### Fatih'te randevulu kadın kuaförü var mı?
Evet. Kuaför Vahide Zafer, Fatih Molla Gürani Mahallesi'nde randevuyla çalışan bir kadın kuaförüdür...

### Fındıkzade'de röfle fiyatları ne kadar?
### Kuaför Vahide Zafer Cumartesi açık mı?
### Kuaför Vahide Zafer'e nasıl gidilir? (tramvay/metro/otopark)
### Saç boyası ne kadar sürer?
### Gelin/nişan saçı yapıyor musunuz?
### Kart ile ödeme yapılabiliyor mu?
### Vahide Zafer kimdir, kaç yıldır kuaförlük yapıyor?
```

**4) "Kim?" sorusuna cevap ver: kurucu entity'si.** `/hakkimizda` sayfasında Vahide Zafer'in **adı, deneyim yılı, uzmanlık alanları, aldığı eğitimler/sertifikalar** (gerçek olanlar) yer almalı. JSON-LD'de `founder` → `Person`. "Köklü salon" iddiası somut bir yıl ile desteklenmeli (`foundingDate`).

**5) Üçüncü taraf bahsedilmeler.**
- Fatih odaklı yerel haber siteleri, mahalle Instagram sayfaları ve yerel içerik üreticileriyle iş birliği.
- Komşu esnafla çapraz öneri (gelinlikçi, fotoğrafçı, düğün salonu "önerilen kuaförler").
- "İstanbul'un kadın kuaförleri" türü listeleri yazan blog/medyaya özgün görsel ve kısa bilgi notuyla ulaş.

**6) Tutarlılık testi (aylık).** Aşağıdaki promptları ChatGPT (Search açık), Perplexity, Gemini ve Claude'da çalıştır. Sonuçları tabloya kaydet (Bölüm 3.3):
- "Fatih'te iyi bir kadın kuaförü önerir misin?"
- "Fındıkzade'de röfle için nereye gidebilirim?"
- "Kuaför Vahide Zafer nerede, saat kaçta açık?"
- "Fatih Molla Gürani'de randevulu kuaför"

---

## 2.3 Yapılandırılmış Veri (Schema.org / JSON-LD)

### Ana sayfa: HairSalon (eksiksiz)

`HairSalon` → `HealthAndBeautyBusiness` → `LocalBusiness` hiyerarşisinde en spesifik tiptir. Ayrıca `BeautySalon` ve `NailSalon` ile çoklu tip verilebilir.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["HairSalon", "BeautySalon", "NailSalon"],
      "@id": "https://www.kuaforvahidezafer.com.tr/#salon",
      "name": "Kuaför Vahide Zafer",
      "description": "İstanbul Fatih Molla Gürani Mahallesi'nde (Fındıkzade) randevuyla çalışan butik kadın kuaförü. Saç kesimi, saç boyası, röfle, manikür, pedikür, kaş ve bıyık.",
      "slogan": "Zarafet, doğru ellerde başlar.",
      "url": "https://www.kuaforvahidezafer.com.tr/",
      "telephone": "+905388837246",
      "image": [
        "https://www.kuaforvahidezafer.com.tr/images/salon-dis-cephe.webp",
        "https://www.kuaforvahidezafer.com.tr/images/salon-ic-mekan.webp",
        "https://www.kuaforvahidezafer.com.tr/images/og.jpg"
      ],
      "logo": "https://www.kuaforvahidezafer.com.tr/images/logo.png",
      "priceRange": "₺₺",
      "currenciesAccepted": "TRY",
      "paymentAccepted": "Nakit, Kredi Kartı",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Molla Gürani Mah., Erseven Sk. No:0",
        "addressLocality": "Fatih",
        "addressRegion": "İstanbul",
        "postalCode": "34093",
        "addressCountry": "TR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 41.0150,
        "longitude": 28.9350
      },
      "hasMap": "https://share.google/Zn8GbEOzzOEqQccXw",
      "areaServed": [
        { "@type": "City", "name": "Fatih" },
        { "@type": "Place", "name": "Fındıkzade" },
        { "@type": "Place", "name": "Çapa" },
        { "@type": "Place", "name": "Aksaray" },
        { "@type": "City", "name": "İstanbul" }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "19:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+905388837246",
        "contactType": "reservations",
        "availableLanguage": ["Turkish"],
        "url": "https://wa.me/905388837246"
      },
      "potentialAction": {
        "@type": "ReserveAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://wa.me/905388837246?text=Merhaba%2C%20randevu%20almak%20istiyorum.",
          "actionPlatform": [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform"
          ]
        },
        "result": { "@type": "Reservation", "name": "Kuaför randevusu" }
      },
      "founder": { "@id": "https://www.kuaforvahidezafer.com.tr/#vahide-zafer" },
      "foundingDate": "YYYY",
      "knowsAbout": [
        "Kadın saç kesimi", "Saç boyası", "Dip boya", "Beyaz kapatma", "Röfle",
        "Fön", "Manikür", "Pedikür", "Kaş şekillendirme", "İple bıyık alma"
      ],
      "sameAs": [
        "https://instagram.com/kuaforvahidezafer"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Kuaför Vahide Zafer Hizmetleri",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "Saç",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "@id": "https://www.kuaforvahidezafer.com.tr/hizmetler/sac-kesimi#service",
                  "name": "Kadın Saç Kesimi ve Fön",
                  "description": "Yüz hatlarına ve saç dokusuna göre planlanan kesim, ardından fön ve şekillendirme.",
                  "url": "https://www.kuaforvahidezafer.com.tr/hizmetler/sac-kesimi"
                },
                "priceSpecification": { "@type": "PriceSpecification", "minPrice": 0, "maxPrice": 0, "priceCurrency": "TRY" }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "@id": "https://www.kuaforvahidezafer.com.tr/hizmetler/sac-boyasi#service",
                  "name": "Saç Boyası (Dip Boya / Komple Boya)",
                  "description": "Dip boya veya komple renk değişimi; ten alt tonuna göre ton seçimi, saç sağlığını koruyan uygulama.",
                  "url": "https://www.kuaforvahidezafer.com.tr/hizmetler/sac-boyasi"
                },
                "priceSpecification": { "@type": "PriceSpecification", "minPrice": 0, "maxPrice": 0, "priceCurrency": "TRY" }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "@id": "https://www.kuaforvahidezafer.com.tr/hizmetler/rofle#service",
                  "name": "Röfle",
                  "description": "Saça ışık ve hacim veren, doğal geçişli açma çalışmaları; ince tel röfleden belirgin tonlara kadar.",
                  "url": "https://www.kuaforvahidezafer.com.tr/hizmetler/rofle"
                },
                "priceSpecification": { "@type": "PriceSpecification", "minPrice": 0, "maxPrice": 0, "priceCurrency": "TRY" }
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "El, Ayak ve Yüz Bakımı",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "@id": "https://www.kuaforvahidezafer.com.tr/hizmetler/manikur#service",
                  "name": "Manikür",
                  "description": "Tırnak şekillendirme, kütikül bakımı ve oje.",
                  "url": "https://www.kuaforvahidezafer.com.tr/hizmetler/manikur"
                },
                "priceSpecification": { "@type": "PriceSpecification", "minPrice": 0, "maxPrice": 0, "priceCurrency": "TRY" }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "@id": "https://www.kuaforvahidezafer.com.tr/hizmetler/pedikur#service",
                  "name": "Pedikür",
                  "description": "Ayak ve tırnak bakımı, sert deri temizliği, isteğe bağlı oje.",
                  "url": "https://www.kuaforvahidezafer.com.tr/hizmetler/pedikur"
                },
                "priceSpecification": { "@type": "PriceSpecification", "minPrice": 0, "maxPrice": 0, "priceCurrency": "TRY" }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "@id": "https://www.kuaforvahidezafer.com.tr/hizmetler/kas-ve-biyik#service",
                  "name": "Kaş Şekillendirme ve Bıyık Alma",
                  "description": "Yüz hatlarına uygun kaş şekillendirme ve bıyık alımı; hızlı, özenli ve hijyenik.",
                  "url": "https://www.kuaforvahidezafer.com.tr/hizmetler/kas-ve-biyik"
                },
                "priceSpecification": { "@type": "PriceSpecification", "minPrice": 0, "maxPrice": 0, "priceCurrency": "TRY" }
              }
            ]
          }
        ]
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.kuaforvahidezafer.com.tr/#vahide-zafer",
      "name": "Vahide Zafer",
      "jobTitle": "Kuaför, Salon Sahibi",
      "worksFor": { "@id": "https://www.kuaforvahidezafer.com.tr/#salon" }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.kuaforvahidezafer.com.tr/#website",
      "url": "https://www.kuaforvahidezafer.com.tr/",
      "name": "Kuaför Vahide Zafer",
      "inLanguage": "tr",
      "publisher": { "@id": "https://www.kuaforvahidezafer.com.tr/#salon" }
    }
  ]
}
</script>
```

> ⚠️ **Yayınlamadan önce mutlaka doldur. Bunlar yer tutucu (placeholder):**
> - **`streetAddress`:** `No:0` yerine gerçek kapı numarası.
> - **`geo`:** Örnek değer! Google Haritalar'da salona sağ tıkla, çıkan koordinatı **5 ondalık** basamakla yaz.
> - **`priceSpecification`:** `minPrice`/`maxPrice` alanlarına gerçek TL fiyatları yaz. Fiyat yayınlamak istemiyorsan tüm `priceSpecification` satırlarını sil. **`0` bırakmak "ücretsiz" demektir, kesinlikle bırakma.**
> - **`foundingDate`:** Gerçek kuruluş yılı (örn. `"1998"`). Bilinmiyorsa satırı sil.
> - **`paymentAccepted` / `priceRange`:** Gerçeğe göre düzelt.
> - **Görseller:** `image` / `logo` dosyaları gerçekten var olmalı. Olmayan URL hata verir.
> - **`hasMap`:** `share.google` kısa linki yerine GBP'deki tam `https://maps.google.com/?cid=…` linkini kullan.
> - ♂ **Erkek hizmeti:** Sunuluyorsa `"Saç"` kataloğuna "Erkek Saç Kesimi" Service'i ekle.

### Yorumlar (Review / AggregateRating) hakkında kritik not

Google, **2019'dan beri bir işletmenin kendi sitesinde kendisi hakkında yayınladığı `LocalBusiness` yorumlarını ("self-serving reviews") yıldızlı sonuç olarak göstermiyor.** Ayrıca:
- Google Haritalar yorumlarını kopyalayıp `aggregateRating` olarak işaretlemek **politika ihlalidir** (yorum, işaretlendiği sitede toplanmış olmalı).
- **Uydurma puan veya yorum sayısı kesinlikle girilmemeli.** Bu, manuel işlem (manual action) sebebidir.

**Doğru yaklaşım:**
1. Google yorumlarını sitede **görsel olarak** gösterebilirsin (widget veya kaynak linkli alıntı). Bunlara `Review` markup'ı ekleme.
2. Sitede **kendi yorum formun** olur ve gerçek yorumlar toplanırsa aşağıdaki şablonu kullanabilirsin. Yıldız çıkmaz, ama AI motorları içeriği okur:

```json
{
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "@id": "https://www.kuaforvahidezafer.com.tr/#salon",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "GERCEK_ORTALAMA",
    "reviewCount": "GERCEK_SAYI",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "[Müşteri adı + soyadı baş harfi]" },
      "datePublished": "2026-09-20",
      "reviewBody": "[Müşterinin sitede bıraktığı yorumun birebir metni]",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
    }
  ]
}
```

> Bu blok, aynı `@id` ile ana graph'a **birleştirilir**. Ayrı bir varlık oluşturmaz. Yalnızca site üzerinden toplanmış ve yayın izni alınmış gerçek yorumlarla kullan.

### Hizmet sayfası: Service + FAQPage + Breadcrumb (`/hizmetler/sac-boyasi`)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.kuaforvahidezafer.com.tr/hizmetler/sac-boyasi#service",
      "name": "Saç Boyası (Dip Boya / Komple Boya)",
      "serviceType": "Saç boyama",
      "description": "Fatih Molla Gürani'de dip boya, komple renk değişimi ve beyaz kapatma. Ten alt tonuna göre ton seçimi.",
      "url": "https://www.kuaforvahidezafer.com.tr/hizmetler/sac-boyasi",
      "provider": { "@id": "https://www.kuaforvahidezafer.com.tr/#salon" },
      "areaServed": { "@type": "City", "name": "Fatih, İstanbul" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Fatih'te saç boyası fiyatı ne kadar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kuaför Vahide Zafer'de dip boya [X] TL'den, komple boya [Y] TL'den başlar. Kesin fiyat saç uzunluğuna göre randevuda belirlenir."
          }
        },
        {
          "@type": "Question",
          "name": "Saç boyası işlemi ne kadar sürer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dip boya yaklaşık [90] dakika, komple boya ve fön ise saç uzunluğuna göre [2–3] saat sürer."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://www.kuaforvahidezafer.com.tr/" },
        { "@type": "ListItem", "position": 2, "name": "Hizmetler", "item": "https://www.kuaforvahidezafer.com.tr/hizmetler" },
        { "@type": "ListItem", "position": 3, "name": "Saç Boyası", "item": "https://www.kuaforvahidezafer.com.tr/hizmetler/sac-boyasi" }
      ]
    }
  ]
}
</script>
```

> FAQ şemasındaki soru-cevaplar sayfada **görünür metinle birebir aynı** olmalı.

---

## 2.4 Kullanıcı Deneyimi ve Dönüşüm

### Mobil öncelikli iletişim mimarisi

Yerel aramaların büyük çoğunluğu mobilden ve "hemen" niyetiyle gelir. Hedef: her ekranda **tek dokunuşla** randevu.

**1) Sabit alt eylem çubuğu (mobil):**

```tsx
// src/components/StickyContactBar.tsx
const CONTACT = {
  phone: "+905388837246",
  whatsapp: "https://wa.me/905388837246?text=Merhaba%2C%20randevu%20almak%20istiyorum.",
  directions: "https://www.google.com/maps/dir/?api=1&destination=Kuaf%C3%B6r+Vahide+Zafer+Fatih",
} as const;

const ACTIONS = [
  { href: CONTACT.whatsapp, label: "WhatsApp", event: "click_whatsapp", primary: true },
  { href: `tel:${CONTACT.phone}`, label: "Ara", event: "click_call", primary: false },
  { href: CONTACT.directions, label: "Yol Tarifi", event: "click_directions", primary: false },
] as const;

export function StickyContactBar() {
  return (
    <nav
      aria-label="Hızlı iletişim"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 gap-2 border-t border-black/5
                 bg-white/80 px-3 pt-2 backdrop-blur-md md:hidden
                 pb-[calc(0.5rem+env(safe-area-inset-bottom))]"
    >
      {ACTIONS.map(({ href, label, event, primary }) => {
        const isExternal = href.startsWith("http");
        return (
          <a
            key={event}
            href={href}
            data-event={event}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={`flex min-h-12 items-center justify-center rounded-xl text-sm font-medium
                        transition-transform active:scale-95
                        ${primary ? "bg-[#25D366] text-white" : "bg-stone-100 text-stone-900"}`}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
}
```

```ts
// src/lib/analytics.ts: tek delegated listener ile GA4 olayları
export function trackContactClicks(): void {
  document.addEventListener("click", (e) => {
    const el = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-event]");
    const eventName = el?.dataset.event;
    if (!el || !eventName || typeof window.gtag !== "function") return;
    window.gtag("event", eventName, { link_url: el.href });
  });
}
```

GA4'te `click_whatsapp`, `click_call` ve `click_directions` olaylarını **Key Event (dönüşüm)** olarak işaretle.

**2) Diğer UX maddeleri:**
- Dokunma hedefleri ≥ 48×48 px (yukarıda `min-h-12`).
- Telefon numarası her yerde `tel:` linki; adres metni Google Haritalar linki.
- "BUGÜN" göstergesi güzel. SSR çıktısında **statik saat tablosu** kalsın, dinamik etiket client'ta eklensin.
- `og:image`'i aç (1200×630, salon dış cephe + logo). WhatsApp'ta paylaşılan link önizlemesi dönüşümü doğrudan etkiler.
- Font: 2 Google Fonts ailesi render-blocking. `@fontsource` ile self-host et, yalnızca kullanılan ağırlıkları yükle.

### Görsel SEO

**Kural 1: Stok fotoğrafı kaldır.** Hero'daki Unsplash görseli binlerce sitede kullanılıyor. Görsel arama ve multimodal AI modelleri için özgünlük sinyali sıfır. Yerine salonda çekilmiş gerçek fotoğraflar koy.

**Çekim listesi (ilk ay, ~30 görsel):** dış cephe + okunur tabela · iç mekân geniş açı · koltuk/ayna detayı · Vahide Hanım çalışırken · her hizmet için 3–4 önce/sonra · ürün rafları.

**Dosya adlandırma ve alt metin şablonu:**

| Dosya adı | Alt metin |
|---|---|
| `fatih-kuafor-vahide-zafer-dis-cephe.webp` | Kuaför Vahide Zafer'in Fatih Molla Gürani'deki salon girişi ve tabelası |
| `fatih-rofle-once-sonra-bal-sarisi.webp` | Fatih'teki salonumuzda uygulanan bal sarısı röfle: önce ve sonra |
| `findikzade-kadin-sac-kesimi-bob.webp` | Fındıkzade'de kadın müşteriye yapılan bob kesim ve fön |
| `fatih-manikur-nude-oje.webp` | Kuaför Vahide Zafer'de nude ojeli manikür uygulaması |

Alt metin = **görselde ne var + hizmet + (doğalsa) semt**. Anahtar kelime doldurma yapma; her alt metin farklı olsun.

**Teknik dönüşüm (WebP + boyutlandırma).** Önce libvips'i kur:

```bash
brew install vips
```

Sonra her ham fotoğrafı üç genişlikte WebP'ye çevir:

```bash
for f in raw/*.jpg; do n=$(basename "${f%.*}"); for w in 640 1280 1920; do vips thumbnail "$f" "public/images/${n}-${w}.webp[Q=78,strip]" $w; done; done
```

```html
<img src="/images/fatih-rofle-once-sonra-1280.webp"
     srcset="/images/fatih-rofle-once-sonra-640.webp 640w,
             /images/fatih-rofle-once-sonra-1280.webp 1280w,
             /images/fatih-rofle-once-sonra-1920.webp 1920w"
     sizes="(max-width: 768px) 100vw, 50vw"
     width="1280" height="1600" loading="lazy" decoding="async"
     alt="Fatih'teki salonumuzda uygulanan bal sarısı röfle: önce ve sonra">
```

Hero görselinde `loading="eager"` + `fetchpriority="high"` kullan; diğerlerinde `lazy`.

**EXIF / GPS konum verisi: gerçekçi beklenti**
- Google, **web sitesindeki görsellerin EXIF GPS verisini sıralama faktörü olarak kullanmadığını** açıkça belirtmiştir. Çoğu CDN ve sosyal platform da EXIF'i siler.
- Yukarıdaki `strip` parametresi EXIF'i **bilerek siler**: dosya küçülür, müşteri fotoğraflarında gizlilik korunur.
- Konumu görsellere bağlamanın **etkili** yolları:
  1. Fotoğrafları **GBP'ye** yüklemek.
  2. Dosya adı, alt metin ve çevreleyen metin.
  3. `ImageObject` schema:

```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": "https://www.kuaforvahidezafer.com.tr/images/fatih-rofle-once-sonra-1280.webp",
  "name": "Bal sarısı röfle — önce ve sonra",
  "description": "Kuaför Vahide Zafer, Fatih Molla Gürani: bal sarısı röfle uygulaması.",
  "contentLocation": { "@id": "https://www.kuaforvahidezafer.com.tr/#salon" },
  "creator": { "@id": "https://www.kuaforvahidezafer.com.tr/#salon" },
  "copyrightHolder": { "@id": "https://www.kuaforvahidezafer.com.tr/#salon" },
  "creditText": "Kuaför Vahide Zafer",
  "copyrightNotice": "© Kuaför Vahide Zafer"
}
```

- Yine de EXIF GPS eklemek istersen (zararsız ama etkisi kanıtlanmamış), **yalnızca salon içi/dışı fotoğraflara** ekle. Koordinatları gerçek değerlerle değiştir:

```bash
exiftool -GPSLatitude=41.01500 -GPSLatitudeRef=N -GPSLongitude=28.93500 -GPSLongitudeRef=E -overwrite_original raw/fatih-kuafor-vahide-zafer-dis-cephe.jpg
```

> **KVKK:** Müşteri yüzü görünen fotoğraflar için açık rıza al (WhatsApp onayı bile kayıt olarak saklanabilir).

### Kuaför için 30 günlük eylem listesi

| # | Eylem | Sorumlu | Süre |
|---|---|---|---|
| 1 | **SPA → SSG** (vite-react-ssg veya Astro) + `curl` doğrulaması | Geliştirici | 1–2 gün |
| 2 | Kapı numarası, geo koordinat, fiyatlar, kuruluş yılı bilgilerini topla | Salon | 1 gün |
| 3 | HairSalon JSON-LD + `robots.txt` + `llms.txt` deploy | Geliştirici | 2 saat |
| 4 | GBP'yi kontrol listesine göre güncelle | Salon + Geliştirici | 2 saat |
| 5 | Apple Business Connect + Bing Places + Yandex kaydı (NAP birebir) | Geliştirici | 2 saat |
| 6 | Profesyonel çekim (30 görsel), stok fotoğrafı kaldır, `og:image` aç | Salon | 1 gün |
| 7 | 6 hizmet sayfası + `/sss` + `/hakkimizda` metinleri | İçerik | 3 gün |
| 8 | Yorum QR kartı + WhatsApp takip mesajı rutini | Salon | Sürekli |
| 9 | Sticky iletişim çubuğu + GA4 key event'leri | Geliştirici | 2 saat |
| 10 | GSC + Bing WMT doğrulama, sitemap gönderimi | Geliştirici | 30 dk |

---

# BÖLÜM 3: Ortak Teknik Altyapı ve GEO Protokolü

## 3.1 AI Crawler Yönetimi (robots.txt)

### Bilmen gereken üç kritik teknik detay

**1. Eğitim botu ≠ arama botu.** Her sağlayıcının ayrı botları var:

| Sağlayıcı | Arama/alıntı (cevaplarda kaynak gösterme) | Kullanıcı tetiklemeli | Model eğitimi |
|---|---|---|---|
| OpenAI | `OAI-SearchBot` | `ChatGPT-User` | `GPTBot` |
| Anthropic | `Claude-SearchBot` | `Claude-User` | `ClaudeBot` |
| Perplexity | `PerplexityBot` | `Perplexity-User` | — |
| Google | `Googlebot` (AI Overviews/AI Mode buradan beslenir) | — | `Google-Extended` (Gemini eğitimi + grounding; Search'ü etkilemez) |
| Apple | `Applebot` | — | `Applebot-Extended` |
| Microsoft | `bingbot` (Copilot) | — | — |
| Diğer | `DuckAssistBot` | `MistralAI-User` | `CCBot` (Common Crawl), `Meta-ExternalAgent`, `Amazonbot` |

Kullanıcı tetiklemeli ajanlar robots.txt'yi her zaman uygulamayabilir. **Görünürlük hedefi** için hepsine izin vermek doğru strateji. Eğitim botlarına izin vermek, isminin modellerin **parametrik bilgisine** (arama yapmadan bildiği şeylere) girme şansını artırır.

**2. robots.txt gruplama tuzağı.** Bir bot için özel bir `User-agent:` grubu tanımlarsan, o bot **`User-agent: *` grubunu tamamen yok sayar**. Yani `*` altındaki `Disallow: /documents/` kuralı, GPTBot için ayrı grup açtıysan **GPTBot'a uygulanmaz**. Ya kuralları her grupta tekrarla ya da (önerilen) birden fazla `User-agent` satırını tek grupta topla. Hazır dosyalar bu şekilde yazıldı.

**3. Cloudflare varsayılan engeli.** Cloudflare, Temmuz 2025'ten itibaren yeni alan adlarında AI crawler'ları **varsayılan olarak engelleyebiliyor** ve "Managed robots.txt" ile dosyanın başına kendi kurallarını ekleyebiliyor. utkualtinay.com Cloudflare arkasında (e-posta obfuscation bunu gösteriyor).
- **Dashboard → AI Crawl Control** altında GPTBot, ClaudeBot ve PerplexityBot'un **Allow** olduğunu kontrol et.
- "Block AI bots" ayarının **kapalı** olduğunu kontrol et.
- Super Bot Fight Mode'daki "Definitely automated: Block" ayarı da AI botlarını etkileyebilir.

Kontrol: `curl -s https://utkualtinay.com/robots.txt` çıktısında senin yazmadığın bir `# BEGIN Cloudflare Managed content` bloğu var mı?

### Şablon

Her iki siteye uyarlanmış hali `dosyalar/` altında:

```text
# --- 1) Klasik arama motorları ---
User-agent: Googlebot
User-agent: Bingbot
User-agent: YandexBot
User-agent: Applebot
User-agent: DuckDuckBot
# --- 2) AI arama / alıntı botları ---
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: DuckAssistBot
User-agent: MistralAI-User
# --- 3) AI eğitim botları ---
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
User-agent: Meta-ExternalAgent
User-agent: Amazonbot
# --- 4) Diğer tüm botlar ---
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://ORNEK.COM/sitemap.xml
```

> Tek grup + çoklu `User-agent` satırı RFC 9309 ile uyumludur. İleride bir botu engellemek istersen onu bu gruptan çıkarıp kendi `Disallow: /` grubuna taşıman yeterli.

## 3.2 llms.txt Kurulumu

**Gerçekçi beklenti:** `llms.txt` (llmstxt.org) bir **öneri standarttır**. Google, AI Overviews için kullanmadığını belirtti; büyük AI arama botlarının bunu sıralama sinyali olarak kullandığına dair kamuya açık kanıt yok. Ancak:
- Maliyeti ~30 dakika.
- Kullanıcı tetiklemeli ajanlar ("şu siteyi oku") ve kodlama asistanları bu dosyayı gerçekten okuyor.
- `llms-full.txt`, JS render sorunu olan siteler için (kuaför!) temiz bir yedek metin kaynağı sağlıyor.

Dolayısıyla: **yap, ama asıl yatırımı SSR + schema + içerik + yorumlara ayır.**

**Format kuralları:**
- Markdown.
- Tek `#` H1 (site adı).
- `>` blockquote ile tek paragraf özet.
- `##` bölümler altında `- [Başlık](URL): açıklama` listeleri.
- `## Optional` başlığı, bağlam kısaysa atlanabilecek linkler içindir.

Hazır dosyalar (gerçek site içeriğinden üretildi; köşeli parantezli alanları doldur):
- [`dosyalar/utkualtinay/llms.txt`](dosyalar/utkualtinay/llms.txt) · [`llms-full.txt`](dosyalar/utkualtinay/llms-full.txt)
- [`dosyalar/kuafor/llms.txt`](dosyalar/kuafor/llms.txt) · [`llms-full.txt`](dosyalar/kuafor/llms-full.txt)

**Sunucu ayarları:**
- `Content-Type: text/plain; charset=utf-8` olmalı. Türkçe karakterler bozulmamalı.
- Next.js ve Vite'ta dosyaları `public/` altına koymak yeterli.
- İçerik değiştikçe güncelle. CI'da sitemap'ten üreten küçük bir script en sağlamı.

## 3.3 Ölçümleme ve Takip

### A) Klasik arama

| Araç | Kurulum | İzlenecek |
|---|---|---|
| **Google Search Console** | Domain property (DNS TXT); sitemap gönder | Sorgu bazlı gösterim/tıklama, indeksleme, Rich Results raporları. **Not:** AI Overviews/AI Mode tıklamaları "Web" arama türü içinde raporlanır, ayrı filtre yoktur |
| **Bing Webmaster Tools** | GSC'den içe aktar | Bing + Copilot. Hesabında AI/Copilot alıntı raporu görünüyorsa, AI görünürlüğü için en doğrudan birinci taraf veri odur |
| **GBP Performans** (kuaför) | — | Arama/Harita görüntülemesi, arama, yol tarifi, web tıklaması; işletmeyi bulmak için kullanılan aramalar |
| Yandex Webmaster (kuaför) | — | Yandex sorguları |

### B) AI referral trafiği: GA4 kurulumu

**1) Özel kanal grubu.** Admin → Data display → Channel groups → "Create new channel group". "Referral" kanalının **üstüne** şu kanalı ekle:
- **Kanal adı:** `AI Assistants`
- **Koşul:** Session source → matches regex:

```text
^(.*\.)?(chatgpt\.com|chat\.openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|you\.com|phind\.com|poe\.com|meta\.ai|chat\.deepseek\.com|chat\.mistral\.ai|grok\.com|kagi\.com)$
```

> ChatGPT, dış linklere çoğunlukla `utm_source=chatgpt.com` ekler; bu yüzden session source alanında görünür. Bazı AI uygulamaları (özellikle mobil/desktop app'ler) referrer göndermez ve "Direct" olarak düşer. Yani gerçek AI trafiği raporlanandan **daha yüksektir**.

**2) Keşif (Exploration) raporu:**
- **Dimensions:** Session source, Landing page
- **Metrics:** Sessions, Engaged sessions, Key events

AI'dan gelen trafiğin **hangi sayfalara** indiğini görmek, hangi içeriğin alıntılandığının en iyi göstergesidir.

### C) AI crawler aktivitesi (sunucu tarafı)

- **Cloudflare → AI Crawl Control:** Bot bazında istek sayısı, taranan URL'ler, izin/engel durumu.
- **Sunucu / Vercel logları:** User-Agent'a göre say:

```bash
grep -Eio 'GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-SearchBot|Claude-User|PerplexityBot|Perplexity-User|Applebot|bingbot|CCBot' access.log | sort | uniq -c | sort -rn
```

`ChatGPT-User`, `Claude-User` ve `Perplexity-User` isabetleri, **gerçek bir kullanıcının o anda bir AI'a senin sayfanı okuttuğu** anlamına gelir. Prompt takibinin en doğrudan kanıtıdır.

### D) Prompt takibi (AI görünürlük skoru)

**Manuel panel (ücretsiz, aylık).** 15–20 sabit promptu 4 motorda (ChatGPT Search, Perplexity, Gemini, Claude) çalıştır. Her ay aynı promptları **giriş yapılmamış/temiz oturumda** kullan ve tabloya işle:

| Tarih | Motor | Prompt | Bahsedildi mi? | Sıra | Kaynak link? | Alıntılanan URL | Rakipler | Bilgi doğru mu? |
|---|---|---|---|---|---|---|---|---|
| 2026-11-01 | Perplexity | "Fatih'te randevulu kadın kuaförü" | Evet/Hayır | — | — | — | — | — |

**Utku için prompt seti:**
- "Who is Utku Altınay?" / "Utku Altınay kimdir?"
- ".NET developer in Istanbul with SwiftUI and Kotlin experience"
- "Freelance developer for multi-tenant SaaS in Turkey"
- "NFC customer feedback SaaS Turkey" (Revio)
- "Open source QR menu with AR" (ArMenu)

**Kuaför için prompt seti:** Bölüm 2.2 Taktik 6'daki promptlar + "Fatih'te manikür pedikür", "Fındıkzade kaş alma", "Kuaför Vahide Zafer yorumları".

**Ücretli otomasyon (opsiyonel):** Profound, Peec AI, Otterly.ai ve Semrush/Ahrefs'in AI görünürlük modülleri bu paneli otomatik çalıştırıp "share of voice" verir. Kuaför ölçeğinde manuel panel yeterli.

### KPI tablosu (90 gün)

| KPI | utkualtinay.com | kuaforvahidezafer.com.tr |
|---|---|---|
| Sitemap'teki URL | 12 → 20+ (blog dahil) | 1 → 10+ |
| Rich Results | ProfilePage + Breadcrumb hatasız | LocalBusiness + Breadcrumb hatasız |
| Organik görünürlük | Marka dışı sorgularda GSC gösterimi 2× | 5 çekirdek sorguda Local Pack ilk 3 |
| AI Assistants kanalı | Baseline ölç, aylık artış | Baseline ölç |
| Prompt paneli | İsim sorgularında %100 doğru bilgi; niş sorgularda ≥ %25 bahsedilme | Semt+hizmet sorgularında ≥ %30 bahsedilme |
| Yorum | — | +25–40 yeni GBP yorumu |
| Dönüşüm | İletişim/CV tıklaması | WhatsApp + arama + yol tarifi tıklaması |

---

## Ek: Yapma Listesi (her iki site)

- ❌ Gizli metin veya bota farklı içerik sunma (cloaking). AI botları için bile.
- ❌ Uydurma yorum, puan, fiyat, kuruluş yılı veya metrik. Hem Google cezası hem LLM'lerin seni yanlış bilgiyle eşleştirmesi.
- ❌ GBP işletme adına anahtar kelime eklemek.
- ❌ "En iyi", "1 numara" gibi kanıtsız üstünlük iddiaları. AI'lar 3. taraf doğrulaması arar; tek taraflı iddia güveni düşürür.
- ❌ llms.txt'ye sitede olmayan bilgi yazmak. İki kaynak çelişirse AI ikisine de güvenmez.
- ❌ Sunulmayan bir hizmeti ("erkek berberi") hedeflemek.
