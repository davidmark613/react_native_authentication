import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import { login } from '../utils/auth';
import { AuthContext } from '../store/auth-context';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { authenticate } = useContext(AuthContext);

  async function loginHandler({email, password}) {
    setIsLoading(true);
    try {
      const token = await login(email, password);
      authenticate(token);
    } catch (err) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!',
      );
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message="Loading..." />
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;