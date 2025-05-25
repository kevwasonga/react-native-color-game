import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const colors = [
  { name: 'Red', hex: '#E63946' },
  { name: 'Green', hex: '#2A9D8F' },
  { name: 'Blue', hex: '#457B9D' },
  { name: 'Purple', hex: '#7209B7' },
  { name: 'Orange', hex: '#F4A261' },
  { name: 'Pink', hex: '#F72585' },
];

export default function App() {
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState('#fff');
  const [currentColor, setCurrentColor] = useState(null);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCurrentColor(randomColor);
    setBgColor('#fff'); // Reset background
    setGuess('');
    setMessage('');
    setGameStarted(true);
  };

  const checkGuess = () => {
    if (!guess.trim()) {
      setMessage('🚫 Please enter a guess!');
      return;
    }

    if (guess.trim().toLowerCase() === currentColor.name.toLowerCase()) {
      setMessage(`✅ Spot on! It was ${currentColor.name}.`);
      setBgColor(currentColor.hex);
    } else {
      setMessage(`❌ Nope! It was actually ${currentColor.name}.`);
      setBgColor(currentColor.hex);
    }

    setGameStarted(false); // End current round
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.title}>🎨 Welcome to the Color Game!</Text>

      <TextInput
        placeholder="Enter your name"
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
        placeholderTextColor="#555"
      />

      {name ? (
        <Text style={styles.greeting}>Hey {name}, can you guess the color?</Text>
      ) : null}

      {gameStarted ? (
        <>
          <TextInput
            placeholder="Type your guess (e.g., Red)"
            style={styles.input}
            onChangeText={(text) => setGuess(text)}
            value={guess}
            placeholderTextColor="#555"
          />

          <TouchableOpacity style={styles.button} onPress={checkGuess}>
            <Text style={styles.buttonText}>Submit Guess</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={startGame}>
          <Text style={styles.buttonText}>
            {currentColor ? 'Play Again' : 'Start Game'}
          </Text>
        </TouchableOpacity>
      )}

      {message !== '' && <Text style={styles.result}>{message}</Text>}

      <Text style={styles.footer}>👨‍💻 Developed by Verdo</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 30,
    color: '#000',
  },
  input: {
    height: 50,
    width: '90%',
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 18,
    color: '#000',
  },
  greeting: {
    fontSize: 20,
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 25,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  result: {
    fontSize: 20,
    color: '#222',
    fontWeight: '500',
    marginTop: 15,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    fontSize: 14,
    color: '#444',
  },
});
