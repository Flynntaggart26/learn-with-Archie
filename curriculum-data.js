// ===== Learn with Archie - Complete TYT & AYT Curriculum =====
// This file defines the full curriculum data structure used by the app.

const CURRICULUM = {
  tyt: {
    Matematik: [
      {
        id: 'tyt-mat-sayi-kumeleri',
        name: 'Sayı Kümeleri',
        icon: '🔢',
        subtopics: [
          'Doğal Sayılar',
          'Tam Sayılar',
          'Rasyonel Sayılar',
          'İrrasyonel Sayılar',
          'Gerçek Sayılar'
        ]
      },
      {
        id: 'tyt-mat-temel-islemler',
        name: 'Temel İşlemler',
        icon: '➗',
        subtopics: [
          'Toplama ve Çıkarma',
          'Çarpma ve Bölme',
          'İşlem Önceliği',
          'Parantezli İşlemler'
        ]
      },
      {
        id: 'tyt-mat-tek-cift',
        name: 'Tek ve Çift Sayılar',
        icon: '👥',
        subtopics: [
          'Tek Sayılar',
          'Çift Sayılar',
          'Tek-Çift İşlem Kuralları'
        ]
      },
      {
        id: 'tyt-mat-poz-neg',
        name: 'Pozitif ve Negatif Sayılar',
        icon: '➕',
        subtopics: [
          'Pozitif Sayılar',
          'Negatif Sayılar',
          'Sıfır',
          'İşaret Kuralları'
        ]
      },
      {
        id: 'tyt-mat-ardisik',
        name: 'Ardışık Sayılar',
        icon: '🔢',
        subtopics: [
          'Ardışık Tam Sayılar',
          'Ardışık Çift Sayılar',
          'Ardışık Tek Sayılar',
          'Ardışık Sayıların Toplamı'
        ]
      },
      {
        id: 'tyt-mat-basamak',
        name: 'Sayı Basamakları',
        icon: '🔢',
        subtopics: [
          'Basamak Değeri',
          'Sayı Değeri',
          'Çözümleme',
          'Basamak Kavramı'
        ]
      },
      {
        id: 'tyt-mat-asal',
        name: 'Asal ve Aralarında Asal Sayılar',
        icon: '🔢',
        subtopics: [
          'Asal Sayılar',
          'Aralarında Asal Sayılar',
          'Asal Sayı Testleri'
        ]
      },
      {
        id: 'tyt-mat-kalanli-bolme',
        name: 'Tam Sayılarda Kalanlı Bölme',
        icon: '➗',
        subtopics: [
          'Bölme İşlemi',
          'Kalan Kavramı',
          'Bölünen-Bölen-Bölüm-Kalan İlişkisi'
        ]
      },
      {
        id: 'tyt-mat-bolunebilme1',
        name: 'Bölünebilme Kuralları 1',
        icon: '➗',
        subtopics: [
          '2 ile Bölünebilme',
          '3 ile Bölünebilme',
          '4 ile Bölünebilme',
          '5 ile Bölünebilme'
        ]
      },
      {
        id: 'tyt-mat-bolunebilme2',
        name: 'Bölünebilme Kuralları 2',
        icon: '➗',
        subtopics: [
          '6 ile Bölünebilme',
          '8 ile Bölünebilme',
          '9 ile Bölünebilme',
          '10 ile Bölünebilme',
          '11 ile Bölünebilme'
        ]
      },
      {
        id: 'tyt-mat-asal-carpan',
        name: 'Asal Çarpanlar',
        icon: '🔢',
        subtopics: [
          'Asal Çarpanlara Ayırma',
          'Çarpan Ağacı',
          'Bölen Sayısı Bulma'
        ]
      },
      {
        id: 'tyt-mat-ebob-ekok',
        name: 'EBOB-EKOK Kavramları',
        icon: '⚖️',
        subtopics: [
          'EBOB Kavramı',
          'EKOK Kavramı',
          'EBOB-EKOK İlişkisi',
          'EBOB-EKOK Bulma Yöntemleri'
        ]
      },
      {
        id: 'tyt-mat-ebob-ekok-problem',
        name: 'EBOB-EKOK Problemleri',
        icon: '📝',
        subtopics: [
          'EBOB Problemleri',
          'EKOK Problemleri',
          'Karışık Problemler'
        ]
      },
      {
        id: 'tyt-mat-periyodik',
        name: 'Periyodik Problemler',
        icon: '🔄',
        subtopics: [
          'Periyodik Tekrar',
          'Gün-Hafta Problemleri',
          'Saat Problemleri'
        ]
      },
      {
        id: 'tyt-mat-rasyonel',
        name: 'Rasyonel Sayılarda İşlemler',
        icon: '🔢',
        subtopics: [
          'Rasyonel Sayı Tanımı',
          'Toplama-Çıkarma',
          'Çarpma-Bölme',
          'Sıralama'
        ]
      },
      {
        id: 'tyt-mat-devirli',
        name: 'Ondalıklı ve Devirli Sayılar',
        icon: '🔢',
        subtopics: [
          'Ondalık Gösterim',
          'Devirli Ondalık Sayılar',
          'Ondalık-Rasyonel Dönüşümü'
        ]
      },
      {
        id: 'tyt-mat-aralik',
        name: 'Gerçek Sayılarda Aralık Kavramı',
        icon: '📏',
        subtopics: [
          'Kapalı Aralık',
          'Açık Aralık',
          'Yarı Açık Aralık',
          'Aralık Gösterimleri'
        ]
      },
      {
        id: 'tyt-mat-birinci-denklem',
        name: 'Birinci Dereceden Denklemler',
        icon: '➗',
        subtopics: [
          'Denklem Kavramı',
          'Birinci Dereceden Denklem Çözümü',
          'Denklem Kurma Problemleri'
        ]
      },
      {
        id: 'tyt-mat-basit-esitsizlik',
        name: 'Basit Eşitsizlikler',
        icon: '⚖️',
        subtopics: [
          'Eşitsizlik Kavramı',
          'Eşitsizlik Çözümü',
          'Eşitsizlik Özellikleri'
        ]
      },
      {
        id: 'tyt-mat-iki-bilinmeyen',
        name: 'İki Bilinmeyenli Denklemler',
        icon: '➗',
        subtopics: [
          'İki Bilinmeyenli Denklem Sistemi',
          'Yerine Koyma Yöntemi',
          'Yok Etme Yöntemi'
        ]
      },
      {
        id: 'tyt-mat-iki-bil-esitsizlik',
        name: 'İki Bilinmeyenli Eşitsizlikler',
        icon: '⚖️',
        subtopics: [
          'İki Bilinmeyenli Eşitsizlik',
          'Çözüm Kümesi',
          'Grafik Gösterimi'
        ]
      },
      {
        id: 'tyt-mat-esitsizlik-sistem',
        name: 'Eşitsizlik Sistemleri',
        icon: '⚖️',
        subtopics: [
          'Eşitsizlik Sistemi Çözümü',
          'Kesişim Kümesi',
          'Grafik Yöntemi'
        ]
      },
      {
        id: 'tyt-mat-mutlak-deger',
        name: 'Mutlak Değer Kavramı',
        icon: '📏',
        subtopics: [
          'Mutlak Değer Tanımı',
          'Mutlak Değer Özellikleri',
          'Mutlak Değerli İfadeler'
        ]
      },
      {
        id: 'tyt-mat-mutlak-denkle',
        name: 'Mutlak Değerli Denklemler',
        icon: '⚖️',
        subtopics: [
          'Mutlak Değerli Denklemler',
          'Mutlak Değerli Eşitsizlikler',
          'Çözüm Kümesi Bulma'
        ]
      },
      {
        id: 'tyt-mat-uslu',
        name: 'Üslü İfadeler ve Özellikleri',
        icon: '🔢',
        subtopics: [
          'Üslü Sayı Tanımı',
          'Üslü Sayı Özellikleri',
          'Negatif Üs',
          'Sıfır Üssü'
        ]
      },
      {
        id: 'tyt-mat-uslu-denkle',
        name: 'Üslü İfade İçeren Denklemler',
        icon: '➗',
        subtopics: [
          'Üslü Denklemler',
          'Üslü Eşitsizlikler',
          'Taban-Üs İlişkisi'
        ]
      },
      {
        id: 'tyt-mat-koklu',
        name: 'Köklü İfadeler ve Özellikleri',
        icon: '√',
        subtopics: [
          'Karekök',
          'Küpkök',
          'Köklü Sayı Özellikleri',
          'Köklü Sayılarda İşlemler'
        ]
      },
      {
        id: 'tyt-mat-koklu-denkle',
        name: 'Köklü İfadeli Denklemler',
        icon: '√',
        subtopics: [
          'Köklü Denklemler',
          'Köklü Eşitsizlikler',
          'Köklü İfadelerde Sıralama'
        ]
      },
      {
        id: 'tyt-mat-oran-oranti',
        name: 'Oran-Orantı Kavramı',
        icon: '⚖️',
        subtopics: [
          'Oran Kavramı',
          'Orantı Kavramı',
          'Doğru Orantı',
          'Ters Orantı',
          'Bileşik Orantı'
        ]
      },
      {
        id: 'tyt-mat-oran-problem',
        name: 'Oran-Orantı Problemleri',
        icon: '📝',
        subtopics: [
          'Doğru Orantı Problemleri',
          'Ters Orantı Problemleri',
          'Bileşik Orantı Problemleri'
        ]
      },
      {
        id: 'tyt-mat-sayi-problem',
        name: 'Sayı Problemleri',
        icon: '🔢',
        subtopics: [
          'Sayı Problemleri',
          'Rakam Problemleri',
          'İki Basamaklı Sayılar'
        ]
      },
      {
        id: 'tyt-mat-kesir-problem',
        name: 'Kesir Problemleri',
        icon: '🍕',
        subtopics: [
          'Kesir Problemleri',
          'Parça-Bütün İlişkisi',
          'Kesirli İşlem Problemleri'
        ]
      },
      {
        id: 'tyt-mat-yas-problem',
        name: 'Yaş Problemleri',
        icon: '👨‍👩‍👦',
        subtopics: [
          'Yaş Problemleri',
          'Geçmiş-Bugün-Gelecek',
          'Yaş Farkı Problemleri'
        ]
      },
      {
        id: 'tyt-mat-isci-problem',
        name: 'İşçi Problemleri',
        icon: '👷',
        subtopics: [
          'İşçi Problemleri',
          'Havuz Problemleri',
          'Birlikte Çalışma'
        ]
      },
      {
        id: 'tyt-mat-yuzde-problem',
        name: 'Yüzde Problemleri',
        icon: '💯',
        subtopics: [
          'Yüzde Kavramı',
          'Yüzde Artış-Azalış',
          'Yüzde Problemleri'
        ]
      },
      {
        id: 'tyt-mat-kar-zarar',
        name: 'Kâr-Zarar Problemleri',
        icon: '💰',
        subtopics: [
          'Kâr Problemleri',
          'Zarar Problemleri',
          'İndirim Problemleri',
          'Kâr-Zarar Yüzdesi'
        ]
      },
      {
        id: 'tyt-mat-karisim',
        name: 'Karışım Problemleri',
        icon: '🧪',
        subtopics: [
          'Karışım Problemleri',
          'Karışım Oranları',
          'Karışım Yüzdeleri'
        ]
      },
      {
        id: 'tyt-mat-hareket',
        name: 'Hareket Problemleri',
        icon: '🏃',
        subtopics: [
          'Hız-Zaman-Yol',
          'Karşılıklı Hareket',
          'Aynı Yönde Hareket',
          'Nehir Problemleri'
        ]
      },
      {
        id: 'tyt-mat-rutin-olmayan',
        name: 'Rutin Olmayan Problemler',
        icon: '🧩',
        subtopics: [
          'Mantık Problemleri',
          'Zeka Soruları',
          'Kombinasyonel Problemler'
        ]
      },
      {
        id: 'tyt-mat-onermeler',
        name: 'Önermeler',
        icon: '🧠',
        subtopics: [
          'Önerme Kavramı',
          'Doğruluk Değeri',
          'Önerme Çeşitleri'
        ]
      },
      {
        id: 'tyt-mat-bilesik-onerme',
        name: 'Bileşik Önermeler',
        icon: '🔀',
        subtopics: [
          'VE Bağlacı',
          'VEYA Bağlacı',
          'DEĞİL Bağlacı',
          'Doğruluk Tablosu'
        ]
      },
      {
        id: 'tyt-mat-kosullu-onerme',
        name: 'Koşullu Önerme',
        icon: '🔗',
        subtopics: [
          'Koşullu Önerme',
          'İse Bağlacı',
          'Karşıt Ters Düz'
        ]
      },
      {
        id: 'tyt-mat-kosullu-cift',
        name: 'İki Yönlü Koşullu Önerme',
        icon: '🔗',
        subtopics: [
          'Ancak ve Ancak',
          'İki Yönlü Koşullu Önerme',
          'Denklik'
        ]
      },
      {
        id: 'tyt-mat-niceleyici',
        name: 'Niceleyiciler',
        icon: '∀',
        subtopics: [
          'Her Niceleyicisi',
          'Bazı Niceleyicisi',
          'Niceleyicilerin Değili'
        ]
      },
      {
        id: 'tyt-mat-tanim-aksiyom',
        name: 'Tanım, Aksiyom, Teorem ve İspat',
        icon: '📖',
        subtopics: [
          'Tanım',
          'Aksiyom',
          'Teorem',
          'İspat Yöntemleri'
        ]
      },
      {
        id: 'tyt-mat-kume-temel',
        name: 'Kümelerde Temel Kavramlar',
        icon: '⭕',
        subtopics: [
          'Küme Kavramı',
          'Küme Gösterimleri',
          'Eleman Sayısı',
          'Boş Küme',
          'Evrensel Küme'
        ]
      },
      {
        id: 'tyt-mat-alt-kume',
        name: 'Alt Küme',
        icon: '⊂',
        subtopics: [
          'Alt Küme Kavramı',
          'Alt Küme Sayısı',
          'Öz Alt Küme'
        ]
      },
      {
        id: 'tyt-mat-kesisim',
        name: 'Kümelerde Kesişim ve Birleşim',
        icon: '∩',
        subtopics: [
          'Kesişim İşlemi',
          'Birleşim İşlemi',
          'Kesişim-Birleşim Özellikleri'
        ]
      },
      {
        id: 'tyt-mat-fark-tumleme',
        name: 'Kümelerde Fark ve Tümleme',
        icon: '➗',
        subtopics: [
          'Fark İşlemi',
          'Tümleme İşlemi',
          'De Morgan Kuralları'
        ]
      },
      {
        id: 'tyt-mat-kume-problem',
        name: 'Küme Problemleri',
        icon: '📝',
        subtopics: [
          'Küme Problemleri',
          'Venn Şeması',
          'Kesişim-Birleşim Problemleri'
        ]
      },
      {
        id: 'tyt-mat-kartezyen',
        name: 'Kartezyen Çarpım',
        icon: '📍',
        subtopics: [
          'Sıralı İkili',
          'Kartezyen Çarpım',
          'Kartezyen Çarpımın Özellikleri'
        ]
      },
      {
        id: 'tyt-mat-sayma',
        name: 'Saymanın Temel İlkesi',
        icon: '🔢',
        subtopics: [
          'Toplama Yoluyla Sayma',
          'Çarpma Yoluyla Sayma',
          'Sayma Problemleri'
        ]
      },
      {
        id: 'tyt-mat-faktoriyel',
        name: 'Faktöriyel Kavramı',
        icon: '❕',
        subtopics: [
          'Faktöriyel Tanımı',
          'Faktöriyel Hesaplama',
          'Faktöriyelli İfadeler'
        ]
      },
      {
        id: 'tyt-mat-permutasyon',
        name: 'Permütasyon',
        icon: '🎲',
        subtopics: [
          'Permütasyon Kavramı',
          'Permütasyon Hesaplama',
          'Diziliş Problemleri'
        ]
      },
      {
        id: 'tyt-mat-tekrarli-permutasyon',
        name: 'Tekrarlı Permütasyon',
        icon: '🔁',
        subtopics: [
          'Tekrarlı Permütasyon',
          'Özdeş Nesnelerin Dizilişi'
        ]
      },
      {
        id: 'tyt-mat-kombinasyon',
        name: 'Kombinasyon Kavramı',
        icon: '🔢',
        subtopics: [
          'Kombinasyon Tanımı',
          'Kombinasyon Özellikleri',
          'C(n,r) Hesaplama'
        ]
      },
      {
        id: 'tyt-mat-kombinasyon-problem',
        name: 'Kombinasyon Problemleri',
        icon: '📝',
        subtopics: [
          'Seçim Problemleri',
          'Grup Oluşturma',
          'Komisyon Problemleri'
        ]
      },
      {
        id: 'tyt-mat-kombinasyon-geometri',
        name: 'Kombinasyon ve Geometri',
        icon: '📐',
        subtopics: [
          'Doğru Üzerinde Noktalar',
          'Çember Üzerinde Noktalar',
          'Çokgen Köşegenleri'
        ]
      },
      {
        id: 'tyt-mat-binom',
        name: 'Binom Açılımı',
        icon: '🔢',
        subtopics: [
          'Binom Açılımı',
          'Pascal Üçgeni',
          'Binom Katsayıları'
        ]
      },
      {
        id: 'tyt-mat-olasilik-temel',
        name: 'Olasılıkta Temel Kavramlar',
        icon: '🎯',
        subtopics: [
          'Olasılık Kavramı',
          'Örnek Uzay',
          'Olay Çeşitleri'
        ]
      },
      {
        id: 'tyt-mat-basit-olay',
        name: 'Basit Olayların Olasılıkları',
        icon: '🎲',
        subtopics: [
          'Basit Olay Olasılığı',
          'Eşit Olasılıklı Olaylar',
          'Olasılık Hesaplama'
        ]
      },
      {
        id: 'tyt-mat-fonksiyon-kavram',
        name: 'Fonksiyon Kavramı ve Gösterimi',
        icon: '📈',
        subtopics: [
          'Fonksiyon Tanımı',
          'Fonksiyon Gösterimi',
          'Tanım ve Değer Kümesi'
        ]
      },
      {
        id: 'tyt-mat-fonksiyon-sorular',
        name: 'Fonksiyon Soruları Çözüm Teknikleri',
        icon: '📝',
        subtopics: [
          'Fonksiyon Değeri Bulma',
          'Fonksiyon Grafiği Okuma',
          'Fonksiyon Soru Tipleri'
        ]
      },
      {
        id: 'tyt-mat-ic-or-ten',
        name: 'İçine, Örten, Birebir ve Eşit Fonksiyonlar',
        icon: '📈',
        subtopics: [
          'İçine Fonksiyon',
          'Örten Fonksiyon',
          'Birebir Fonksiyon',
          'Eşit Fonksiyon'
        ]
      },
      {
        id: 'tyt-mat-birim-sabit',
        name: 'Birim ve Sabit Fonksiyon',
        icon: '📈',
        subtopics: [
          'Birim Fonksiyon',
          'Sabit Fonksiyon',
          'Özellikleri'
        ]
      },
      {
        id: 'tyt-mat-dogrusal-parcali',
        name: 'Doğrusal ve Parçalı Fonksiyon',
        icon: '📈',
        subtopics: [
          'Doğrusal Fonksiyon',
          'Parçalı Fonksiyon',
          'Grafik Çizimi'
        ]
      },
      {
        id: 'tyt-mat-cift-tek',
        name: 'Çift ve Tek Fonksiyon',
        icon: '📉',
        subtopics: [
          'Çift Fonksiyon',
          'Tek Fonksiyon',
          'Simetri Özellikleri'
        ]
      },
      {
        id: 'tyt-mat-dort-islem',
        name: 'Fonksiyonlarda Dört İşlem',
        icon: '➕',
        subtopics: [
          'Fonksiyonlarda Toplama',
          'Fonksiyonlarda Çıkarma',
          'Fonksiyonlarda Çarpma',
          'Fonksiyonlarda Bölme'
        ]
      },
      {
        id: 'tyt-mat-grafik-cizme',
        name: 'Fonksiyon Grafiklerini Çizme',
        icon: '📊',
        subtopics: [
          'Grafik Çizme',
          'Eksen Kesişimleri',
          'Grafik Dönüşümleri'
        ]
      },
      {
        id: 'tyt-mat-bileske',
        name: 'İki Fonksiyonun Bileşkesi',
        icon: '🔀',
        subtopics: [
          'Bileşke Fonksiyon',
          'Bileşke Özellikleri',
          'Bileşke Hesaplama'
        ]
      },
      {
        id: 'tyt-mat-ters-fonksiyon',
        name: 'Bir Fonksiyonun Tersi',
        icon: '🔄',
        subtopics: [
          'Ters Fonksiyon',
          'Ters Fonksiyon Bulma',
          'Ters Fonksiyon Özellikleri'
        ]
      },
      {
        id: 'tyt-mat-grafik-uygulama',
        name: 'Fonksiyon Grafikleri ile Uygulamalar',
        icon: '📊',
        subtopics: [
          'Grafik Okuma',
          'Grafik Yorumlama',
          'Uygulama Problemleri'
        ]
      },
      {
        id: 'tyt-mat-polinom-kavram',
        name: 'Polinom Kavramı',
        icon: '📊',
        subtopics: [
          'Polinom Tanımı',
          'Polinom Derecesi',
          'Polinom Katsayıları',
          'Sabit Polinom',
          'Sıfır Polinomu'
        ]
      },
      {
        id: 'tyt-mat-polinom-islem',
        name: 'Polinomlarda Toplama, Çıkarma ve Çarpma',
        icon: '➕',
        subtopics: [
          'Polinomlarda Toplama',
          'Polinomlarda Çıkarma',
          'Polinomlarda Çarpma'
        ]
      },
      {
        id: 'tyt-mat-polinom-bolme',
        name: 'Polinomlarda Bölme İşlemi',
        icon: '➗',
        subtopics: [
          'Polinom Bölme',
          'Bölme Algoritması',
          'Bölüm ve Kalan'
        ]
      },
      {
        id: 'tyt-mat-polinom-kalan',
        name: 'Polinomlarda Kalan Bulma',
        icon: '➗',
        subtopics: [
          'Kalan Teoremi',
          'Çarpan Teoremi',
          'Kalan Bulma Yöntemleri'
        ]
      },
      {
        id: 'tyt-mat-carpan-ortak',
        name: 'Ortak Çarpan Parantezine Alma',
        icon: '🔢',
        subtopics: [
          'Ortak Çarpan',
          'Paranteze Alma',
          'Gruplandırma'
        ]
      },
      {
        id: 'tyt-mat-ozdeslik',
        name: 'Tam Kare ve İki Kare Farkı',
        icon: '🧮',
        subtopics: [
          'Tam Kare Özdeşliği',
          'İki Kare Farkı',
          'Özdeşlik Uygulamaları'
        ]
      },
      {
        id: 'tyt-mat-kup-ozdeslik',
        name: 'Tam Küp, İki Küp Farkı ve Toplamı',
        icon: '🧮',
        subtopics: [
          'Tam Küp Özdeşliği',
          'İki Küp Farkı',
          'İki Küp Toplamı'
        ]
      },
      {
        id: 'tyt-mat-uc-terimli',
        name: 'Üç Terimli İfadelerin Çarpanlara Ayrılması',
        icon: '🧮',
        subtopics: [
          'ax²+bx+c Çarpanlara Ayırma',
          'Çarpanlara Ayırma Yöntemleri'
        ]
      },
      {
        id: 'tyt-mat-rasyonel-sadeles',
        name: 'Rasyonel İfadelerin Sadeleştirilmesi',
        icon: '🧮',
        subtopics: [
          'Rasyonel İfadeler',
          'Sadeleştirme',
          'Payda Eşitleme'
        ]
      },
      {
        id: 'tyt-mat-ikinci-denklem',
        name: 'İkinci Dereceden Denklemler',
        icon: '➗',
        subtopics: [
          'İkinci Dereceden Denklem',
          'ax²+bx+c=0',
          'Çözüm Yöntemleri'
        ]
      },
      {
        id: 'tyt-mat-ikinci-cozum',
        name: 'İkinci Dereceden Denklemlerin Çözüm Kümesi',
        icon: '➗',
        subtopics: [
          'Çarpanlara Ayırma ile Çözüm',
          'Kareye Tamamlama',
          'Formül ile Çözüm'
        ]
      },
      {
        id: 'tyt-mat-diskriminant',
        name: 'Diskriminant Kavramı',
        icon: '🧮',
        subtopics: [
          'Diskriminant (Δ)',
          'Δ>0 Durumu',
          'Δ=0 Durumu',
          'Δ<0 Durumu'
        ]
      },
      {
        id: 'tyt-mat-karmasik-sayi',
        name: 'Karmaşık Sayılar',
        icon: 'ℹ️',
        subtopics: [
          'Karmaşık Sayı Tanımı',
          'i Sayısı',
          'Karmaşık Sayılarda İşlemler'
        ]
      },
      {
        id: 'tyt-mat-kok-katsayi',
        name: 'Kök-Katsayı İlişkisi',
        icon: '➗',
        subtopics: [
          'Kökler Toplamı',
          'Kökler Çarpımı',
          'Kök-Katsayı Formülleri'
        ]
      },
      {
        id: 'tyt-mat-veri',
        name: 'Veri',
        icon: '📊',
        subtopics: [
          'Veri Toplama',
          'Veri Düzenleme',
          'Veri Analizi'
        ]
      },
      {
        id: 'tyt-mat-merkezi-yayilim',
        name: 'Merkezi Yayılım Ölçüleri',
        icon: '📊',
        subtopics: [
          'Aritmetik Ortalama',
          'Medyan',
          'Mod',
          'Açıklık',
          'Standart Sapma'
        ]
      },
      {
        id: 'tyt-mat-histogram',
        name: 'Histogram',
        icon: '📊',
        subtopics: [
          'Histogram Oluşturma',
          'Sınıf Aralıkları',
          'Frekans Tablosu'
        ]
      },
      {
        id: 'tyt-mat-grafik-cesit',
        name: 'Grafik Çeşitleri',
        icon: '📈',
        subtopics: [
          'Sütun Grafiği',
          'Çizgi Grafiği',
          'Daire Grafiği'
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
        id: 'tyt-turk-sozcuk1',
        name: 'Sözcükte Anlam 1',
        icon: '📖',
        subtopics: [
          'Sözcükte Anlam 1 - Temel Kavramlar',
          'Sözcükte Anlam 1 - Örnek Sorular',
          'Sözcükte Anlam 1 - Test'
        ]
      },
      {
        id: 'tyt-turk-sozcuk2',
        name: 'Sözcükte Anlam 2',
        icon: '📖',
        subtopics: [
          'Sözcükte Anlam 2 - Temel Kavramlar',
          'Sözcükte Anlam 2 - Örnek Sorular',
          'Sözcükte Anlam 2 - Test'
        ]
      },
      {
        id: 'tyt-turk-sozcuk3',
        name: 'Sözcükte Anlam 3',
        icon: '📖',
        subtopics: [
          'Sözcükte Anlam 3 - Temel Kavramlar',
          'Sözcükte Anlam 3 - Örnek Sorular',
          'Sözcükte Anlam 3 - Test'
        ]
      },
      {
        id: 'tyt-turk-sozcuk4',
        name: 'Sözcükte Anlam 4',
        icon: '📖',
        subtopics: [
          'Sözcükte Anlam 4 - Temel Kavramlar',
          'Sözcükte Anlam 4 - Örnek Sorular',
          'Sözcükte Anlam 4 - Test'
        ]
      },
      {
        id: 'tyt-turk-cumle1',
        name: 'Cümlede Anlam 1',
        icon: '📝',
        subtopics: [
          'Cümlede Anlam 1 - Temel Kavramlar',
          'Cümlede Anlam 1 - Örnek Sorular',
          'Cümlede Anlam 1 - Test'
        ]
      },
      {
        id: 'tyt-turk-cumle2',
        name: 'Cümlede Anlam 2',
        icon: '📝',
        subtopics: [
          'Cümlede Anlam 2 - Temel Kavramlar',
          'Cümlede Anlam 2 - Örnek Sorular',
          'Cümlede Anlam 2 - Test'
        ]
      },
      {
        id: 'tyt-turk-cumle3',
        name: 'Cümlede Anlam 3',
        icon: '📝',
        subtopics: [
          'Cümlede Anlam 3 - Temel Kavramlar',
          'Cümlede Anlam 3 - Örnek Sorular',
          'Cümlede Anlam 3 - Test'
        ]
      },
      {
        id: 'tyt-turk-paragraf1',
        name: 'Paragrafta Anlam 1',
        icon: '📄',
        subtopics: [
          'Paragrafta Anlam 1 - Temel Kavramlar',
          'Paragrafta Anlam 1 - Örnek Sorular',
          'Paragrafta Anlam 1 - Test'
        ]
      },
      {
        id: 'tyt-turk-paragraf2',
        name: 'Paragrafta Anlam 2',
        icon: '📄',
        subtopics: [
          'Paragrafta Anlam 2 - Temel Kavramlar',
          'Paragrafta Anlam 2 - Örnek Sorular',
          'Paragrafta Anlam 2 - Test'
        ]
      },
      {
        id: 'tyt-turk-paragraf3',
        name: 'Paragrafta Anlam 3',
        icon: '📄',
        subtopics: [
          'Paragrafta Anlam 3 - Temel Kavramlar',
          'Paragrafta Anlam 3 - Örnek Sorular',
          'Paragrafta Anlam 3 - Test'
        ]
      },
      {
        id: 'tyt-turk-paragraf-yapi',
        name: 'Paragrafın Yapısı',
        icon: '📄',
        subtopics: [
          'Paragrafın Yapısı - Temel Kavramlar',
          'Paragrafın Yapısı - Örnek Sorular',
          'Paragrafın Yapısı - Test'
        ]
      },
      {
        id: 'tyt-turk-ses1',
        name: 'Ses Bilgisi 1',
        icon: '🔊',
        subtopics: [
          'Ses Bilgisi 1 - Temel Kavramlar',
          'Ses Bilgisi 1 - Örnek Sorular',
          'Ses Bilgisi 1 - Test'
        ]
      },
      {
        id: 'tyt-turk-ses2',
        name: 'Ses Bilgisi 2',
        icon: '🔊',
        subtopics: [
          'Ses Bilgisi 2 - Temel Kavramlar',
          'Ses Bilgisi 2 - Örnek Sorular',
          'Ses Bilgisi 2 - Test'
        ]
      },
      {
        id: 'tyt-turk-yazim1',
        name: 'Yazım Kuralları 1',
        icon: '✍️',
        subtopics: [
          'Yazım Kuralları 1 - Temel Kavramlar',
          'Yazım Kuralları 1 - Örnek Sorular',
          'Yazım Kuralları 1 - Test'
        ]
      },
      {
        id: 'tyt-turk-yazim2',
        name: 'Yazım Kuralları 2',
        icon: '✍️',
        subtopics: [
          'Yazım Kuralları 2 - Temel Kavramlar',
          'Yazım Kuralları 2 - Örnek Sorular',
          'Yazım Kuralları 2 - Test'
        ]
      },
      {
        id: 'tyt-turk-yazim3',
        name: 'Yazım Kuralları 3',
        icon: '✍️',
        subtopics: [
          'Yazım Kuralları 3 - Temel Kavramlar',
          'Yazım Kuralları 3 - Örnek Sorular',
          'Yazım Kuralları 3 - Test'
        ]
      },
      {
        id: 'tyt-turk-noktalama1',
        name: 'Noktalama İşaretleri 1',
        icon: '❗',
        subtopics: [
          'Noktalama İşaretleri 1 - Temel Kavramlar',
          'Noktalama İşaretleri 1 - Örnek Sorular',
          'Noktalama İşaretleri 1 - Test'
        ]
      },
      {
        id: 'tyt-turk-noktalama2',
        name: 'Noktalama İşaretleri 2',
        icon: '❗',
        subtopics: [
          'Noktalama İşaretleri 2 - Temel Kavramlar',
          'Noktalama İşaretleri 2 - Örnek Sorular',
          'Noktalama İşaretleri 2 - Test'
        ]
      },
      {
        id: 'tyt-turk-noktalama3',
        name: 'Noktalama İşaretleri 3',
        icon: '❗',
        subtopics: [
          'Noktalama İşaretleri 3 - Temel Kavramlar',
          'Noktalama İşaretleri 3 - Örnek Sorular',
          'Noktalama İşaretleri 3 - Test'
        ]
      },
      {
        id: 'tyt-turk-bicim1',
        name: 'Biçim Bilgisi 1',
        icon: '🔤',
        subtopics: [
          'Biçim Bilgisi 1 - Temel Kavramlar',
          'Biçim Bilgisi 1 - Örnek Sorular',
          'Biçim Bilgisi 1 - Test'
        ]
      },
      {
        id: 'tyt-turk-bicim2',
        name: 'Biçim Bilgisi 2',
        icon: '🔤',
        subtopics: [
          'Biçim Bilgisi 2 - Temel Kavramlar',
          'Biçim Bilgisi 2 - Örnek Sorular',
          'Biçim Bilgisi 2 - Test'
        ]
      },
      {
        id: 'tyt-turk-isim',
        name: 'İsim',
        icon: '🔤',
        subtopics: [
          'İsim - Temel Kavramlar',
          'İsim - Örnek Sorular',
          'İsim - Test'
        ]
      },
      {
        id: 'tyt-turk-sifat',
        name: 'Sıfat',
        icon: '🔤',
        subtopics: [
          'Sıfat - Temel Kavramlar',
          'Sıfat - Örnek Sorular',
          'Sıfat - Test'
        ]
      },
      {
        id: 'tyt-turk-zamir',
        name: 'Zamir',
        icon: '🔤',
        subtopics: [
          'Zamir - Temel Kavramlar',
          'Zamir - Örnek Sorular',
          'Zamir - Test'
        ]
      },
      {
        id: 'tyt-turk-tamlama',
        name: 'İsim ve Sıfat Tamlamaları',
        icon: '🔤',
        subtopics: [
          'İsim ve Sıfat Tamlamaları - Temel Kavramlar',
          'İsim ve Sıfat Tamlamaları - Örnek Sorular',
          'İsim ve Sıfat Tamlamaları - Test'
        ]
      },
      {
        id: 'tyt-turk-zarf',
        name: 'Zarf',
        icon: '🔤',
        subtopics: [
          'Zarf - Temel Kavramlar',
          'Zarf - Örnek Sorular',
          'Zarf - Test'
        ]
      },
      {
        id: 'tyt-turk-edat-baglac',
        name: 'Edat, Bağlaç, Ünlem',
        icon: '🔗',
        subtopics: [
          'Edat, Bağlaç, Ünlem - Temel Kavramlar',
          'Edat, Bağlaç, Ünlem - Örnek Sorular',
          'Edat, Bağlaç, Ünlem - Test'
        ]
      },
      {
        id: 'tyt-turk-fiil-kip',
        name: 'Fiilde Kip',
        icon: '⏰',
        subtopics: [
          'Fiilde Kip - Temel Kavramlar',
          'Fiilde Kip - Örnek Sorular',
          'Fiilde Kip - Test'
        ]
      },
      {
        id: 'tyt-turk-ekfiil',
        name: 'Ek-Fiil',
        icon: '🔗',
        subtopics: [
          'Ek-Fiil - Temel Kavramlar',
          'Ek-Fiil - Örnek Sorular',
          'Ek-Fiil - Test'
        ]
      },
      {
        id: 'tyt-turk-fiil-yapi',
        name: 'Fiilde Yapı',
        icon: '🔤',
        subtopics: [
          'Fiilde Yapı - Temel Kavramlar',
          'Fiilde Yapı - Örnek Sorular',
          'Fiilde Yapı - Test'
        ]
      },
      {
        id: 'tyt-turk-fiilimsi',
        name: 'Fiilimsiler',
        icon: '🔤',
        subtopics: [
          'Fiilimsiler - Temel Kavramlar',
          'Fiilimsiler - Örnek Sorular',
          'Fiilimsiler - Test'
        ]
      },
      {
        id: 'tyt-turk-fiil-cati',
        name: 'Fiilde Çatı',
        icon: '🔤',
        subtopics: [
          'Fiilde Çatı - Temel Kavramlar',
          'Fiilde Çatı - Örnek Sorular',
          'Fiilde Çatı - Test'
        ]
      },
      {
        id: 'tyt-turk-ogeler',
        name: 'Cümlenin Ögeleri',
        icon: '📝',
        subtopics: [
          'Cümlenin Ögeleri - Temel Kavramlar',
          'Cümlenin Ögeleri - Örnek Sorular',
          'Cümlenin Ögeleri - Test'
        ]
      },
      {
        id: 'tyt-turk-cumle-turleri',
        name: 'Cümle Türleri',
        icon: '📝',
        subtopics: [
          'Cümle Türleri - Temel Kavramlar',
          'Cümle Türleri - Örnek Sorular',
          'Cümle Türleri - Test'
        ]
      },
      {
        id: 'tyt-turk-anlatim-boz1',
        name: 'Anlatım Bozuklukları 1',
        icon: '❌',
        subtopics: [
          'Anlatım Bozuklukları 1 - Temel Kavramlar',
          'Anlatım Bozuklukları 1 - Örnek Sorular',
          'Anlatım Bozuklukları 1 - Test'
        ]
      },
      {
        id: 'tyt-turk-anlatim-boz2',
        name: 'Anlatım Bozuklukları 2',
        icon: '❌',
        subtopics: [
          'Anlatım Bozuklukları 2 - Temel Kavramlar',
          'Anlatım Bozuklukları 2 - Örnek Sorular',
          'Anlatım Bozuklukları 2 - Test'
        ]
      }
    ],
    Fizik: [
      {
        id: 'tyt-fiz-bilimine-giris',
        name: 'Fizik Bilimine Giriş',
        icon: '🔬',
        subtopics: [
          'Fizik Bilimine Giriş - Temel Kavramlar',
          'Fizik Bilimine Giriş - Örnek Sorular',
          'Fizik Bilimine Giriş - Test'
        ]
      },
      {
        id: 'tyt-fiz-alt-dallar',
        name: 'Fizik Bilimi ve Alt Dalları',
        icon: '🔬',
        subtopics: [
          'Fizik Bilimi ve Alt Dalları - Temel Kavramlar',
          'Fizik Bilimi ve Alt Dalları - Örnek Sorular',
          'Fizik Bilimi ve Alt Dalları - Test'
        ]
      },
      {
        id: 'tyt-fiz-nicelik',
        name: 'Fiziksel Niceliklerin Sınıflandırılması',
        icon: '📏',
        subtopics: [
          'Fiziksel Niceliklerin Sınıflandırılması - Temel Kavramlar',
          'Fiziksel Niceliklerin Sınıflandırılması - Örnek Sorular',
          'Fiziksel Niceliklerin Sınıflandırılması - Test'
        ]
      },
      {
        id: 'tyt-fiz-arastirma',
        name: 'Bilim Araştırma Merkezleri',
        icon: '🔬',
        subtopics: [
          'Bilim Araştırma Merkezleri - Temel Kavramlar',
          'Bilim Araştırma Merkezleri - Örnek Sorular',
          'Bilim Araştırma Merkezleri - Test'
        ]
      },
      {
        id: 'tyt-fiz-madde-kutle',
        name: 'Madde ve Kütle',
        icon: '⚖️',
        subtopics: [
          'Madde ve Kütle - Temel Kavramlar',
          'Madde ve Kütle - Örnek Sorular',
          'Madde ve Kütle - Test'
        ]
      },
      {
        id: 'tyt-fiz-hacim',
        name: 'Hacim ve Hacim Ölçümü',
        icon: '📦',
        subtopics: [
          'Hacim ve Hacim Ölçümü - Temel Kavramlar',
          'Hacim ve Hacim Ölçümü - Örnek Sorular',
          'Hacim ve Hacim Ölçümü - Test'
        ]
      },
      {
        id: 'tyt-fiz-ozkutle',
        name: 'Özkütle ve Karışımların Özkütlesi',
        icon: '⚖️',
        subtopics: [
          'Özkütle ve Karışımların Özkütlesi - Temel Kavramlar',
          'Özkütle ve Karışımların Özkütlesi - Örnek Sorular',
          'Özkütle ve Karışımların Özkütlesi - Test'
        ]
      },
      {
        id: 'tyt-fiz-dayaniklilik',
        name: 'Dayanıklılık ve Kare-Küp Kanunu',
        icon: '🏗️',
        subtopics: [
          'Dayanıklılık ve Kare-Küp Kanunu - Temel Kavramlar',
          'Dayanıklılık ve Kare-Küp Kanunu - Örnek Sorular',
          'Dayanıklılık ve Kare-Küp Kanunu - Test'
        ]
      },
      {
        id: 'tyt-fiz-adezyon',
        name: 'Adezyon, Kohezyon, Yüzey Gerilimi',
        icon: '💧',
        subtopics: [
          'Adezyon, Kohezyon, Yüzey Gerilimi - Temel Kavramlar',
          'Adezyon, Kohezyon, Yüzey Gerilimi - Örnek Sorular',
          'Adezyon, Kohezyon, Yüzey Gerilimi - Test'
        ]
      },
      {
        id: 'tyt-fiz-hareket-kavram',
        name: 'Hareket Kavramları',
        icon: '🏃',
        subtopics: [
          'Hareket Kavramları - Temel Kavramlar',
          'Hareket Kavramları - Örnek Sorular',
          'Hareket Kavramları - Test'
        ]
      },
      {
        id: 'tyt-fiz-dogrusal-hareket',
        name: 'Düzgün Doğrusal Hareket',
        icon: '➡️',
        subtopics: [
          'Düzgün Doğrusal Hareket - Temel Kavramlar',
          'Düzgün Doğrusal Hareket - Örnek Sorular',
          'Düzgün Doğrusal Hareket - Test'
        ]
      },
      {
        id: 'tyt-fiz-ivme',
        name: 'İvme Kavramı ve İvmeli Hareket',
        icon: '📈',
        subtopics: [
          'İvme Kavramı ve İvmeli Hareket - Temel Kavramlar',
          'İvme Kavramı ve İvmeli Hareket - Örnek Sorular',
          'İvme Kavramı ve İvmeli Hareket - Test'
        ]
      },
      {
        id: 'tyt-fiz-kuvvet',
        name: 'Kuvvet Kavramı ve Temel Kuvvetler',
        icon: '💪',
        subtopics: [
          'Kuvvet Kavramı ve Temel Kuvvetler - Temel Kavramlar',
          'Kuvvet Kavramı ve Temel Kuvvetler - Örnek Sorular',
          'Kuvvet Kavramı ve Temel Kuvvetler - Test'
        ]
      },
      {
        id: 'tyt-fiz-newton',
        name: 'Newton\'ın Hareket Yasaları',
        icon: '🍎',
        subtopics: [
          'Newton\'ın Hareket Yasaları - Temel Kavramlar',
          'Newton\'ın Hareket Yasaları - Örnek Sorular',
          'Newton\'ın Hareket Yasaları - Test'
        ]
      },
      {
        id: 'tyt-fiz-surtunme',
        name: 'Sürtünme Kuvveti',
        icon: '🛑',
        subtopics: [
          'Sürtünme Kuvveti - Temel Kavramlar',
          'Sürtünme Kuvveti - Örnek Sorular',
          'Sürtünme Kuvveti - Test'
        ]
      },
      {
        id: 'tyt-fiz-is-enerji-guc',
        name: 'İş, Enerji ve Güç Kavramları',
        icon: '⚡',
        subtopics: [
          'İş, Enerji ve Güç Kavramları - Temel Kavramlar',
          'İş, Enerji ve Güç Kavramları - Örnek Sorular',
          'İş, Enerji ve Güç Kavramları - Test'
        ]
      },
      {
        id: 'tyt-fiz-kinetik-potansiyel',
        name: 'Kinetik ve Potansiyel Enerji',
        icon: '⚡',
        subtopics: [
          'Kinetik ve Potansiyel Enerji - Temel Kavramlar',
          'Kinetik ve Potansiyel Enerji - Örnek Sorular',
          'Kinetik ve Potansiyel Enerji - Test'
        ]
      },
      {
        id: 'tyt-fiz-mekanik-enerji',
        name: 'Mekanik Enerji ve Enerji Korunumu',
        icon: '⚡',
        subtopics: [
          'Mekanik Enerji ve Enerji Korunumu - Temel Kavramlar',
          'Mekanik Enerji ve Enerji Korunumu - Örnek Sorular',
          'Mekanik Enerji ve Enerji Korunumu - Test'
        ]
      },
      {
        id: 'tyt-fiz-verim',
        name: 'Verim ve Enerji Kaynakları',
        icon: '🔋',
        subtopics: [
          'Verim ve Enerji Kaynakları - Temel Kavramlar',
          'Verim ve Enerji Kaynakları - Örnek Sorular',
          'Verim ve Enerji Kaynakları - Test'
        ]
      },
      {
        id: 'tyt-fiz-isi-sicaklik',
        name: 'Isı, Sıcaklık ve İç Enerji',
        icon: '🌡️',
        subtopics: [
          'Isı, Sıcaklık ve İç Enerji - Temel Kavramlar',
          'Isı, Sıcaklık ve İç Enerji - Örnek Sorular',
          'Isı, Sıcaklık ve İç Enerji - Test'
        ]
      },
      {
        id: 'tyt-fiz-termometre',
        name: 'Termometreler ve Sıcaklık Birimleri',
        icon: '🌡️',
        subtopics: [
          'Termometreler ve Sıcaklık Birimleri - Temel Kavramlar',
          'Termometreler ve Sıcaklık Birimleri - Örnek Sorular',
          'Termometreler ve Sıcaklık Birimleri - Test'
        ]
      },
      {
        id: 'tyt-fiz-oz-isi',
        name: 'Öz Isı ve Isı Sığası',
        icon: '🌡️',
        subtopics: [
          'Öz Isı ve Isı Sığası - Temel Kavramlar',
          'Öz Isı ve Isı Sığası - Örnek Sorular',
          'Öz Isı ve Isı Sığası - Test'
        ]
      },
      {
        id: 'tyt-fiz-hal-degisimi',
        name: 'Hâl Değişimi ve Hâl Değiştirme Isısı',
        icon: '❄️',
        subtopics: [
          'Hâl Değişimi ve Hâl Değiştirme Isısı - Temel Kavramlar',
          'Hâl Değişimi ve Hâl Değiştirme Isısı - Örnek Sorular',
          'Hâl Değişimi ve Hâl Değiştirme Isısı - Test'
        ]
      },
      {
        id: 'tyt-fiz-isil-denge',
        name: 'Isıl Denge ve Denge Sıcaklığı',
        icon: '⚖️',
        subtopics: [
          'Isıl Denge ve Denge Sıcaklığı - Temel Kavramlar',
          'Isıl Denge ve Denge Sıcaklığı - Örnek Sorular',
          'Isıl Denge ve Denge Sıcaklığı - Test'
        ]
      },
      {
        id: 'tyt-fiz-enerji-yayilma',
        name: 'Enerji Yayılma Yolları',
        icon: '🔥',
        subtopics: [
          'Enerji Yayılma Yolları - Temel Kavramlar',
          'Enerji Yayılma Yolları - Örnek Sorular',
          'Enerji Yayılma Yolları - Test'
        ]
      },
      {
        id: 'tyt-fiz-genlesme',
        name: 'Genleşme ve Büzülme',
        icon: '📏',
        subtopics: [
          'Genleşme ve Büzülme - Temel Kavramlar',
          'Genleşme ve Büzülme - Örnek Sorular',
          'Genleşme ve Büzülme - Test'
        ]
      },
      {
        id: 'tyt-fiz-elektrik-yuk',
        name: 'Elektrik Yükleri ve Yüklenme',
        icon: '⚡',
        subtopics: [
          'Elektrik Yükleri ve Yüklenme - Temel Kavramlar',
          'Elektrik Yükleri ve Yüklenme - Örnek Sorular',
          'Elektrik Yükleri ve Yüklenme - Test'
        ]
      },
      {
        id: 'tyt-fiz-iletken-yalitkan',
        name: 'İletken ve Yalıtkanlarda Yük Dağılımı',
        icon: '⚡',
        subtopics: [
          'İletken ve Yalıtkanlarda Yük Dağılımı - Temel Kavramlar',
          'İletken ve Yalıtkanlarda Yük Dağılımı - Örnek Sorular',
          'İletken ve Yalıtkanlarda Yük Dağılımı - Test'
        ]
      },
      {
        id: 'tyt-fiz-coulomb',
        name: 'Coulomb Kanunu ve Elektrik Alan',
        icon: '⚡',
        subtopics: [
          'Coulomb Kanunu ve Elektrik Alan - Temel Kavramlar',
          'Coulomb Kanunu ve Elektrik Alan - Örnek Sorular',
          'Coulomb Kanunu ve Elektrik Alan - Test'
        ]
      },
      {
        id: 'tyt-fiz-akim',
        name: 'Elektrik Akımı, Potansiyel Farkı ve Direnç',
        icon: '⚡',
        subtopics: [
          'Elektrik Akımı, Potansiyel Farkı ve Direnç - Temel Kavramlar',
          'Elektrik Akımı, Potansiyel Farkı ve Direnç - Örnek Sorular',
          'Elektrik Akımı, Potansiyel Farkı ve Direnç - Test'
        ]
      },
      {
        id: 'tyt-fiz-ohm',
        name: 'Ohm Yasası ve Dirençlerin Bağlanması',
        icon: '⚡',
        subtopics: [
          'Ohm Yasası ve Dirençlerin Bağlanması - Temel Kavramlar',
          'Ohm Yasası ve Dirençlerin Bağlanması - Örnek Sorular',
          'Ohm Yasası ve Dirençlerin Bağlanması - Test'
        ]
      },
      {
        id: 'tyt-fiz-uretecler',
        name: 'Üreteçler ve Bağlanması',
        icon: '🔋',
        subtopics: [
          'Üreteçler ve Bağlanması - Temel Kavramlar',
          'Üreteçler ve Bağlanması - Örnek Sorular',
          'Üreteçler ve Bağlanması - Test'
        ]
      },
      {
        id: 'tyt-fiz-elektrik-guc',
        name: 'Elektriksel Güç ve Lamba Parlaklıkları',
        icon: '💡',
        subtopics: [
          'Elektriksel Güç ve Lamba Parlaklıkları - Temel Kavramlar',
          'Elektriksel Güç ve Lamba Parlaklıkları - Örnek Sorular',
          'Elektriksel Güç ve Lamba Parlaklıkları - Test'
        ]
      },
      {
        id: 'tyt-fiz-miknatis',
        name: 'Mıknatıs ve Manyetik Alan',
        icon: '🧲',
        subtopics: [
          'Mıknatıs ve Manyetik Alan - Temel Kavramlar',
          'Mıknatıs ve Manyetik Alan - Örnek Sorular',
          'Mıknatıs ve Manyetik Alan - Test'
        ]
      },
      {
        id: 'tyt-fiz-elektromiknatis',
        name: 'Akım Geçen İletkenin Manyetik Alanı',
        icon: '🧲',
        subtopics: [
          'Akım Geçen İletkenin Manyetik Alanı - Temel Kavramlar',
          'Akım Geçen İletkenin Manyetik Alanı - Örnek Sorular',
          'Akım Geçen İletkenin Manyetik Alanı - Test'
        ]
      },
      {
        id: 'tyt-fiz-kati-basinc',
        name: 'Katılarda Basınç',
        icon: '📦',
        subtopics: [
          'Katılarda Basınç - Temel Kavramlar',
          'Katılarda Basınç - Örnek Sorular',
          'Katılarda Basınç - Test'
        ]
      },
      {
        id: 'tyt-fiz-sivi-basinc',
        name: 'Durgun Sıvılarda Basınç ve Pascal',
        icon: '💧',
        subtopics: [
          'Durgun Sıvılarda Basınç ve Pascal - Temel Kavramlar',
          'Durgun Sıvılarda Basınç ve Pascal - Örnek Sorular',
          'Durgun Sıvılarda Basınç ve Pascal - Test'
        ]
      },
      {
        id: 'tyt-fiz-gaz-basinc',
        name: 'Gaz Basıncı ve Basınç Ölçen Aletler',
        icon: '🎈',
        subtopics: [
          'Gaz Basıncı ve Basınç Ölçen Aletler - Temel Kavramlar',
          'Gaz Basıncı ve Basınç Ölçen Aletler - Örnek Sorular',
          'Gaz Basıncı ve Basınç Ölçen Aletler - Test'
        ]
      },
      {
        id: 'tyt-fiz-akiskan-basinc',
        name: 'Akışkan Basıncı (Bernoulli İlkesi)',
        icon: '💨',
        subtopics: [
          'Akışkan Basıncı (Bernoulli İlkesi) - Temel Kavramlar',
          'Akışkan Basıncı (Bernoulli İlkesi) - Örnek Sorular',
          'Akışkan Basıncı (Bernoulli İlkesi) - Test'
        ]
      },
      {
        id: 'tyt-fiz-kaldirma',
        name: 'Sıvıların ve Gazların Kaldırma Kuvveti',
        icon: '🚢',
        subtopics: [
          'Sıvıların ve Gazların Kaldırma Kuvveti - Temel Kavramlar',
          'Sıvıların ve Gazların Kaldırma Kuvveti - Örnek Sorular',
          'Sıvıların ve Gazların Kaldırma Kuvveti - Test'
        ]
      },
      {
        id: 'tyt-fiz-dalga-temel',
        name: 'Dalgalarda Temel Kavramlar',
        icon: '🌊',
        subtopics: [
          'Dalgalarda Temel Kavramlar - Temel Kavramlar',
          'Dalgalarda Temel Kavramlar - Örnek Sorular',
          'Dalgalarda Temel Kavramlar - Test'
        ]
      },
      {
        id: 'tyt-fiz-yay-dalga',
        name: 'Yay Dalgaları',
        icon: '〰️',
        subtopics: [
          'Yay Dalgaları - Temel Kavramlar',
          'Yay Dalgaları - Örnek Sorular',
          'Yay Dalgaları - Test'
        ]
      },
      {
        id: 'tyt-fiz-su-dalga',
        name: 'Su Dalgaları',
        icon: '🌊',
        subtopics: [
          'Su Dalgaları - Temel Kavramlar',
          'Su Dalgaları - Örnek Sorular',
          'Su Dalgaları - Test'
        ]
      },
      {
        id: 'tyt-fiz-ses-dalga',
        name: 'Ses Dalgaları',
        icon: '🔊',
        subtopics: [
          'Ses Dalgaları - Temel Kavramlar',
          'Ses Dalgaları - Örnek Sorular',
          'Ses Dalgaları - Test'
        ]
      },
      {
        id: 'tyt-fiz-deprem-dalga',
        name: 'Deprem Dalgaları',
        icon: '🌋',
        subtopics: [
          'Deprem Dalgaları - Temel Kavramlar',
          'Deprem Dalgaları - Örnek Sorular',
          'Deprem Dalgaları - Test'
        ]
      },
      {
        id: 'tyt-fiz-isik-siddet',
        name: 'Işık Şiddeti ve Aydınlanma',
        icon: '💡',
        subtopics: [
          'Işık Şiddeti ve Aydınlanma - Temel Kavramlar',
          'Işık Şiddeti ve Aydınlanma - Örnek Sorular',
          'Işık Şiddeti ve Aydınlanma - Test'
        ]
      },
      {
        id: 'tyt-fiz-golge',
        name: 'Gölge ve Yarı Gölge',
        icon: '🌑',
        subtopics: [
          'Gölge ve Yarı Gölge - Temel Kavramlar',
          'Gölge ve Yarı Gölge - Örnek Sorular',
          'Gölge ve Yarı Gölge - Test'
        ]
      },
      {
        id: 'tyt-fiz-yansima',
        name: 'Işığın Yansıması ve Düzlem Aynalar',
        icon: '🪞',
        subtopics: [
          'Işığın Yansıması ve Düzlem Aynalar - Temel Kavramlar',
          'Işığın Yansıması ve Düzlem Aynalar - Örnek Sorular',
          'Işığın Yansıması ve Düzlem Aynalar - Test'
        ]
      },
      {
        id: 'tyt-fiz-kuresel-ayna',
        name: 'Küresel Aynalar',
        icon: '🪞',
        subtopics: [
          'Küresel Aynalar - Temel Kavramlar',
          'Küresel Aynalar - Örnek Sorular',
          'Küresel Aynalar - Test'
        ]
      },
      {
        id: 'tyt-fiz-kirilma',
        name: 'Işığın Kırılması ve Tam Yansıma',
        icon: '💧',
        subtopics: [
          'Işığın Kırılması ve Tam Yansıma - Temel Kavramlar',
          'Işığın Kırılması ve Tam Yansıma - Örnek Sorular',
          'Işığın Kırılması ve Tam Yansıma - Test'
        ]
      },
      {
        id: 'tyt-fiz-mercek',
        name: 'Mercekler ve Görüntü Oluşumu',
        icon: '🔍',
        subtopics: [
          'Mercekler ve Görüntü Oluşumu - Temel Kavramlar',
          'Mercekler ve Görüntü Oluşumu - Örnek Sorular',
          'Mercekler ve Görüntü Oluşumu - Test'
        ]
      },
      {
        id: 'tyt-fiz-prizma-renk',
        name: 'Işık Prizmaları ve Renk',
        icon: '🌈',
        subtopics: [
          'Işık Prizmaları ve Renk - Temel Kavramlar',
          'Işık Prizmaları ve Renk - Örnek Sorular',
          'Işık Prizmaları ve Renk - Test'
        ]
      }
    ],
    Kimya: [
      {
        id: 'tyt-kim-simya',
        name: 'Simyadan Kimyaya',
        icon: '🧪',
        subtopics: [
          'Simyadan Kimyaya - Temel Kavramlar',
          'Simyadan Kimyaya - Örnek Sorular',
          'Simyadan Kimyaya - Test'
        ]
      },
      {
        id: 'tyt-kim-disiplin',
        name: 'Kimya Disiplinleri ve Çalışma Alanları',
        icon: '🧪',
        subtopics: [
          'Kimya Disiplinleri ve Çalışma Alanları - Temel Kavramlar',
          'Kimya Disiplinleri ve Çalışma Alanları - Örnek Sorular',
          'Kimya Disiplinleri ve Çalışma Alanları - Test'
        ]
      },
      {
        id: 'tyt-kim-sembolik',
        name: 'Kimyanın Sembolik Dili',
        icon: '🔤',
        subtopics: [
          'Kimyanın Sembolik Dili - Temel Kavramlar',
          'Kimyanın Sembolik Dili - Örnek Sorular',
          'Kimyanın Sembolik Dili - Test'
        ]
      },
      {
        id: 'tyt-kim-is-sagligi',
        name: 'İş Sağlığı ve Güvenliği',
        icon: '🦺',
        subtopics: [
          'İş Sağlığı ve Güvenliği - Temel Kavramlar',
          'İş Sağlığı ve Güvenliği - Örnek Sorular',
          'İş Sağlığı ve Güvenliği - Test'
        ]
      },
      {
        id: 'tyt-kim-atom-model',
        name: 'Atom Modelleri',
        icon: '⚛️',
        subtopics: [
          'Atom Modelleri - Temel Kavramlar',
          'Atom Modelleri - Örnek Sorular',
          'Atom Modelleri - Test'
        ]
      },
      {
        id: 'tyt-kim-atom-yapi',
        name: 'Atomun Yapısı',
        icon: '⚛️',
        subtopics: [
          'Atomun Yapısı - Temel Kavramlar',
          'Atomun Yapısı - Örnek Sorular',
          'Atomun Yapısı - Test'
        ]
      },
      {
        id: 'tyt-kim-periyodik',
        name: 'Periyodik Sistemde Yerleşim',
        icon: '📊',
        subtopics: [
          'Periyodik Sistemde Yerleşim - Temel Kavramlar',
          'Periyodik Sistemde Yerleşim - Örnek Sorular',
          'Periyodik Sistemde Yerleşim - Test'
        ]
      },
      {
        id: 'tyt-kim-element-sinif',
        name: 'Elementlerin Sınıflandırılması',
        icon: '⚛️',
        subtopics: [
          'Elementlerin Sınıflandırılması - Temel Kavramlar',
          'Elementlerin Sınıflandırılması - Örnek Sorular',
          'Elementlerin Sınıflandırılması - Test'
        ]
      },
      {
        id: 'tyt-kim-periyodik-ozellik',
        name: 'Periyodik Özellikler',
        icon: '📊',
        subtopics: [
          'Periyodik Özellikler - Temel Kavramlar',
          'Periyodik Özellikler - Örnek Sorular',
          'Periyodik Özellikler - Test'
        ]
      },
      {
        id: 'tyt-kim-tur-etkilesim',
        name: 'Kimyasal Türler Arası Etkileşimler',
        icon: '🔗',
        subtopics: [
          'Kimyasal Türler Arası Etkileşimler - Temel Kavramlar',
          'Kimyasal Türler Arası Etkileşimler - Örnek Sorular',
          'Kimyasal Türler Arası Etkileşimler - Test'
        ]
      },
      {
        id: 'tyt-kim-guclu-etkilesim',
        name: 'Güçlü Etkileşimler (Bağlar)',
        icon: '🔗',
        subtopics: [
          'Güçlü Etkileşimler (Bağlar) - Temel Kavramlar',
          'Güçlü Etkileşimler (Bağlar) - Örnek Sorular',
          'Güçlü Etkileşimler (Bağlar) - Test'
        ]
      },
      {
        id: 'tyt-kim-zayif-etkilesim',
        name: 'Zayıf Etkileşimler',
        icon: '🔗',
        subtopics: [
          'Zayıf Etkileşimler - Temel Kavramlar',
          'Zayıf Etkileşimler - Örnek Sorular',
          'Zayıf Etkileşimler - Test'
        ]
      },
      {
        id: 'tyt-kim-fiziksel-kimyasal',
        name: 'Fiziksel ve Kimyasal Değişimler',
        icon: '🔄',
        subtopics: [
          'Fiziksel ve Kimyasal Değişimler - Temel Kavramlar',
          'Fiziksel ve Kimyasal Değişimler - Örnek Sorular',
          'Fiziksel ve Kimyasal Değişimler - Test'
        ]
      },
      {
        id: 'tyt-kim-madde-hal',
        name: 'Maddenin Fiziksel Hâlleri',
        icon: '🧊',
        subtopics: [
          'Maddenin Fiziksel Hâlleri - Temel Kavramlar',
          'Maddenin Fiziksel Hâlleri - Örnek Sorular',
          'Maddenin Fiziksel Hâlleri - Test'
        ]
      },
      {
        id: 'tyt-kim-kati-sivi',
        name: 'Katılar ve Sıvılar',
        icon: '🧊',
        subtopics: [
          'Katılar ve Sıvılar - Temel Kavramlar',
          'Katılar ve Sıvılar - Örnek Sorular',
          'Katılar ve Sıvılar - Test'
        ]
      },
      {
        id: 'tyt-kim-gaz-plazma',
        name: 'Gazlar ve Plazma Hâli',
        icon: '🎈',
        subtopics: [
          'Gazlar ve Plazma Hâli - Temel Kavramlar',
          'Gazlar ve Plazma Hâli - Örnek Sorular',
          'Gazlar ve Plazma Hâli - Test'
        ]
      },
      {
        id: 'tyt-kim-su-hayat',
        name: 'Su ve Hayat',
        icon: '💧',
        subtopics: [
          'Su ve Hayat - Temel Kavramlar',
          'Su ve Hayat - Örnek Sorular',
          'Su ve Hayat - Test'
        ]
      },
      {
        id: 'tyt-kim-cevre',
        name: 'Çevre Kimyası',
        icon: '🌍',
        subtopics: [
          'Çevre Kimyası - Temel Kavramlar',
          'Çevre Kimyası - Örnek Sorular',
          'Çevre Kimyası - Test'
        ]
      },
      {
        id: 'tyt-kim-temel-kanun',
        name: 'Kimyanın Temel Kanunları',
        icon: '⚖️',
        subtopics: [
          'Kimyanın Temel Kanunları - Temel Kavramlar',
          'Kimyanın Temel Kanunları - Örnek Sorular',
          'Kimyanın Temel Kanunları - Test'
        ]
      },
      {
        id: 'tyt-kim-mol',
        name: 'Mol Kavramı',
        icon: '⚖️',
        subtopics: [
          'Mol Kavramı - Temel Kavramlar',
          'Mol Kavramı - Örnek Sorular',
          'Mol Kavramı - Test'
        ]
      },
      {
        id: 'tyt-kim-tepkimeler',
        name: 'Kimyasal Tepkimeler ve Denklemler',
        icon: '⚗️',
        subtopics: [
          'Kimyasal Tepkimeler ve Denklemler - Temel Kavramlar',
          'Kimyasal Tepkimeler ve Denklemler - Örnek Sorular',
          'Kimyasal Tepkimeler ve Denklemler - Test'
        ]
      },
      {
        id: 'tyt-kim-hesaplama',
        name: 'Kimyasal Tepkimelerde Hesaplamalar',
        icon: '🧮',
        subtopics: [
          'Kimyasal Tepkimelerde Hesaplamalar - Temel Kavramlar',
          'Kimyasal Tepkimelerde Hesaplamalar - Örnek Sorular',
          'Kimyasal Tepkimelerde Hesaplamalar - Test'
        ]
      },
      {
        id: 'tyt-kim-karisim',
        name: 'Homojen ve Heterojen Karışımlar',
        icon: '🧪',
        subtopics: [
          'Homojen ve Heterojen Karışımlar - Temel Kavramlar',
          'Homojen ve Heterojen Karışımlar - Örnek Sorular',
          'Homojen ve Heterojen Karışımlar - Test'
        ]
      },
      {
        id: 'tyt-kim-ayirma',
        name: 'Ayırma ve Saflaştırma Teknikleri',
        icon: '🔬',
        subtopics: [
          'Ayırma ve Saflaştırma Teknikleri - Temel Kavramlar',
          'Ayırma ve Saflaştırma Teknikleri - Örnek Sorular',
          'Ayırma ve Saflaştırma Teknikleri - Test'
        ]
      },
      {
        id: 'tyt-kim-asit-baz-ozellik',
        name: 'Asitlerin ve Bazların Özellikleri',
        icon: '🧫',
        subtopics: [
          'Asitlerin ve Bazların Özellikleri - Temel Kavramlar',
          'Asitlerin ve Bazların Özellikleri - Örnek Sorular',
          'Asitlerin ve Bazların Özellikleri - Test'
        ]
      },
      {
        id: 'tyt-kim-asit-baz-tepkim',
        name: 'Asitlerin ve Bazların Tepkimeleri',
        icon: '⚗️',
        subtopics: [
          'Asitlerin ve Bazların Tepkimeleri - Temel Kavramlar',
          'Asitlerin ve Bazların Tepkimeleri - Örnek Sorular',
          'Asitlerin ve Bazların Tepkimeleri - Test'
        ]
      },
      {
        id: 'tyt-kim-asit-baz-tuz',
        name: 'Asitler, Bazlar ve Tuzlar',
        icon: '🧂',
        subtopics: [
          'Asitler, Bazlar ve Tuzlar - Temel Kavramlar',
          'Asitler, Bazlar ve Tuzlar - Örnek Sorular',
          'Asitler, Bazlar ve Tuzlar - Test'
        ]
      },
      {
        id: 'tyt-kim-gunluk',
        name: 'Yaygın Günlük Hayat Kimyasalları',
        icon: '🧴',
        subtopics: [
          'Yaygın Günlük Hayat Kimyasalları - Temel Kavramlar',
          'Yaygın Günlük Hayat Kimyasalları - Örnek Sorular',
          'Yaygın Günlük Hayat Kimyasalları - Test'
        ]
      },
      {
        id: 'tyt-kim-kozmetik',
        name: 'Kozmetikler, İlaçlar ve Gıdalar',
        icon: '💊',
        subtopics: [
          'Kozmetikler, İlaçlar ve Gıdalar - Temel Kavramlar',
          'Kozmetikler, İlaçlar ve Gıdalar - Örnek Sorular',
          'Kozmetikler, İlaçlar ve Gıdalar - Test'
        ]
      }
    ],
    Biyoloji: [
      {
        id: 'tyt-bio-ortak-ozellik',
        name: 'Canlıların Ortak Özellikleri',
        icon: '🧬',
        subtopics: [
          'Canlıların Ortak Özellikleri - Temel Kavramlar',
          'Canlıların Ortak Özellikleri - Örnek Sorular',
          'Canlıların Ortak Özellikleri - Test'
        ]
      },
      {
        id: 'tyt-bio-inorganik',
        name: 'İnorganik Bileşikler',
        icon: '💧',
        subtopics: [
          'İnorganik Bileşikler - Temel Kavramlar',
          'İnorganik Bileşikler - Örnek Sorular',
          'İnorganik Bileşikler - Test'
        ]
      },
      {
        id: 'tyt-bio-organik',
        name: 'Organik Bileşikler',
        icon: '🧬',
        subtopics: [
          'Organik Bileşikler - Temel Kavramlar',
          'Organik Bileşikler - Örnek Sorular',
          'Organik Bileşikler - Test'
        ]
      },
      {
        id: 'tyt-bio-hucre-yapi',
        name: 'Hücresel Yapılar ve Görevleri',
        icon: '🔬',
        subtopics: [
          'Hücresel Yapılar ve Görevleri - Temel Kavramlar',
          'Hücresel Yapılar ve Görevleri - Örnek Sorular',
          'Hücresel Yapılar ve Görevleri - Test'
        ]
      },
      {
        id: 'tyt-bio-madde-gecis',
        name: 'Hücre Zarından Madde Geçişleri',
        icon: '🔬',
        subtopics: [
          'Hücre Zarından Madde Geçişleri - Temel Kavramlar',
          'Hücre Zarından Madde Geçişleri - Örnek Sorular',
          'Hücre Zarından Madde Geçişleri - Test'
        ]
      },
      {
        id: 'tyt-bio-bilimsel-yontem',
        name: 'Bilimsel Yöntem',
        icon: '🔬',
        subtopics: [
          'Bilimsel Yöntem - Temel Kavramlar',
          'Bilimsel Yöntem - Örnek Sorular',
          'Bilimsel Yöntem - Test'
        ]
      },
      {
        id: 'tyt-bio-siniflandirma',
        name: 'Canlıların Sınıflandırılması',
        icon: '🌍',
        subtopics: [
          'Canlıların Sınıflandırılması - Temel Kavramlar',
          'Canlıların Sınıflandırılması - Örnek Sorular',
          'Canlıların Sınıflandırılması - Test'
        ]
      },
      {
        id: 'tyt-bio-alemler',
        name: 'Canlı Âlemleri',
        icon: '🌍',
        subtopics: [
          'Canlı Âlemleri - Temel Kavramlar',
          'Canlı Âlemleri - Örnek Sorular',
          'Canlı Âlemleri - Test'
        ]
      },
      {
        id: 'tyt-bio-mitoz',
        name: 'Hücre Döngüsü ve Mitoz',
        icon: '🔬',
        subtopics: [
          'Hücre Döngüsü ve Mitoz - Temel Kavramlar',
          'Hücre Döngüsü ve Mitoz - Örnek Sorular',
          'Hücre Döngüsü ve Mitoz - Test'
        ]
      },
      {
        id: 'tyt-bio-eseysiz-ureme',
        name: 'Eşeysiz Üreme',
        icon: '🌱',
        subtopics: [
          'Eşeysiz Üreme - Temel Kavramlar',
          'Eşeysiz Üreme - Örnek Sorular',
          'Eşeysiz Üreme - Test'
        ]
      },
      {
        id: 'tyt-bio-mayoz',
        name: 'Mayoz ve Eşeyli Üreme',
        icon: '🧬',
        subtopics: [
          'Mayoz ve Eşeyli Üreme - Temel Kavramlar',
          'Mayoz ve Eşeyli Üreme - Örnek Sorular',
          'Mayoz ve Eşeyli Üreme - Test'
        ]
      },
      {
        id: 'tyt-bio-kalitim',
        name: 'Kalıtım',
        icon: '🧬',
        subtopics: [
          'Kalıtım - Temel Kavramlar',
          'Kalıtım - Örnek Sorular',
          'Kalıtım - Test'
        ]
      },
      {
        id: 'tyt-bio-genetik-ekoloji',
        name: 'Genetik Varyasyonlar ve Ekoloji',
        icon: '🌿',
        subtopics: [
          'Genetik Varyasyonlar ve Ekoloji - Temel Kavramlar',
          'Genetik Varyasyonlar ve Ekoloji - Örnek Sorular',
          'Genetik Varyasyonlar ve Ekoloji - Test'
        ]
      }
    ],
    Tarih: [
      {
        id: 'tyt-tar-bilimine-giris',
        name: 'Tarih Bilimine Giriş',
        icon: '📜',
        subtopics: [
          'Tarih Bilimine Giriş - Temel Kavramlar',
          'Tarih Bilimine Giriş - Örnek Sorular',
          'Tarih Bilimine Giriş - Test'
        ]
      },
      {
        id: 'tyt-tar-ilk-turk',
        name: 'İlk Türk Devletleri',
        icon: '🏹',
        subtopics: [
          'İlk Türk Devletleri - Temel Kavramlar',
          'İlk Türk Devletleri - Örnek Sorular',
          'İlk Türk Devletleri - Test'
        ]
      },
      {
        id: 'tyt-tar-islamiyet',
        name: 'İslamiyetin Doğuşu ve Türk-İslam',
        icon: '☪️',
        subtopics: [
          'İslamiyetin Doğuşu ve Türk-İslam - Temel Kavramlar',
          'İslamiyetin Doğuşu ve Türk-İslam - Örnek Sorular',
          'İslamiyetin Doğuşu ve Türk-İslam - Test'
        ]
      },
      {
        id: 'tyt-tar-selcuklu',
        name: 'Selçuklular ve Anadolu',
        icon: '🏰',
        subtopics: [
          'Selçuklular ve Anadolu - Temel Kavramlar',
          'Selçuklular ve Anadolu - Örnek Sorular',
          'Selçuklular ve Anadolu - Test'
        ]
      },
      {
        id: 'tyt-tar-osmanli-kurulus',
        name: 'Osmanlının Kuruluşu',
        icon: '🕌',
        subtopics: [
          'Osmanlının Kuruluşu - Temel Kavramlar',
          'Osmanlının Kuruluşu - Örnek Sorular',
          'Osmanlının Kuruluşu - Test'
        ]
      },
      {
        id: 'tyt-tar-osmanli-yukselis',
        name: 'Osmanlının Yükselişi',
        icon: '👑',
        subtopics: [
          'Osmanlının Yükselişi - Temel Kavramlar',
          'Osmanlının Yükselişi - Örnek Sorular',
          'Osmanlının Yükselişi - Test'
        ]
      },
      {
        id: 'tyt-tar-duraklama',
        name: 'Duraklama ve Değişim Dönemi',
        icon: '📉',
        subtopics: [
          'Duraklama ve Değişim Dönemi - Temel Kavramlar',
          'Duraklama ve Değişim Dönemi - Örnek Sorular',
          'Duraklama ve Değişim Dönemi - Test'
        ]
      },
      {
        id: 'tyt-tar-gerileme',
        name: 'Gerileme ve Modernleşme Dönemi',
        icon: '🔄',
        subtopics: [
          'Gerileme ve Modernleşme Dönemi - Temel Kavramlar',
          'Gerileme ve Modernleşme Dönemi - Örnek Sorular',
          'Gerileme ve Modernleşme Dönemi - Test'
        ]
      },
      {
        id: 'tyt-tar-20yy',
        name: '20. Yüzyıl Başı ve I. Dünya Savaşı',
        icon: '⚔️',
        subtopics: [
          '20. Yüzyıl Başı ve I. Dünya Savaşı - Temel Kavramlar',
          '20. Yüzyıl Başı ve I. Dünya Savaşı - Örnek Sorular',
          '20. Yüzyıl Başı ve I. Dünya Savaşı - Test'
        ]
      },
      {
        id: 'tyt-tar-milli-mucadele',
        name: 'Millî Mücadele ve Cumhuriyet',
        icon: '🇹🇷',
        subtopics: [
          'Millî Mücadele ve Cumhuriyet - Temel Kavramlar',
          'Millî Mücadele ve Cumhuriyet - Örnek Sorular',
          'Millî Mücadele ve Cumhuriyet - Test'
        ]
      }
    ],
    Coğrafya: [
      {
        id: 'tyt-cog-giris',
        name: 'Coğrafyaya Giriş ve Doğa-İnsan',
        icon: '🌍',
        subtopics: [
          'Coğrafyaya Giriş ve Doğa-İnsan - Temel Kavramlar',
          'Coğrafyaya Giriş ve Doğa-İnsan - Örnek Sorular',
          'Coğrafyaya Giriş ve Doğa-İnsan - Test'
        ]
      },
      {
        id: 'tyt-cog-dunya-hareket',
        name: 'Dünya\'nın Hareketleri ve Konum',
        icon: '🌍',
        subtopics: [
          'Dünya\'nın Hareketleri ve Konum - Temel Kavramlar',
          'Dünya\'nın Hareketleri ve Konum - Örnek Sorular',
          'Dünya\'nın Hareketleri ve Konum - Test'
        ]
      },
      {
        id: 'tyt-cog-harita',
        name: 'Harita Bilgisi',
        icon: '🗺️',
        subtopics: [
          'Harita Bilgisi - Temel Kavramlar',
          'Harita Bilgisi - Örnek Sorular',
          'Harita Bilgisi - Test'
        ]
      },
      {
        id: 'tyt-cog-iklim',
        name: 'İklim Bilgisi',
        icon: '🌤️',
        subtopics: [
          'İklim Bilgisi - Temel Kavramlar',
          'İklim Bilgisi - Örnek Sorular',
          'İklim Bilgisi - Test'
        ]
      },
      {
        id: 'tyt-cog-yerlesme',
        name: 'Yerleşme ve Çevre',
        icon: '🏘️',
        subtopics: [
          'Yerleşme ve Çevre - Temel Kavramlar',
          'Yerleşme ve Çevre - Örnek Sorular',
          'Yerleşme ve Çevre - Test'
        ]
      },
      {
        id: 'tyt-cog-yer-sekilleri',
        name: 'Yer Şekilleri (Jeomorfoloji)',
        icon: '⛰️',
        subtopics: [
          'Yer Şekilleri (Jeomorfoloji) - Temel Kavramlar',
          'Yer Şekilleri (Jeomorfoloji) - Örnek Sorular',
          'Yer Şekilleri (Jeomorfoloji) - Test'
        ]
      },
      {
        id: 'tyt-cog-su-toprak-bitki',
        name: 'Su, Toprak ve Bitki Örtüsü',
        icon: '🌿',
        subtopics: [
          'Su, Toprak ve Bitki Örtüsü - Temel Kavramlar',
          'Su, Toprak ve Bitki Örtüsü - Örnek Sorular',
          'Su, Toprak ve Bitki Örtüsü - Test'
        ]
      },
      {
        id: 'tyt-cog-nufus-goc',
        name: 'Nüfus ve Göç',
        icon: '👥',
        subtopics: [
          'Nüfus ve Göç - Temel Kavramlar',
          'Nüfus ve Göç - Örnek Sorular',
          'Nüfus ve Göç - Test'
        ]
      },
      {
        id: 'tyt-cog-ekonomi-ulasim',
        name: 'Ekonomik Faaliyetler ve Ulaşım',
        icon: '🚂',
        subtopics: [
          'Ekonomik Faaliyetler ve Ulaşım - Temel Kavramlar',
          'Ekonomik Faaliyetler ve Ulaşım - Örnek Sorular',
          'Ekonomik Faaliyetler ve Ulaşım - Test'
        ]
      },
      {
        id: 'tyt-cog-afetler',
        name: 'Afetler',
        icon: '⚠️',
        subtopics: [
          'Afetler - Temel Kavramlar',
          'Afetler - Örnek Sorular',
          'Afetler - Test'
        ]
      }
    ],
    Felsefe: [
      {
        id: 'tyt-fel-giris',
        name: 'Felsefeye Giriş',
        icon: '🧠',
        subtopics: [
          'Felsefeye Giriş - Temel Kavramlar',
          'Felsefeye Giriş - Örnek Sorular',
          'Felsefeye Giriş - Test'
        ]
      },
      {
        id: 'tyt-fel-bilgi',
        name: 'Bilgi Felsefesi',
        icon: '💭',
        subtopics: [
          'Bilgi Felsefesi - Temel Kavramlar',
          'Bilgi Felsefesi - Örnek Sorular',
          'Bilgi Felsefesi - Test'
        ]
      },
      {
        id: 'tyt-fel-varlik',
        name: 'Varlık Felsefesi',
        icon: '🌌',
        subtopics: [
          'Varlık Felsefesi - Temel Kavramlar',
          'Varlık Felsefesi - Örnek Sorular',
          'Varlık Felsefesi - Test'
        ]
      },
      {
        id: 'tyt-fel-ahlak',
        name: 'Ahlak Felsefesi',
        icon: '⚖️',
        subtopics: [
          'Ahlak Felsefesi - Temel Kavramlar',
          'Ahlak Felsefesi - Örnek Sorular',
          'Ahlak Felsefesi - Test'
        ]
      },
      {
        id: 'tyt-fel-sanat',
        name: 'Sanat Felsefesi',
        icon: '🎨',
        subtopics: [
          'Sanat Felsefesi - Temel Kavramlar',
          'Sanat Felsefesi - Örnek Sorular',
          'Sanat Felsefesi - Test'
        ]
      },
      {
        id: 'tyt-fel-din',
        name: 'Din Felsefesi',
        icon: '☪️',
        subtopics: [
          'Din Felsefesi - Temel Kavramlar',
          'Din Felsefesi - Örnek Sorular',
          'Din Felsefesi - Test'
        ]
      },
      {
        id: 'tyt-fel-siyaset',
        name: 'Siyaset Felsefesi',
        icon: '🏛️',
        subtopics: [
          'Siyaset Felsefesi - Temel Kavramlar',
          'Siyaset Felsefesi - Örnek Sorular',
          'Siyaset Felsefesi - Test'
        ]
      },
      {
        id: 'tyt-fel-bilim',
        name: 'Bilim Felsefesi',
        icon: '🔬',
        subtopics: [
          'Bilim Felsefesi - Temel Kavramlar',
          'Bilim Felsefesi - Örnek Sorular',
          'Bilim Felsefesi - Test'
        ]
      },
      {
        id: 'tyt-fel-akimlar',
        name: 'Felsefi Akımlar',
        icon: '🌊',
        subtopics: [
          'Felsefi Akımlar - Temel Kavramlar',
          'Felsefi Akımlar - Örnek Sorular',
          'Felsefi Akımlar - Test'
        ]
      },
      {
        id: 'tyt-fel-mantik',
        name: 'Mantık',
        icon: '🧮',
        subtopics: [
          'Mantık - Temel Kavramlar',
          'Mantık - Örnek Sorular',
          'Mantık - Test'
        ]
      },
      {
        id: 'tyt-fel-psikoloji',
        name: 'Psikoloji',
        icon: '🧠',
        subtopics: [
          'Psikoloji - Temel Kavramlar',
          'Psikoloji - Örnek Sorular',
          'Psikoloji - Test'
        ]
      },
      {
        id: 'tyt-fel-sosyoloji',
        name: 'Sosyoloji',
        icon: '👥',
        subtopics: [
          'Sosyoloji - Temel Kavramlar',
          'Sosyoloji - Örnek Sorular',
          'Sosyoloji - Test'
        ]
      }
    ],
    'Din Kültürü': [
      {
        id: 'tyt-din-bilgi-inanc',
        name: 'Bilgi ve İnanç',
        icon: '📖',
        subtopics: [
          'Bilgi ve İnanç - Temel Kavramlar',
          'Bilgi ve İnanç - Örnek Sorular',
          'Bilgi ve İnanç - Test'
        ]
      },
      {
        id: 'tyt-din-din-islam',
        name: 'Din ve İslam',
        icon: '☪️',
        subtopics: [
          'Din ve İslam - Temel Kavramlar',
          'Din ve İslam - Örnek Sorular',
          'Din ve İslam - Test'
        ]
      },
      {
        id: 'tyt-din-ibadet',
        name: 'İslam ve İbadet',
        icon: '🕌',
        subtopics: [
          'İslam ve İbadet - Temel Kavramlar',
          'İslam ve İbadet - Örnek Sorular',
          'İslam ve İbadet - Test'
        ]
      },
      {
        id: 'tyt-din-genclik',
        name: 'Gençlik ve Değerler',
        icon: '🌟',
        subtopics: [
          'Gençlik ve Değerler - Temel Kavramlar',
          'Gençlik ve Değerler - Örnek Sorular',
          'Gençlik ve Değerler - Test'
        ]
      },
      {
        id: 'tyt-din-hz-muhammed',
        name: 'Hz. Muhammed ve Gençlik',
        icon: '🕋',
        subtopics: [
          'Hz. Muhammed ve Gençlik - Temel Kavramlar',
          'Hz. Muhammed ve Gençlik - Örnek Sorular',
          'Hz. Muhammed ve Gençlik - Test'
        ]
      },
      {
        id: 'tyt-din-gonul-cografya',
        name: 'Gönül Coğrafyamız ve İslam Medeniyeti',
        icon: '🌍',
        subtopics: [
          'Gönül Coğrafyamız ve İslam Medeniyeti - Temel Kavramlar',
          'Gönül Coğrafyamız ve İslam Medeniyeti - Örnek Sorular',
          'Gönül Coğrafyamız ve İslam Medeniyeti - Test'
        ]
      },
      {
        id: 'tyt-din-allah-insan',
        name: 'Allah-İnsan İlişkisi',
        icon: '☪️',
        subtopics: [
          'Allah-İnsan İlişkisi - Temel Kavramlar',
          'Allah-İnsan İlişkisi - Örnek Sorular',
          'Allah-İnsan İlişkisi - Test'
        ]
      },
      {
        id: 'tyt-din-din-hayat',
        name: 'Din ve Hayat',
        icon: '🏠',
        subtopics: [
          'Din ve Hayat - Temel Kavramlar',
          'Din ve Hayat - Örnek Sorular',
          'Din ve Hayat - Test'
        ]
      },
      {
        id: 'tyt-din-ahlak',
        name: 'Ahlaki Tutum ve Davranışlar',
        icon: '💚',
        subtopics: [
          'Ahlaki Tutum ve Davranışlar - Temel Kavramlar',
          'Ahlaki Tutum ve Davranışlar - Örnek Sorular',
          'Ahlaki Tutum ve Davranışlar - Test'
        ]
      },
      {
        id: 'tyt-din-mezhepler',
        name: 'İslam Düşüncesinde Yorumlar',
        icon: '📚',
        subtopics: [
          'İslam Düşüncesinde Yorumlar - Temel Kavramlar',
          'İslam Düşüncesinde Yorumlar - Örnek Sorular',
          'İslam Düşüncesinde Yorumlar - Test'
        ]
      }
    ]
  },
  ayt: {
    Matematik: [
      {
        id: 'ayt-mat-fonksiyon-uyg',
        name: 'Fonksiyon Uygulamaları',
        icon: '📈',
        subtopics: [
          'Fonksiyon Uygulamaları - Temel Kavramlar',
          'Fonksiyon Uygulamaları - Örnek Sorular',
          'Fonksiyon Uygulamaları - Test'
        ]
      },
      {
        id: 'ayt-mat-parabol',
        name: 'Parabol (İkinci Dereceden Fonksiyonlar)',
        icon: '📈',
        subtopics: [
          'Parabol (İkinci Dereceden Fonksiyonlar) - Temel Kavramlar',
          'Parabol (İkinci Dereceden Fonksiyonlar) - Örnek Sorular',
          'Parabol (İkinci Dereceden Fonksiyonlar) - Test'
        ]
      },
      {
        id: 'ayt-mat-denklem-sistem',
        name: 'İkinci Dereceden Denklem/Eşitsizlik Sistemleri',
        icon: '➗',
        subtopics: [
          'İkinci Dereceden Denklem/Eşitsizlik Sistemleri - Temel Kavramlar',
          'İkinci Dereceden Denklem/Eşitsizlik Sistemleri - Örnek Sorular',
          'İkinci Dereceden Denklem/Eşitsizlik Sistemleri - Test'
        ]
      },
      {
        id: 'ayt-mat-olasilik',
        name: 'Olasılık',
        icon: '🎯',
        subtopics: [
          'Olasılık - Temel Kavramlar',
          'Olasılık - Örnek Sorular',
          'Olasılık - Test'
        ]
      },
      {
        id: 'ayt-mat-trigonometri',
        name: 'Trigonometri',
        icon: '📐',
        subtopics: [
          'Trigonometri - Temel Kavramlar',
          'Trigonometri - Örnek Sorular',
          'Trigonometri - Test'
        ]
      },
      {
        id: 'ayt-mat-uslu-logaritma',
        name: 'Üstel ve Logaritmik Fonksiyonlar',
        icon: '📈',
        subtopics: [
          'Üstel ve Logaritmik Fonksiyonlar - Temel Kavramlar',
          'Üstel ve Logaritmik Fonksiyonlar - Örnek Sorular',
          'Üstel ve Logaritmik Fonksiyonlar - Test'
        ]
      },
      {
        id: 'ayt-mat-diziler',
        name: 'Diziler',
        icon: '🔢',
        subtopics: [
          'Diziler - Temel Kavramlar',
          'Diziler - Örnek Sorular',
          'Diziler - Test'
        ]
      },
      {
        id: 'ayt-mat-limit',
        name: 'Limit ve Süreklilik',
        icon: '∞',
        subtopics: [
          'Limit ve Süreklilik - Temel Kavramlar',
          'Limit ve Süreklilik - Örnek Sorular',
          'Limit ve Süreklilik - Test'
        ]
      },
      {
        id: 'ayt-mat-turev',
        name: 'Türev',
        icon: '📉',
        subtopics: [
          'Türev - Temel Kavramlar',
          'Türev - Örnek Sorular',
          'Türev - Test'
        ]
      },
      {
        id: 'ayt-mat-integral',
        name: 'İntegral',
        icon: '∫',
        subtopics: [
          'İntegral - Temel Kavramlar',
          'İntegral - Örnek Sorular',
          'İntegral - Test'
        ]
      },
      {
        id: 'ayt-mat-analitik-geo',
        name: 'Analitik Geometri',
        icon: '📐',
        subtopics: [
          'Analitik Geometri - Temel Kavramlar',
          'Analitik Geometri - Örnek Sorular',
          'Analitik Geometri - Test'
        ]
      },
      {
        id: 'ayt-mat-cember-daire',
        name: 'Çember ve Daire',
        icon: '⭕',
        subtopics: [
          'Çember ve Daire - Temel Kavramlar',
          'Çember ve Daire - Örnek Sorular',
          'Çember ve Daire - Test'
        ]
      },
      {
        id: 'ayt-mat-kati-cisim',
        name: 'Katı Cisimler (Silindir, Koni, Küre)',
        icon: '🧊',
        subtopics: [
          'Katı Cisimler (Silindir, Koni, Küre) - Temel Kavramlar',
          'Katı Cisimler (Silindir, Koni, Küre) - Örnek Sorular',
          'Katı Cisimler (Silindir, Koni, Küre) - Test'
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
        id: 'ayt-edb-giris',
        name: 'Edebiyata Giriş',
        icon: '📚',
        subtopics: [
          'Edebiyata Giriş - Temel Kavramlar',
          'Edebiyata Giriş - Örnek Sorular',
          'Edebiyata Giriş - Test'
        ]
      },
      {
        id: 'ayt-edb-siir-bilgi',
        name: 'Şiir Bilgisi',
        icon: '📜',
        subtopics: [
          'Şiir Bilgisi - Temel Kavramlar',
          'Şiir Bilgisi - Örnek Sorular',
          'Şiir Bilgisi - Test'
        ]
      },
      {
        id: 'ayt-edb-sanatlar',
        name: 'Edebî Sanatlar',
        icon: '🎨',
        subtopics: [
          'Edebî Sanatlar - Temel Kavramlar',
          'Edebî Sanatlar - Örnek Sorular',
          'Edebî Sanatlar - Test'
        ]
      },
      {
        id: 'ayt-edb-islamiyet-oncesi',
        name: 'İslamiyet Öncesi ve Geçiş Dönemi',
        icon: '🏹',
        subtopics: [
          'İslamiyet Öncesi ve Geçiş Dönemi - Temel Kavramlar',
          'İslamiyet Öncesi ve Geçiş Dönemi - Örnek Sorular',
          'İslamiyet Öncesi ve Geçiş Dönemi - Test'
        ]
      },
      {
        id: 'ayt-edb-halk-siiri',
        name: 'Halk Şiiri',
        icon: '🎵',
        subtopics: [
          'Halk Şiiri - Temel Kavramlar',
          'Halk Şiiri - Örnek Sorular',
          'Halk Şiiri - Test'
        ]
      },
      {
        id: 'ayt-edb-divan-siiri',
        name: 'Divan Şiiri',
        icon: '🕌',
        subtopics: [
          'Divan Şiiri - Temel Kavramlar',
          'Divan Şiiri - Örnek Sorular',
          'Divan Şiiri - Test'
        ]
      },
      {
        id: 'ayt-edb-tanzimat-siir',
        name: 'Tanzimat Dönemi Türk Şiiri',
        icon: '📜',
        subtopics: [
          'Tanzimat Dönemi Türk Şiiri - Temel Kavramlar',
          'Tanzimat Dönemi Türk Şiiri - Örnek Sorular',
          'Tanzimat Dönemi Türk Şiiri - Test'
        ]
      },
      {
        id: 'ayt-edb-servetifunun-siir',
        name: 'Servetifünun Dönemi Türk Şiiri',
        icon: '📜',
        subtopics: [
          'Servetifünun Dönemi Türk Şiiri - Temel Kavramlar',
          'Servetifünun Dönemi Türk Şiiri - Örnek Sorular',
          'Servetifünun Dönemi Türk Şiiri - Test'
        ]
      },
      {
        id: 'ayt-edb-fecriati-siir',
        name: 'Fecriati Dönemi Türk Şiiri',
        icon: '📜',
        subtopics: [
          'Fecriati Dönemi Türk Şiiri - Temel Kavramlar',
          'Fecriati Dönemi Türk Şiiri - Örnek Sorular',
          'Fecriati Dönemi Türk Şiiri - Test'
        ]
      },
      {
        id: 'ayt-edb-milli-siir',
        name: 'Millî Edebiyat Dönemi Türk Şiiri',
        icon: '🇹🇷',
        subtopics: [
          'Millî Edebiyat Dönemi Türk Şiiri - Temel Kavramlar',
          'Millî Edebiyat Dönemi Türk Şiiri - Örnek Sorular',
          'Millî Edebiyat Dönemi Türk Şiiri - Test'
        ]
      },
      {
        id: 'ayt-edb-cumhuriyet-siir',
        name: 'Cumhuriyet Dönemi Türk Şiiri',
        icon: '📜',
        subtopics: [
          'Cumhuriyet Dönemi Türk Şiiri - Temel Kavramlar',
          'Cumhuriyet Dönemi Türk Şiiri - Örnek Sorular',
          'Cumhuriyet Dönemi Türk Şiiri - Test'
        ]
      },
      {
        id: 'ayt-edb-hikaye',
        name: 'Hikâye',
        icon: '📖',
        subtopics: [
          'Hikâye - Temel Kavramlar',
          'Hikâye - Örnek Sorular',
          'Hikâye - Test'
        ]
      },
      {
        id: 'ayt-edb-roman',
        name: 'Roman',
        icon: '📚',
        subtopics: [
          'Roman - Temel Kavramlar',
          'Roman - Örnek Sorular',
          'Roman - Test'
        ]
      },
      {
        id: 'ayt-edb-tiyatro',
        name: 'Tiyatro',
        icon: '🎭',
        subtopics: [
          'Tiyatro - Temel Kavramlar',
          'Tiyatro - Örnek Sorular',
          'Tiyatro - Test'
        ]
      },
      {
        id: 'ayt-edb-masal-fabl',
        name: 'Masal/Fabl',
        icon: '🧚',
        subtopics: [
          'Masal/Fabl - Temel Kavramlar',
          'Masal/Fabl - Örnek Sorular',
          'Masal/Fabl - Test'
        ]
      },
      {
        id: 'ayt-edb-destan-efsane',
        name: 'Destan/Efsane',
        icon: '⚔️',
        subtopics: [
          'Destan/Efsane - Temel Kavramlar',
          'Destan/Efsane - Örnek Sorular',
          'Destan/Efsane - Test'
        ]
      },
      {
        id: 'ayt-edb-ogretici',
        name: 'Öğretici Metinler',
        icon: '📄',
        subtopics: [
          'Öğretici Metinler - Temel Kavramlar',
          'Öğretici Metinler - Örnek Sorular',
          'Öğretici Metinler - Test'
        ]
      },
      {
        id: 'ayt-edb-nesir',
        name: 'Divan Edebiyatı Nesir Türleri',
        icon: '📜',
        subtopics: [
          'Divan Edebiyatı Nesir Türleri - Temel Kavramlar',
          'Divan Edebiyatı Nesir Türleri - Örnek Sorular',
          'Divan Edebiyatı Nesir Türleri - Test'
        ]
      },
      {
        id: 'ayt-edb-akimlar',
        name: 'Edebi Akımlar',
        icon: '🌊',
        subtopics: [
          'Edebi Akımlar - Temel Kavramlar',
          'Edebi Akımlar - Örnek Sorular',
          'Edebi Akımlar - Test'
        ]
      }
    ],
    Fizik: [
      {
        id: 'ayt-fiz-kuvvet-hareket',
        name: 'Kuvvet ve Hareket',
        icon: '🏃',
        subtopics: [
          'Kuvvet ve Hareket - Temel Kavramlar',
          'Kuvvet ve Hareket - Örnek Sorular',
          'Kuvvet ve Hareket - Test'
        ]
      },
      {
        id: 'ayt-fiz-elektrik-manyetizma',
        name: 'Elektrik ve Manyetizma',
        icon: '⚡',
        subtopics: [
          'Elektrik ve Manyetizma - Temel Kavramlar',
          'Elektrik ve Manyetizma - Örnek Sorular',
          'Elektrik ve Manyetizma - Test'
        ]
      },
      {
        id: 'ayt-fiz-cembersel',
        name: 'Çembersel Hareket ve Kütle Çekimi',
        icon: '🔄',
        subtopics: [
          'Çembersel Hareket ve Kütle Çekimi - Temel Kavramlar',
          'Çembersel Hareket ve Kütle Çekimi - Örnek Sorular',
          'Çembersel Hareket ve Kütle Çekimi - Test'
        ]
      },
      {
        id: 'ayt-fiz-basit-harmonik',
        name: 'Basit Harmonik Hareket',
        icon: '〰️',
        subtopics: [
          'Basit Harmonik Hareket - Temel Kavramlar',
          'Basit Harmonik Hareket - Örnek Sorular',
          'Basit Harmonik Hareket - Test'
        ]
      },
      {
        id: 'ayt-fiz-dalga-mekanigi',
        name: 'Dalga Mekaniği',
        icon: '🌊',
        subtopics: [
          'Dalga Mekaniği - Temel Kavramlar',
          'Dalga Mekaniği - Örnek Sorular',
          'Dalga Mekaniği - Test'
        ]
      },
      {
        id: 'ayt-fiz-atom-fizigi',
        name: 'Atom Fiziğine Giriş ve Radyoaktivite',
        icon: '⚛️',
        subtopics: [
          'Atom Fiziğine Giriş ve Radyoaktivite - Temel Kavramlar',
          'Atom Fiziğine Giriş ve Radyoaktivite - Örnek Sorular',
          'Atom Fiziğine Giriş ve Radyoaktivite - Test'
        ]
      },
      {
        id: 'ayt-fiz-modern-fizik',
        name: 'Modern Fizik',
        icon: '🔬',
        subtopics: [
          'Modern Fizik - Temel Kavramlar',
          'Modern Fizik - Örnek Sorular',
          'Modern Fizik - Test'
        ]
      },
      {
        id: 'ayt-fiz-teknoloji',
        name: 'Modern Fiziğin Teknolojideki Uygulamaları',
        icon: '💻',
        subtopics: [
          'Modern Fiziğin Teknolojideki Uygulamaları - Temel Kavramlar',
          'Modern Fiziğin Teknolojideki Uygulamaları - Örnek Sorular',
          'Modern Fiziğin Teknolojideki Uygulamaları - Test'
        ]
      }
    ],
    Kimya: [
      {
        id: 'ayt-kim-modern-atom',
        name: 'Modern Atom Teorisi',
        icon: '⚛️',
        subtopics: [
          'Modern Atom Teorisi - Temel Kavramlar',
          'Modern Atom Teorisi - Örnek Sorular',
          'Modern Atom Teorisi - Test'
        ]
      },
      {
        id: 'ayt-kim-gazlar',
        name: 'Gazlar',
        icon: '🎈',
        subtopics: [
          'Gazlar - Temel Kavramlar',
          'Gazlar - Örnek Sorular',
          'Gazlar - Test'
        ]
      },
      {
        id: 'ayt-kim-cozeltiler',
        name: 'Sıvı Çözeltiler ve Çözünürlük',
        icon: '🧪',
        subtopics: [
          'Sıvı Çözeltiler ve Çözünürlük - Temel Kavramlar',
          'Sıvı Çözeltiler ve Çözünürlük - Örnek Sorular',
          'Sıvı Çözeltiler ve Çözünürlük - Test'
        ]
      },
      {
        id: 'ayt-kim-enerji',
        name: 'Kimyasal Tepkimelerde Enerji',
        icon: '⚡',
        subtopics: [
          'Kimyasal Tepkimelerde Enerji - Temel Kavramlar',
          'Kimyasal Tepkimelerde Enerji - Örnek Sorular',
          'Kimyasal Tepkimelerde Enerji - Test'
        ]
      },
      {
        id: 'ayt-kim-hiz',
        name: 'Kimyasal Tepkimelerde Hız',
        icon: '⏱️',
        subtopics: [
          'Kimyasal Tepkimelerde Hız - Temel Kavramlar',
          'Kimyasal Tepkimelerde Hız - Örnek Sorular',
          'Kimyasal Tepkimelerde Hız - Test'
        ]
      },
      {
        id: 'ayt-kim-denge',
        name: 'Kimyasal Tepkimelerde Denge',
        icon: '⚖️',
        subtopics: [
          'Kimyasal Tepkimelerde Denge - Temel Kavramlar',
          'Kimyasal Tepkimelerde Denge - Örnek Sorular',
          'Kimyasal Tepkimelerde Denge - Test'
        ]
      },
      {
        id: 'ayt-kim-elektrik',
        name: 'Kimya ve Elektrik',
        icon: '🔋',
        subtopics: [
          'Kimya ve Elektrik - Temel Kavramlar',
          'Kimya ve Elektrik - Örnek Sorular',
          'Kimya ve Elektrik - Test'
        ]
      },
      {
        id: 'ayt-kim-organik-giris',
        name: 'Organik Kimyaya Giriş',
        icon: '🧬',
        subtopics: [
          'Organik Kimyaya Giriş - Temel Kavramlar',
          'Organik Kimyaya Giriş - Örnek Sorular',
          'Organik Kimyaya Giriş - Test'
        ]
      },
      {
        id: 'ayt-kim-organik-bilesik',
        name: 'Organik Bileşikler',
        icon: '🧪',
        subtopics: [
          'Organik Bileşikler - Temel Kavramlar',
          'Organik Bileşikler - Örnek Sorular',
          'Organik Bileşikler - Test'
        ]
      },
      {
        id: 'ayt-kim-enerji-kaynak',
        name: 'Enerji Kaynakları ve Bilimsel Gelişmeler',
        icon: '🔋',
        subtopics: [
          'Enerji Kaynakları ve Bilimsel Gelişmeler - Temel Kavramlar',
          'Enerji Kaynakları ve Bilimsel Gelişmeler - Örnek Sorular',
          'Enerji Kaynakları ve Bilimsel Gelişmeler - Test'
        ]
      }
    ],
    Biyoloji: [
      {
        id: 'ayt-bio-sinir',
        name: 'Sinir Sistemi',
        icon: '🧠',
        subtopics: [
          'Sinir Sistemi - Temel Kavramlar',
          'Sinir Sistemi - Örnek Sorular',
          'Sinir Sistemi - Test'
        ]
      },
      {
        id: 'ayt-bio-endokrin',
        name: 'Endokrin Sistem',
        icon: '🩸',
        subtopics: [
          'Endokrin Sistem - Temel Kavramlar',
          'Endokrin Sistem - Örnek Sorular',
          'Endokrin Sistem - Test'
        ]
      },
      {
        id: 'ayt-bio-duyu',
        name: 'Duyu Organları',
        icon: '👁️',
        subtopics: [
          'Duyu Organları - Temel Kavramlar',
          'Duyu Organları - Örnek Sorular',
          'Duyu Organları - Test'
        ]
      },
      {
        id: 'ayt-bio-iskelet',
        name: 'İskelet Sistemi',
        icon: '🦴',
        subtopics: [
          'İskelet Sistemi - Temel Kavramlar',
          'İskelet Sistemi - Örnek Sorular',
          'İskelet Sistemi - Test'
        ]
      },
      {
        id: 'ayt-bio-kas',
        name: 'Kas Sistemi',
        icon: '💪',
        subtopics: [
          'Kas Sistemi - Temel Kavramlar',
          'Kas Sistemi - Örnek Sorular',
          'Kas Sistemi - Test'
        ]
      },
      {
        id: 'ayt-bio-sindirim',
        name: 'Sindirim Sistemi',
        icon: '🍽️',
        subtopics: [
          'Sindirim Sistemi - Temel Kavramlar',
          'Sindirim Sistemi - Örnek Sorular',
          'Sindirim Sistemi - Test'
        ]
      },
      {
        id: 'ayt-bio-dolasim',
        name: 'Kan Dolaşımı',
        icon: '❤️',
        subtopics: [
          'Kan Dolaşımı - Temel Kavramlar',
          'Kan Dolaşımı - Örnek Sorular',
          'Kan Dolaşımı - Test'
        ]
      },
      {
        id: 'ayt-bio-bagisiklik',
        name: 'Bağışıklık Sistemi',
        icon: '🛡️',
        subtopics: [
          'Bağışıklık Sistemi - Temel Kavramlar',
          'Bağışıklık Sistemi - Örnek Sorular',
          'Bağışıklık Sistemi - Test'
        ]
      },
      {
        id: 'ayt-bio-solunum',
        name: 'Solunum Sistemi',
        icon: '🫁',
        subtopics: [
          'Solunum Sistemi - Temel Kavramlar',
          'Solunum Sistemi - Örnek Sorular',
          'Solunum Sistemi - Test'
        ]
      },
      {
        id: 'ayt-bio-uriner',
        name: 'Üriner Sistem',
        icon: '🫘',
        subtopics: [
          'Üriner Sistem - Temel Kavramlar',
          'Üriner Sistem - Örnek Sorular',
          'Üriner Sistem - Test'
        ]
      },
      {
        id: 'ayt-bio-ureme',
        name: 'Üreme Sistemi',
        icon: '👶',
        subtopics: [
          'Üreme Sistemi - Temel Kavramlar',
          'Üreme Sistemi - Örnek Sorular',
          'Üreme Sistemi - Test'
        ]
      },
      {
        id: 'ayt-bio-embriyonik',
        name: 'Embriyonik Gelişim',
        icon: '🥚',
        subtopics: [
          'Embriyonik Gelişim - Temel Kavramlar',
          'Embriyonik Gelişim - Örnek Sorular',
          'Embriyonik Gelişim - Test'
        ]
      },
      {
        id: 'ayt-bio-komunite',
        name: 'Komünite Ekolojisi',
        icon: '🌿',
        subtopics: [
          'Komünite Ekolojisi - Temel Kavramlar',
          'Komünite Ekolojisi - Örnek Sorular',
          'Komünite Ekolojisi - Test'
        ]
      },
      {
        id: 'ayt-bio-populasyon',
        name: 'Popülasyon Ekolojisi',
        icon: '📊',
        subtopics: [
          'Popülasyon Ekolojisi - Temel Kavramlar',
          'Popülasyon Ekolojisi - Örnek Sorular',
          'Popülasyon Ekolojisi - Test'
        ]
      },
      {
        id: 'ayt-bio-nukleik',
        name: 'Nükleik Asitler',
        icon: '🧬',
        subtopics: [
          'Nükleik Asitler - Temel Kavramlar',
          'Nükleik Asitler - Örnek Sorular',
          'Nükleik Asitler - Test'
        ]
      },
      {
        id: 'ayt-bio-protein',
        name: 'Genetik Şifre ve Protein Sentezi',
        icon: '🧬',
        subtopics: [
          'Genetik Şifre ve Protein Sentezi - Temel Kavramlar',
          'Genetik Şifre ve Protein Sentezi - Örnek Sorular',
          'Genetik Şifre ve Protein Sentezi - Test'
        ]
      },
      {
        id: 'ayt-bio-genetik-muh',
        name: 'Genetik Mühendisliği ve Biyoteknoloji',
        icon: '🔬',
        subtopics: [
          'Genetik Mühendisliği ve Biyoteknoloji - Temel Kavramlar',
          'Genetik Mühendisliği ve Biyoteknoloji - Örnek Sorular',
          'Genetik Mühendisliği ve Biyoteknoloji - Test'
        ]
      },
      {
        id: 'ayt-bio-enerji',
        name: 'Canlılık ve Enerji',
        icon: '⚡',
        subtopics: [
          'Canlılık ve Enerji - Temel Kavramlar',
          'Canlılık ve Enerji - Örnek Sorular',
          'Canlılık ve Enerji - Test'
        ]
      },
      {
        id: 'ayt-bio-fotosentez',
        name: 'Fotosentez',
        icon: '🌿',
        subtopics: [
          'Fotosentez - Temel Kavramlar',
          'Fotosentez - Örnek Sorular',
          'Fotosentez - Test'
        ]
      },
      {
        id: 'ayt-bio-kemosentez',
        name: 'Kemosentez',
        icon: '🧪',
        subtopics: [
          'Kemosentez - Temel Kavramlar',
          'Kemosentez - Örnek Sorular',
          'Kemosentez - Test'
        ]
      },
      {
        id: 'ayt-bio-solunum-enerji',
        name: 'Hücresel Solunum',
        icon: '⚡',
        subtopics: [
          'Hücresel Solunum - Temel Kavramlar',
          'Hücresel Solunum - Örnek Sorular',
          'Hücresel Solunum - Test'
        ]
      },
      {
        id: 'ayt-bio-fermantasyon',
        name: 'Fermantasyon',
        icon: '🍞',
        subtopics: [
          'Fermantasyon - Temel Kavramlar',
          'Fermantasyon - Örnek Sorular',
          'Fermantasyon - Test'
        ]
      },
      {
        id: 'ayt-bio-bitki-doku',
        name: 'Bitkisel Dokular',
        icon: '🌱',
        subtopics: [
          'Bitkisel Dokular - Temel Kavramlar',
          'Bitkisel Dokular - Örnek Sorular',
          'Bitkisel Dokular - Test'
        ]
      },
      {
        id: 'ayt-bio-bitki-organ',
        name: 'Bitkisel Organlar',
        icon: '🌿',
        subtopics: [
          'Bitkisel Organlar - Temel Kavramlar',
          'Bitkisel Organlar - Örnek Sorular',
          'Bitkisel Organlar - Test'
        ]
      },
      {
        id: 'ayt-bio-bitki-hormon',
        name: 'Bitki Hormonları',
        icon: '🌱',
        subtopics: [
          'Bitki Hormonları - Temel Kavramlar',
          'Bitki Hormonları - Örnek Sorular',
          'Bitki Hormonları - Test'
        ]
      },
      {
        id: 'ayt-bio-bitki-hareket',
        name: 'Bitkilerde Hareket',
        icon: '🌻',
        subtopics: [
          'Bitkilerde Hareket - Temel Kavramlar',
          'Bitkilerde Hareket - Örnek Sorular',
          'Bitkilerde Hareket - Test'
        ]
      },
      {
        id: 'ayt-bio-bitki-tasima',
        name: 'Bitkilerde Madde Taşınması',
        icon: '🌳',
        subtopics: [
          'Bitkilerde Madde Taşınması - Temel Kavramlar',
          'Bitkilerde Madde Taşınması - Örnek Sorular',
          'Bitkilerde Madde Taşınması - Test'
        ]
      },
      {
        id: 'ayt-bio-bitki-ureme',
        name: 'Bitkilerde Eşeyli Üreme',
        icon: '🌸',
        subtopics: [
          'Bitkilerde Eşeyli Üreme - Temel Kavramlar',
          'Bitkilerde Eşeyli Üreme - Örnek Sorular',
          'Bitkilerde Eşeyli Üreme - Test'
        ]
      },
      {
        id: 'ayt-bio-canli-cevre',
        name: 'Canlılar ve Çevre',
        icon: '🌍',
        subtopics: [
          'Canlılar ve Çevre - Temel Kavramlar',
          'Canlılar ve Çevre - Örnek Sorular',
          'Canlılar ve Çevre - Test'
        ]
      }
    ],
    Tarih: [
      {
        id: 'ayt-tar-giris',
        name: 'Tarih Bilimine Giriş',
        icon: '📜',
        subtopics: [
          'Tarih Bilimine Giriş - Temel Kavramlar',
          'Tarih Bilimine Giriş - Örnek Sorular',
          'Tarih Bilimine Giriş - Test'
        ]
      },
      {
        id: 'ayt-tar-ilk-cag',
        name: 'İlk Çağ Dünya Tarihi',
        icon: '🏛️',
        subtopics: [
          'İlk Çağ Dünya Tarihi - Temel Kavramlar',
          'İlk Çağ Dünya Tarihi - Örnek Sorular',
          'İlk Çağ Dünya Tarihi - Test'
        ]
      },
      {
        id: 'ayt-tar-orta-cag',
        name: 'Orta Çağ Dünya Tarihi',
        icon: '🏰',
        subtopics: [
          'Orta Çağ Dünya Tarihi - Temel Kavramlar',
          'Orta Çağ Dünya Tarihi - Örnek Sorular',
          'Orta Çağ Dünya Tarihi - Test'
        ]
      },
      {
        id: 'ayt-tar-ilk-turk',
        name: 'İlk Türk Devletleri',
        icon: '🏹',
        subtopics: [
          'İlk Türk Devletleri - Temel Kavramlar',
          'İlk Türk Devletleri - Örnek Sorular',
          'İlk Türk Devletleri - Test'
        ]
      },
      {
        id: 'ayt-tar-islamiyet',
        name: 'İslamiyetin Doğuşu ve Türk-İslam',
        icon: '☪️',
        subtopics: [
          'İslamiyetin Doğuşu ve Türk-İslam - Temel Kavramlar',
          'İslamiyetin Doğuşu ve Türk-İslam - Örnek Sorular',
          'İslamiyetin Doğuşu ve Türk-İslam - Test'
        ]
      },
      {
        id: 'ayt-tar-selcuklu',
        name: 'Selçuklular ve Anadolu',
        icon: '🏰',
        subtopics: [
          'Selçuklular ve Anadolu - Temel Kavramlar',
          'Selçuklular ve Anadolu - Örnek Sorular',
          'Selçuklular ve Anadolu - Test'
        ]
      },
      {
        id: 'ayt-tar-osmanli-kurulus',
        name: 'Osmanlının Kuruluşu',
        icon: '🕌',
        subtopics: [
          'Osmanlının Kuruluşu - Temel Kavramlar',
          'Osmanlının Kuruluşu - Örnek Sorular',
          'Osmanlının Kuruluşu - Test'
        ]
      },
      {
        id: 'ayt-tar-osmanli-yukselis',
        name: 'Osmanlının Yükselişi',
        icon: '👑',
        subtopics: [
          'Osmanlının Yükselişi - Temel Kavramlar',
          'Osmanlının Yükselişi - Örnek Sorular',
          'Osmanlının Yükselişi - Test'
        ]
      },
      {
        id: 'ayt-tar-duraklama',
        name: 'Duraklama ve Değişim Dönemi',
        icon: '📉',
        subtopics: [
          'Duraklama ve Değişim Dönemi - Temel Kavramlar',
          'Duraklama ve Değişim Dönemi - Örnek Sorular',
          'Duraklama ve Değişim Dönemi - Test'
        ]
      },
      {
        id: 'ayt-tar-gerileme',
        name: 'Gerileme ve Modernleşme Dönemi',
        icon: '🔄',
        subtopics: [
          'Gerileme ve Modernleşme Dönemi - Temel Kavramlar',
          'Gerileme ve Modernleşme Dönemi - Örnek Sorular',
          'Gerileme ve Modernleşme Dönemi - Test'
        ]
      },
      {
        id: 'ayt-tar-1-dunya',
        name: '20. Yüzyıl Başı ve I. Dünya Savaşı',
        icon: '⚔️',
        subtopics: [
          '20. Yüzyıl Başı ve I. Dünya Savaşı - Temel Kavramlar',
          '20. Yüzyıl Başı ve I. Dünya Savaşı - Örnek Sorular',
          '20. Yüzyıl Başı ve I. Dünya Savaşı - Test'
        ]
      },
      {
        id: 'ayt-tar-milli-mucadele',
        name: 'Millî Mücadele',
        icon: '🇹🇷',
        subtopics: [
          'Millî Mücadele - Temel Kavramlar',
          'Millî Mücadele - Örnek Sorular',
          'Millî Mücadele - Test'
        ]
      },
      {
        id: 'ayt-tar-ataturk',
        name: 'Atatürk Dönemi',
        icon: '⭐',
        subtopics: [
          'Atatürk Dönemi - Temel Kavramlar',
          'Atatürk Dönemi - Örnek Sorular',
          'Atatürk Dönemi - Test'
        ]
      },
      {
        id: 'ayt-tar-2-dunya',
        name: 'II. Dünya Savaşı ve Sonrası',
        icon: '🌍',
        subtopics: [
          'II. Dünya Savaşı ve Sonrası - Temel Kavramlar',
          'II. Dünya Savaşı ve Sonrası - Örnek Sorular',
          'II. Dünya Savaşı ve Sonrası - Test'
        ]
      },
      {
        id: 'ayt-tar-guncel',
        name: 'Güncel Dönem',
        icon: '📰',
        subtopics: [
          'Güncel Dönem - Temel Kavramlar',
          'Güncel Dönem - Örnek Sorular',
          'Güncel Dönem - Test'
        ]
      }
    ],
    Coğrafya: [
      {
        id: 'ayt-cog-ekoloji',
        name: 'Ekoloji ve Doğal Ortam',
        icon: '🌿',
        subtopics: [
          'Ekoloji ve Doğal Ortam - Temel Kavramlar',
          'Ekoloji ve Doğal Ortam - Örnek Sorular',
          'Ekoloji ve Doğal Ortam - Test'
        ]
      },
      {
        id: 'ayt-cog-nufus',
        name: 'Nüfus ve Yerleşme',
        icon: '👥',
        subtopics: [
          'Nüfus ve Yerleşme - Temel Kavramlar',
          'Nüfus ve Yerleşme - Örnek Sorular',
          'Nüfus ve Yerleşme - Test'
        ]
      },
      {
        id: 'ayt-cog-ekonomi',
        name: 'Ekonomik Coğrafya',
        icon: '💰',
        subtopics: [
          'Ekonomik Coğrafya - Temel Kavramlar',
          'Ekonomik Coğrafya - Örnek Sorular',
          'Ekonomik Coğrafya - Test'
        ]
      },
      {
        id: 'ayt-cog-tarim',
        name: 'Türkiyede Tarım, Ormancılık, Sanayi',
        icon: '🌾',
        subtopics: [
          'Türkiyede Tarım, Ormancılık, Sanayi - Temel Kavramlar',
          'Türkiyede Tarım, Ormancılık, Sanayi - Örnek Sorular',
          'Türkiyede Tarım, Ormancılık, Sanayi - Test'
        ]
      },
      {
        id: 'ayt-cog-kultur',
        name: 'Kültür Coğrafyası',
        icon: '🏛️',
        subtopics: [
          'Kültür Coğrafyası - Temel Kavramlar',
          'Kültür Coğrafyası - Örnek Sorular',
          'Kültür Coğrafyası - Test'
        ]
      },
      {
        id: 'ayt-cog-ticaret-turizm',
        name: 'Küresel Ticaret ve Turizm',
        icon: '✈️',
        subtopics: [
          'Küresel Ticaret ve Turizm - Temel Kavramlar',
          'Küresel Ticaret ve Turizm - Örnek Sorular',
          'Küresel Ticaret ve Turizm - Test'
        ]
      },
      {
        id: 'ayt-cog-cevre',
        name: 'Çevre Sorunları',
        icon: '⚠️',
        subtopics: [
          'Çevre Sorunları - Temel Kavramlar',
          'Çevre Sorunları - Örnek Sorular',
          'Çevre Sorunları - Test'
        ]
      },
      {
        id: 'ayt-cog-doga-gelecek',
        name: 'Doğa Olayları ve Gelecek',
        icon: '🔮',
        subtopics: [
          'Doğa Olayları ve Gelecek - Temel Kavramlar',
          'Doğa Olayları ve Gelecek - Örnek Sorular',
          'Doğa Olayları ve Gelecek - Test'
        ]
      },
      {
        id: 'ayt-cog-bolgeler',
        name: 'Türkiyenin Bölgeleri ve Kalkınma',
        icon: '🗺️',
        subtopics: [
          'Türkiyenin Bölgeleri ve Kalkınma - Temel Kavramlar',
          'Türkiyenin Bölgeleri ve Kalkınma - Örnek Sorular',
          'Türkiyenin Bölgeleri ve Kalkınma - Test'
        ]
      },
      {
        id: 'ayt-cog-hizmet',
        name: 'Hizmet Sektörü, Ticaret, Turizm',
        icon: '🏨',
        subtopics: [
          'Hizmet Sektörü, Ticaret, Turizm - Temel Kavramlar',
          'Hizmet Sektörü, Ticaret, Turizm - Örnek Sorular',
          'Hizmet Sektörü, Ticaret, Turizm - Test'
        ]
      },
      {
        id: 'ayt-cog-jeopolitik',
        name: 'Jeopolitik ve Küresel Gelişmişlik',
        icon: '🌍',
        subtopics: [
          'Jeopolitik ve Küresel Gelişmişlik - Temel Kavramlar',
          'Jeopolitik ve Küresel Gelişmişlik - Örnek Sorular',
          'Jeopolitik ve Küresel Gelişmişlik - Test'
        ]
      },
      {
        id: 'ayt-cog-cevre-politika',
        name: 'Çevre Politikaları',
        icon: '📋',
        subtopics: [
          'Çevre Politikaları - Temel Kavramlar',
          'Çevre Politikaları - Örnek Sorular',
          'Çevre Politikaları - Test'
        ]
      }
    ],
    Felsefe: [
      {
        id: 'ayt-fel-giris',
        name: 'Felsefeye Giriş',
        icon: '🧠',
        subtopics: [
          'Felsefeye Giriş - Temel Kavramlar',
          'Felsefeye Giriş - Örnek Sorular',
          'Felsefeye Giriş - Test'
        ]
      },
      {
        id: 'ayt-fel-bilgi',
        name: 'Bilgi Felsefesi',
        icon: '💭',
        subtopics: [
          'Bilgi Felsefesi - Temel Kavramlar',
          'Bilgi Felsefesi - Örnek Sorular',
          'Bilgi Felsefesi - Test'
        ]
      },
      {
        id: 'ayt-fel-varlik',
        name: 'Varlık Felsefesi',
        icon: '🌌',
        subtopics: [
          'Varlık Felsefesi - Temel Kavramlar',
          'Varlık Felsefesi - Örnek Sorular',
          'Varlık Felsefesi - Test'
        ]
      },
      {
        id: 'ayt-fel-ahlak',
        name: 'Ahlak Felsefesi',
        icon: '⚖️',
        subtopics: [
          'Ahlak Felsefesi - Temel Kavramlar',
          'Ahlak Felsefesi - Örnek Sorular',
          'Ahlak Felsefesi - Test'
        ]
      },
      {
        id: 'ayt-fel-sanat',
        name: 'Sanat Felsefesi',
        icon: '🎨',
        subtopics: [
          'Sanat Felsefesi - Temel Kavramlar',
          'Sanat Felsefesi - Örnek Sorular',
          'Sanat Felsefesi - Test'
        ]
      },
      {
        id: 'ayt-fel-din',
        name: 'Din Felsefesi',
        icon: '☪️',
        subtopics: [
          'Din Felsefesi - Temel Kavramlar',
          'Din Felsefesi - Örnek Sorular',
          'Din Felsefesi - Test'
        ]
      },
      {
        id: 'ayt-fel-siyaset',
        name: 'Siyaset Felsefesi',
        icon: '🏛️',
        subtopics: [
          'Siyaset Felsefesi - Temel Kavramlar',
          'Siyaset Felsefesi - Örnek Sorular',
          'Siyaset Felsefesi - Test'
        ]
      },
      {
        id: 'ayt-fel-bilim',
        name: 'Bilim Felsefesi',
        icon: '🔬',
        subtopics: [
          'Bilim Felsefesi - Temel Kavramlar',
          'Bilim Felsefesi - Örnek Sorular',
          'Bilim Felsefesi - Test'
        ]
      },
      {
        id: 'ayt-fel-akimlar',
        name: 'Felsefi Akımlar',
        icon: '🌊',
        subtopics: [
          'Felsefi Akımlar - Temel Kavramlar',
          'Felsefi Akımlar - Örnek Sorular',
          'Felsefi Akımlar - Test'
        ]
      },
      {
        id: 'ayt-fel-mantik',
        name: 'Mantık',
        icon: '🧮',
        subtopics: [
          'Mantık - Temel Kavramlar',
          'Mantık - Örnek Sorular',
          'Mantık - Test'
        ]
      },
      {
        id: 'ayt-fel-psikoloji',
        name: 'Psikoloji',
        icon: '🧠',
        subtopics: [
          'Psikoloji - Temel Kavramlar',
          'Psikoloji - Örnek Sorular',
          'Psikoloji - Test'
        ]
      },
      {
        id: 'ayt-fel-sosyoloji',
        name: 'Sosyoloji',
        icon: '👥',
        subtopics: [
          'Sosyoloji - Temel Kavramlar',
          'Sosyoloji - Örnek Sorular',
          'Sosyoloji - Test'
        ]
      }
    ],
    'Din Kültürü': [
      {
        id: 'ayt-din-dunya-ahiret',
        name: 'Dünya ve Ahiret',
        icon: '🌍',
        subtopics: [
          'Dünya ve Ahiret - Temel Kavramlar',
          'Dünya ve Ahiret - Örnek Sorular',
          'Dünya ve Ahiret - Test'
        ]
      },
      {
        id: 'ayt-din-hz-muhammed',
        name: 'Kurana Göre Hz. Muhammed',
        icon: '🕋',
        subtopics: [
          'Kurana Göre Hz. Muhammed - Temel Kavramlar',
          'Kurana Göre Hz. Muhammed - Örnek Sorular',
          'Kurana Göre Hz. Muhammed - Test'
        ]
      },
      {
        id: 'ayt-din-kavramlar',
        name: 'Kuranda Bazı Kavramlar',
        icon: '📖',
        subtopics: [
          'Kuranda Bazı Kavramlar - Temel Kavramlar',
          'Kuranda Bazı Kavramlar - Örnek Sorular',
          'Kuranda Bazı Kavramlar - Test'
        ]
      },
      {
        id: 'ayt-din-inanc-mesele',
        name: 'İnançla İlgili Meseleler',
        icon: '💭',
        subtopics: [
          'İnançla İlgili Meseleler - Temel Kavramlar',
          'İnançla İlgili Meseleler - Örnek Sorular',
          'İnançla İlgili Meseleler - Test'
        ]
      },
      {
        id: 'ayt-din-yahudi-hristiyan',
        name: 'Yahudilik ve Hristiyanlık',
        icon: '✝️',
        subtopics: [
          'Yahudilik ve Hristiyanlık - Temel Kavramlar',
          'Yahudilik ve Hristiyanlık - Örnek Sorular',
          'Yahudilik ve Hristiyanlık - Test'
        ]
      },
      {
        id: 'ayt-din-islam-bilim',
        name: 'İslam ve Bilim',
        icon: '🔬',
        subtopics: [
          'İslam ve Bilim - Temel Kavramlar',
          'İslam ve Bilim - Örnek Sorular',
          'İslam ve Bilim - Test'
        ]
      },
      {
        id: 'ayt-din-anadolu-islam',
        name: 'Anadoluda İslam',
        icon: '🕌',
        subtopics: [
          'Anadoluda İslam - Temel Kavramlar',
          'Anadoluda İslam - Örnek Sorular',
          'Anadoluda İslam - Test'
        ]
      },
      {
        id: 'ayt-din-tasavvuf',
        name: 'İslam Düşüncesinde Tasavvufi Yorumlar',
        icon: '📿',
        subtopics: [
          'İslam Düşüncesinde Tasavvufi Yorumlar - Temel Kavramlar',
          'İslam Düşüncesinde Tasavvufi Yorumlar - Örnek Sorular',
          'İslam Düşüncesinde Tasavvufi Yorumlar - Test'
        ]
      },
      {
        id: 'ayt-din-guncel-mesele',
        name: 'Güncel Dini Meseleler',
        icon: '📋',
        subtopics: [
          'Güncel Dini Meseleler - Temel Kavramlar',
          'Güncel Dini Meseleler - Örnek Sorular',
          'Güncel Dini Meseleler - Test'
        ]
      },
      {
        id: 'ayt-din-hint-cin',
        name: 'Hint, Çin ve Diğer Dinler',
        icon: '🕉️',
        subtopics: [
          'Hint, Çin ve Diğer Dinler - Temel Kavramlar',
          'Hint, Çin ve Diğer Dinler - Örnek Sorular',
          'Hint, Çin ve Diğer Dinler - Test'
        ]
      }
    ]
  }
};
