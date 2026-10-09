import type { Locale } from "../config";
import type { SkillId } from "@/data/skills";

/**
 * One sentence per skill, saying what was actually built with it.
 *
 * Keyed by `SkillId`, so adding a skill without a Turkish sentence — or leaving
 * a sentence behind after deleting one — fails the build rather than the page.
 */
export type SkillCopy = Record<SkillId, string>;

const SKILL_COPY: Record<Locale, SkillCopy> = {
  en: {
    "csharp-dotnet": "REST API serving three client platforms with JWT-based auth.",
    mysql: "Relational schema design and query tuning behind the FitApp API.",
    postgresql: "Row-level security and EF Core migrations behind the ArMenu API.",
    python: "Scripting, data wrangling and glue code between services.",
    "rest-api-design": "One contract consumed by iOS, Android and web without branching.",
    typescript: "Strict mode, no `any` — the type layer is the documentation.",
    react: "Component architecture for the FitApp web client and the Revio dashboard.",
    nextjs: "App Router, server components and static rendering on Vercel.",
    javascript: "The language underneath everything else on this list.",
    tailwindcss: "Design tokens as CSS variables, dark mode without a second stylesheet.",
    "swift-swiftui": "FitApp iOS client — MVVM, Swift Charts, async networking.",
    "kotlin-android": "Native Android clients and a Firebase-backed request tracker.",
    git: "Branch-per-feature, readable history, reviewable diffs.",
    docker: "Chiseled .NET images and a reproducible local stack for ArMenu.",
    n8n: "Workflow automation for small-business operations.",
    supabase: "Postgres, auth and storage when a project doesn't warrant its own API.",
    firebase: "Realtime data and auth for the BT Support Android client.",
    vercel: "Preview deployments and edge delivery for every web project here.",
  },
  tr: {
    "csharp-dotnet": "Üç istemci platformuna hizmet veren, JWT tabanlı kimlik doğrulamalı REST API.",
    mysql: "FitApp API'sinin arkasındaki ilişkisel şema tasarımı ve sorgu iyileştirme.",
    postgresql: "ArMenu API'sinin arkasında satır düzeyi güvenlik ve EF Core migration'ları.",
    python: "Betikler, veri düzenleme ve servisler arası tutkal kod.",
    "rest-api-design": "iOS, Android ve web'in dallanmadan tükettiği tek bir sözleşme.",
    typescript: "Strict mod, `any` yok — tip katmanı dokümantasyonun kendisi.",
    react: "FitApp web istemcisi ve Revio paneli için bileşen mimarisi.",
    nextjs: "App Router, server component'ler ve Vercel üzerinde statik render.",
    javascript: "Bu listedeki diğer her şeyin altındaki dil.",
    tailwindcss: "CSS değişkeni olarak tasarım token'ları; ikinci bir stil dosyası olmadan karanlık mod.",
    "swift-swiftui": "FitApp iOS istemcisi — MVVM, Swift Charts, asenkron ağ katmanı.",
    "kotlin-android": "Native Android istemciler ve Firebase tabanlı bir talep takip aracı.",
    git: "Özellik başına dal, okunabilir geçmiş, incelenebilir diff'ler.",
    docker: "Chiseled .NET imajları ve ArMenu için tekrar üretilebilir yerel ortam.",
    n8n: "Küçük işletme operasyonları için iş akışı otomasyonu.",
    supabase: "Bir proje kendi API'sini hak etmediğinde Postgres, kimlik doğrulama ve depolama.",
    firebase: "BT Destek Android istemcisi için gerçek zamanlı veri ve kimlik doğrulama.",
    vercel: "Buradaki her web projesi için önizleme dağıtımları ve edge teslimi.",
  },
};

export function getSkillCopy(locale: Locale): SkillCopy {
  return SKILL_COPY[locale];
}
