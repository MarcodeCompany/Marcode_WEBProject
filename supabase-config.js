// ============================================================
// KONFIGURASI SUPABASE MARCODE
// ============================================================
// Ganti nilai di bawah ini dengan Project URL dan Anon Key dari:
// Supabase Dashboard -> Project Settings -> API
// ============================================================

const DEFAULT_SUPABASE_URL = "https://segdqecdxhinffufxlgr.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_fSpPO4tNfswIVvxDC_YoTg_Y8gRpGzp";

// Mendukung penyimpanan sementara di browser (via halaman Admin Setup)
// atau langsung dari konstanta di atas saat sudah di-deploy
const SUPABASE_URL = (
    localStorage.getItem('marcode_supabase_url') || DEFAULT_SUPABASE_URL
).trim();

const SUPABASE_ANON_KEY = (
    localStorage.getItem('marcode_supabase_anon_key') || DEFAULT_SUPABASE_ANON_KEY
).trim();

function isSupabaseConfigured() {
    return (
        SUPABASE_URL &&
        SUPABASE_ANON_KEY &&
        SUPABASE_URL.startsWith('https://') &&
        !SUPABASE_URL.includes('GANTI_DENGAN') &&
        !SUPABASE_ANON_KEY.includes('GANTI_DENGAN')
    );
}

