import type { Locale } from "../config";
import type { ProjectSlug } from "@/data/projects";

/**
 * The translated half of a project.
 *
 * English is the source text and stays inline in `data/projects.ts`; this file
 * holds what a translator produces from it. Arrays are merged by position, and
 * `getProjects` throws during the build if a length does not match — so a
 * decision added in English and forgotten in Turkish fails `pnpm verify`
 * instead of rendering an English paragraph in the middle of a Turkish page.
 */
export interface ProjectCopy {
  readonly tagline: string;
  readonly problem: string;
  readonly solution: string;
  readonly impact?: string;
  readonly role: string;
  readonly architecture?: readonly { readonly name: string; readonly responsibility: string }[];
  readonly decisions?: readonly { readonly title: string; readonly rationale: string }[];
  readonly metrics?: readonly { readonly label: string }[];
  readonly cover?: { readonly alt: string };
  readonly gallery?: readonly { readonly alt: string; readonly caption?: string }[];
}

const TR: Record<ProjectSlug, ProjectCopy> = {
  fitapp: {
    tagline: "Tek bir .NET API, üç native istemci ve insanı geri getiren alışkanlıklar.",
    problem:
      "Form takibi verisi ancak cihazı değil kişiyi takip ettiğinde işe yarar — ve ikinci haftadan sonra kimsenin açmadığı bir takip uygulaması hiç işe yaramaz. Aynı özellik setini platform başına bir kez, üç kez yazmak üç ayrı doğruluk kaynağı ve üç ayrı hata kümesi demekti; yalnızca takibi yazmak ise geri dönmek için sebebi olmayan bir uygulama demekti.",
    solution:
      "Tek doğruluk kaynağı olarak MySQL üzerinde çalışan bir C# .NET 8 API, üzerinde ince istemciler: iOS'ta SwiftUI, Android'de Kotlin, web'de Next.js. Öğün, su, adım ve antrenman kaydının ötesinde, alışkanlık hâline getiren kısmı da sunucu yürütüyor — Gemini destekli bir koç, günlük ve arkadaş görevleri, mağazası olan bir altın bakiyesi, liderlik tablosu ve SignalR üzerinden sohbet. Kimlik doğrulama, doğrulama ve her kural API'de; istemciler durumu gösterip girdi topluyor.",
    impact:
      "Bir özellik, birbirinden uzaklaşan üç ayrı uygulama yerine tek bir API değişikliği ve üç sunum katmanı demek — ve otuzuncu gün uygulamayı açma sebebi bir bildirim değil, sunucu tarafında çalışan bir sistem.",
    role: "Tek geliştirici — API tasarımı, veri modeli, üç istemcinin tamamı ve dağıtım.",
    architecture: [
      {
        name: "İstemciler",
        responsibility:
          "Durumu gösterip girdi toplarlar. İş kuralı taşımazlar; bu yüzden hiçbir platform bir kalori, bir seri ya da bir bakiye konusunda diğeriyle çelişemez.",
      },
      {
        name: "API",
        responsibility:
          "Kimlik doğrulama, doğrulama ve her hesaplama — bir kuralın yazılı olduğu tek yer; istemcilerin üzerine inşa edildiği bir OpenAPI dokümanının arkasında.",
      },
      {
        name: "Bağlılık servisleri",
        responsibility:
          "Koç, görevler, para birimi ve liderlik tablosu: her biri ayrı bir servis. Çünkü bir form uygulamasının birinci ayı atlatıp atlatamayacağını belirleyen kısım, kalorileri toplayan kısım değil.",
      },
      {
        name: "Kalıcılık ve medya",
        responsibility:
          "Kullanıcılar, öğünler, antrenmanlar, görevler ve bakiyeler için ilişkisel bir şema; yeniden yazılarak değil migration'larla büyütüldü. Görseller nesne depolamaya gider, asla veritabanına değil.",
      },
    ],
    decisions: [
      {
        title: "İş mantığı API'de, asla istemcide değil",
        rationale:
          "Swift, Kotlin ve TypeScript'te çoğaltılmış bir kalori formülü, er ya da geç üç farklı cevap verecek bir formüldür. Sunucuda tutmak istemcileri değiştirilebilir kıldı — ve dördüncü bir uygulama yazmadan web istemcisini mümkün hâle getirdi.",
      },
      {
        title: "AI koç sunucuda yaşıyor",
        rationale:
          "Modeli üç uygulamadan çağırmak, anahtarı üç ikili dosyaya gömmek ve prompt her yanlış olduğunda bir mağaza sürümü için yalvarmak demekti. Koç, API'nin arkasında tek bir servis: anahtar sunucudan hiç çıkmıyor ve tavsiye bir salı öğleden sonra değişebiliyor.",
      },
      {
        title: "Oyunlaştırma bir şema, feature flag değil",
        rationale:
          "Görevler, altın, mağaza ve liderlik tablosu; takip koduna sonradan iliştirilmiş koşullar değil, kendi tabloları ve kendi servisleri. Yeni bir görev tipi eklemek bir satır. Büyüyen bir sistemle özel durum biriktiren bir sistem arasındaki fark bu.",
      },
      {
        title: "Durumsuz JWT kimlik doğrulama",
        rationale:
          "Oturum ömürleri farklı üç istemci, sunucu tarafı oturumların darboğaza dönüşeceği anlamına geliyordu. Token tabanlı doğrulama, her platformun yenilemeyi kendi SDK'sının beklediği şekilde yönetmesine izin verdi.",
      },
    ],
    cover: {
      alt: "FitApp panosu aynı anda web'de, iOS'ta ve Android'de.",
    },
    gallery: [
      {
        alt: "iOS'ta AI koç ekranı, günün planına dair bir soruyu yanıtlıyor.",
        caption:
          "Gemini destekli koç. API'nin arkasında çalışıyor; böylece anahtar sunucuda kalıyor ve prompt bir mağaza sürümü beklemeden değişiyor.",
      },
      {
        alt: "Android'de liderlik tablosu, kullanıcıları altın bakiyesine göre sıralıyor.",
        caption:
          "Liderlik tablosu, görevler ve altın bakiyesi — her istemcide aynı servisler, çünkü sıralamanın kendisiyle tutarlı olması gerekiyor.",
      },
      {
        alt: "Web istemcisinde antrenman programları; egzersizler ve ilerleme.",
        caption: "Web istemcisinde antrenman programları, telefonların kullandığı uç noktaların aynısıyla.",
      },
      {
        alt: "Web istemcisinde günlük rapor: kalori, su, adım ve antrenman toplamları.",
        caption: "Günlük rapor — her istemcinin gösterdiği, hiçbirinin hesaplamadığı sayılar.",
      },
    ],
  },
  revio: {
    tagline: "Tezgâhtaki bir dokunuştan müşteri geri bildirimi — uygulama yok, kayıt yok.",
    problem:
      "Bir kafe ya da kuaför, ziyaretin kötü geçtiğini tek yıldızlı yorum çoktan yayımlandığında öğreniyor. Tezgâhta sormak da pek işe yaramıyor: dürüst cevap, insanların yüzünüze söylemeyeceği cevaptır. Diğer her yol — işletmeyi bul, giriş yap, bir şeyler yaz — ilk dokunuştan önce neredeyse herkesi kaybediyor.",
    solution:
      "Çok kiracılı bir SaaS. Her işletme tezgâhı ve masaları için NFC kartlar alıyor; müşteri telefonunu kartlardan birine yaklaştırıyor, ziyareti birkaç saniyede puanlıyor ve isterse not bırakıyor — hiçbir şey kurmadan, hesap açmadan. Dokunuşun arkasında temiz mimariyle yazılmış bir .NET 8 API var: MediatR üzerinden CQRS, MySQL üzerinde EF Core, sıcak yolda Redis ve gece boyunca Google Business Profile yorumlarını çeken Hangfire. Üstünde ise puanların, notların ve Google yorumlarının masaya, kasaya ve personele göre ayrılarak buluştuğu bir React paneli.",
    impact:
      "Memnun kalmamış müşteri, Google'a ulaşmadan önce işletmeciye ulaşıyor — hem de daha dükkândayken ve birinin bir şey yapabileceği bir zamanda.",
    role: "Tek geliştirici — mimari, API, arka plan görevleri, panel ve dağıtım.",
    architecture: [
      {
        name: "Fiziksel katman",
        responsibility:
          "Her kart, kendi işletmesini ve konumunu taşıyan bir URL kodluyor; böylece bir puan, hangi masadan geldiğini zaten bilerek geliyor.",
      },
      {
        name: "Okutma uç noktası",
        responsibility:
          "Sıcak yol. Kart ve işletme önbellekten okunuyor, okutma kayıt altına alınması akışı bekletmeden yapılıyor ve müşteri yönlendiriliyor — sistemde hiç kimse için yavaş olmasına izin verilmeyen tek istek bu.",
      },
      {
        name: "API",
        responsibility:
          "Domain, Application, Infrastructure ve Api ayrı projeler; bağımlılıklar yalnızca içeri bakıyor. Domain projesi hiçbir pakete referans vermiyor.",
      },
      {
        name: "Arka plan görevleri",
        responsibility:
          "Gece yorum senkronizasyonu; her işletme için ayrı bir iş olarak kuyruğa alınıyor ki tek bir hatalı hesap diğerlerini bloklamasın, ve Google'ın kendi yorum kimliği üzerinden idempotent çalışıyor.",
      },
      {
        name: "Panel",
        responsibility:
          "Puan dağılımı, yoğun saatler ve tekrar eden şikâyetler; işletmenin kendi geri bildirimlerinin yanında Google yorumlarıyla birlikte.",
      },
    ],
    decisions: [
      {
        title: "Yıldız filtresi bir sıralama, kapı değil",
        rationale:
          "Yalnızca memnun müşteriyi Google'a yönlendirmenin adı review gating ve Google'ın kendi politikası seçici biçimde olumlu yorum istemeyi yasaklıyor — yakalanan bir işletme yorumlarını tümden kaybedebiliyor. Bu yüzden puan, hangi kapıların var olduğuna değil hangi ekranın önce geleceğine karar veriyor: bir yıldız veren müşteri de Google seçeneğini görüyor, sadece ondan önce \"doğrudan işletmeye anlat\" formunu görüyor. Kötü yorumu azaltmanın meşru yolu, ziyareti müşteri hâlâ oradayken düzeltmek.",
      },
      {
        title: "Tek platform Google hesabı, yönetici olarak eklenmiş",
        rationale:
          "İlk tasarım her işletmeden kendi yetkisini panele yapıştırmasını istiyordu. Google'ın erişim jetonları bir saatte doluyor, dolayısıyla gece senkronizasyonu ertesi sabaha kırılıyordu; bunun yerine refresh token kullanmak işletme başına bir istemci kimliği ve sırrı gerektiriyor, ki bunu bir kuaförden üretmesini isteyemezsiniz. Artık işletme sahibi, platformun destek adresini kendi profiline yönetici olarak ekliyor — jeton yok, parola yok, Google ayarlarından tek tıkla geri alınabiliyor.",
      },
      {
        title: "Kiracı izolasyonu bir query filter, WHERE değil",
        rationale:
          "Kiracıya bağlı her varlık global bir query filter taşıyor ve bir konumun isteği yapan kiracıya ait olup olmadığı kontrolü panelde değil sunucuda çalışıyor. Uygulama kodunda filtrelemek, bir kafeye başka bir kafenin yorumlarını göstermekten yalnızca bir unutulmuş koşul uzaktır; seçeneği arayüzde gizlemek ise sadece arayüzü kullananları durdurur.",
      },
      {
        title: "Önce hesapla, sonra modele sor",
        rationale:
          "Yorum içgörüleri, aritmetiğin yettiği her yerde deterministik olarak hesaplanıyor; yalnızca dil gerektiren kısımlar bir modele gidiyor — önce Gemini, Gemini başarısız olduğunda yedek olarak Claude, günlük bir tavanla ve anahtar tanımlı değilse sessizce devre dışı kalarak. Para harcayan ve halüsinasyon görebilen bir özet, akışın kendisi değil istisnası olmalı.",
      },
    ],
    metrics: [{ label: "Otomatik test" }, { label: "Domain katmanının paket bağımlılığı" }],
    cover: {
      alt: "Revio ana sayfası: \"Müşterinizin ne düşündüğünü, masadan kalkmadan öğrenin.\"",
    },
    gallery: [
      {
        alt: "Üç adım: müşteri kartı okutur, ziyareti puanlar, işletmeci panelden izler.",
        caption: "Üç adım, sıfır kurulum — ürünün tamamı tek ekranda.",
      },
      {
        alt: "Google Business Profile bölümü; yalnızca okuma erişimini ve geri alınabilir yetkiyi anlatıyor.",
        caption:
          "Google yorumları da aynı panele düşüyor — yalnızca okuma, ve Google'ın kendi ayarlarından geri alınabilir.",
      },
    ],
  },
  armenu: {
    tagline: "Çok kiracılı QR menüler, tarayıcı içinde AR — kurulacak uygulama yok.",
    problem:
      "Basılı bir menü, misafire yemeğin neye benzediğini gösteremez, onun dilinde okunamaz ve yeniden bastırılmadan değiştirilemez. Buna verilen her dijital cevap misafirden bir şey kurmasını ister; restoran masasında fikrin öldüğü yer de tam olarak orasıdır.",
    solution:
      "Çok kiracılı bir B2B SaaS. Misafir masadaki QR kodu okutuyor, menüyü kendi dilinde okuyor ve model-viewer üzerinden yemeği artırılmış gerçeklikle masaya koyuyor — hem de zaten açık olan tarayıcısında. Arkasında: PostgreSQL üzerinde bir .NET 10 API ve yüklenen 3B modeli optimize edilmiş GLB, USDZ ve poster görsellerine dönüştüren ayrı bir Node servisi.",
    impact:
      "Restoranlar kendi menülerini değiştiriyor; misafirler sipariş vermeden önce yemeği görüyor. İki taraf da hiçbir şey kurmuyor.",
    role: "Tek geliştirici — API, her iki React uygulaması, 3B varlık hattı, dağıtım ve gözlemlenebilirlik.",
    architecture: [
      {
        name: "Misafir ve panel uygulamaları",
        responsibility:
          "CDN üzerinde iki statik uygulama. Misafir uygulamasının mobil veride anında açılması gerekiyor; panel ise işletme sahiplerinin kendi menülerini düzenlediği yer.",
      },
      {
        name: "API",
        responsibility:
          "Her kural tek bir yerde; istemcilerin TypeScript tiplerini ürettiği, depoya işlenmiş bir OpenAPI sözleşmesinin arkasında.",
      },
      {
        name: "Kalıcılık",
        responsibility:
          "Kiracı izolasyonunu filtrelemeyi hatırlamak değil, veritabanının kendisi zorunlu kılıyor.",
      },
      {
        name: "Varlık hattı",
        responsibility:
          "Yüklenen modeli Meshopt + WebP GLB'ye, iOS Quick Look için USDZ'ye ve poster görsellerine dönüştürüyor.",
      },
    ],
    decisions: [
      {
        title: "Satır düzeyi güvenlik sorgu katmanında değil, veritabanında",
        rationale:
          "Uygulama kodunda yaşayan bir kiracı filtresi, bir restorana başka bir restoranın menüsünü göstermekten yalnızca bir unutulmuş WHERE uzaktır. İzolasyonu Postgres'e itmek sızıntıyı düşük ihtimalli değil, imkânsız yapıyor.",
      },
      {
        title: "Temiz mimariyi disiplin değil, bir test zorunlu kılıyor",
        rationale:
          "Bir kaynak bağımlılığı dışarı baktığı anda mimari testler derlemeyi düşürüyor. Yalnızca README'de yazan bir katman kuralı, aşınan bir katman kuralıdır.",
      },
      {
        title: "Native uygulama yerine WebAR",
        rationale:
          "Masada duran bir müşteri, menüye bakmak için uygulama kurmaz. model-viewer talep üzerine yükleniyor; böylece AR'ı hiç açmayan misafirler onun bedelini hiç ödemiyor.",
      },
      {
        title: "3B varlıklar için ayrı bir servis",
        rationale:
          "Mesh optimizasyonu yavaş ve CPU'ya bağlı bir iş. Onu API'nin dışında tutmak, tek bir büyük yüklemenin bir menü isteğini arkasında bekletmesini imkânsız kılıyor.",
      },
    ],
    metrics: [
      { label: "Lighthouse (perf / erişilebilirlik / en iyi uygulama / SEO)" },
      { label: "Toplam bloklama süresi · düzen kayması" },
      { label: "Başlangıç JavaScript'i (gzip)" },
      { label: "Talep üzerine yüklenen 3B yığını (gzip)" },
    ],
    cover: {
      alt: "ArMenu işletme paneli ile yanında 3B burger ve AR butonu gösteren misafir uygulaması.",
    },
    gallery: [
      {
        alt: "Telefonda misafir menüsü: arama, filtreler, kategoriler ve 3B rozeti taşıyan bir yemek.",
        caption: "Masadaki QR kodu okuttuktan sonra misafirin gördüğü ekran.",
      },
      {
        alt: "Telefonda açılmış bir yemek, 3B olarak işlenmiş, \"Masanda gör\" butonuyla.",
        caption:
          "3B yığını yalnızca modeli olan bir yemek açıldığında yükleniyor — AR'ı hiç kullanmayan misafirler bedelini hiç ödemiyor.",
      },
      {
        alt: "Panelin QR ekranı: menü bağlantısı, SVG ve PNG indirmeleri ve masa başına basılabilir kartlar.",
        caption: "Panelden basılan masa başına QR kartları — masa numarası okutmayla birlikte geliyor.",
      },
    ],
  },
  "ttrpg-companion": {
    tagline: "Bir masaüstü kampanyası için gerçek zamanlı masa — ve kimsenin güvenmek zorunda olmadığı bir sunucu.",
    problem:
      "Bir masaüstü kampanyası yürütmek; canları, inisiyatif sırasını, envanteri, durum etkilerini ve ilişkileri kâğıt fişler ile grup sohbeti arasında takip etmek demek. Masanın bir kısmı uzaktayken bütün o ortak durum tek bir kişinin aklında yaşıyor — her zar atışı da öyle, ve geri kalan herkesin buna inanmaktan başka seçeneği yok.",
    solution:
      "Arkadaşlarımla yürüttüğüm kampanya için sıra tabanlı bir yardımcı. Tek bir Expo istemcisi — iOS, Android ve react-native-web sayesinde düz bir tarayıcı bağlantısı — SignalR hub'ı üzerinden bir .NET 8 API ile konuşuyor; böylece her oyuncu aynı fişleri, aynı inisiyatif sırasını ve aynı savaş turunu olduğu anda görüyor. Kurallar sunucuda: zar, savaş fazları, özellikler, durum etkileri, tetiklenen tepkiler, arena düzenleyicileri ve bir gün-dinlenme döngüsünü kapsayan kırk civarı domain servisi.",
    impact:
      "Arkadaşlar hiçbir şey kurmadan bir bağlantıyla katılıyor, oturum oyun ortasındaki bir dağıtımı atlatıyor ve kimse bir zar atışı için kimsenin sözüne güvenmek zorunda kalmıyor.",
    role: "Tek geliştirici — API, gerçek zamanlı hub, kural motoru ve istemci.",
    architecture: [
      {
        name: "İstemci",
        responsibility:
          "iOS, Android ve tarayıcı için tek kod tabanı. Asıl kullanılan web sürümü: grup sohbetine atılan bir bağlantı, beş kişiden bir şey kurmasını istemekten iyidir.",
      },
      {
        name: "Gerçek zamanlı hub",
        responsibility:
          "Masadaki her eylem — katılmak, zar atmak, saldırmak, turu bitirmek — odaya yayınlanan bir hub metodu. Yeniden katılmak, kaçırılanı tekrar oynatmak yerine güncel durumu okuyor.",
      },
      {
        name: "Kural motoru",
        responsibility:
          "Zar, savaş fazları, özellikler, durum etkileri, tetiklenen tepkiler ve arena düzenleyicileri. Her kural bir servis; böylece yeni bir mekanik, mevcut bir dosyada yeni bir dal değil yeni bir dosya oluyor.",
      },
      {
        name: "Kalıcılık",
        responsibility:
          "Odalar, karakterler, inisiyatif ve yürüyen savaş turu bellekte değil satırlarda. Lokalde SQLite, dağıtımda PostgreSQL; aynı context'in arkasında.",
      },
    ],
    decisions: [
      {
        title: "Zarı sunucu atıyor",
        rationale:
          "Kendi sayısını üreten bir istemci, daha iyi sayılar üretmeye ikna edilebilen bir istemcidir. Ham d20 sunucuda atılıyor; stat, ekipman ve ilişki düzenleyicileri de orada uygulanıyor — böylece masaya ulaşan sonuç, yolda kimsenin düzenlemiş olamayacağı bir sonuç oluyor.",
      },
      {
        title: "Ama gerçek zar da sayılıyor",
        rationale:
          "Fiziksel masadaki insanlar zarlarını kaldırmayacak ve onlara kaldırmalarını söyleyen bir uygulama kapatılan bir uygulamadır. Sunucu atışının yanında, kendi attığınız sayıyı girmek için bir yol var; aynı kurallar ona da işliyor. Hile koruması uzaktaki oyuncuları, odadakileri disipline etmeden savunuyor.",
      },
      {
        title: "Bağlantılar bellekte, oyun veritabanında",
        rationale:
          "SignalR bağlantıları tek kullanımlık — telefon uyur, tünel düşer, bir dağıtım süreci yeniden başlatır. Onları doğruluk kaynağı saymak, kopan bir bağlantının kaybedilen bir oturum olması demekti. Bunun yerine oda durumu kalıcılaştırılıyor; böylece yeniden bağlanmak bir kurtarma değil, bir okuma.",
      },
      {
        title: "Oyun yöneticisinin ne yapabileceği bir sunucu kuralı",
        rationale:
          "İzleyici, oyuncu ve yönetici; istemcinin kimsenin bulamayacağını umduğu butonları gizlemesi yerine, kendi erişim seviyeleri olan ayrı hub metotlarından giriyor. Yalnızca arayüzde var olan yetki, herkesin geliştirici araçlarıyla kendine verebileceği yetkidir.",
      },
    ],
    cover: {
      alt: "İki telefonda yan yana bir karakter sayfası ve pixel-art savaş arenası.",
    },
    gallery: [
      {
        alt: "Savaş arenası: arka sokakta pixel-art sprite'lar, altında tur sırası ve saldırı zarı paneli.",
        caption:
          "Devam eden bir çekişmeli saldırı. Saldıran zarını giriyor, savunma karşı oyuncunun cihazında açılıyor ve sonucu sunucu belirliyor.",
      },
      {
        alt: "Karakter seçimi: can, kuvvet, çeviklik, racon ve parasıyla bir pixel-art portre ve bir arka hikâye.",
        caption: "Üç oynanabilir karakter; her birinin statları ve hikâyenin içinden geldiği kısım.",
      },
      {
        alt: "Can çubuğu, bağlantı rozeti ve statlar, yetenekler, eşyalar, durumlar, hikâye, cüzdan ve ilişkiler bölümleri olan bir karakter sayfası.",
        caption:
          "Her oyuncunun canlı güncellendiğini gördüğü sayfa — köşedeki rozet süs değil, SignalR bağlantısı.",
      },
    ],
  },
  "bt-support": {
    tagline: "Şirket içi BT ekipleri için talep takibi yapan bir Android uygulaması.",
    problem:
      "Stajım sırasında destek taleplerinin telefonla, sohbet mesajıyla ve koridor konuşmasıyla geldiğini gördüm. Hiçbiri kayda geçmiyordu, dolayısıyla hiçbiri önceliklendirilemiyordu.",
    solution:
      "Çalışanların talep açtığı, BT ekibinin ise tek bir önceliklendirilmiş kuyruk gördüğü native bir Android uygulaması; gerçek zamanlı güncellemeler ve kimlik doğrulama için Firebase ile.",
    impact:
      "Talepler bir kesinti olmaktan çıkıp durumu olan bir listeye dönüştü — bir yıl içinde yaşadığım problemin ta kendisi.",
    role: "Tek geliştirici — Android istemcisi ve veri modeli.",
    decisions: [
      {
        title: "Kendi backend'im yerine Firebase",
        rationale:
          "Önemli olan özellik, bir avuç şirket içi kullanıcı için gerçek zamanlı kuyruk güncellemeleriydi. Bunun için bir API yazmak, mimarinin kendisi uğruna mimari olurdu.",
      },
    ],
    cover: {
      alt: "BT Destek'in arkasındaki varlık-ilişki diyagramı: kullanıcılar, talepler, konular ve mesajlar.",
    },
    gallery: [
      {
        alt: "Bir çalışanın yapabildikleriyle BT ekibinin yapabildiklerini ayıran kullanım senaryosu diyagramı.",
        caption:
          "Daha hiçbir ekran yokken iki rolü birbirinden ayıran kullanım senaryosu diyagramı — çalışan açar, BT önceliklendirir.",
      },
    ],
  },
};

export function getProjectCopy(locale: Locale): Record<ProjectSlug, ProjectCopy> | null {
  // English is the source text and already lives on the project itself.
  return locale === "en" ? null : TR;
}
