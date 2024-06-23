import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

interface ActionButtonProps extends TouchableOpacityProps {
  icon: keyof typeof Ionicons.glyphMap;
}

export function ActionButton({ icon, ...rest }: ActionButtonProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} {...rest}>
        <Ionicons name={icon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}
