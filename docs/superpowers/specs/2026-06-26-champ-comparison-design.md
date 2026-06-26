# Şampiyona Karşılaştırma (Compare) — Tasarım

Tarih: 2026-06-26
Kapsam: **Sadece frontend** (Angular 18). Mevcut backend API'leri kullanılır, backend'e dokunulmaz.

## Amaç

İki şampiyonayı seçilen bir branş + cinsiyet için yıl yıl karşılaştırmak.
Örn: Almanya Şampiyonası 100m galipleri vs Avrupa Şampiyonası 100m galipleri — her yıl
kim, hangi ülke, hangi dereceyle kazanmış; tek tabloda iki sütun.

## Kullanıcı kararları (brainstorming)

- Tam **2 şampiyona** (iki sütun).
- Hücre içeriği: **Galip + ülke + derece** (`Ad (ÜLKE) — mark_display`).
- Yıllar: **birleşim** (iki şampiyonadan herhangi birinin o branşı yaptığı her yıl; eksik tarafta "—").
- Varsayılan **sadece galip**; her hücrede **expand butonu** → tıklanınca podyum (altın/gümüş/bronz).
- Branş listesi: iki şampiyonanın branşlarının **birleşimi**.
- Cinsiyet: **All / Men / Women / Mixed** toggle; bu toggle branş açılır listesini filtreler.
- Yükleme: tüm yılları **paralel çek**, bitene kadar loader.

## Cinsiyet + branş modeli

Branş açılır listesi `(event_id, gender)` çiftlerinden oluşur (ör. "100m (Men)").
Cinsiyet toggle'ı bu listeyi filtreler ("All" hepsini gösterir). Böylece her karşılaştırma
tek, net bir seriye (sabit event_id + gender) karşılık gelir; "All"/"Mixed" sade biçimde desteklenir.

## Veri akışı (mevcut API'ler)

1. Açılışta: `GET /champs` (A/B dropdown), `GET /events` (event id→isim).
2. A/B seçilince: her biri için `GET /champs/:id` → `meetings` (yıl+id) + `events_men/women/mixed`.
3. Branş çiftleri = A ve B'nin seçili cinsiyetteki event dizilerinin birleşimi.
4. Branş+cinsiyet seçilince:
   - Yıl satırları = A ∪ B yıllarının azalan listesi.
   - Her yıl için A meeting'i ve B meeting'i bulunur.
   - İlgili her meeting için `GET /meetings/:id/medals` (memoize'lı), `Promise.all` ile paralel.
   - `/meetings/:id/medals` yanıtı cinsiyete (0/1/2) göre anahtarlı; her event'in `medals` dizisi var.
     `data[gender]` içinde `id === event_id` olan event'in `medals`'ı = o yılın podyumu; `medal === 1` = galip.
5. Tüm istekler bitene kadar loader.

## Bileşen yapısı

- `core/services/compare.service.ts` (+ `.spec.ts`) — saf yardımcılar:
  - `buildEventOptions(champA, champB, events, genderFilter)` → sıralı `(event_id, gender, label)`.
  - `buildYearRows(champA, champB)` → `{ year, meetingAId?, meetingBId? }[]` (desc, birleşim).
  - `extractPodium(medalsData, eventId, gender)` → sıralı medal dizisi ya da `[]`.
  - `extractWinner(podium)` → `medal === 1` (yoksa null).
- `modules/compare/` — `compare-routing.module.ts`, `compare.module.ts`, `index/compare.component.{ts,html,scss}`
  (seçiciler + tablo + expand). Loader/breadcrumb/flag/medal/gender pipe yeniden kullanılır.

## Entegrasyon

- `app-routing.module.ts`: lazy `/compare`.
- `header` (masaüstü + mobil): "Compare" linki.
- `ENavigation.COMPARE` eklenir; `compare.component` `setNavigation(COMPARE)`.
- `core/services/index.ts`: compare.service export.

## Test

`compare.service.spec.ts`: birleşim/filtre, yıl birleşimi+desc, eksik yıl → "—",
podyum filtreleme, galip seçimi (medal=1 yoksa null).
