const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

const authService = () => ({
  setAccessToken: (accessToken: string) =>
    localStorage.setItem(ACCESS_TOKEN, accessToken),

  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN),

  setRefreshToken: (refreshToken: string) =>
    localStorage.setItem(REFRESH_TOKEN, refreshToken),

  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN),

  logout: () => localStorage.removeItem(ACCESS_TOKEN),
});

export default authService;
