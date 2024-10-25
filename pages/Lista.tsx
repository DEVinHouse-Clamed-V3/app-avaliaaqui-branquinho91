import { useEffect, useState } from "react";
import { Text, Alert, FlatList, SafeAreaView, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

type Produto = {
  id: number;
  name: string;
  price: number;
  brand: string;
  description: string;
  image: string;
};

const Lista = ({ navigation }) => {
  const TelaAvalia = (productId) => navigation.navigate("Avaliação", { productId });

  const [products, setProducts] = useState<Produto[]>([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => {
        Alert.alert("Alguma coisa deu errado...");
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.containerBox}>
            <View style={styles.row}>
              <Image source={{ uri: item.image || "https://example.com/placeholder.png" }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>Produto {item.id}</Text>
                <Text style={styles.information}>Nome: {item.name}</Text>
                <Text style={styles.information}>Marca: {item.brand}</Text>
                <Text style={styles.information}>Descrição: {item.description}</Text>
                <Text style={styles.price}>Preço: {item.price}</Text>
                <TouchableOpacity style={styles.enterButton} onPress={() => TelaAvalia(item.id)}>
                  <Text style={styles.enterButtonText}>Avaliar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
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
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
    textAlign: "left",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 22,
    textAlign: "left",
  },
  information: {
    textAlign: "left",
    fontSize: 14,
    color: "#6d6d6d",
    marginBottom: 10,
  },
  price: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 14,
    color: "#6d6d6d",
  },
  enterButton: {
    backgroundColor: "#303030",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    width: 100,
  },
  enterButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Lista;
