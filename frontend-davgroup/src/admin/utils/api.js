const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const AUTH_TOKEN_KEY = "dav_admin_token";

const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);
const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

const request = async (path, options = {}) => {
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(getAuthToken() ? { Authorization: `Bearer ${getAuthToken()}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    const error = new Error(data?.message || "Erreur de communication avec l'API.");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const adminApi = {
  async login(email, password) {
    const response = await request("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (response?.token) {
      setAuthToken(response.token);
    }
    return response;
  },

  user() {
    return request("/user");
  },

  logout() {
    const result = request("/logout", {
      method: "POST",
    });
    setAuthToken(null);
    return result;
  },
  async getProducts() {
    return request('/products');
  },
  async getCategories() {
    return request('/categories');
  },
  async createProduct(formData) {
    return request('/products', {
      method: 'POST',
      body: formData,
    });
  },
  async updateProduct(id, formData) {
    formData.append('_method', 'PUT');
    return request(`/products/${id}`, {
      method: 'POST',
      body: formData,
    });
  },
  async deleteProduct(id) {
    return request(`/products/${id}`, {
      method: 'DELETE',
    });
  },
  async getRdvs() {
    return request('/rdv');
  },
  async getRdvNotifications() {
    return request('/rdv/notifications');
  },
  async markRdvsNotified() {
    return request('/rdv/mark-notified', { method: 'POST' });
  },
  async updateRdvStatus(id, status) {
    const rawId = typeof id === 'string' ? id.replace(/^#RDV-/, '') : id;
    return request(`/rdv/${rawId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
  async getBeautyServices(sectionKey = 'rendezvous', adminAll = false) {
    const params = new URLSearchParams({ section_key: sectionKey });
    if (adminAll) params.set('admin', '1');
    return request(`/beauty-services?${params.toString()}`);
  },
  async createBeautyService(formData) {
    return request('/beauty-services', {
      method: 'POST',
      body: formData,
    });
  },
  async updateBeautyService(id, formData) {
    return request(`/beauty-services/${id}`, {
      method: 'POST',
      body: formData,
    });
  },
  async deleteBeautyService(id) {
    return request(`/beauty-services/${id}`, {
      method: 'DELETE',
    });
  },

  // ── Orders ──
  async getOrders(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return request(`/orders${qs ? '?' + qs : ''}`);
  },
  async getOrder(id) {
    return request(`/orders/${id}`);
  },
  async updateOrderStatus(id, status) {
    return request(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  // ── Promos ──
  async getPromos() {
    return request('/promos');
  },
  async createPromo(data) {
    return request('/promos', { method: 'POST', body: JSON.stringify(data) });
  },
  async updatePromo(id, data) {
    return request(`/promos/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  },
  async deletePromo(id) {
    return request(`/promos/${id}`, { method: 'DELETE' });
  },
  async savePromoBar(text) {
    return request('/promos/bar', { method: 'POST', body: JSON.stringify({ text }) });
  },
};
