// ===== Learn with Archie - Complete TYT & AYT Curriculum =====
// This file defines the full curriculum data structure used by the app.

const CURRICULUM = {
  tyt: {
    Matematik: [
      {
        id: 'tyt-mat-temel-kavramlar',
        name: 'Temel Kavramlar',
        icon: '🔢',
        subtopics: [
          'Sayı Kümeleri',
          'Tek ve Çift Sayılar',
          'Pozitif ve Negatif Sayılar',
          'Asal Sayılar',
          'Ardışık Sayılar',
          'Faktöriyel',
        ]
      },
      {
        id: 'tyt-mat-sayi-basamaklari',
        name: 'Sayı Basamakları',
        icon: '🔢',
        subtopics: [
          'Basamak Değeri',
          'Sayı Çözümleme',
          'Basamak Problemleri',
        ]
      },
      {
        id: 'tyt-mat-bolme-bolunebilme',
        name: 'Bölme ve Bölünebilme',
        icon: '➗',
        subtopics: [
          'Bölme Kuralları',
          'Bölünebilme Kuralları',
          'Kalan Aritmetiği',
        ]
      },
      {
        id: 'tyt-mat-ebob-ekok',
        name: 'EBOB - EKOK',
        icon: '🧮',
        subtopics: [
          'Asal Çarpanlara Ayırma',
          'EBOB Hesaplama',
          'EKOK Hesaplama',
          'EBOB-EKOK Problemleri',
        ]
      },
      {
        id: 'tyt-mat-rasyonel-ondalik',
        name: 'Rasyonel ve Ondalık Sayılar',
        icon: '🔣',
        subtopics: [
          'Kesir Türleri ve İşlemler',
          'Ondalık Sayılar',
          'Devirli Sayılar',
          'Sıralama',
        ]
      },
      {
        id: 'tyt-mat-birinci-derece-denklemler',
        name: 'Birinci Dereceden Denklemler',
        icon: '📝',
        subtopics: [
          'Denklem Çözme Yöntemleri',
          'Çözüm Kümesi İnceleme',
        ]
      },
      {
        id: 'tyt-mat-basit-esitsizlikler',
        name: 'Basit Eşitsizlikler',
        icon: '⚖️',
        subtopics: [
          'Aralık Kavramı',
          'Eşitsizlik Özellikleri',
          'Üs ve Aralık İnceleme',
        ]
      },
      {
        id: 'tyt-mat-mutlak-deger',
        name: 'Mutlak Değer',
        icon: '📏',
        subtopics: [
          'Mutlak Değer Özellikleri',
          'Mutlak Değerli Denklemler',
          'Mutlak Değerli Eşitsizlikler',
        ]
      },
      {
        id: 'tyt-mat-uslu-ifadeler',
        name: 'Üslü İfadeler',
        icon: '💪',
        subtopics: [
          'Üslü Sayı Özellikleri',
          'Üslü Sayılarda İşlemler',
          'Üslü Denklemler',
        ]
      },
      {
        id: 'tyt-mat-koklu-ifadeler',
        name: 'Köklü İfadeler',
        icon: '🌳',
        subtopics: [
          'Köklü Sayı Özellikleri',
          'Köklü Sayılarda İşlemler',
          'Paydayı Rasyonel Yapma (Eşlenik)',
          'Özel Kökler',
        ]
      },
      {
        id: 'tyt-mat-carpanlara-ayirma',
        name: 'Çarpanlara Ayırma',
        icon: '🧩',
        subtopics: [
          'Ortak Parantez ve Gruplandırma',
          'Özdeşlikler',
          'Rasyonel İfadelerde Sadeleştirme',
        ]
      },
      {
        id: 'tyt-mat-oran-oranti',
        name: 'Oran ve Orantı',
        icon: '⚖️',
        subtopics: [
          'Doğru ve Ters Orantı',
          'Bileşik Orantı',
          'Aritmetik ve Geometrik Ortalama',
        ]
      },
      {
        id: 'tyt-mat-problemler',
        name: 'Problemler',
        icon: '🧠',
        subtopics: [
          'Sayı ve Kesir Problemleri',
          'Yaş Problemleri',
          'Yüzde, Kâr ve Zarar Problemleri',
          'Karışım Problemleri',
          'Hız ve Hareket Problemleri',
          'İşçi Problemleri',
          'Grafik ve Tablo Problemleri',
          'Rutin Olmayan Problemler',
        ]
      },
      {
        id: 'tyt-mat-kumeler',
        name: 'Kümeler ve Kartezyen Çarpım',
        icon: '🫧',
        subtopics: [
          'Küme Tanımı ve Alt Küme',
          'Kümelerde İşlemler',
          'Küme Problemleri',
          'Kartezyen Çarpım',
        ]
      },
      {
        id: 'tyt-mat-mantik',
        name: 'Mantık',
        icon: '💡',
        subtopics: [
          'Önermeler ve Bağlaçlar',
          'Koşullu Önermeler (İse / Ancak ve Ancak)',
          'Niceleyiciler',
        ]
      },
      {
        id: 'tyt-mat-fonksiyonlar',
        name: 'Fonksiyonlar',
        icon: 'ƒx',
        subtopics: [
          'Fonksiyon Tanımı ve Türleri',
          'Bileşke Fonksiyon',
          'Ters Fonksiyon',
          'Fonksiyon Grafikleri Okuma',
        ]
      },
      {
        id: 'tyt-mat-polinomlar',
        name: 'Polinomlar',
        icon: '➿',
        subtopics: [
          'Polinom Tanımı ve İşlemler',
          'Katsayılar Toplamı ve Sabit Terim',
          'Polinom Bölmesi ve Kalan Bulma',
        ]
      },
      {
        id: 'tyt-mat-ikinci-derece-denklemler',
        name: 'İkinci Dereceden Denklemler',
        icon: '📐',
        subtopics: [
          'Çarpanlara Ayırma ve Diskriminant (Δ)',
          'Kökler ve Katsayılar İlişkisi',
        ]
      },
      {
        id: 'tyt-mat-sayma-olasilik',
        name: 'Sayma ve Olasılık',
        icon: '🎲',
        subtopics: [
          'Toplama ve Çarpma Yoluyla Sayma',
          'Permütasyon (Sıralama)',
          'Kombinasyon (Seçme)',
          'Binom Açılımı',
          'Olasılık Hesaplama',
        ]
      },
      {
        id: 'tyt-mat-veri-istatistik',
        name: 'Veri ve İstatistik',
        icon: '📊',
        subtopics: [
          'Merkezi Eğilim Ölçüleri (Ortalama, Medyan, Mod)',
          'Merkezi Yayılım Ölçüleri (Açıklık, Standart Sapma)',
          'Grafik Türleri ve Yorumlama',
        ]
      }
    ],
    Geometri: [
      {
        id: 'tyt-geo-aci-kavram',
        name: 'Açı Kavramı ve Çeşitleri',
        icon: '📐',
        subtopics: [
          'Açı Kavramı ve Çeşitleri - Temel Kavramlar',
          'Açı Kavramı ve Çeşitleri - Örnek Sorular',
          'Açı Kavramı ve Çeşitleri - Test'
        ]
      },
      {
        id: 'tyt-geo-paralel-aci',
        name: 'Paralel Doğrularda Açılar',
        icon: '📐',
        subtopics: [
          'Paralel Doğrularda Açılar - Temel Kavramlar',
          'Paralel Doğrularda Açılar - Örnek Sorular',
          'Paralel Doğrularda Açılar - Test'
        ]
      },
      {
        id: 'tyt-geo-ucgen-aci',
        name: 'Üçgende Açılar',
        icon: '🔺',
        subtopics: [
          'Üçgende Açılar - Temel Kavramlar',
          'Üçgende Açılar - Örnek Sorular',
          'Üçgende Açılar - Test'
        ]
      },
      {
        id: 'tyt-geo-ikizkenar-aci',
        name: 'İkizkenar ve Eşkenar Üçgende Açı',
        icon: '🔺',
        subtopics: [
          'İkizkenar ve Eşkenar Üçgende Açı - Temel Kavramlar',
          'İkizkenar ve Eşkenar Üçgende Açı - Örnek Sorular',
          'İkizkenar ve Eşkenar Üçgende Açı - Test'
        ]
      },
      {
        id: 'tyt-geo-aci-kenar',
        name: 'Üçgende Açı Kenar Bağıntıları',
        icon: '📏',
        subtopics: [
          'Üçgende Açı Kenar Bağıntıları - Temel Kavramlar',
          'Üçgende Açı Kenar Bağıntıları - Örnek Sorular',
          'Üçgende Açı Kenar Bağıntıları - Test'
        ]
      },
      {
        id: 'tyt-geo-esitsizlik',
        name: 'Üçgen Eşitsizliği',
        icon: '📏',
        subtopics: [
          'Üçgen Eşitsizliği - Temel Kavramlar',
          'Üçgen Eşitsizliği - Örnek Sorular',
          'Üçgen Eşitsizliği - Test'
        ]
      },
      {
        id: 'tyt-geo-eslik',
        name: 'Üçgenlerde Eşlik',
        icon: '🔺',
        subtopics: [
          'Üçgenlerde Eşlik - Temel Kavramlar',
          'Üçgenlerde Eşlik - Örnek Sorular',
          'Üçgenlerde Eşlik - Test'
        ]
      },
      {
        id: 'tyt-geo-benzerlik',
        name: 'Üçgenlerde Benzerlik',
        icon: '🔺',
        subtopics: [
          'Üçgenlerde Benzerlik - Temel Kavramlar',
          'Üçgenlerde Benzerlik - Örnek Sorular',
          'Üçgenlerde Benzerlik - Test'
        ]
      },
      {
        id: 'tyt-geo-temel-benzerlik',
        name: 'Üçgenlerde Temel Benzerlik',
        icon: '🔺',
        subtopics: [
          'Üçgenlerde Temel Benzerlik - Temel Kavramlar',
          'Üçgenlerde Temel Benzerlik - Örnek Sorular',
          'Üçgenlerde Temel Benzerlik - Test'
        ]
      },
      {
        id: 'tyt-geo-benzerlik-uyg',
        name: 'Benzerlik Uygulamaları',
        icon: '📝',
        subtopics: [
          'Benzerlik Uygulamaları - Temel Kavramlar',
          'Benzerlik Uygulamaları - Örnek Sorular',
          'Benzerlik Uygulamaları - Test'
        ]
      },
      {
        id: 'tyt-geo-acortay',
        name: 'Üçgende Açıortay',
        icon: '📏',
        subtopics: [
          'Üçgende Açıortay - Temel Kavramlar',
          'Üçgende Açıortay - Örnek Sorular',
          'Üçgende Açıortay - Test'
        ]
      },
      {
        id: 'tyt-geo-acortay2',
        name: 'Üçgende Açıortay (devam)',
        icon: '📏',
        subtopics: [
          'Üçgende Açıortay (devam) - Temel Kavramlar',
          'Üçgende Açıortay (devam) - Örnek Sorular',
          'Üçgende Açıortay (devam) - Test'
        ]
      },
      {
        id: 'tyt-geo-kenarortay',
        name: 'Üçgende Kenarortay',
        icon: '📏',
        subtopics: [
          'Üçgende Kenarortay - Temel Kavramlar',
          'Üçgende Kenarortay - Örnek Sorular',
          'Üçgende Kenarortay - Test'
        ]
      },
      {
        id: 'tyt-geo-yukseklik',
        name: 'Üçgende Yükseklik',
        icon: '📏',
        subtopics: [
          'Üçgende Yükseklik - Temel Kavramlar',
          'Üçgende Yükseklik - Örnek Sorular',
          'Üçgende Yükseklik - Test'
        ]
      },
      {
        id: 'tyt-geo-orta-dikme',
        name: 'Üçgende Kenar Orta Dikme',
        icon: '📏',
        subtopics: [
          'Üçgende Kenar Orta Dikme - Temel Kavramlar',
          'Üçgende Kenar Orta Dikme - Örnek Sorular',
          'Üçgende Kenar Orta Dikme - Test'
        ]
      },
      {
        id: 'tyt-geo-pisagor',
        name: 'Dik Üçgende Pisagor Teoremi',
        icon: '📐',
        subtopics: [
          'Dik Üçgende Pisagor Teoremi - Temel Kavramlar',
          'Dik Üçgende Pisagor Teoremi - Örnek Sorular',
          'Dik Üçgende Pisagor Teoremi - Test'
        ]
      },
      {
        id: 'tyt-geo-oklid',
        name: 'Öklid\'in Çalışmaları',
        icon: '📐',
        subtopics: [
          'Öklid\'in Çalışmaları - Temel Kavramlar',
          'Öklid\'in Çalışmaları - Örnek Sorular',
          'Öklid\'in Çalışmaları - Test'
        ]
      },
      {
        id: 'tyt-geo-trig-oran',
        name: 'Trigonometrik Oranlar',
        icon: '📐',
        subtopics: [
          'Trigonometrik Oranlar - Temel Kavramlar',
          'Trigonometrik Oranlar - Örnek Sorular',
          'Trigonometrik Oranlar - Test'
        ]
      },
      {
        id: 'tyt-geo-trig-30-45-60',
        name: '30°, 45°, 60°\'nin Trigonometrik Oranları',
        icon: '📐',
        subtopics: [
          '30°, 45°, 60°\'nin Trigonometrik Oranları - Temel Kavramlar',
          '30°, 45°, 60°\'nin Trigonometrik Oranları - Örnek Sorular',
          '30°, 45°, 60°\'nin Trigonometrik Oranları - Test'
        ]
      },
      {
        id: 'tyt-geo-birim-cember',
        name: 'Birim Çember',
        icon: '⭕',
        subtopics: [
          'Birim Çember - Temel Kavramlar',
          'Birim Çember - Örnek Sorular',
          'Birim Çember - Test'
        ]
      },
      {
        id: 'tyt-geo-ucgen-alan',
        name: 'Üçgende Alan',
        icon: '🔺',
        subtopics: [
          'Üçgende Alan - Temel Kavramlar',
          'Üçgende Alan - Örnek Sorular',
          'Üçgende Alan - Test'
        ]
      },
      {
        id: 'tyt-geo-alan-uyg',
        name: 'Üçgende Alan Uygulamaları',
        icon: '📝',
        subtopics: [
          'Üçgende Alan Uygulamaları - Temel Kavramlar',
          'Üçgende Alan Uygulamaları - Örnek Sorular',
          'Üçgende Alan Uygulamaları - Test'
        ]
      },
      {
        id: 'tyt-geo-cokgen',
        name: 'Çokgenler',
        icon: '⬠',
        subtopics: [
          'Çokgenler - Temel Kavramlar',
          'Çokgenler - Örnek Sorular',
          'Çokgenler - Test'
        ]
      },
      {
        id: 'tyt-geo-dortgen',
        name: 'Dörtgenler ve Özellikleri',
        icon: '⬛',
        subtopics: [
          'Dörtgenler ve Özellikleri - Temel Kavramlar',
          'Dörtgenler ve Özellikleri - Örnek Sorular',
          'Dörtgenler ve Özellikleri - Test'
        ]
      },
      {
        id: 'tyt-geo-ozel-dortgen',
        name: 'Özel Dörtgenler',
        icon: '⬛',
        subtopics: [
          'Özel Dörtgenler - Temel Kavramlar',
          'Özel Dörtgenler - Örnek Sorular',
          'Özel Dörtgenler - Test'
        ]
      },
      {
        id: 'tyt-geo-yamuk-alan',
        name: 'Yamuğun Alanı',
        icon: '⬛',
        subtopics: [
          'Yamuğun Alanı - Temel Kavramlar',
          'Yamuğun Alanı - Örnek Sorular',
          'Yamuğun Alanı - Test'
        ]
      },
      {
        id: 'tyt-geo-ikizkenar-yamuk',
        name: 'İkizkenar ve Dik Yamuk',
        icon: '⬛',
        subtopics: [
          'İkizkenar ve Dik Yamuk - Temel Kavramlar',
          'İkizkenar ve Dik Yamuk - Örnek Sorular',
          'İkizkenar ve Dik Yamuk - Test'
        ]
      },
      {
        id: 'tyt-geo-paralelkenar-aci',
        name: 'Paralelkenarda Açı ve Uzunluk',
        icon: '⬛',
        subtopics: [
          'Paralelkenarda Açı ve Uzunluk - Temel Kavramlar',
          'Paralelkenarda Açı ve Uzunluk - Örnek Sorular',
          'Paralelkenarda Açı ve Uzunluk - Test'
        ]
      },
      {
        id: 'tyt-geo-paralelkenar-alan',
        name: 'Paralelkenarda Alan',
        icon: '⬛',
        subtopics: [
          'Paralelkenarda Alan - Temel Kavramlar',
          'Paralelkenarda Alan - Örnek Sorular',
          'Paralelkenarda Alan - Test'
        ]
      },
      {
        id: 'tyt-geo-eskenar-dortgen',
        name: 'Eşkenar Dörtgen',
        icon: '🔷',
        subtopics: [
          'Eşkenar Dörtgen - Temel Kavramlar',
          'Eşkenar Dörtgen - Örnek Sorular',
          'Eşkenar Dörtgen - Test'
        ]
      },
      {
        id: 'tyt-geo-dikdortgen',
        name: 'Dikdörtgende Açı ve Uzunluk',
        icon: '⬜',
        subtopics: [
          'Dikdörtgende Açı ve Uzunluk - Temel Kavramlar',
          'Dikdörtgende Açı ve Uzunluk - Örnek Sorular',
          'Dikdörtgende Açı ve Uzunluk - Test'
        ]
      },
      {
        id: 'tyt-geo-dikdortgen-alan',
        name: 'Dikdörtgende Alan',
        icon: '⬜',
        subtopics: [
          'Dikdörtgende Alan - Temel Kavramlar',
          'Dikdörtgende Alan - Örnek Sorular',
          'Dikdörtgende Alan - Test'
        ]
      },
      {
        id: 'tyt-geo-kare',
        name: 'Kare',
        icon: '⬜',
        subtopics: [
          'Kare - Temel Kavramlar',
          'Kare - Örnek Sorular',
          'Kare - Test'
        ]
      },
      {
        id: 'tyt-geo-deltoid',
        name: 'Deltoid',
        icon: '🪁',
        subtopics: [
          'Deltoid - Temel Kavramlar',
          'Deltoid - Örnek Sorular',
          'Deltoid - Test'
        ]
      },
      {
        id: 'tyt-geo-prizma',
        name: 'Dik Prizmalar',
        icon: '🧊',
        subtopics: [
          'Dik Prizmalar - Temel Kavramlar',
          'Dik Prizmalar - Örnek Sorular',
          'Dik Prizmalar - Test'
        ]
      },
      {
        id: 'tyt-geo-kup',
        name: 'Küp',
        icon: '🧊',
        subtopics: [
          'Küp - Temel Kavramlar',
          'Küp - Örnek Sorular',
          'Küp - Test'
        ]
      },
      {
        id: 'tyt-geo-piramit',
        name: 'Dik Piramit',
        icon: '🔺',
        subtopics: [
          'Dik Piramit - Temel Kavramlar',
          'Dik Piramit - Örnek Sorular',
          'Dik Piramit - Test'
        ]
      },
      {
        id: 'tyt-geo-duzgun-dortyuzlu',
        name: 'Düzgün Dört Yüzlü',
        icon: '🔺',
        subtopics: [
          'Düzgün Dört Yüzlü - Temel Kavramlar',
          'Düzgün Dört Yüzlü - Örnek Sorular',
          'Düzgün Dört Yüzlü - Test'
        ]
      }
    ],
    Türkçe: [
      {
        id: 'tyt-turk-sozcukte-anlam',
        name: 'Sözcükte Anlam',
        icon: '📖',
        subtopics: [
          'Sözcükte Anlam Türleri',
          'Sözcükler Arası Anlam İlişkileri',
          'Söz Öbekleri ve Deyimler/Atasözleri',
        ]
      },
      {
        id: 'tyt-turk-cumlede-anlam',
        name: 'Cümlede Anlam',
        icon: '💬',
        subtopics: [
          'Cümle Yorumlama ve Kavramlar',
          'Cümleler Arası Anlam İlişkileri',
          'Cümle Tamamlama ve Oluşturma',
        ]
      },
      {
        id: 'tyt-turk-paragrafta-anlam',
        name: 'Paragrafta Anlam',
        icon: '📄',
        subtopics: [
          'Paragrafın Ana Fikri ve Yardımcı Fikirleri',
          'Paragrafın Yapısı ve Akışı',
          'Anlatım Biçimleri ve Düşünceyi Geliştirme Yolları',
          'Çoklu ve Soru-Cevap Paragrafları',
        ]
      },
      {
        id: 'tyt-turk-ses-bilgisi',
        name: 'Ses Bilgisi',
        icon: '🔊',
        subtopics: [
          'Ünlü Olayları (Düşme, Daralma, Türeme)',
          'Ünsüz Olayları (Benzeşme, Yumuşama, Düşme, Türeme)',
        ]
      },
      {
        id: 'tyt-turk-yazim-kurallari',
        name: 'Yazım Kuralları',
        icon: '✍️',
        subtopics: [
          'Bitişik ve Ayrı Yazılan Sözcükler',
          'Büyük Harfler, Sayılar ve Kısaltmalar',
          '"da/de", "ki" ve "mi"nin Yazımı',
        ]
      },
      {
        id: 'tyt-turk-noktalama',
        name: 'Noktalama İşaretleri',
        icon: '❗',
        subtopics: [
          'Nokta, Virgül, Noktalı Virgül ve İki Nokta',
          'Kesme, Tırnak ve Yay Ayraç',
          'Diğer Noktalama İşaretleri',
        ]
      },
      {
        id: 'tyt-turk-sozcukte-yapi',
        name: 'Sözcükte Yapı',
        icon: '🧱',
        subtopics: [
          'Kök ve Ek Türleri (Yapım / Çekim)',
          'Sözcük Yapısı (Basit, Türemiş, Birleşik)',
        ]
      },
      {
        id: 'tyt-turk-sozcuk-turleri',
        name: 'Sözcük Türleri',
        icon: '🏷️',
        subtopics: [
          'İsimler ve İsim Tamlamaları',
          'Sıfatlar (Ön Adlar) ve Sıfat Tamlamaları',
          'Zamirler (Adıllar)',
          'Zarflar (Belirteçler)',
          'Edat, Bağlaç ve Ünlem',
        ]
      },
      {
        id: 'tyt-turk-fiiller',
        name: 'Fiiller (Eylemler)',
        icon: '⚡',
        subtopics: [
          'Fiil Çekimi ve Kip/Kişi',
          'Ek Fiil (Ek Eylem)',
          'Fiilimsiler (Eylemsiler)',
          'Fiil Çatıları',
        ]
      },
      {
        id: 'tyt-turk-cumlenin-ogeleri',
        name: 'Cümlenin Ögeleri',
        icon: '🧩',
        subtopics: [
          'Temel Ögeler (Özne, Yüklem)',
          'Yardımcı Ögeler (Nesne, Tümleçler)',
          'Cümle Vurgusu ve Ara Cümle',
        ]
      },
      {
        id: 'tyt-turk-cumle-turleri',
        name: 'Cümle Türleri',
        icon: '🔀',
        subtopics: [
          'Yüklemin Türü ve Yerine Göre Cümleler',
          'Anlamına Göre Cümleler',
          'Yapısına Göre Cümleler (Basit, Birleşik, Sıralı, Bağlı)',
        ]
      },
      {
        id: 'tyt-turk-anlatim-bozukluklari',
        name: 'Anlatım Bozuklukları',
        icon: '🩹',
        subtopics: [
          'Anlama Dayalı Bozukluklar',
          'Yapıya Dayalı Bozukluklar',
        ]
      }
    ],
    Fizik: [
      {
        id: 'tyt-fiz-bilime-giris',
        name: 'Fizik Bilimine Giriş',
        icon: '🔬',
        subtopics: [
          'Fiziğin Alt Dalları',
          'Fiziksel Niceliklerin Sınıflandırılması (Temel - Türetilmiş, Skaler - Vektörel)',
          'Bilimsel Araştırma Merkezleri',
        ]
      },
      {
        id: 'tyt-fiz-madde',
        name: 'Madde ve Özellikleri',
        icon: '🧱',
        subtopics: [
          'Kütle, Hacim ve Özkütle',
          'Katılarda Dayanıklılık',
          'Adhezyon (Yapışma) ve Kohezyon (Tutma)',
          'Yüzey Gerilimi ve Kılcallık',
        ]
      },
      {
        id: 'tyt-fiz-basinc-kaldirma',
        name: 'Basınç ve Kaldırma Kuvveti',
        icon: '💧',
        subtopics: [
          'Katı, Sıvı ve Gaz Basıncı',
          'Akışkanların Basıncı ve Pascal Prensibi',
          'Sıvıların Kaldırma Kuvveti ve Cisimlerin Denge Durumları',
        ]
      },
      {
        id: 'tyt-fiz-isi-sicaklik',
        name: 'Isı, Sıcaklık ve Genleşme',
        icon: '🌡️',
        subtopics: [
          'Isı, Sıcaklık ve İç Enerji Kavramları',
          'Termometreler ve Sıcaklık Birimleri',
          'Öz Isı, Isı Sığası ve Hal Değişimi',
          'Isı Aktarım Yolları (İletim, Konveksiyon, Işıma) ve Yalıtım',
          'Katı, Sıvı ve Gazlarda Genleşme',
        ]
      },
      {
        id: 'tyt-fiz-hareket-kuvvet',
        name: 'Hareket ve Kuvvet',
        icon: '🏃',
        subtopics: [
          'Konum, Yer Değiştirme, Hız ve Sürat',
          'Düzgün Doğrusal Hareket ve Grafikleri',
          'Kuvvet Çeşitleri ve Sürtünme Kuvveti',
          'Newton\'un Hareket Yasaları',
        ]
      },
      {
        id: 'tyt-fiz-is-guc-enerji',
        name: 'İş, Güç ve Enerji',
        icon: '⚡',
        subtopics: [
          'İş ve Güç Kavramları',
          'Mekanik Enerji (Kinetik ve Potansiyel Enerji)',
          'Enerjinin Korunumu ve Dönüşümleri',
          'Verim ve Enerji Kaynakları',
        ]
      },
      {
        id: 'tyt-fiz-elektrostatik',
        name: 'Elektrostatik',
        icon: '🎈',
        subtopics: [
          'Elektrik Yükleri ve Yüklenme Yöntemleri',
          'Elektroskop',
          'Coulomb Yasası ve Elektriksel Alan',
        ]
      },
      {
        id: 'tyt-fiz-elektrik-manyetizma',
        name: 'Elektrik ve Manyetizma',
        icon: '🧲',
        subtopics: [
          'Elektrik Akımı, Potansiyel Farkı ve Direnç (Ohm Yasası)',
          'Dirençlerin Bağlanması ve Devreler',
          'Elektriksel Güç, Enerji ve Üreteçlerin Bağlanması',
          'Mıknatıslar ve Manyetik Alan',
        ]
      },
      {
        id: 'tyt-fiz-dalgalar',
        name: 'Dalgalar',
        icon: '🌊',
        subtopics: [
          'Dalgaların Temel Değişkenleri (Dalga Boyu, Periyot, Frekans, Hız)',
          'Yay Dalgaları',
          'Su Dalgaları (Yansıma ve Kırılma)',
          'Ses ve Deprem Dalgaları',
        ]
      },
      {
        id: 'tyt-fiz-optik',
        name: 'Optik',
        icon: '🔦',
        subtopics: [
          'Aydınlanma, Işık Şiddeti ve Işık Akısı',
          'Gölge, Yarı Gölge ve Güneş/Ay Tutulmaları',
          'Yansıma ve Düzlem Aynalar',
          'Küresel Aynalar (Çukur ve Tümsek Ayna)',
          'Işığın Kırılması ve Tam Yansıma',
          'Mercekler ve Göz Kusurları',
          'Renk Oluşumu',
        ]
      }
    ],
    Kimya: [
      {
        id: 'tyt-kim-bilim',
        name: 'Kimya Bilimi',
        icon: '🧪',
        subtopics: [
          'Simyadan Kimyaya',
          'Kimyanın Disiplinleri ve Çalışma Alanları',
          'Sembolik Dil (Elementler ve Bileşikler)',
          'Kimya Uygulamalarında İş Sağlığı ve Güvenliği',
        ]
      },
      {
        id: 'tyt-kim-atom-periyodik',
        name: 'Atom ve Periyodik Sistem',
        icon: '⚛️',
        subtopics: [
          'Atom Modelleri (Dalton, Thomson, Rutherford, Bohr)',
          'Atomun Yapısı ve Tanecikler (Proton, Nötron, Elektron)',
          'İzotop, İzobar, İzoton ve İzoelektronik Tanecikler',
          'Periyodik Sistem ve Katman Elektron Dizilimi',
          'Periyodik Özelliklerin Değişimi (Yarıçap, İyonlaşma Enerjisi, Elektronegatiflik vb.)',
        ]
      },
      {
        id: 'tyt-kim-turler',
        name: 'Kimyasal Türler Arası Etkileşimler',
        icon: '🔗',
        subtopics: [
          'Kimyasal Türler (Atom, Molekül, İyon)',
          'Güçlü Etkileşimler (İyonik, Kovalent ve Metalik Bağ)',
          'Zayıf Etkileşimler (Van der Waals ve Hidrojen Bağı)',
          'Fiziksel ve Kimyasal Değişimler',
        ]
      },
      {
        id: 'tyt-kim-madde-halleri',
        name: 'Maddenin Halleri',
        icon: '💧',
        subtopics: [
          'Maddenin Fiziksel Halleri ve Özellikleri',
          'Katılar (Amorf ve Kristal Katılar)',
          'Sıvılar (Viskozite, Buhar Basıncı, Kaynama)',
          'Gazlar ve Temel Özellikleri',
          'Plazma Hali',
        ]
      },
      {
        id: 'tyt-kim-doga',
        name: 'Doğa ve Kimya',
        icon: '🌿',
        subtopics: [
          'Su ve Hayat (Su Sertliği ve Su Tasarrufu)',
          'Çevre Kimyası (Hava, Su ve Toprak Kirleticiler)',
        ]
      },
      {
        id: 'tyt-kim-kanunlar',
        name: 'Kimyanın Temel Kanunları ve Kimyasal Hesaplamalar',
        icon: '⚖️',
        subtopics: [
          'Kimyanın Temel Kanunları (Kütlenin Korunumu, Sabit Oranlar, Katlı Oranlar)',
          'Mol Kavramı ve Hesaplamaları',
          'Kimyasal Tepkime Türleri ve Denklekleştirme',
          'Kimyasal Tepkimelerde Hesaplamalar',
        ]
      },
      {
        id: 'tyt-kim-karisimlar',
        name: 'Karışımlar',
        icon: '🥤',
        subtopics: [
          'Homojen ve Heterojen Karışımlar',
          'Çözünme Süreci ve Çözeltiler',
          'Derişim Birimleri (Kütlece/Hacimce Yüzde Derişim, PPM)',
          'Koligatif Özellikler (Kaynama ve Donma Noktası Değişimi)',
          'Karışımları Ayırma ve Saflaştırma Yöntemleri',
        ]
      },
      {
        id: 'tyt-kim-asit-baz-tuz',
        name: 'Asitler, Bazlar ve Tuzlar',
        icon: '🧴',
        subtopics: [
          'Asitlerin ve Bazların Genel Özellikleri',
          'pH Kavramı ve İndikatörler',
          'Asit ve Bazların Tepkimeleri (Nötralleşme ve Metallerle Tepkimeler)',
          'Yaygın Asit-Bazlar ve Güvenlik Önlemleri',
          'Tuzlar ve Kullanım Alanları',
        ]
      },
      {
        id: 'tyt-kim-her-yerde',
        name: 'Kimya Her Yerde',
        icon: '🏠',
        subtopics: [
          'Temizlik Maddeleri (Sabun, Deterjan, Hijyen Malzemeleri)',
          'Yaygın Polimerler ve Geri Dönüşüm',
          'Kozmetik Malzemeler ve İlaçlar',
          'Gıdalar ve Yağ Türleri',
        ]
      }
    ],
    Biyoloji: [
      {
        id: 'tyt-biy-yasam-bilimi',
        name: 'Yaşam Bilimi Biyoloji',
        icon: '🧬',
        subtopics: [
          'Canlıların Ortak Özellikleri',
          'İnorganik Bileşikler (Su, Mineraller, Asit, Baz, Tuz)',
          'Organik Bileşikler (Karbonhidratlar, Yağlar, Proteinler)',
          'Enzimler, Vitaminler ve ATP',
          'Nükleik Asitler (DNA ve RNA)',
        ]
      },
      {
        id: 'tyt-biy-hucre',
        name: 'Hücre',
        icon: '🔬',
        subtopics: [
          'Hücre Teorisi ve Hücre Çeşitleri (Prokaryot - Ökaryot)',
          'Hücre Zarı ve Zardan Madde Geçişleri (Pasif ve Aktif Taşıma)',
          'Hücre Organelleri ve Çekirdek',
          'Hücre Karşılaştırmaları (Bitki ve Hayvan Hücresi)',
        ]
      },
      {
        id: 'tyt-biy-canlilar-dunyasi',
        name: 'Canlılar Dünyası ve Sınıflandırılması',
        icon: '🌍',
        subtopics: [
          'Sınıflandırma İlkeleri ve Kategoriler (İkili Adlandırma)',
          'Bakteriler ve Arkeler Alemi',
          'Protistalar ve Mantarlar Alemi',
          'Bitkiler Alemi',
          'Hayvanlar Alemi (Omurgasızlar ve Omurgalılar)',
          'Virüsler',
        ]
      },
      {
        id: 'tyt-biy-bolunme-ureme',
        name: 'Hücre Bölünmeleri ve Üreme',
        icon: '➗',
        subtopics: [
          'Hücre Döngüsü ve Mitoz Bölünme',
          'Eşeysiz Üreme Çeşitleri',
          'Mayoz Bölünme',
          'Eşeyli Üreme',
        ]
      },
      {
        id: 'tyt-biy-kalitim',
        name: 'Kalıtımın Genel İlkeleri',
        icon: '🧪',
        subtopics: [
          'Mendel İlkeleri ve Temel Kalıtım Kavramları',
          'Monohibrit ve Dihibrit Çaprazlamalar',
          'Eş Baskınlık ve Çok Alellilik (Kan Grupları)',
          'Eşeye Bağlı Kalıtım ve Soyağaçları',
        ]
      },
      {
        id: 'tyt-biy-ekosistem',
        name: 'Ekosistem Ekolojisi ve Güncel Çevre Sorunları',
        icon: '🌿',
        subtopics: [
          'Ekosistemin Bileşenleri ve Ekolojik Kavramlar',
          'Besin Piramidi, Enerji Akışı ve Biyobirikim',
          'Madde Döngüleri (Su, Karbon, Azot)',
          'Güncel Çevre Sorunları ve Biyoçeşitliliğin Korunması',
        ]
      }
    ],
    Tarih: [
      {
        id: 'tyt-tar-tarih-zaman',
        name: 'Tarih ve Zaman',
        icon: '📜',
        subtopics: [
          'Tarih Bilimine Giriş ve Yöntemi',
          'Zamanın Taksimi ve Takvimler',
        ]
      },
      {
        id: 'tyt-tar-insanligin-ilk-donemleri',
        name: 'İnsanlığın İlk Dönemleri',
        icon: '🗿',
        subtopics: [
          'İlk Çağ Medeniyetleri',
          'Yazının İcadı ve İlk Çağda Hukuk',
        ]
      },
      {
        id: 'tyt-tar-ilk-orta-cag-turk',
        name: 'İlk ve Orta Çağlarda Türk Dünyası',
        icon: '🐺',
        subtopics: [
          'İlk Türk Devletleri ve Özellikleri',
          'Türklerde Devlet Teşkilatı, Ordu ve Töre',
        ]
      },
      {
        id: 'tyt-tar-islam-turk-islam',
        name: 'İslam Medeniyetinin Doğuşu ve İlk Türk İslam Devletleri',
        icon: '☪️',
        subtopics: [
          'İslamiyet\'in Doğuşu ve Dört Halife Dönemi',
          'Karahanlı, Gazneli ve Büyük Selçuklu Devleti',
        ]
      },
      {
        id: 'tyt-tar-selcuklu-turkiyesi',
        name: 'Yerleşme ve Devletleşme Sürecinde Selçuklu Türkiye\'si',
        icon: '🏰',
        subtopics: [
          'Anadolu\'ya Türk Göçleri ve İlk Beylikler',
          'Türkiye Selçuklu Devleti ve Haçlı Seferleri',
        ]
      },
      {
        id: 'tyt-tar-beylikten-devlete',
        name: 'Beylikten Devlete Osmanlı Siyaseti (1302-1453)',
        icon: '⚔️',
        subtopics: [
          'Osmanlı Devleti\'nin Kuruluşu',
          'Balkanlar\'da Fetihler ve İskân Politikası',
        ]
      },
      {
        id: 'tyt-tar-dunya-gucu',
        name: 'Dünya Gücü Osmanlı (1453-1595)',
        icon: '🌍',
        subtopics: [
          'İstanbul\'un Fethi ve Yükselme Dönemi',
          'Osmanlı Merkez ve Eyalet Teşkilatı',
        ]
      },
      {
        id: 'tyt-tar-degisen-dengeler',
        name: 'Değişen Dünya Dengeleri Karşısında Osmanlı (17. ve 18. Yüzyıl)',
        icon: '⚖️',
        subtopics: [
          'Osmanlı Devleti\'nde Arayış Yılları',
          'Osmanlı-Avrupa İlişkileri ve Islahat Hareketleri',
        ]
      },
      {
        id: 'tyt-tar-en-uzun-yuzyil',
        name: 'En Uzun Yüzyıl (1814-1914)',
        icon: '⏳',
        subtopics: [
          'Uluslararası İlişkilerde Denge Stratejisi',
          'Tanzimat, Islahat Fermanları ve Meşrutiyet Dönemi',
        ]
      },
      {
        id: 'tyt-tar-20-yuzyil-osmanli',
        name: '20. Yüzyıl Başlarında Osmanlı Devleti',
        icon: '💥',
        subtopics: [
          'Trablusgarp ve Balkan Savaşları',
          'I. Dünya Savaşı ve Cepheler',
        ]
      },
      {
        id: 'tyt-tar-milli-mucadele',
        name: 'Millî Mücadele (Kurtuluş Savaşı)',
        icon: '🇹🇷',
        subtopics: [
          'Hazırlık Dönemi (Genelgeler ve Kongreler)',
          'Kurtuluş Savaşı Cepheleri (Doğu, Güney, Batı)',
          'Mudanya Ateşkesi ve Lozan Barış Antlaşması',
        ]
      },
      {
        id: 'tyt-tar-ataturkculuk',
        name: 'Atatürkçülük ve Türk İnkılabı',
        icon: '⭐',
        subtopics: [
          'Siyasal, Hukuki ve Toplumsal Alanda İnkılaplar',
          'Eğitim, Kültür ve Ekonomi Alanında İnkılaplar',
          'Atatürk İlkeleri ve Atatürk Dönemi Dış Politika',
        ]
      }
    ],
    Coğrafya: [
      {
        id: 'tyt-cog-doga-insan',
        name: 'Doğa ve İnsan',
        icon: '🌍',
        subtopics: [
          'Doğa ve İnsan Etkileşimi',
          'Coğrafyanın Konusu ve Bölümleri',
        ]
      },
      {
        id: 'tyt-cog-dunya-sekli',
        name: 'Dünya\'nın Şekli ve Hareketleri',
        icon: '🌏',
        subtopics: [
          'Dünya\'nın Şekli ve Sonuçları',
          'Günlük (Eksen) Hareket ve Sonuçları',
          'Yıllık Hareket ve Eksen Eğikliği',
        ]
      },
      {
        id: 'tyt-cog-cografi-konum',
        name: 'Coğrafi Konum',
        icon: '📍',
        subtopics: [
          'Paralel, Meridyen ve Koordinat Sistemi',
          'Yerel Saat Hesaplamaları',
          'Türkiye\'nin Mutlak ve Göreceli Konumu',
        ]
      },
      {
        id: 'tyt-cog-harita',
        name: 'Harita Bilgisi',
        icon: '🗺️',
        subtopics: [
          'Harita Elemanları ve Ölçek Türleri',
          'İzohipsler ve Yer Şekilleri',
          'Harita Projeksiyonları',
        ]
      },
      {
        id: 'tyt-cog-atmosfer-iklim',
        name: 'Atmosfer ve İklim Bilgisi',
        icon: '🌦️',
        subtopics: [
          'Atmosferin Yapısı ve Özellikleri',
          'Sıcaklık ve Etkileyen Faktörler',
          'Basınç ve Rüzgârlar',
          'Nem ve Yağış',
          'İklim Tipleri ve Türkiye İklimi',
        ]
      },
      {
        id: 'tyt-cog-ic-dis-kuvvetler',
        name: 'İç ve Dış Kuvvetler',
        icon: '🌋',
        subtopics: [
          'Dünya\'nın İç Yapısı ve Jeolojik Zamanlar',
          'İç Kuvvetler (Orojenez, Epirojenez, Volkanizma, Deprem)',
          'Dış Kuvvetler (Akarsu, Rüzgâr, Karstik, Buzul, Dalga)',
          'Türkiye\'nin Yeryüzü Şekilleri',
        ]
      },
      {
        id: 'tyt-cog-dogal-unsurlar',
        name: 'Doğal Unsurlar (Su, Toprak, Bitki)',
        icon: '💧',
        subtopics: [
          'Dünyada ve Türkiye\'de Sular',
          'Toprak Oluşumu ve Türleri',
          'Bitki Örtüsü Çeşitleri ve Dağılışı',
        ]
      },
      {
        id: 'tyt-cog-nufus-yerlesme',
        name: 'Nüfus ve Yerleşme',
        icon: '👥',
        subtopics: [
          'Nüfusun Tanımı, Yapısı ve Piramitler',
          'Dünyada ve Türkiye\'de Nüfusun Dağılışı',
          'Yerleşme Tipleri ve Doku Özellikleri',
          'Göç Türleri ve Nedenleri',
        ]
      },
      {
        id: 'tyt-cog-ekonomi-ulasim',
        name: 'Ekonomik Faaliyetler ve Ulaşım',
        icon: '🚂',
        subtopics: [
          'Ekonomik Faaliyet Türleri (Birincil, İkincil, Üçüncül)',
          'Dünyadaki Ulaşım Yolları ve Boğazlar/Kanallar',
        ]
      },
      {
        id: 'tyt-cog-bolge',
        name: 'Bölge Kavramı',
        icon: '🧭',
        subtopics: [
          'Şekilsel ve İşlevsel Bölgeler',
          'Bölge Sınırlarının Değişimi',
        ]
      },
      {
        id: 'tyt-cog-afetler',
        name: 'Doğal Afetler',
        icon: '⚠️',
        subtopics: [
          'Doğal Afet Türleri ve Oluşum Nedenleri',
          'Dünyada ve Türkiye\'de Afetlerin Dağılışı',
        ]
      }
    ],
    Felsefe: [
      {
        id: 'tyt-fel-felsefeyi-tanima',
        name: 'Felsefeyi Tanıma',
        icon: '🤔',
        subtopics: [
          'Felsefenin Anlamı ve Doğuşu',
          'Felsefi Düşüncenin Özellikleri',
          'Felsefenin Bireysel ve Toplumsal İşlevleri',
        ]
      },
      {
        id: 'tyt-fel-felsefe-ile-dusunme',
        name: 'Felsefe ile Düşünme',
        icon: '💭',
        subtopics: [
          'Akıl Yürütme Türleri (Tümdengelim, Tümevarım, Analoji)',
          'Argüman, Önerme ve Görüş Kavramları',
          'Dil ve Düşünme İlişkisi',
        ]
      },
      {
        id: 'tyt-fel-temel-alanlar',
        name: 'Felsefenin Temel Alanları ve Problemleri',
        icon: '🏛️',
        subtopics: [
          'Varlık Felsefesi (Ontoloji)',
          'Bilgi Felsefesi (Epistemoloji)',
          'Bilim Felsefesi',
          'Ahlak Felsefesi (Etik)',
          'Sanat Felsefesi (Estetik)',
          'Din Felsefesi',
          'Siyaset Felsefesi',
        ]
      },
      {
        id: 'tyt-fel-tarihsel-donemler',
        name: 'Felsefenin Tarihsel Dönemleri',
        icon: '⏳',
        subtopics: [
          'MÖ 6. Yüzyıl - MS 2. Yüzyıl (İlk Çağ Felsefesi)',
          'MS 2. Yüzyıl - MS 15. Yüzyıl (Orta Çağ Felsefesi)',
          '15. Yüzyıl - 17. Yüzyıl (Rönesans ve Modern Felsefe)',
          '18. Yüzyıl - 19. Yüzyıl (Aydınlanma Felsefesi)',
          '20. Yüzyıl Felsefesi ve Temel Akımlar',
        ]
      }
    ],
    'Din Kültürü': [
      {
        id: 'tyt-din-bilgi-inanc',
        name: 'Bilgi ve İnanç',
        icon: '🧠',
        subtopics: [
          'İslam\'da Bilgi Kaynakları (Akl-ı Selim, Haber-i Sadık, Havass-ı Selime)',
          'İnançla İlgili Felsefi Yaklaşımlar (Ateizm, Deizm, Agnostisizm, Nihilizm)',
          'Allah\'ın Varlığı, Birliği ve Sıfatları (Zati ve Subuti Sıfatlar)',
        ]
      },
      {
        id: 'tyt-din-ibadet',
        name: 'İbadet',
        icon: '🕌',
        subtopics: [
          'İslam\'da İbadetin Amacı ve Temel İlkeleri',
          'Temel İbadetler (Namaz, Oruç, Zekat, Hac)',
          'İbadetlerin Bireysel ve Toplumsal Faydaları',
        ]
      },
      {
        id: 'tyt-din-ahlak-degerler',
        name: 'Ahlak ve Değerler',
        icon: '💚',
        subtopics: [
          'İslam Ahlakının Kaynağı ve Mahiyeti',
          'Kur\'an-ı Kerim\'de Geçen Temel Ahlaki Tutumlar (Adalet, İffet, Hikmet, Şecaat)',
          'Değerler ve Değer Oluşum Süreci',
        ]
      },
      {
        id: 'tyt-din-kultur-medeniyet',
        name: 'Din, Kültür ve Medeniyet',
        icon: '🏛️',
        subtopics: [
          'Din ve Kültür İlişkisi',
          'İslam Medeniyeti ve Özellikleri',
          'Kültürümüzde ve Mimaride Dinin İzleri',
        ]
      },
      {
        id: 'tyt-din-hz-muhammed-genclik',
        name: 'Hz. Muhammed ve Gençlik',
        icon: '🌙',
        subtopics: [
          'Hz. Muhammed\'in Örnek Kişiliği ve Vasıfları',
          'Hz. Muhammed\'in Gençlerle İlişkisi',
          'Öne Çıkan Genç Sahabiler',
        ]
      },
      {
        id: 'tyt-din-kuran-kavramlar',
        name: 'Kur\'an-ı Kerim ve Temel Kavramlar',
        icon: '📖',
        subtopics: [
          'Kur\'an-ı Kerim\'in Yapısı ve Ana Konuları',
          'Temel Kavramlar (Hidayet, İhsan, Takva, Sırat-ı Müstakim, Cihat)',
          'Kur\'an-ı Kerim\'i Anlama ve Yorumlama',
        ]
      },
      {
        id: 'tyt-din-itikadi-ameli',
        name: 'İslam Düşüncesinde İtikadi ve Ameli Yorumlar',
        icon: '📚',
        subtopics: [
          'Dini Yorum Farklılıklarının Nedenleri',
          'İtikadi Yorumlar (Eş\'ariyye, Maturidiyye)',
          'Ameli-Fıkhi Yorumlar (Hanefilik, Şafilik, Malikilik, Hanbelilik)',
          'Tasavvufi Yorumlar (Mevlevilik, Bektaşilik, Alevilik-Bektaşilik)',
        ]
      },
      {
        id: 'tyt-din-dunya-dinleri',
        name: 'Yaşayan Dünya Dinleri',
        icon: '🌐',
        subtopics: [
          'İlahi Dinler (Yahudilik, Hristiyanlık)',
          'Hint ve Doğu Asya Dinleri (Hinduizm, Budizm, Taoizm, Konfüçyüsçülük)',
        ]
      }
    ],
  },
  ayt: {
    Matematik: [
      {
        id: 'ayt-mat-polinomlar',
        name: 'Polinomlar',
        icon: '➿',
        subtopics: [
          'Polinom Kavramı ve İşlemler',
          'Katsayılar Toplamı ve Sabit Terim',
          'Polinom Bölmesi ve Kalan Bulma',
        ]
      },
      {
        id: 'ayt-mat-ikinci-derece-denklemler',
        name: 'İkinci Dereceden Denklemler',
        icon: '📐',
        subtopics: [
          'Çözüm Kümesi ve Diskriminant (Δ)',
          'Kökler ve Katsayılar İlişkisi',
          'Karmaşık Sayılar',
        ]
      },
      {
        id: 'ayt-mat-parabol',
        name: 'Parabol (İkinci Dereceden Fonksiyonlar)',
        icon: '📉',
        subtopics: [
          'Parabol Grafiği ve Tepe Noktası',
          'Eksenleri Kestiği Noktalar',
          'Parabol ve Doğrunun Durumları',
        ]
      },
      {
        id: 'ayt-mat-ikinci-derece-esitsizlikler',
        name: 'İkinci Dereceden Eşitsizlikler',
        icon: '⚖️',
        subtopics: [
          'İşaret Tablosu İnceleme',
          'Tek ve Çift Katlı Kökler',
          'Eşitsizlik Sistemleri',
        ]
      },
      {
        id: 'ayt-mat-trigonometri',
        name: 'Trigonometri',
        icon: '📐',
        subtopics: [
          'Yönlü Açılar ve Trigonometrik Fonksiyonlar',
          'Trigonometrik Özdeşlikler ve İndirgeme',
          'Sinüs ve Kosinüs Teoremleri',
          'Toplam-Fark ve Yarım Açı Formülleri',
          'Ters Trigonometrik Fonksiyonlar',
          'Trigonometrik Denklemler',
        ]
      },
      {
        id: 'ayt-mat-logaritma',
        name: 'Logaritma',
        icon: '🪵',
        subtopics: [
          'Üstel Fonksiyon ve Logaritma Tanımı',
          'Logaritma Özellikleri ve Taban Değiştirme',
          'Logaritmik Denklemler ve Eşitsizlikler',
        ]
      },
      {
        id: 'ayt-mat-diziler',
        name: 'Diziler',
        icon: '🔢',
        subtopics: [
          'Dizi Tanımı ve Genel Terim',
          'Aritmetik Dizi',
          'Geometrik Dizi',
          'Toplam Sembolü ve İlk n Terim Toplamı',
        ]
      },
      {
        id: 'ayt-mat-limit-sureklilik',
        name: 'Limit ve Süreklilik',
        icon: '🎯',
        subtopics: [
          'Sağ-Sol Limit Kavramı',
          'Limit Kuralları ve Belirsizlikler (0/0)',
          'Süreklilik Tanımı ve Uygulamaları',
        ]
      },
      {
        id: 'ayt-mat-turev',
        name: 'Türev',
        icon: '📈',
        subtopics: [
          'Türev Tanımı ve Anlık Değişim Oranı',
          'Türev Alma Kuralları',
          'Teğet ve Normal Denklemleri',
          'Artan-Azalanlık ve Ekstremum Noktaları',
          'Maksimum - Minimum Problemleri',
        ]
      },
      {
        id: 'ayt-mat-integral',
        name: 'İntegral',
        icon: '∫',
        subtopics: [
          'Belirsiz İntegral ve İntegral Alma Kuralları',
          'Değişken Değiştirme Yöntemi',
          'Belirli İntegral',
          'İntegral ile Alan Hesabı',
        ]
      },
      {
        id: 'ayt-mat-sayma-olasilik',
        name: 'Sayma ve Olasılık (AYT)',
        icon: '🎲',
        subtopics: [
          'Tekrarlı Permütasyon',
          'Geometrik Kombinasyon',
          'Binom Açılımı',
          'Koşullu Olasılık',
        ]
      }
    ],
    Geometri: [
      {
        id: 'ayt-geo-analitik',
        name: 'Analitik Geometri',
        icon: '📐',
        subtopics: [
          'Analitik Geometri - Temel Kavramlar',
          'Analitik Geometri - Örnek Sorular',
          'Analitik Geometri - Test'
        ]
      },
      {
        id: 'ayt-geo-donusum',
        name: 'Dönüşümler',
        icon: '🔄',
        subtopics: [
          'Dönüşümler - Temel Kavramlar',
          'Dönüşümler - Örnek Sorular',
          'Dönüşümler - Test'
        ]
      },
      {
        id: 'ayt-geo-cember',
        name: 'Çember ve Daire',
        icon: '⭕',
        subtopics: [
          'Çember ve Daire - Temel Kavramlar',
          'Çember ve Daire - Örnek Sorular',
          'Çember ve Daire - Test'
        ]
      },
      {
        id: 'ayt-geo-silindir',
        name: 'Dik Dairesel Silindir',
        icon: '🥫',
        subtopics: [
          'Dik Dairesel Silindir - Temel Kavramlar',
          'Dik Dairesel Silindir - Örnek Sorular',
          'Dik Dairesel Silindir - Test'
        ]
      },
      {
        id: 'ayt-geo-koni',
        name: 'Dik Dairesel Koni',
        icon: '🍦',
        subtopics: [
          'Dik Dairesel Koni - Temel Kavramlar',
          'Dik Dairesel Koni - Örnek Sorular',
          'Dik Dairesel Koni - Test'
        ]
      },
      {
        id: 'ayt-geo-kure',
        name: 'Küre',
        icon: '🌐',
        subtopics: [
          'Küre - Temel Kavramlar',
          'Küre - Örnek Sorular',
          'Küre - Test'
        ]
      }
    ],
    Edebiyat: [
      {
        id: 'ayt-edeb-metinler-siir',
        name: 'Metinlerin Sınıflandırılması ve Şiir Bilgisi',
        icon: '📚',
        subtopics: [
          'Edebiyat ve Sanat İlişkisi',
          'Metin Türleri ve Özellikleri',
          'Şiirde Ahenk Unsurları (Ölçü, Kafiye, Redif)',
          'Şiir Türleri ve Nazım Biçimleri',
          'Edebi Sanatlar (Söz Sanatları)',
        ]
      },
      {
        id: 'ayt-edeb-islamiyet-oncesi',
        name: 'İslamiyet Öncesi ve Geçiş Dönemi Türk Edebiyatı',
        icon: '🏺',
        subtopics: [
          'Sözlü ve Yazılı Edebiyat (Koşuk, Sagu, Sav)',
          'Türk Destanları',
          'Geçiş Dönemi Eserleri ve Yazarları',
        ]
      },
      {
        id: 'ayt-edeb-halk',
        name: 'Halk Edebiyatı',
        icon: '🎻',
        subtopics: [
          'Anonim Halk Edebiyatı (Mani, Türkü, Masal)',
          'Âşık Tarzı Halk Edebiyatı ve Temsilcileri',
          'Tekke-Tasavvuf Edebiyatı ve Temsilcileri',
          'Halk Edebiyatı Nazım Biçimleri (Koşma, Semai, Varsağı, Destan)',
        ]
      },
      {
        id: 'ayt-edeb-divan',
        name: 'Divan Edebiyatı',
        icon: '🕌',
        subtopics: [
          'Divan Şiiri Nazım Biçimleri (Gazel, Kaside, Mesnevi vb.)',
          'Divan Edebiyatı Şairleri ve Eserleri',
          'Divan Nesri ve Eserleri',
        ]
      },
      {
        id: 'ayt-edeb-tanzimat',
        name: 'Tanzimat Edebiyatı',
        icon: '🏛️',
        subtopics: [
          '1. Dönem Tanzimat Edebiyatı ve Sanatçıları',
          '2. Dönem Tanzimat Edebiyatı ve Sanatçıları',
          'Tanzimat Dönemi Şiir, Roman, Hikâye ve Tiyatro',
        ]
      },
      {
        id: 'ayt-edeb-servetifunun',
        name: 'Servet-i Fünun ve Fecr-i Âti Edebiyatı',
        icon: '💡',
        subtopics: [
          'Servet-i Fünun Dönemi ve Sanatçıları',
          'Fecr-i Âti Topluluğu ve Temsilcileri',
          'Servet-i Fünun\'da Şiir, Roman ve Hikâye',
        ]
      },
      {
        id: 'ayt-edeb-milli',
        name: 'Millî Edebiyat Dönemi',
        icon: '🇹🇷',
        subtopics: [
          'Millî Edebiyat Oluşumu ve Beş Hececiler',
          'Millî Edebiyat Dönemi Sanatçıları ve Eserleri',
          'Millî Mücadele Dönemi Eserleri',
        ]
      },
      {
        id: 'ayt-edeb-cumhuriyet-siir',
        name: 'Cumhuriyet Dönemi Şiir',
        icon: '✒️',
        subtopics: [
          'Yedi Meşaleciler',
          'Serbest Nazım ve Toplumcu Şiir',
          'Garip Akımı (I. Yeni)',
          'İkinci Yeni ve İkinci Yeni Sonrası Şiir',
          'Dini Değerleri Öne Çıkaran Şiir',
          'Saf (Öz) Şiir Anlayışı',
        ]
      },
      {
        id: 'ayt-edeb-cumhuriyet-roman',
        name: 'Cumhuriyet Dönemi Roman ve Hikâye',
        icon: '📖',
        subtopics: [
          'Toplumcu Gerçekçi Roman ve Hikâye',
          'Bireyin İç Dünyasını Esas Alan Romanlar',
          'Millî Edebiyat Zevk ve Anlayışını Sürdürenler',
          'Modernist ve Postmodernist Romanlar',
        ]
      },
      {
        id: 'ayt-edeb-cumhuriyet-tiyatro',
        name: 'Cumhuriyet Dönemi Tiyatro ve Öğretici Metinler',
        icon: '🎭',
        subtopics: [
          'Cumhuriyet Dönemi Tiyatro Yazarları ve Eserleri',
          'Deneme, Makale, Anı, Gezi Yazısı ve Temsilcileri',
        ]
      },
      {
        id: 'ayt-edeb-akimlar',
        name: 'Edebî Akımlar',
        icon: '🌊',
        subtopics: [
          'Batı Edebiyatı Akımları (Klasisizm, Romantizm, Realizm, Natüralizm, Parnasizm, Sembolizm, Eksistansiyalizm)',
        ]
      }
    ],
    Fizik: [
      {
        id: 'ayt-fiz-vektor-denge',
        name: 'Vektörler ve Kuvvet-Denge',
        icon: '➡️',
        subtopics: [
          'Vektörler ve Özellikleri',
          'Tork (Kuvvet Momenti)',
          'Denge ve Denge Şartları',
          'Kütle ve Ağırlık Merkezi',
          'Basit Makineler',
        ]
      },
      {
        id: 'ayt-fiz-newton-hareket',
        name: 'Newton\'un Hareket Yasaları ve Hareket (AYT)',
        icon: '🚀',
        subtopics: [
          'Sabit İvmeli Hareket ve Grafikler',
          'İki Boyutta Hareket ve Atışlar (Serbest, Düşey, Yatay ve Eğik Atış)',
          'Sürtünmeli Yüzeylerde İvmeli Hareket',
        ]
      },
      {
        id: 'ayt-fiz-itme-momentum',
        name: 'İtme ve Momentum',
        icon: '💥',
        subtopics: [
          'İtme (Impuls) ve Çizgisel Momentum',
          'Momentumun Korunumu',
          'Esnek ve Esnek Olmayan Çarpışmalar',
        ]
      },
      {
        id: 'ayt-fiz-is-enerji',
        name: 'İş, Güç ve Enerji (AYT)',
        icon: '⚡',
        subtopics: [
          'İş ve Enerji İlişkisi',
          'Mekanik Enerjinin Korunumu',
          'Yay Esneklik Potansiyel Enerjisi',
        ]
      },
      {
        id: 'ayt-fiz-elektrik-manyetizma',
        name: 'Elektrik ve Manyetizma (AYT)',
        icon: '🧲',
        subtopics: [
          'Elektriksel Kuvvet (Coulomb Yasası) ve Elektrik Alan',
          'Elektriksel Potansiyel, Potansiyel Enerji ve İş',
          'Düzgün Elektrik Alan ve Sığaçlar (Kondansatörler)',
          'Akım Geçen İletkenlerin Manyetik Alanı',
          'Manyetik Kuvvet ve Tork',
          'Elektromanyetik İndüksiyon ve Öz-İndüksiyon',
          'Alternatif Akım Devreleri',
          'Transformatörler',
        ]
      },
      {
        id: 'ayt-fiz-cembersel',
        name: 'Çembersel Hareket ve Gravitasyon',
        icon: '🪐',
        subtopics: [
          'Düzgün Çembersel Hareket ve Temel Değişkenler',
          'Virajlı Yollar ve Düşey Düzlemde Hareket',
          'Dönerek Öteleme Hareketi ve Açısal Momentum',
          'Kütle Çekim Kuvveti ve Kepler Yasaları',
        ]
      },
      {
        id: 'ayt-fiz-bh',
        name: 'Basit Harmonik Hareket',
        icon: '🎵',
        subtopics: [
          'Basit Harmonik Hareket Kavramları (Genlik, Periyot, Frekans)',
          'Yaylı Sarkaç ve Basit Sarkaç',
          'Kuvvet, İvme ve Hız Değişimleri',
        ]
      },
      {
        id: 'ayt-fiz-dalga-mekanigi',
        name: 'Dalga Mekaniği',
        icon: '📡',
        subtopics: [
          'Su Dalgalarında Kırınım ve Girişim',
          'Işıkta Girişim (Çift Yarık) ve Kırınım (Tek Yarık)',
          'Doppler Etkisi (Ses ve Işık)',
          'Elektromanyetik Dalgalar ve Özellikleri',
        ]
      },
      {
        id: 'ayt-fiz-modern',
        name: 'Modern Fizik',
        icon: '⚛️',
        subtopics: [
          'Özel Görelilik (Rölativite) Kuramı',
          'Siyah Cisim Işıması ve Kuantum Fiziğine Giriş',
          'Fotoelektrik Olayı',
          'Compton Saçılması ve De Broglie Dalga Boyu',
        ]
      },
      {
        id: 'ayt-fiz-modern-teknoloji',
        name: 'Modern Fiziğin Teknolojideki Uygulamaları',
        icon: '💻',
        subtopics: [
          'Görüntüleme Teknolojileri (Röntgen, BT, MR, PET, Ultrason)',
          'Yarı İletken Teknolojisi, Diyot, Transistör ve Güneş Pilleri',
          'Süper İletkenler ve Nanoteknoloji',
          'Nükleer Fizik, Radyoaktivite ve Temel Parçacıklar (Standart Model)',
        ]
      }
    ],
    Kimya: [
      {
        id: 'ayt-kim-modern-atom',
        name: 'Modern Atom Teorisi',
        icon: '⚛️',
        subtopics: [
          'Bohr Atom Modeli ve Sınırlılıkları',
          'Kuantum Sayıları ve Orbital Kavramı',
          'Elektron Dizilimleri (Aufbau, Hund, Pauli)',
          'Periyodik Sistem ve Periyodik Özelliklerin Değişimi',
        ]
      },
      {
        id: 'ayt-kim-gazlar',
        name: 'Gazlar',
        icon: '🎈',
        subtopics: [
          'Gaz Yasaları (Boyle, Charles, Gay-Lussac, Avogadro)',
          'İdeal Gaz Denklemi (PV = nRT)',
          'Gazlarda Difüzyon ve Efüzyon (Graham Yasası)',
          'Gaz Karışımları ve Kısmi Basınç (Dalton Yasası)',
          'Gerçek Gazlar ve Faz Diyagramları',
        ]
      },
      {
        id: 'ayt-kim-cozeltiler',
        name: 'Sıvı Çözeltiler ve Çözünürlük',
        icon: '💧',
        subtopics: [
          'Çözünme Süreci ve Çözücü-Çözünen Etkileşimleri',
          'Derişim Birimleri (Molarite, Molalite, Mol Kesri, PPM)',
          'Koligatif Özellikler (Buhar Basıncı, Kaynama ve Donma Noktası Değişimi, Osmoz)',
          'Çözünürlük ve Çözünürlüğe Etki Eden Faktörler',
        ]
      },
      {
        id: 'ayt-kim-enerji',
        name: 'Kimyasal Tepkimelerde Enerji',
        icon: '🔥',
        subtopics: [
          'Tepkime Isısı ve Entalpi (ΔH)',
          'Standart Oluşum Entalpileri',
          'Bağ Enerjileri ile Entalpi Hesaplama',
          'Hess Yasası',
        ]
      },
      {
        id: 'ayt-kim-hiz',
        name: 'Kimyasal Tepkimelerde Hız',
        icon: '⏱️',
        subtopics: [
          'Tepkime Hızı ve Çarpışma Teorisi',
          'Tepkime Hızını Etkileyen Faktörler',
          'Hız Denklemi, Tepkime Derecesi ve Molekülerite',
          'Mekanizmalı Tepkimelerde Hız',
        ]
      },
      {
        id: 'ayt-kim-denge',
        name: 'Kimyasal Tepkimelerde Denge',
        icon: '⚖️',
        subtopics: [
          'Kimyasal Denge Kavramı ve Denge Sabiti (Kc, Kp)',
          'Dengeyi Etkileyen Faktörler (Le Chatelier İlkesi)',
          'Sulu Çözelti Dengeleri (Asit-Baz Dengesi, pH/pOH)',
          'Tampon Çözeltiler ve Hidroliz',
          'Çözünürlük Dengesi (Kcc) ve Çökelme',
        ]
      },
      {
        id: 'ayt-kim-elektrik',
        name: 'Kimya ve Elektrik',
        icon: '🔋',
        subtopics: [
          'Redoks (İndirgenme-Yükseltgenme) Tepkimeleri',
          'Elektrokimyasal Hücreler (Galvanik Piller)',
          'Standart Pil Potansiyelleri ve Nernst Denklemi',
          'Elektroliz ve Faraday Yasaları',
          'Korozyon ve Önleme Yöntemleri',
        ]
      },
      {
        id: 'ayt-kim-karbon',
        name: 'Karbon Kimyasına Giriş',
        icon: '💎',
        subtopics: [
          'Anorganik ve Organik Bileşikler',
          'Karbon Allotropları (Elmas, Grafit, Grafen, Fulleren)',
          'Lewis Formülleri ve Hibritleşme (sp, sp2, sp3)',
          'Molekül Geometrisi ve VSEPR Gösterimi',
        ]
      },
      {
        id: 'ayt-kim-organik',
        name: 'Organik Kimya',
        icon: '🧬',
        subtopics: [
          'Fonksiyonel Gruplar ve İzomeri',
          'Hidrokarbonlar (Alkanlar, Alkenler, Alkinler, Aromatik Bileşikler)',
          'Alkoller ve Eterler',
          'Aldehitler ve Ketonlar',
          'Karboksilli Asitler ve Esterler',
        ]
      }
    ],
    Biyoloji: [
      {
        id: 'ayt-biy-denetleyici',
        name: 'Denetleyici ve Düzenleyici Sistemler',
        icon: '🧠',
        subtopics: [
          'Sinir Sistemi (Nöron Yapısı ve İmpuls İletimi)',
          'Merkezi ve Çevresel Sinir Sistemi',
          'Endokrin Sistem (Hormonlar ve Bezler)',
        ]
      },
      {
        id: 'ayt-biy-duyu',
        name: 'Duyu Organları',
        icon: '👁️',
        subtopics: [
          'Duyu Reseptörleri',
          'Göz, Kulak, Burun, Dil ve Deri',
          'Duyu Organı Rahatsızlıkları',
        ]
      },
      {
        id: 'ayt-biy-destek-hareket',
        name: 'Destek ve Hareket Sistemi',
        icon: '🦴',
        subtopics: [
          'Kemik, Kıkırdak ve Eklem Doku',
          'Kas Sistemi ve Kasılma Mekanizması (Huxley Kayan İplikler Modeli)',
          'Destek ve Hareket Sistemi Hastalıkları',
        ]
      },
      {
        id: 'ayt-biy-sindirim',
        name: 'Sindirim Sistemi',
        icon: '🍽️',
        subtopics: [
          'Sindirim Organları ve Yapısı',
          'Besinlerin Kimyasal ve Fiziksel Sindirimi',
          'Yağ, Protein ve Karbonhidratların Emilimi',
          'Karaciğerin Görevleri ve Sindirim Hastalıkları',
        ]
      },
      {
        id: 'ayt-biy-dolasim',
        name: 'Dolaşım ve Bağışıklık Sistemi',
        icon: '❤️',
        subtopics: [
          'Kalp, Damarlar ve Kan Doku',
          'Lenf Dolaşımı',
          'Dolaşım Sistemi Hastalıkları',
          'Bağışıklık Çeşitleri ve Hücreleri (Özgül / Özgül Olmayan)',
        ]
      },
      {
        id: 'ayt-biy-solunum',
        name: 'Solunum Sistemi',
        icon: '🫁',
        subtopics: [
          'Solunum Organları ve Yapısı',
          'Soluk Alıp Verme Mekanizması',
          'Gazların (O2 ve CO2) Kan Yoluyla Taşınması',
          'Solunum Sistemi Hastalıkları',
        ]
      },
      {
        id: 'ayt-biy-uriner',
        name: 'Üriner (Boşaltım) Sistem',
        icon: '💧',
        subtopics: [
          'Böbreğin Yapısı ve Nefronlar',
          'İdrar Oluşumu (Süzülme, Geri Emilim, Salgılama)',
          'Homeostazi ve Su-Tuz Dengesi',
        ]
      },
      {
        id: 'ayt-biy-ureme',
        name: 'Üreme Sistemi ve Embriyonik Gelişim',
        icon: '🤰',
        subtopics: [
          'Erkek ve Dişi Üreme Sistemi Yapısı',
          'Menstrüal Döngü ve Hormonal Kontrol',
          'Döllenme, Embriyonik Gelişim Evreleri ve Hamilelik',
        ]
      },
      {
        id: 'ayt-biy-komunite',
        name: 'Komünite ve Popülasyon Ekolojisi',
        icon: '🦁',
        subtopics: [
          'Komünite Ekolojisi (Türler Arası İlişkiler, Süksesyon)',
          'Popülasyon Ekolojisi (Yoğunluk, Dağılım, Büyüme Eğrileri, Yaş Piramitleri)',
        ]
      },
      {
        id: 'ayt-biy-gen-protein',
        name: 'Genden Proteine',
        icon: '🧬',
        subtopics: [
          'Nükleik Asitlerin Yapısı (DNA ve RNA)',
          'DNA Replikasyonu (Yarı Korunumlu Eşlenme)',
          'Genetik Kod ve Protein Sentezi (Transkripsiyon ve Translasyon)',
        ]
      },
      {
        id: 'ayt-biy-enerji',
        name: 'Canlılarda Enerji Dönüşümleri',
        icon: '⚡',
        subtopics: [
          'ATP ve Hücresel Enerji',
          'Fotosentez (Işığa Bağımlı ve Işıktan Bağımsız Reaksiyonlar)',
          'Kemosentez',
          'Hücresel Solunum (Oksijenli Solunum, Oksijensiz Solunum, Fermentasyon)',
        ]
      },
      {
        id: 'ayt-biy-bitki',
        name: 'Bitki Biyolojisi',
        icon: '🌱',
        subtopics: [
          'Bitkisel Dokular (Meristem, Temel, İletim, Örtü Doku)',
          'Bitki Organları (Kök, Gövde, Yaprak)',
          'Bitkide Madde Taşınması (Ksilem ve Soymuk Boruları)',
          'Bitkilerde Hareket (Tropizma ve Nasti) ve Hormonlar',
          'Bitkide Üreme, Çiçek Yapısı, Tozlaşma ve Çimlenme',
        ]
      },
      {
        id: 'ayt-biy-cevre',
        name: 'Canlılar ve Çevre',
        icon: '🌍',
        subtopics: [
          'Genetik Mühendisliği ve Biyoteknoloji',
          'Model Organizmalar ve Klonlama',
        ]
      }
    ],
    Tarih: [
      {
        id: 'ayt-tar-tarih-bilimi',
        name: 'Tarih Bilimi ve Tarih Yazıcılığı',
        icon: '📜',
        subtopics: [
          'Tarihin Tanımı, Konusu ve Yöntemi',
          'Tarih Yazıcılığı Türleri ve Belge İnceleme',
        ]
      },
      {
        id: 'ayt-tar-ilk-donemler',
        name: 'İnsanlığın İlk Dönemleri ve İlk Çağ Medeniyetleri',
        icon: '🗿',
        subtopics: [
          'Taş ve Maden Devirleri',
          'Mezopotamya, Mısır, Yunan ve Anadolu Medeniyetleri',
          'İlk Çağda Hukuk ve Ordu Sistemleri',
        ]
      },
      {
        id: 'ayt-tar-ilk-orta-cag-turk',
        name: 'İlk ve Orta Çağlarda Türk Dünyası',
        icon: '🐺',
        subtopics: [
          'Türklerin Anayurdu ve Göçler',
          'Asya Hun, Göktürk ve Uygur Devletleri',
          'Diğer Türk Boyları ve Devletleri',
          'Türklerde Devlet Teşkilatı, Töre ve Kültür',
        ]
      },
      {
        id: 'ayt-tar-islam-turk-islam',
        name: 'İslam Medeniyetinin Doğuşu ve İlk Türk-İslam Devletleri',
        icon: '☪️',
        subtopics: [
          'Hz. Muhammed, Dört Halife, Emeviler ve Abbasiler',
          'Karahanlı, Gazneli ve Büyük Selçuklu Devleti',
          'Türk-İslam Kültür ve Medeniyeti',
        ]
      },
      {
        id: 'ayt-tar-selcuklu-beylikler',
        name: 'Selçuklu Türkiye\'si ve Anadolu Beylikleri',
        icon: '🏰',
        subtopics: [
          'Malazgirt Sonrası Anadolu\'da İlk Beylikler',
          'Türkiye Selçuklu Devleti Siyasi Tarihi',
          'Anadolu\'da İkinci Beylikler Dönemi',
        ]
      },
      {
        id: 'ayt-tar-beylikten-devlete',
        name: 'Beylikten Devlete Osmanlı Siyaseti (1302-1453)',
        icon: '⚔️',
        subtopics: [
          'Kuruluş Dönemi Siyasi Gelişmeleri',
          'İskân ve İstimâlet Politikası',
          'Askerî ve İdari Teşkilatlanma',
        ]
      },
      {
        id: 'ayt-tar-dunya-gucu',
        name: 'Dünya Gücü Osmanlı (1453-1595)',
        icon: '🌍',
        subtopics: [
          'Yükselme Dönemi ve Fetihler',
          'Osmanlı Klasik Çağ Devlet Teşkilatı',
          'Tımar Sistemi ve Eyalet Yönetimi',
        ]
      },
      {
        id: 'ayt-tar-degisen-dengeler',
        name: 'Değişen Dünya Dengeleri Karşısında Osmanlı (17. ve 18. Yüzyıl)',
        icon: '⚖️',
        subtopics: [
          'Arayış Yılları ve Islahatlar (17. Yüzyıl)',
          'Karlofça Sonrası Osmanlı ve Avrupa İlişkileri',
          'Lale Devri ve 18. Yüzyıl Islahatları',
        ]
      },
      {
        id: 'ayt-tar-en-uzun-yuzyil',
        name: 'En Uzun Yüzyıl (1814-1914)',
        icon: '⏳',
        subtopics: [
          'Denge Stratejisi ve Şark Meselesi',
          'Tanzimat, Islahat ve I.-II. Meşrutiyet Dönemi',
          'Yüzyıl Fikir Akımları (Osmanlıcılık, İslamcılık, Türkçülük)',
        ]
      },
      {
        id: 'ayt-tar-20-yuzyil-savas',
        name: '20. Yüzyıl Başlarında Osmanlı ve I. Dünya Savaşı',
        icon: '💥',
        subtopics: [
          'Trablusgarp ve Balkan Savaşları',
          'I. Dünya Savaşı Cepheleri ve Antlaşmalar',
          'Gizli Antlaşmalar ve İşgaller',
        ]
      },
      {
        id: 'ayt-tar-milli-mucadele',
        name: 'Millî Mücadele Dönemi',
        icon: '🇹🇷',
        subtopics: [
          'İşgaller, Cemiyetler ve Genelgeler/Kongreler',
          'BMM\'nin Açılması ve İsyanlar',
          'Doğu, Güney ve Batı Cepheleri',
          'Mudanya Ateşkesi ve Lozan Antlaşması',
        ]
      },
      {
        id: 'ayt-tar-ataturkculuk',
        name: 'Atatürkçülük ve Türk İnkılabı',
        icon: '⭐',
        subtopics: [
          'Siyasal, Toplumsal, Eğitim ve Ekonomi İnkılapları',
          'Atatürk İlkeleri ve Bütünleyici İlkeler',
          'Atatürk Dönemi Türk Dış Politikası',
        ]
      },
      {
        id: 'ayt-tar-iki-savas-arasi',
        name: 'İki Dünya Savaşı Arasındaki Dönem',
        icon: '🌐',
        subtopics: [
          'II. Dünya Savaşı\'na Giden Yol ve Totaliter Rejimler',
          'Orta Doğu\'da Manda Rejimleri ve Yükselen Güçler',
        ]
      },
      {
        id: 'ayt-tar-soguk-savas',
        name: 'II. Dünya Savaşı ve Soğuk Savaş Dönemi',
        icon: '❄️',
        subtopics: [
          'II. Dünya Savaşı\'nın Gelişimi ve Türkiye\'nin Tutumu',
          'Doğu ve Batı Bloklarının Kuruluşu (NATO, Varşova Paktı)',
          'Soğuk Savaş Döneminde Türkiye',
        ]
      },
      {
        id: 'ayt-tar-yumusama',
        name: 'Yumuşama Dönemi ve Küreselleşen Dünya',
        icon: '🕊️',
        subtopics: [
          'Yumuşama (Detant) Dönemi ve Bölgesel Çatışmalar (Kıbrıs Meselesi vb.)',
          'SSCB\'nin Dağılması ve Türk Cumhuriyetleri',
          'Küreselleşen Dünya, Orta Doğu ve Türkiye',
        ]
      }
    ],
    Coğrafya: [
      {
        id: 'ayt-cog-ekosistem',
        name: 'Ekosistem ve Biyoçeşitlilik',
        icon: '🌿',
        subtopics: [
          'Biyoçeşitlilik ve Ekosistem Unsurları',
          'Madde Döngüleri (Karbon, Azot, Su)',
          'Enerji Akışı ve Besin Piramidi',
        ]
      },
      {
        id: 'ayt-cog-sehirler',
        name: 'Şehirlerin Fonksiyonları ve Etki Alanları',
        icon: '🏙️',
        subtopics: [
          'Şehirlerin Gelişimi ve Fonksiyonel Özellikleri',
          'Şehirlerin Etki Alanları (Küresel, Bölgesel, Yerel)',
          'Sakin Şehirler (Cittaslow) ve Geleceğin Şehirleri',
        ]
      },
      {
        id: 'ayt-cog-turkiye-nufus',
        name: 'Türkiye\'de Nüfus ve Yerleşme',
        icon: '👥',
        subtopics: [
          'Türkiye\'nin Nüfus Politikaları ve Projeksiyonları',
          'Türkiye\'de Şehirlerin Fonksiyonları',
          'Türkiye\'de Kır Yerleşme Tipleri ve Doku Özellikleri',
        ]
      },
      {
        id: 'ayt-cog-turkiye-ekonomi',
        name: 'Türkiye\'nin Ekonomi Politikaları ve Sektörleri',
        icon: '🏭',
        subtopics: [
          'Türkiye\'de Uygulanan Ekonomi Politikaları',
          'Türkiye\'de Tarım ve Hayvancılık',
          'Türkiye\'de Madenler ve Enerji Kaynakları',
          'Türkiye\'de Sanayi, Ticaret ve Turizm',
        ]
      },
      {
        id: 'ayt-cog-bolgesel-kalkinma',
        name: 'Bölgesel Kalkınma Projeleri',
        icon: '🏗️',
        subtopics: [
          'GAP, DAP, DOKAP, ZBK, KOP ve YGP Projeleri',
          'Projelerin Amaçları ve Bölgesel Etkileri',
        ]
      },
      {
        id: 'ayt-cog-kuresel-ticaret',
        name: 'Küresel Ticaret, Ulaşım ve Pazar',
        icon: '🌐',
        subtopics: [
          'Hammadde, Üretim ve Pazar Alanları',
          'Küresel Ticaret ve Ulaşım Ağları',
          'Turizm Faaliyetlerinin Küresel Etkileri',
        ]
      },
      {
        id: 'ayt-cog-ulkeler-medeniyet',
        name: 'Ülkeler Coğrafyası ve Medeniyetler',
        icon: '🏛️',
        subtopics: [
          'İlk Medeniyet Merkezleri ve Yayılış Alanları',
          'Ülkelerin Gelişmişlik Düzeyi ve Doğal Kaynak İlişkisi',
          'Kültür Bölgeleri ve Türk Kültürü',
        ]
      },
      {
        id: 'ayt-cog-orgutler',
        name: 'Küresel ve Bölgesel Örgütler',
        icon: '🤝',
        subtopics: [
          'Siyasi ve Askerî Örgütler (BM, NATO vb.)',
          'Ekonomik Örgütler (AB, IMF, OECD, İİT, KEİ vb.)',
          'Çevre Örgütleri',
        ]
      },
      {
        id: 'ayt-cog-jeopolitik',
        name: 'Türkiye\'nin Jeopolitik Konumu ve Çatışma Bölgeleri',
        icon: '🛰️',
        subtopics: [
          'Türkiye\'nin Jeopolitik Konumu ve Değişen Rolü',
          'Geçmişten Günümüze Sıcak Çatışma Bölgeleri',
          'Türk Dünyası ve Bölgesel İlişkiler',
        ]
      },
      {
        id: 'ayt-cog-cevre',
        name: 'Çevre ve Sürdürülebilirlik',
        icon: '♻️',
        subtopics: [
          'Küresel Çevre Sorunları ve Türleri',
          'Doğal Kaynak Kullanımının Çevresel Etkileri',
          'Sürdürülebilir Arazi Kullanımı ve Çevre Anlaşmaları',
        ]
      }
    ],
    Felsefe: [
      {
        id: 'ayt-fel-felsefeyi-tanima',
        name: 'Felsefeyi Tanıma',
        icon: '🤔',
        subtopics: [
          'Felsefenin Anlamı ve Doğuşu',
          'Felsefi Düşüncenin Özellikleri',
          'Felsefenin Bireysel ve Toplumsal İşlevleri',
        ]
      },
      {
        id: 'ayt-fel-felsefe-ile-dusunme',
        name: 'Felsefe ile Düşünme',
        icon: '💭',
        subtopics: [
          'Akıl Yürütme Türleri (Tümdengelim, Tümevarım, Analoji)',
          'Argüman, Önerme ve Görüş Kavramları',
          'Dil ve Düşünme İlişkisi',
        ]
      },
      {
        id: 'ayt-fel-temel-alanlar',
        name: 'Felsefenin Temel Alanları ve Problemleri',
        icon: '🏛️',
        subtopics: [
          'Varlık Felsefesi (Ontoloji)',
          'Bilgi Felsefesi (Epistemoloji)',
          'Bilim Felsefesi',
          'Ahlak Felsefesi (Etik)',
          'Sanat Felsefesi (Estetik)',
          'Din Felsefesi',
          'Siyaset Felsefesi',
        ]
      },
      {
        id: 'ayt-fel-tarihsel-donemler',
        name: 'Felsefenin Tarihsel Dönemleri',
        icon: '⏳',
        subtopics: [
          'MÖ 6. Yüzyıl - MS 2. Yüzyıl (İlk Çağ Felsefesi)',
          'MS 2. Yüzyıl - MS 15. Yüzyıl (Orta Çağ Felsefesi)',
          '15. Yüzyıl - 17. Yüzyıl (Rönesans ve Modern Felsefe)',
          '18. Yüzyıl - 19. Yüzyıl (Aydınlanma Felsefesi)',
          '20. Yüzyıl Felsefesi ve Temel Akımlar',
        ]
      },
      {
        id: 'ayt-fel-psikoloji',
        name: 'Psikoloji',
        icon: '🧠',
        subtopics: [
          'Psikoloji Bilimini Tanıyalım (Tanımı, Yaklaşımları, Araştırma Yöntemleri)',
          'Psikolojinin Temel Süreçleri (Duyum, Algı, Güdülenme, Duygu)',
          'Öğrenme, Bellek ve Düşünme',
          'Ruh Sağlığı, Stres ve Kişilik Kuramları',
        ]
      },
      {
        id: 'ayt-fel-sosyoloji',
        name: 'Sosyoloji',
        icon: '👥',
        subtopics: [
          'Sosyolojiye Giriş (Tanımı, Yöntemleri ve Araştırma Teknikleri)',
          'Toplumsal Yapı, İlişkiler ve Tabakalaşma',
          'Toplumsal Değişme ve Gelişme',
          'Toplum ve Kültür',
          'Toplumsal Kurumlar (Aile, Eğitim, Din, Ekonomi, Siyaset)',
        ]
      },
      {
        id: 'ayt-fel-mantik',
        name: 'Mantık',
        icon: '🔀',
        subtopics: [
          'Mantığa Giriş (Tanımı, Akıl İlkeleri ve Mantığın Doğuşu)',
          'Klasik Mantık (Kavram, Terim, Önerme ve Kıyas)',
          'Mantık ve Dil (Anlam Analizi ve Tanım Türleri)',
          'Sembolik Mantık (Önermeler Mantığı ve Yüklemler Mantığı)',
        ]
      }
    ],
    'Din Kültürü': [
      {
        id: 'ayt-din-dunya-ahiret',
        name: 'Dünya ve Ahiret',
        icon: '🌍',
        subtopics: [
          'Ahiret Hayatının Aşamaları (Ölüm, Berzah, Kıyamet, Ba\'s, Haşır, Mahşer, Mizan, Sırat)',
          'Dünya ve Ahiret Hayatı Arasındaki İlişki',
          'Cennet ve Cehennem Kavramları',
        ]
      },
      {
        id: 'ayt-din-kuran-anlasilmasi',
        name: 'Kur\'an-ı Kerim ve Anlaşılması',
        icon: '📖',
        subtopics: [
          'Tefsir, Meal, Tevil ve Tecvid Kavramları',
          'Kur\'an-ı Kerim\'in Toplanması, Çoğaltılması ve Nüzul Süreci',
          'Kur\'an\'ı Okuma ve Anlama Yöntemleri',
        ]
      },
      {
        id: 'ayt-din-mezhepler',
        name: 'İslam Düşüncesinde Yorumlar ve Mezhepler',
        icon: '📚',
        subtopics: [
          'Dini Yorum Farklılıklarının Nedenleri',
          'Siyasi ve İtikadi Mezhepler (Mürcie, Mu\'tezile, Şia, Haricilik, Eş\'ariyye, Maturidiyye)',
          'Ameli ve Fıkhi Yorumlar (Hanefilik, Şafilik, Malikilik, Hanbelilik, Caferilik)',
        ]
      },
      {
        id: 'ayt-din-tasavvuf',
        name: 'Tasavvuf ve Tasavvufi Yorumlar',
        icon: '🕊️',
        subtopics: [
          'Tasavvuf Kavramı ve Temel Terimler (Zühd, Seyr-i Süluk, İhsan)',
          'Tasavvufi Düşüncede Edep ve Erkan',
          'Tasavvufi Yorumlar (Yesevilik, Mevlevilik, Nakşibendilik, Kadirilik, Alevilik-Bektaşilik)',
        ]
      },
      {
        id: 'ayt-din-bilim-fikih-sanat',
        name: 'İslam Düşüncesinde Bilim, Fıkıh ve Sanat',
        icon: '🔬',
        subtopics: [
          'İslam Bilim Tarihi ve Öne Çıkan Müslüman Bilim İnsanları',
          'Fıkıh Kavramı, Ef\'al-i Mükellefin ve Şer\'i Deliller',
          'İslam Sanat Dalları (Hüsn-i Hat, Tezhip, Ebru, Minyatür, Edebi ve Mimari Eserler)',
        ]
      },
      {
        id: 'ayt-din-dinler-tarihi',
        name: 'Dinler Tarihi ve Yaşayan Dünya Dinleri',
        icon: '🌐',
        subtopics: [
          'Din Tanımı ve Dinlerin Sınıflandırılması',
          'İlahi Dinler (Yahudilik ve Hristiyanlık Tarihi, İnanç Esasları, Ritüelleri)',
          'Hint ve Çin Dinleri (Hinduizm, Budizm, Taoizm, Konfüçyüsçülük)',
        ]
      }
    ],
  }
};

export { CURRICULUM };
