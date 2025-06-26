import { queryClient } from "./queryClient";
import { appwriteUserQueryKeys } from "./useAppwriteUser";
import { userQueryKeys } from "./useCurrentUser";
import { jwtQueryKeys } from "./useJWT";

/**
 * Refresh all auth-related data
 * Can be used anywhere - components or regular functions
 * Replaces the refreshUser function from AuthContext
 */
export const refreshAuthData = async () => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: appwriteUserQueryKeys.all }),
    queryClient.invalidateQueries({ queryKey: userQueryKeys.all }),
    queryClient.invalidateQueries({ queryKey: jwtQueryKeys.all }),
  ]);
};
