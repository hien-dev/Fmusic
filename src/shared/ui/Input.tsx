import { forwardRef } from "react";
import { TextInput } from "react-native";

export const Input = forwardRef((props: React.ComponentProps<typeof TextInput>, ref: any) => {
  return (
    <TextInput
      ref={ref}
      {...props}
      style={[
        { borderWidth: 1, borderColor: "#ddd", padding: 12, borderRadius: 30 },
        props.style as any,
      ]}
    />
  );
});
