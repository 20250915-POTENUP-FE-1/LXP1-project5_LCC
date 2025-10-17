export function generateId() {
  const ts = Date.now().toString(36);              // 시간 기반
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .slice(1);                     // 4hex
  // 예: kx7gqb1y-3f2a-9c1d-b7e8-1a2b3c4d
  return `${ts}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}`;
}