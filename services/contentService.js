const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001";

export async function fetchTopNews(limit = 9) {
  try {
    const res = await fetch(`${API_BASE}/api/public/news/top?limit=${limit}`);
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (e) {
    return [];
  }
}

export async function fetchBreakingNews(limit = 5) {
  try {
    const res = await fetch(`${API_BASE}/api/public/news/breaking?limit=${limit}`);
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (e) {
    return [];
  }
}

export async function fetchSixNews(limit = 6) {
  try {
    const res = await fetch(`${API_BASE}/api/public/news/latest?limit=${limit}`);
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (e) {
    return [];
  }
}

export async function fetchPhotoSlider(limit = 8) {
  try {
    const res = await fetch(`${API_BASE}/api/public/photos?limit=${limit}`);
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (e) {
    return [];
  }
}

export async function fetchShortVideos(limit = 8) {
  try {
    const res = await fetch(`${API_BASE}/api/public/videos/shorts?limit=${limit}`);
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (e) {
    return [];
  }
}
