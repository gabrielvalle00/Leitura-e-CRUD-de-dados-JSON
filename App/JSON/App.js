import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import api from './src/service/api';

export default function App() {
  const [dados, setDados] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const selecionarArquivo = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync();
      
      if (resultado.canceled) {
        console.log('Busca de arquivo cancelada!');
        setDados(null);
        return;
      }

      const { assets: [{ mimeType, uri }] } = resultado;
      
      if (mimeType !== 'application/json') {
        setErrorMessage('O arquivo selecionado não é do tipo JSON');
        setDados(null);
        return;
      }

      const conteudo = await FileSystem.readAsStringAsync(uri);
      const dadosJSON = JSON.parse(conteudo);
      setDados(dadosJSON);
    } catch (error) {
      console.error('Erro ao selecionar o arquivo:', error);
      setErrorMessage('Erro ao selecionar o arquivo. Por favor, tente novamente.');
    }
  };

  const handleInserirDados = async () => {
    try {
      const resposta = await api.post('/cadastro/novo', dados);
  
      if (resposta.status === 200) {
        Alert.alert('Dados inseridos no banco de dados com sucesso!');
        setDados(null);
        setErrorMessage(null); 

      } else {

        const errorMessage = await resposta.text();
        console.error('Erro ao inserir dados:', errorMessage);
        setErrorMessage(`Erro ao inserir dados no banco de dados: ${errorMessage}`);

      }
    } catch (error) {

      console.error('Erro ao inserir dados:', error);
      Alert.alert('Erro', 'CPF já possui cadastro!');
      
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLargura}>
        <View style={styles.topo}>
          <Text style={styles.titleConteudo}>Leitura de arquivo JSON</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={selecionarArquivo}>
          <Text style={styles.buttonText}>Selecionar Arquivo</Text>
        </TouchableOpacity>

        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

        {dados ? (
          <View>
            <TextInput style={styles.textInput} value={dados.nome} placeholder="Nome" />
            <TextInput style={styles.textInput} value={dados.cpf} placeholder="CPF" />
            <TextInput style={styles.textInput} value={dados.genero} placeholder="Gênero" />
            <TextInput style={styles.textInput} value={dados.data_nasc} placeholder="Data de Nasc." />
            <TextInput style={styles.textInput} value={dados.email} placeholder="E-mail" />
            <TextInput style={styles.textInput} value={dados.telefone} placeholder="Telefone" />

            <TouchableOpacity style={styles.button} onPress={handleInserirDados}>
              <Text style={styles.buttonText}>Inserir no Banco de Dados</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.placeholderText}>Nenhum arquivo selecionado</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Azul ciano claro
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLargura: {
    width: '95%',
    alignItems: 'center',
  },
  titleConteudo: {
    fontSize: 24, // Tamanho aumentado
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4096F7', // Azul ciano
  },
  textInput: {
    width: '100%',
    height: 45,
    padding: 10,
    fontSize: 18, // Tamanho aumentado
    marginBottom: 10,
    color: '#333', // Cor escura
    borderWidth: 1,
    borderColor: '#4096F7', // Azul ciano
    borderRadius: 8,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    backgroundColor: "#4096F7",
    borderRadius: 8,
    elevation: 5,
    padding: 10,
    marginTop: 25,
    marginBottom: 25
  },
  buttonText: {
    color: '#fff',
    fontSize: 18, // Tamanho aumentado
    fontWeight: 'bold',
  },
  placeholderText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18, // Tamanho aumentado
    color: '#666',
  },
  topo:{
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 20,
  },
  errorMessage: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 10,
  },
});
