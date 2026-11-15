# TASKFLOW – Görev ve Proje Yönetim Sistemi API

TASKFLOW, görevlerin oluşturulması, listelenmesi, görüntülenmesi, güncellenmesi ve silinmesi işlemlerini gerçekleştirmek amacıyla geliştirilmiş bir REST API projesidir.

Proje, Node.js ve Express.js kullanılarak geliştirilmiştir. Gelen HTTP isteklerinin yönetilmesi için routing ve middleware yapıları kullanılmıştır. Görev verileri JSON dosyasında saklanmaktadır.

## Kullanılan Teknolojiler

- Node.js
- Express.js
- JavaScript
- JSON
- Postman
- Git & GitHub

## Özellikler

- Yeni görev oluşturma
- Kayıtlı görevleri listeleme
- ID (Identity) numarasına göre görev görüntüleme
- Mevcut görevleri düzenleme
- Görevleri silme
- Otomatik ID oluşturma
- JSON dosyası üzerinde veri saklama
- HTTP isteklerini Logger middleware ile kaydetme
- Geçersiz görev ID'lerini kontrol etme
- HTTP durum kodlarıyla uygun yanıtlar gönderme
- Merkezi hata yönetimi

## Veri Saklama

Uygulama, görev kayıtlarını `data/tasks.json` dosyasında saklar. Yeni görev oluşturulduğunda, mevcut görev güncellendiğinde veya silindiğinde JSON dosyası otomatik olarak güncellenir.

Veriler yerel dosyada tutulduğu için uygulama yeniden başlatıldığında da kayıtlı görevler korunur.

## Kurulum

Projeyi bilgisayarınıza indirin:

```bash
git clone https://github.com/sinansancak/taskflow-api.git
```

Proje klasörüne gidin:

```bash
cd taskflow-api
```

Gerekli paketleri yükleyin:

```bash
npm install
```

Sunucuyu başlatın:

```bash
node --watch server.js
```

API, aşağıdaki adreste çalışıyor olmalı:

```text
http://localhost:3000
```

## API Endpoint'leri

| HTTP Metodu | Endpoint         | Açıklama                  |
| ----------- | ---------------- | ------------------------- |
| GET         | `/api/tasks`     | Tüm görevleri listeler.   |
| GET         | `/api/tasks/:id` | ID'ye göre görev getirir. |
| POST        | `/api/tasks`     | Yeni görev oluşturur.     |
| PUT         | `/api/tasks/:id` | Görevi günceller.         |
| DELETE      | `/api/tasks/:id` | Görevi siler.             |

## Test

API endpoint'leri Postman kullanılarak test edilmiştir. Görev oluşturma, listeleme, görüntüleme, güncelleme ve silme işlemlerinin yanı sıra hatalı istekler ve HTTP durum kodları da kontrol edilmiştir.
