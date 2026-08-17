// Script to add subtopics to all topics in curriculum-data.js
const fs = require('fs');

// Read the curriculum data file
let content = fs.readFileSync('curriculum-data.js', 'utf8');

// Extract the CURRICULUM object by evaluating it
// We need to extract just the object literal
const startIdx = content.indexOf('const CURRICULUM = {');
const endIdx = content.lastIndexOf('};');
const objStr = content.substring(startIdx + 'const CURRICULUM = '.length, endIdx + 1);

// Evaluate the object
const CURRICULUM = eval('(' + objStr + ')');

// Define subtopics for specific topics (from user's data)
const SPECIFIC_SUBTOPICS = {
  // TYT Matematik - Sayılar
  'tyt-mat-sayi-kumeleri': ['Doğal Sayılar', 'Tam Sayılar', 'Rasyonel Sayılar', 'İrrasyonel Sayılar', 'Gerçek Sayılar'],
  'tyt-mat-temel-islemler': ['Toplama ve Çıkarma', 'Çarpma ve Bölme', 'İşlem Önceliği', 'Parantezli İşlemler'],
  'tyt-mat-tek-cift': ['Tek Sayılar', 'Çift Sayılar', 'Tek-Çift İşlem Kuralları'],
  'tyt-mat-poz-neg': ['Pozitif Sayılar', 'Negatif Sayılar', 'Sıfır', 'İşaret Kuralları'],
  'tyt-mat-ardisik': ['Ardışık Tam Sayılar', 'Ardışık Çift Sayılar', 'Ardışık Tek Sayılar', 'Ardışık Sayıların Toplamı'],
  'tyt-mat-basamak': ['Basamak Değeri', 'Sayı Değeri', 'Çözümleme', 'Basamak Kavramı'],
  'tyt-mat-asal': ['Asal Sayılar', 'Aralarında Asal Sayılar', 'Asal Sayı Testleri'],
  'tyt-mat-kalanli-bolme': ['Bölme İşlemi', 'Kalan Kavramı', 'Bölünen-Bölen-Bölüm-Kalan İlişkisi'],
  'tyt-mat-bolunebilme1': ['2 ile Bölünebilme', '3 ile Bölünebilme', '4 ile Bölünebilme', '5 ile Bölünebilme'],
  'tyt-mat-bolunebilme2': ['6 ile Bölünebilme', '8 ile Bölünebilme', '9 ile Bölünebilme', '10 ile Bölünebilme', '11 ile Bölünebilme'],
  'tyt-mat-asal-carpan': ['Asal Çarpanlara Ayırma', 'Çarpan Ağacı', 'Bölen Sayısı Bulma'],
  'tyt-mat-ebob-ekok': ['EBOB Kavramı', 'EKOK Kavramı', 'EBOB-EKOK İlişkisi', 'EBOB-EKOK Bulma Yöntemleri'],
  'tyt-mat-ebob-ekok-problem': ['EBOB Problemleri', 'EKOK Problemleri', 'Karışık Problemler'],
  'tyt-mat-periyodik': ['Periyodik Tekrar', 'Gün-Hafta Problemleri', 'Saat Problemleri'],
  'tyt-mat-rasyonel': ['Rasyonel Sayı Tanımı', 'Toplama-Çıkarma', 'Çarpma-Bölme', 'Sıralama'],
  'tyt-mat-devirli': ['Ondalık Gösterim', 'Devirli Ondalık Sayılar', 'Ondalık-Rasyonel Dönüşümü'],
  'tyt-mat-aralik': ['Kapalı Aralık', 'Açık Aralık', 'Yarı Açık Aralık', 'Aralık Gösterimleri'],
  'tyt-mat-birinci-denklem': ['Denklem Kavramı', 'Birinci Dereceden Denklem Çözümü', 'Denklem Kurma Problemleri'],
  'tyt-mat-basit-esitsizlik': ['Eşitsizlik Kavramı', 'Eşitsizlik Çözümü', 'Eşitsizlik Özellikleri'],
  'tyt-mat-iki-bilinmeyen': ['İki Bilinmeyenli Denklem Sistemi', 'Yerine Koyma Yöntemi', 'Yok Etme Yöntemi'],
  'tyt-mat-iki-bil-esitsizlik': ['İki Bilinmeyenli Eşitsizlik', 'Çözüm Kümesi', 'Grafik Gösterimi'],
  'tyt-mat-esitsizlik-sistem': ['Eşitsizlik Sistemi Çözümü', 'Kesişim Kümesi', 'Grafik Yöntemi'],
  'tyt-mat-mutlak-deger': ['Mutlak Değer Tanımı', 'Mutlak Değer Özellikleri', 'Mutlak Değerli İfadeler'],
  'tyt-mat-mutlak-denkle': ['Mutlak Değerli Denklemler', 'Mutlak Değerli Eşitsizlikler', 'Çözüm Kümesi Bulma'],
  'tyt-mat-uslu': ['Üslü Sayı Tanımı', 'Üslü Sayı Özellikleri', 'Negatif Üs', 'Sıfır Üssü'],
  'tyt-mat-uslu-denkle': ['Üslü Denklemler', 'Üslü Eşitsizlikler', 'Taban-Üs İlişkisi'],
  'tyt-mat-koklu': ['Karekök', 'Küpkök', 'Köklü Sayı Özellikleri', 'Köklü Sayılarda İşlemler'],
  'tyt-mat-koklu-denkle': ['Köklü Denklemler', 'Köklü Eşitsizlikler', 'Köklü İfadelerde Sıralama'],
  'tyt-mat-oran-oranti': ['Oran Kavramı', 'Orantı Kavramı', 'Doğru Orantı', 'Ters Orantı', 'Bileşik Orantı'],
  'tyt-mat-oran-problem': ['Doğru Orantı Problemleri', 'Ters Orantı Problemleri', 'Bileşik Orantı Problemleri'],
  'tyt-mat-sayi-problem': ['Sayı Problemleri', 'Rakam Problemleri', 'İki Basamaklı Sayılar'],
  'tyt-mat-kesir-problem': ['Kesir Problemleri', 'Parça-Bütün İlişkisi', 'Kesirli İşlem Problemleri'],
  'tyt-mat-yas-problem': ['Yaş Problemleri', 'Geçmiş-Bugün-Gelecek', 'Yaş Farkı Problemleri'],
  'tyt-mat-isci-problem': ['İşçi Problemleri', 'Havuz Problemleri', 'Birlikte Çalışma'],
  'tyt-mat-yuzde-problem': ['Yüzde Kavramı', 'Yüzde Artış-Azalış', 'Yüzde Problemleri'],
  'tyt-mat-kar-zarar': ['Kâr Problemleri', 'Zarar Problemleri', 'İndirim Problemleri', 'Kâr-Zarar Yüzdesi'],
  'tyt-mat-karisim': ['Karışım Problemleri', 'Karışım Oranları', 'Karışım Yüzdeleri'],
  'tyt-mat-hareket': ['Hız-Zaman-Yol', 'Karşılıklı Hareket', 'Aynı Yönde Hareket', 'Nehir Problemleri'],
  'tyt-mat-rutin-olmayan': ['Mantık Problemleri', 'Zeka Soruları', 'Kombinasyonel Problemler'],
  'tyt-mat-onermeler': ['Önerme Kavramı', 'Doğruluk Değeri', 'Önerme Çeşitleri'],
  'tyt-mat-bilesik-onerme': ['VE Bağlacı', 'VEYA Bağlacı', 'DEĞİL Bağlacı', 'Doğruluk Tablosu'],
  'tyt-mat-kosullu-onerme': ['Koşullu Önerme', 'İse Bağlacı', 'Karşıt Ters Düz'],
  'tyt-mat-kosullu-cift': ['Ancak ve Ancak', 'İki Yönlü Koşullu Önerme', 'Denklik'],
  'tyt-mat-niceleyici': ['Her Niceleyicisi', 'Bazı Niceleyicisi', 'Niceleyicilerin Değili'],
  'tyt-mat-tanim-aksiyom': ['Tanım', 'Aksiyom', 'Teorem', 'İspat Yöntemleri'],
  'tyt-mat-kume-temel': ['Küme Kavramı', 'Küme Gösterimleri', 'Eleman Sayısı', 'Boş Küme', 'Evrensel Küme'],
  'tyt-mat-alt-kume': ['Alt Küme Kavramı', 'Alt Küme Sayısı', 'Öz Alt Küme'],
  'tyt-mat-kesisim': ['Kesişim İşlemi', 'Birleşim İşlemi', 'Kesişim-Birleşim Özellikleri'],
  'tyt-mat-fark-tumleme': ['Fark İşlemi', 'Tümleme İşlemi', 'De Morgan Kuralları'],
  'tyt-mat-kume-problem': ['Küme Problemleri', 'Venn Şeması', 'Kesişim-Birleşim Problemleri'],
  'tyt-mat-kartezyen': ['Sıralı İkili', 'Kartezyen Çarpım', 'Kartezyen Çarpımın Özellikleri'],
  'tyt-mat-sayma': ['Toplama Yoluyla Sayma', 'Çarpma Yoluyla Sayma', 'Sayma Problemleri'],
  'tyt-mat-faktoriyel': ['Faktöriyel Tanımı', 'Faktöriyel Hesaplama', 'Faktöriyelli İfadeler'],
  'tyt-mat-permutasyon': ['Permütasyon Kavramı', 'Permütasyon Hesaplama', 'Diziliş Problemleri'],
  'tyt-mat-tekrarli-permutasyon': ['Tekrarlı Permütasyon', 'Özdeş Nesnelerin Dizilişi'],
  'tyt-mat-kombinasyon': ['Kombinasyon Tanımı', 'Kombinasyon Özellikleri', 'C(n,r) Hesaplama'],
  'tyt-mat-kombinasyon-problem': ['Seçim Problemleri', 'Grup Oluşturma', 'Komisyon Problemleri'],
  'tyt-mat-kombinasyon-geometri': ['Doğru Üzerinde Noktalar', 'Çember Üzerinde Noktalar', 'Çokgen Köşegenleri'],
  'tyt-mat-binom': ['Binom Açılımı', 'Pascal Üçgeni', 'Binom Katsayıları'],
  'tyt-mat-olasilik-temel': ['Olasılık Kavramı', 'Örnek Uzay', 'Olay Çeşitleri'],
  'tyt-mat-basit-olay': ['Basit Olay Olasılığı', 'Eşit Olasılıklı Olaylar', 'Olasılık Hesaplama'],
  'tyt-mat-fonksiyon-kavram': ['Fonksiyon Tanımı', 'Fonksiyon Gösterimi', 'Tanım ve Değer Kümesi'],
  'tyt-mat-fonksiyon-sorular': ['Fonksiyon Değeri Bulma', 'Fonksiyon Grafiği Okuma', 'Fonksiyon Soru Tipleri'],
  'tyt-mat-ic-or-ten': ['İçine Fonksiyon', 'Örten Fonksiyon', 'Birebir Fonksiyon', 'Eşit Fonksiyon'],
  'tyt-mat-birim-sabit': ['Birim Fonksiyon', 'Sabit Fonksiyon', 'Özellikleri'],
  'tyt-mat-dogrusal-parcali': ['Doğrusal Fonksiyon', 'Parçalı Fonksiyon', 'Grafik Çizimi'],
  'tyt-mat-cift-tek': ['Çift Fonksiyon', 'Tek Fonksiyon', 'Simetri Özellikleri'],
  'tyt-mat-dort-islem': ['Fonksiyonlarda Toplama', 'Fonksiyonlarda Çıkarma', 'Fonksiyonlarda Çarpma', 'Fonksiyonlarda Bölme'],
  'tyt-mat-grafik-cizme': ['Grafik Çizme', 'Eksen Kesişimleri', 'Grafik Dönüşümleri'],
  'tyt-mat-bileske': ['Bileşke Fonksiyon', 'Bileşke Özellikleri', 'Bileşke Hesaplama'],
  'tyt-mat-ters-fonksiyon': ['Ters Fonksiyon', 'Ters Fonksiyon Bulma', 'Ters Fonksiyon Özellikleri'],
  'tyt-mat-grafik-uygulama': ['Grafik Okuma', 'Grafik Yorumlama', 'Uygulama Problemleri'],
  'tyt-mat-polinom-kavram': ['Polinom Tanımı', 'Polinom Derecesi', 'Polinom Katsayıları', 'Sabit Polinom', 'Sıfır Polinomu'],
  'tyt-mat-polinom-islem': ['Polinomlarda Toplama', 'Polinomlarda Çıkarma', 'Polinomlarda Çarpma'],
  'tyt-mat-polinom-bolme': ['Polinom Bölme', 'Bölme Algoritması', 'Bölüm ve Kalan'],
  'tyt-mat-polinom-kalan': ['Kalan Teoremi', 'Çarpan Teoremi', 'Kalan Bulma Yöntemleri'],
  'tyt-mat-carpan-ortak': ['Ortak Çarpan', 'Paranteze Alma', 'Gruplandırma'],
  'tyt-mat-ozdeslik': ['Tam Kare Özdeşliği', 'İki Kare Farkı', 'Özdeşlik Uygulamaları'],
  'tyt-mat-kup-ozdeslik': ['Tam Küp Özdeşliği', 'İki Küp Farkı', 'İki Küp Toplamı'],
  'tyt-mat-uc-terimli': ['ax²+bx+c Çarpanlara Ayırma', 'Çarpanlara Ayırma Yöntemleri'],
  'tyt-mat-rasyonel-sadeles': ['Rasyonel İfadeler', 'Sadeleştirme', 'Payda Eşitleme'],
  'tyt-mat-ikinci-denklem': ['İkinci Dereceden Denklem', 'ax²+bx+c=0', 'Çözüm Yöntemleri'],
  'tyt-mat-ikinci-cozum': ['Çarpanlara Ayırma ile Çözüm', 'Kareye Tamamlama', 'Formül ile Çözüm'],
  'tyt-mat-diskriminant': ['Diskriminant (Δ)', 'Δ>0 Durumu', 'Δ=0 Durumu', 'Δ<0 Durumu'],
  'tyt-mat-karmasik-sayi': ['Karmaşık Sayı Tanımı', 'i Sayısı', 'Karmaşık Sayılarda İşlemler'],
  'tyt-mat-kok-katsayi': ['Kökler Toplamı', 'Kökler Çarpımı', 'Kök-Katsayı Formülleri'],
  'tyt-mat-veri': ['Veri Toplama', 'Veri Düzenleme', 'Veri Analizi'],
  'tyt-mat-merkezi-yayilim': ['Aritmetik Ortalama', 'Medyan', 'Mod', 'Açıklık', 'Standart Sapma'],
  'tyt-mat-histogram': ['Histogram Oluşturma', 'Sınıf Aralıkları', 'Frekans Tablosu'],
  'tyt-mat-grafik-cesit': ['Sütun Grafiği', 'Çizgi Grafiği', 'Daire Grafiği'],
};

