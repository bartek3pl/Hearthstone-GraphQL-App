import { gql, useMutation } from '@apollo/client';

interface VerifyAccessTokenMutationResponse {
  accessTokenVerify: {
    success: boolean;
  };
}

interface VerifyAccessTokenInput {
  authorization: string;
}

const ACCESS_TOKEN = 'accessToken';

const getAuthorization = (accessToken: string) => `Bearer ${accessToken}`;

const VERIFY_ACCESS_TOKEN = gql`
  mutation accessTokenVerify($authorization: String) {
    accessTokenVerify(authorization: $authorization) {
      success
      message
    }
  }
`;

const useAuthorization = () => {
  const [verifyAccessToken] = useMutation<
    VerifyAccessTokenMutationResponse,
    VerifyAccessTokenInput
  >(VERIFY_ACCESS_TOKEN);

  return {
    isAuthenticated: async () => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const authorization = getAuthorization(accessToken);

      const { data } = await verifyAccessToken({
        variables: { authorization },
      });

      return (
        localStorage.getItem(ACCESS_TOKEN) !== null &&
        data?.accessTokenVerify?.success
      );
    },
  };
};

export default useAuthorization;
