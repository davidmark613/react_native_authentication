import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../store/auth-context';
import axios from 'axios';

function WelcomeScreen() {
  const [message, setMessage] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function getMessage() {
      const response = await axios.get(`https://react-native-course-19bc0-default-rtdb.firebaseio.com/message.json?auth=${token}`);
      setMessage(response.data);
    }

    getMessage();
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});