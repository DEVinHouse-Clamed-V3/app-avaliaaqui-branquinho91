import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Avalia from "./pages/Avalia";
import Intro from "./pages/Intro";
import Lista from "./pages/Lista";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Introdução">
        <Stack.Screen
          name="Introdução"
          component={Intro}
          options={{
            headerStyle: {
              backgroundColor: "#CCC",
            },
          }}
        />

        <Stack.Screen
          name="Listagem"
          component={Lista}
          options={{
            headerStyle: {
              backgroundColor: "#CCC",
            },
          }}
        />

        <Stack.Screen
          name="Avaliação"
          component={Avalia}
          options={{
            headerStyle: {
              backgroundColor: "#CCC",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
