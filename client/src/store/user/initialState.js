import authService from '../../services/authService';

export default {
  id: authService().getUserId() || null,
  loading: false,
  authenticated: false,
  token: authService().getAccessToken() || null,
  responseMessage: null,
  error: null,
};
