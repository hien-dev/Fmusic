import { TextInput } from "react-native";

export function Input(props: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      {...props}
      style={[
        { borderWidth: 1, borderColor: "#ddd", padding: 12, borderRadius: 30 },
        props.style as any,
      ]}
    />
  );
}
