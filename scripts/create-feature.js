// generate-feature-only.js
// Tạo cấu trúc tối thiểu cho 1 feature mới trong src/features/<feature>/
// KHÔNG tạo route trong app/, KHÔNG chỉnh tabs, KHÔNG sửa file cấu hình.
// Cách dùng:
//   node generate-feature-only.js playlist
//   node generate-feature-only.js user-profile

const fs = require("fs");
const path = require("path");

function toPascalCase(str) {
  return str.replace(/(^\w|[-_](\w))/g, (_, c) => c.replace(/[-_]/, "").toUpperCase());
}

function createFile(filePath, content) {
  if (fs.existsSync(filePath)) {
    console.log(`SKIP (exists): ${filePath}`);
    return false;
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`CREATE: ${filePath}`);
  return true;
}

function main() {
  const featureArg = process.argv[2];
  if (!featureArg) {
    console.error("❌ Vui lòng nhập tên feature. Ví dụ: node generate-feature-only.js playlist");
    process.exit(1);
  }

  const featureLower = featureArg.toLowerCase();
  const featurePascal = toPascalCase(featureArg);
  const baseDir = path.join(process.cwd(), "src", "features", featureLower);

  // Templates
  const screenTpl = `import { View, Text } from 'react-native';

export default function ${featurePascal}Screen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>${featurePascal} Screen</Text>
    </View>
  );
}
`;

  const componentTpl = `import { View, Text } from 'react-native';

export default function ${featurePascal}Item() {
  return (
    <View style={{ padding: 8 }}>
      <Text>${featurePascal} Item</Text>
    </View>
  );
}
`;

  const hookTpl = `import { useState } from 'react';

export function use${featurePascal}() {
  const [data, setData] = useState<any[]>([]);
  const fetchData = async () => {
    // TODO: implement fetch logic
  };
  return { data, fetchData };
}
`;

  const serviceTpl = ``;

  const typesTpl = ``;

  const indexTpl = `export { default as ${featurePascal}Screen } from './screens/${featurePascal}Screen';
export * from './hooks/use${featurePascal}';
export * from './services/${featureLower}.api';
export * from './types';
`;

  // Files
  const files = [
    [path.join(baseDir, "screens", `${featurePascal}Screen.tsx`), screenTpl],
    [path.join(baseDir, "components", `${featurePascal}Item.tsx`), componentTpl],
    [path.join(baseDir, "hooks", `use${featurePascal}.ts`), hookTpl],
    [path.join(baseDir, "services", `${featureLower}.api.ts`), serviceTpl],
    [path.join(baseDir, "types.ts`"), typesTpl], // backtick in name? fix next line
  ];

  // fix accidental backtick in types path
  files[4][0] = path.join(baseDir, "types.ts");

  files.push([path.join(baseDir, "index.ts"), indexTpl]);

  files.forEach(([fp, content]) => createFile(fp, content));

  console.log('\n✅ DONE: Feature "%s" đã được tạo tại %s', featureLower, baseDir);
  console.log("👉 Tiếp theo, tự thêm route nếu cần:");
  console.log("   - Vào tabs:   app/(tabs)/%s/index.tsx", featureLower);
  console.log("   - Route riêng: app/%s/index.tsx", featureLower);
}

main();