// Generate subtopics for topics without specific ones
function generateSubtopics(topicName) {
  return [
    `${topicName} - Temel Kavramlar`,
    `${topicName} - Örnek Sorular`,
    `${topicName} - Test`,
  ];
}

// Add subtopics to all topics
let modified = false;
for (const level of ['tyt', 'ayt']) {
  for (const subject of Object.keys(CURRICULUM[level])) {
    for (const topic of CURRICULUM[level][subject]) {
      if (!topic.subtopics) {
        topic.subtopics = SPECIFIC_SUBTOPICS[topic.id] || generateSubtopics(topic.name);
        modified = true;
      }
    }
  }
}

if (modified) {
  // Serialize the updated CURRICULUM
  const serialized = JSON.stringify(CURRICULUM, null, 2);
  // Convert JSON to JS object literal format
  const jsObj = serialized
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"/g, "'");

  const newContent = `// ===== Learn with Archie - Complete TYT & AYT Curriculum =====
// This file defines the full curriculum data structure used by the app.

const CURRICULUM = ${jsObj};
`;

  fs.writeFileSync('curriculum-data.js', newContent, 'utf8');
  console.log('Subtopics added successfully!');
} else {
  console.log('No changes needed - all topics already have subtopics.');
}

// Count topics
let tytCount = 0, aytCount = 0;
for (const subject of Object.keys(CURRICULUM.tyt)) tytCount += CURRICULUM.tyt[subject].length;
for (const subject of Object.keys(CURRICULUM.ayt)) aytCount += CURRICULUM.ayt[subject].length;
console.log(`TYT topics: ${tytCount}`);
console.log(`AYT topics: ${aytCount}`);
console.log(`Total: ${tytCount + aytCount}`);