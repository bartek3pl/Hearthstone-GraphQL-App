const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const USER_ID = 'userId';

const authService = () => ({
  setAccessToken: (accessToken: string) =>
    localStorage.setItem(ACCESS_TOKEN, accessToken),

  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN),

  setRefreshToken: (refreshToken: string) =>
    localStorage.setItem(REFRESH_TOKEN, refreshToken),

  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN),

  setUserId: (userId: string) => localStorage.setItem(USER_ID, userId),

  getUserId: () => localStorage.getItem(USER_ID),

  logout: () => localStorage.removeItem(ACCESS_TOKEN),
});

export default authService;
