import { useEffect, useState } from "react";
import { initializeDb } from "@/services/db";
import { SafeAreaView, Text } from "react-native";
import List from "./list";

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const setup = async () => {
      await initializeDb();
      setDbInitialized(true);
    };

    setup();
  }, []);

  if (!dbInitialized) {
    return (
      <SafeAreaView>
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return <List />;
}
