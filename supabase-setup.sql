-- ============================================================
-- MARCODE BLOG / ARTIKEL - SUPABASE SETUP SCRIPT
-- Cara Pakai:
-- 1. Buka dashboard Supabase project Anda (https://supabase.com/dashboard)
-- 2. Masuk ke menu "SQL Editor" di sidebar kiri -> klik "New query"
-- 3. Copy-paste seluruh isi file ini lalu klik tombol "Run"
-- ============================================================

-- 1. Buat Tabel Articles
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT DEFAULT 'Digital Marketing',
    excerpt TEXT,
    content TEXT NOT NULL,
    image_url TEXT,
    published BOOLEAN DEFAULT true,
    author_email TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Aktifkan keamanan Row Level Security (RLS)
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Pengunjung umum (public) bisa membaca artikel yang berstatus published
DROP POLICY IF EXISTS "Public can read published articles" ON public.articles;
CREATE POLICY "Public can read published articles"
ON public.articles
FOR SELECT
USING (published = true);

-- 4. Policy: Admin yang sudah login bisa melihat semua artikel (termasuk draft)
DROP POLICY IF EXISTS "Admin can read all articles" ON public.articles;
CREATE POLICY "Admin can read all articles"
ON public.articles
FOR SELECT
TO authenticated
USING (true);

-- 5. Policy: Admin yang sudah login bisa menambah artikel baru
DROP POLICY IF EXISTS "Admin can insert articles" ON public.articles;
CREATE POLICY "Admin can insert articles"
ON public.articles
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 6. Policy: Admin yang sudah login bisa mengedit artikel
DROP POLICY IF EXISTS "Admin can update articles" ON public.articles;
CREATE POLICY "Admin can update articles"
ON public.articles
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 7. Policy: Admin yang sudah login bisa menghapus artikel
DROP POLICY IF EXISTS "Admin can delete articles" ON public.articles;
CREATE POLICY "Admin can delete articles"
ON public.articles
FOR DELETE
TO authenticated
USING (true);

-- 8. (Opsional) Buat Storage Bucket untuk Upload Gambar Artikel
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy Storage: Semua orang bisa melihat gambar
DROP POLICY IF EXISTS "Public Access Article Images" ON storage.objects;
CREATE POLICY "Public Access Article Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'article-images');

-- Policy Storage: Admin yang login bisa upload gambar
DROP POLICY IF EXISTS "Admin Upload Article Images" ON storage.objects;
CREATE POLICY "Admin Upload Article Images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'article-images');

-- Policy Storage: Admin yang login bisa hapus gambar
DROP POLICY IF EXISTS "Admin Delete Article Images" ON storage.objects;
CREATE POLICY "Admin Delete Article Images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'article-images');

-- 9. Masukkan 3 Artikel Awal (Sample)
INSERT INTO public.articles (title, slug, category, excerpt, content, image_url, published)
VALUES
(
    'Mengapa Iklan Meta Ads Boncos Saat Website Lambat?',
    'mengapa-iklan-meta-ads-boncos-saat-website-lambat',
    'Meta Ads',
    'Banyak brand menyalahkan materi kreatif saat ROAS turun, padahal akar masalahnya ada pada kecepatan loading landing page dan tracking pixel yang bocor.',
    '<p>Banyak bisnis menghabiskan puluhan juta rupiah setiap bulan untuk Meta Ads dan TikTok Ads, namun mengeluhkan konversi yang rendah atau biaya per akuisisi (CPA) yang semakin mahal.</p><h3>1. Drop-off Sebelum Halaman Terbuka</h3><p>Riset membuktikan bahwa jika website membutuhkan waktu lebih dari 3 detik untuk dimuat di perangkat mobile, lebih dari 50% pengunjung yang sudah mengklik iklan Anda akan langsung menutup halaman tersebut sebelum melihat penawaran Anda.</p><h3>2. Kehilangan Sinyal Algoritma (Tracking Bocor)</h3><p>Tanpa integrasi Server-Side Tracking atau Conversion API (CAPI) yang presisi, algoritma Meta kehilangan data siapa saja yang benar-benar membeli produk Anda. Akibatnya, mesin iklan mengoptimalkan kampanye ke audiens yang salah.</p><h3>Solusi: Sinergi Web & Ads</h3><p>Di Marcode, kami menggabungkan arsitektur web berkecepatan tinggi dengan konfigurasi GA4 + CAPI sejak hari pertama agar setiap rupiah budget iklan Anda menghasilkan data dan ROAS yang terukur.</p>',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    true
),
(
    'Pentingnya Server-Side Tracking (CAPI) di Era Privasi Data',
    'pentingnya-server-side-tracking-capi-di-era-privasi-data',
    'Analytics & Tracking',
    'Update iOS dan pemblokir iklan di browser membuat pixel tradisional kehilangan hingga 30% data konversi. Bagaimana cara mengatasinya?',
    '<p>Mengandalkan Meta Pixel berbasis browser saja sudah tidak cukup di tahun ini. Pembaruan privasi sistem operasi dan ad-blocker membuat data pembelian sering tidak tercatat di Ads Manager.</p><h3>Apa itu Conversion API (CAPI)?</h3><p>Conversion API memungkinkan server website Anda mengirimkan data event (seperti Lead, Add to Cart, atau Purchase) langsung ke server Meta atau Google tanpa bergantung sepenuhnya pada browser pengguna.</p><h3>Manfaat Utama untuk Brand Anda</h3><ul><li>Akurasi data laporan iklan meningkat drastis.</li><li>Cost Per Result (CPR) lebih stabil karena algoritma mendapat sinyal yang utuh.</li><li>Tetap patuh terhadap regulasi pelindungan data pribadi (UU PDP).</li></ul>',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    true
),
(
    'Anatomi Landing Page yang Menghasilkan Konversi Tinggi',
    'anatomi-landing-page-konversi-tinggi',
    'Web Development',
    'Desain web yang sekadar bagus tidak menjamin penjualan. Pelajari struktur landing page yang terbukti mengubah pengunjung menjadi pembeli.',
    '<p>Sebuah landing page memiliki satu tujuan utama: mengubah pengunjung menjadi prospek (leads) atau pembeli. Berbeda dengan halaman beranda biasa, landing page yang efektif menghilangkan distraksi dan memandu pengunjung menuju satu Call-to-Action (CTA).</p><h3>Elemen Wajib Landing Page</h3><ul><li><strong>Headline yang Menjawab Masalah:</strong> Dalam 5 detik pertama, pengunjung harus tahu apa nilai utama yang Anda tawarkan.</li><li><strong>Kecepatan Tanpa Kompromi:</strong> Kode yang bersih (clean code) dan aset gambar teroptimasi menjaga perhatian calon klien.</li><li><strong>Social Proof & Hasil Nyata:</strong> Studi kasus dan angka pencapaian membangun kepercayaan instan.</li></ul>',
    'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1000&auto=format&fit=crop',
    true
)
ON CONFLICT (slug) DO NOTHING;

