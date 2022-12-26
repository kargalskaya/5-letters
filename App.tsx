import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, TextInput, Text } from 'react-native';

function usePrevious<T>(value: T) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;

}
export default function App() {
  const aimWord = 'слово'.toUpperCase();
  const [text, changeText] = useState("");
  const [count, setCount] = useState(0);
  const [words, onAddWord] = useState([]);
  const [chars, charsChange] = useState([]);
  const prevText = usePrevious(text);
  const prevCount = usePrevious(count);

  useEffect(() => {
    if (prevText?.length < text.length) {
      const position = chars.length;
      if (chars.length === aimWord.lenght) {
        return
      };
      
      const symbol = text[text.length - 1].toUpperCase();
      const char = {
        symbol: symbol,
        exist: Boolean(aimWord.match(symbol)),
        onPlace: aimWord[position] === symbol,
      }
      charsChange([...chars, char]);
    }
    if (prevText?.length > text.length) {
      charsChange(chars.slice(0, chars.length - 1));
    }

  }, [text]); 

  const handleCheckButton = () => {
    if (prevCount < 6) {
      setCount((prevCount || 0) + 1);
      onAddWord([...words, chars]);
      charsChange([]);
      changeText('');
    }
  }
  const handleChangeWord = (text: string) => {
    changeText(text.toUpperCase())
  }

  return (
    <View style={styles.container}>
      <>
        {words?.map((word: TInsertedSymbol[], j: number) => <Text style={styles.results} key={'key' + j}>
          {word.map((char: TInsertedSymbol, i: number) => {
            if (char.onPlace) {
              return <Text key={'key' + j + 'symbol' + i} style={styles.onPlaceChar}>{char.symbol}</Text>
            }
            if (char.exist) {
              return <Text key={'key' + j + 'symbol' + i} style={styles.existsChar}>{char.symbol}</Text>
            }
            return <Text key={'key' + j + 'symbol' + i}>{char.symbol}</Text>
          })}
        </Text>)}
        <TextInput
          style={styles.input}
          onChangeText={handleChangeWord}
          value={text}
          maxLength={5}
        />
        <Button
          onPress={handleCheckButton}
          title="V"
          color="#841584"
          disabled={chars.length !== 5}
          accessibilityLabel="Проверить слово"
        />
      </>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  textWrap: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#ff0',
    color: '#000',
    height: 40,
    width: 150,
    margin: 0,
    borderWidth: 0,
    textAlign: 'center',
    fontSize: 25,
    letterSpacing: 10,
    fontFamily: 'Courier New',
    textTransform: 'uppercase'
  },
  results: {
    fontSize: 25,
    width: 150,
    letterSpacing: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Courier New',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#fff',
    fontWeight: '900',
  },
  onPlaceChar: {
    color: '#f00',
  },
  existsChar: {
    color: '#0f0',
  },
});
