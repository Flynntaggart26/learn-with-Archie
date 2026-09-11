# Ustalık Matrisi + SM-2 Otomatik Tekrar Planlayıcısı

## Durum: Tamamlandı ✅

## Yapılan Düzeltme
`index.html` (basit/eski sürüm) ile `script.js` (ileri sürüm) arasındaki uyumsuzluk giderildi.
`script.js`'in referans verdiği **tüm** element ID'leri içerecek şekilde `index.html` yeniden oluşturuldu, böylece `null` element arama çökmeleri ortadan kalktı ve kayıt/giriş bölümü dahil her şey çalışır durumda.

## Eklenen / Eşleşen Özellikler
- **📊 Panel (Dashboard)**: `dashboardContainer`, `dashUserName`, `dashCompleted`, `dashTotal`, `dashPct`, `dashXp`, `dashProgressFill`, `topbarXpValue`, `dashGoals`, `dashAchievements`, `dashNotes`, `dashAnalytics`, `countdownValue`
- **🌙 Karanlık Mod**: `themeToggle`
- **🧑‍🏫 / 🎧 AI Sohbet**: `teacherClassSel`, `studentClassSel`, `teacherSuggestChips`, `studentSuggestChips`, `teacherVoiceBtn`, `studentVoiceBtn`
- **🧠 SuperMemo-2 (SM-2) Tekrar**: Quiz sonucunda `qualityOptions` ve `qualityReview` (kalite $q \in [0,5]$) → tam tekrar tarihi hesaplanır ve planlayıcıya görev eklenir
- **🎨 Konu Ustalık Matrisi**: `masteryMatrix` — TYT/AYT alt konuları quiz doğruluk oranına göre renk kodlu gösterilir
- **📅 Planlayıcı**: `plannerQuote`, `plannerEditForm`, `editCancelBtn`, `taskPriority`, `taskCategory`, `taskDuration`

## Değişmeyen / Sağlam Dosyalar
- `script.js` — ileri sürüm (SM-2 + ustalık matrisi + dashboard + düzenleme formu dahil)
- `styles.css` — modern sürüm (dashboard, matris, kalite, planlayıcı, AI chip, ses butonu, karanlık mod stilleri dahil)

## Uygulama Nasıl Çalışır
- `index.html`'i doğrudan bir tarayıcıda açın (çift tıklayın). Vanilla JS uygulaması olduğu için sunucu gerekmez.

## Üniversite Yol Haritası (2026-09-11, öncelik sırasıyla)
1. **Öğrenme bilimi görünürlüğü** — kalibrasyon eğrisi + hatırlama olasılığı + hazırbulunuşluk skoru + interleaving. DURUM: kalibrasyon + hatırlama tamam.
2. **Etki kanıtı** — öğrenme kazanım raporu (PDF), pilot çalışma + sonuç sayfası, anonim veri bağışı.
3. **Gerçek zekâ** — Sokratik ipucu modu, yanılgı teşhisi, kazanımdan soru üretimi.
4. **Sınav gerçekçiliği** — tam simülasyon modu (165 dk + optik form), net defteri.
5. **Erişilebilirlik + teknik olgunluk** — PWA/çevrimdışı, Supabase çoklu-cihaz senkron, erişilebilirlik, İngilizce arayüz.
6. **Motivasyon katmanı 2** — öğretmen paneli (sınıf ısı haritası), tükenmişlik freni.
