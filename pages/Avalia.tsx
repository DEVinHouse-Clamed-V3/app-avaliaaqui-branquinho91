import { useState } from "react";
import { Text, Alert, SafeAreaView, View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import axios from "axios";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const Avalia = ({ route }: any) => {
  const { productId } = route.params;
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [sentimento, setSentimento] = useState<string | null>(null);
  const [checkbox, setCheckbox] = useState(false);

  function handleCheck() {
    setCheckbox((prevState) => !prevState);
  }

  const handlePress = (value: string) => {
    setSentimento(value);
  };

  function handleSave() {
    if (nome === "" && email === "" && experiencia === "") {
      Alert.alert("Aviso", "Preencha as informações necessárias!");
    } else if (nome === "") {
      Alert.alert("Aviso", "O nome obrigatório!");
    } else if (email === "") {
      Alert.alert("Aviso", "O e-mail obrigatório!");
    } else if (experiencia === "") {
      Alert.alert("Aviso", "Descrever a experiência é obrigatório!");
    } else if (sentimento === null) {
      Alert.alert("Aviso", "Selecionar um sentimento é obrigatório!");
    } else {
      axios
        .post(`${apiUrl}/evaluations`, {
          productId: productId,
          name: nome,
          email: email,
          feedback: experiencia,
          experience: sentimento,
          recommend: checkbox,
        })
        .then(() => {
          Alert.alert("Aviso", "Cadastrado com sucesso");
        })
        .catch((error) => {
          Alert.alert("Error", "Não foi possível cadastrar experiência do usuário");
        });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nos dê seu Feedback!</Text>

      <Text style={styles.textAvalia}> Sua opnião é importante para nós. Por favor, compartilhe sua experiência! </Text>

      <View style={styles.containerBox}>
        <TextInput
          placeholder="Seu nome"
          placeholderTextColor="#000000"
          style={styles.input}
          keyboardType="name-phone-pad"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          placeholder="Seu e-mail"
          placeholderTextColor="#000000"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Descreva sua experiência..."
          placeholderTextColor="#000000"
          style={[styles.input, { height: 100 }]}
          onChangeText={setExperiencia}
        />

        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Compartilhe sua experiência abaixo:</Text>

        <BouncyCheckbox
          style={{ marginVertical: 15 }}
          size={20}
          fillColor="#000000"
          unFillColor="#FFFFFF"
          text="Recomendaria para outras pessoas?"
          iconStyle={{ borderColor: "#626262" }}
          innerIconStyle={{ borderWidth: 1, borderRadius: 8 }}
          textStyle={{ textDecorationLine: "none", right: 10 }}
          onPress={handleCheck}
        />

        <View style={styles.containerReact}>
          <TouchableOpacity style={[styles.buttonReact, sentimento === "Feliz" && styles.selectedButton]} onPress={() => handlePress("Feliz")}>
            <Text style={[styles.buttonTextReact, sentimento === "Feliz" && styles.selectedText]}>😊 Feliz</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonReact, sentimento === "Bom" && styles.selectedButton]} onPress={() => handlePress("Bom")}>
            <Text style={[styles.buttonTextReact, sentimento === "Bom" && styles.selectedText]}>🙂 Bom</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonReact, sentimento === "Médio" && styles.selectedButton]} onPress={() => handlePress("Médio")}>
            <Text style={[styles.buttonTextReact, sentimento === "Médio" && styles.selectedText]}>😐 Médio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonReact, sentimento === "Ruim" && styles.selectedButton]} onPress={() => handlePress("Ruim")}>
            <Text style={[styles.buttonTextReact, sentimento === "Ruim" && styles.selectedText]}>😞 Ruim</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.enterButton} onPress={handleSave}>
          <Text style={styles.enterButtonText}>Enviar FeedBack</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
  },
  textAvalia: {
    marginTop: 10,
    fontSize: 20,
    textAlign: "center",
  },
  containerBox: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#626262",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    color: "#000000",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  enterButton: {
    backgroundColor: "#0054ba",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    width: 200,
    alignSelf: "center",
  },
  enterButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  containerReact: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonReact: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
  },
  buttonTextReact: {
    fontSize: 16,
  },
  selectedButton: {
    backgroundColor: "#0054ba",
  },
  selectedText: {
    color: "#fff",
  },
});

export default Avalia;
