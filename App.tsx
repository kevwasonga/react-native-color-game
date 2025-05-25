import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

export default function App() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [colors, setColors] = useState([]);
  const [correctColor, setCorrectColor] = useState('');
  const [message, setMessage] = useState('');

  const generateColors = () => {
    const newColors = Array.from({ length: 3 }, () => getRandomColor());
    const answer = newColors[Math.floor(Math.random() * newColors.length)];
    setColors(newColors);
    setCorrectColor(answer);
    setMessage('');
  };

  useEffect(() => {
    if (submitted) generateColors();
  }, [submitted]);

  const handleGuess = (color) => {
    if (color === correctColor) {
      setMessage(`Congratulations!!, ${name}! You guessed the correct color.`);
    } else {
      setMessage(`Miss!!, ${name}, that's not it. Try again!`);
    }
  };

  if (!submitted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome! What's your name?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (name.trim() !== '') {
              setSubmitted(true);
            }
          }}
        >
          <Text style={styles.buttonText}>Start Game 🎮</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Developed by Verdo</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hey {name}, guess the color!</Text>
      <Text style={styles.rgbText}>{correctColor.toUpperCase()}</Text>
      <View style={styles.blocksContainer}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleGuess(color)}
            style={[styles.colorBlock, { backgroundColor: color }]}
          />
        ))}
      </View>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={generateColors}>
        <Text style={styles.buttonText}>🔄 Try New Color</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Developed by Verdo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    width: '100%',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#333',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  rgbText: {
    fontSize: 22,
    marginVertical: 10,
  },
  blocksContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  colorBlock: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 10,
  },
  message: {
    fontSize: 20,
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
  },
});
