import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity } from "react-native";

const Intro = ({ navigation }: any) => {
  const TelaLista = () => navigation.navigate("Listagem");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Avalie Aqui Seu Produto</Text>

      <View style={styles.containerBox}>
        <Text style={styles.textIntro}>Escolha o produto que deseja avaliar e compartilhe sua experiência com outros consumidores</Text>
      </View>

      <TouchableOpacity style={styles.enterButton} onPress={TelaLista}>
        <Text style={styles.enterButtonText}>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  title: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
  },
  textIntro: {
    margin: 10,
    fontSize: 20,
    textAlign: "center",
  },
  enterButton: {
    backgroundColor: "#303030",
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
});

export default Intro;
