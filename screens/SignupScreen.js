import { useState, useContext } from 'react';
import { createUser } from '../utils/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { authenticate } = useContext(AuthContext);

  async function signupHandler({email, password}) {
    setIsLoading(true);
    try {
      const token = await createUser(email, password);
      authenticate(token);
    } catch (err) {
      Alert.alert(
        'Authentication failed!',
        'Could not create user, please check your input and try again later.',
      );
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message='Loading...' />
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;