// Inisialisasi client Supabase jika library sudah dimuat dan kredensial valid
let supabaseClient = null;
if (typeof window !== 'undefined' && window.supabase && isSupabaseConfigured()) {
    try {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (err) {
        console.error('Gagal menginisialisasi Supabase:', err);
    }
}

// Artikel sampel bawaan (ditampilkan jika Supabase belum dihubungkan)
const FALLBACK_ARTICLES = [
    {
        id: 'sample-1',
        title: 'Mengapa Iklan Meta Ads Boncos Saat Website Lambat?',
        slug: 'mengapa-iklan-meta-ads-boncos-saat-website-lambat',
        category: 'Meta Ads',
        excerpt: 'Banyak brand menyalahkan materi kreatif saat ROAS turun, padahal akar masalahnya ada pada kecepatan loading landing page dan tracking pixel yang bocor.',
        content: `<p>Banyak bisnis menghabiskan puluhan juta rupiah setiap bulan untuk Meta Ads dan TikTok Ads, namun mengeluhkan konversi yang rendah atau biaya per akuisisi (CPA) yang semakin mahal.</p>
        <h3>1. Drop-off Sebelum Halaman Terbuka</h3>
        <p>Riset membuktikan bahwa jika website membutuhkan waktu lebih dari 3 detik untuk dimuat di perangkat mobile, lebih dari 50% pengunjung yang sudah mengklik iklan Anda akan langsung menutup halaman tersebut sebelum melihat penawaran Anda.</p>
        <h3>2. Kehilangan Sinyal Algoritma (Tracking Bocor)</h3>
        <p>Tanpa integrasi Server-Side Tracking atau Conversion API (CAPI) yang presisi, algoritma Meta kehilangan data siapa saja yang benar-benar membeli produk Anda. Akibatnya, mesin iklan mengoptimalkan kampanye ke audiens yang salah.</p>
        <h3>Solusi: Sinergi Web & Ads</h3>
        <p>Di Marcode, kami menggabungkan arsitektur web berkecepatan tinggi dengan konfigurasi GA4 + CAPI sejak hari pertama agar setiap rupiah budget iklan Anda menghasilkan data dan ROAS yang terukur.</p>`,
        image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
        published: true,
        created_at: '2026-10-15T09:00:00Z'
    },
    {
        id: 'sample-2',
        title: 'Pentingnya Server-Side Tracking (CAPI) di Era Privasi Data',
        slug: 'pentingnya-server-side-tracking-capi-di-era-privasi-data',
        category: 'Analytics & Tracking',
        excerpt: 'Update iOS dan pemblokir iklan di browser membuat pixel tradisional kehilangan hingga 30% data konversi. Bagaimana cara mengatasinya?',
        content: `<p>Mengandalkan Meta Pixel berbasis browser saja sudah tidak cukup di tahun ini. Pembaruan privasi sistem operasi dan ad-blocker membuat data pembelian sering tidak tercatat di Ads Manager.</p>
        <h3>Apa itu Conversion API (CAPI)?</h3>
        <p>Conversion API memungkinkan server website Anda mengirimkan data event (seperti Lead, Add to Cart, atau Purchase) langsung ke server Meta atau Google tanpa bergantung sepenuhnya pada browser pengguna.</p>
        <h3>Manfaat Utama untuk Brand Anda</h3>
        <ul>
            <li>Akurasi data laporan iklan meningkat drastis.</li>
            <li>Cost Per Result (CPR) lebih stabil karena algoritma mendapat sinyal yang utuh.</li>
            <li>Tetap patuh terhadap regulasi pelindungan data pribadi (UU PDP).</li>
        </ul>`,
        image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
        published: true,
        created_at: '2026-10-20T09:00:00Z'
    },
    {
        id: 'sample-3',
        title: 'Anatomi Landing Page yang Menghasilkan Konversi Tinggi',
        slug: 'anatomi-landing-page-konversi-tinggi',
        category: 'Web Development',
        excerpt: 'Desain web yang sekadar bagus tidak menjamin penjualan. Pelajari struktur landing page yang terbukti mengubah pengunjung menjadi pembeli.',
        content: `<p>Sebuah landing page memiliki satu tujuan utama: mengubah pengunjung menjadi prospek (leads) atau pembeli. Berbeda dengan halaman beranda biasa, landing page yang efektif menghilangkan distraksi dan memandu pengunjung menuju satu Call-to-Action (CTA).</p>
        <h3>Elemen Wajib Landing Page</h3>
        <ul>
            <li><strong>Headline yang Menjawab Masalah:</strong> Dalam 5 detik pertama, pengunjung harus tahu apa nilai utama yang Anda tawarkan.</li>
            <li><strong>Kecepatan Tanpa Kompromi:</strong> Kode yang bersih (clean code) dan aset gambar teroptimasi menjaga perhatian calon klien.</li>
            <li><strong>Social Proof & Hasil Nyata:</strong> Studi kasus dan angka pencapaian membangun kepercayaan instan.</li>
        </ul>`,
        image_url: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1000&auto=format&fit=crop',
        published: true,
        created_at: '2026-10-25T09:00:00Z'
    }
];

function formatArticleDate(dateStr) {
    if (!dateStr) return '';
    try {
        const d = new Date(dateStr);
        return d.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    } catch (e) {
        return dateStr;
    }
}

async function fetchPublishedArticles(limit = null) {
    if (!supabaseClient) {
        return limit ? FALLBACK_ARTICLES.slice(0, limit) : FALLBACK_ARTICLES;
    }

    try {
        let query = supabaseClient
            .from('articles')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false });

        if (limit) {
            query = query.limit(limit);
        }

        const { data, error } = await query;
        if (error) throw error;
        if (!data || data.length === 0) {
            return limit ? FALLBACK_ARTICLES.slice(0, limit) : FALLBACK_ARTICLES;
        }
        return data;
    } catch (err) {
        console.warn('Menggunakan artikel sampel karena database belum siap:', err.message);
        return limit ? FALLBACK_ARTICLES.slice(0, limit) : FALLBACK_ARTICLES;
    }
}

async function fetchArticleBySlug(slug) {
    if (!supabaseClient) {
        return FALLBACK_ARTICLES.find(a => a.slug === slug) || FALLBACK_ARTICLES[0];
    }

    try {
        const { data, error } = await supabaseClient
            .from('articles')
            .select('*')
            .eq('slug', slug)
            .maybeSingle();

        if (error) throw error;
        if (data) return data;
        return FALLBACK_ARTICLES.find(a => a.slug === slug) || null;
    } catch (err) {
        console.warn('Fallback ke artikel sampel:', err.message);
        return FALLBACK_ARTICLES.find(a => a.slug === slug) || null;
    }
}

