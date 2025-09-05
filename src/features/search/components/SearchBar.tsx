import { View, ActivityIndicator } from "react-native";
import Input from "../../../shared/ui/Input";

export default function SearchBar({
  value,
  onChange,
  loading,
}: {
  value: string;
  onChange: (v: string) => void;
  loading?: boolean;
}) {
  return (
    <View style={{ flexDirection: "row", gap: 8, alignItems: "center", marginBottom: 12 }}>
      <View style={{ flex: 1 }}>
        <Input placeholder="Search..." value={value} onChangeText={onChange} />
      </View>
      {loading ? <ActivityIndicator /> : null}
    </View>
  );
}
