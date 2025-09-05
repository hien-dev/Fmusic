import { Modal as RNModal, View } from "react-native";
export default function Modal({
  visible,
  children,
}: {
  visible: boolean;
  children: React.ReactNode;
}) {
  return (
    <RNModal visible={visible} animationType="fade" transparent>
      <View style={{ flex: 1, backgroundColor: "#0006", justifyContent: "center", padding: 24 }}>
        <View style={{ backgroundColor: "#fff", borderRadius: 12, padding: 16 }}>{children}</View>
      </View>
    </RNModal>
  );
}
