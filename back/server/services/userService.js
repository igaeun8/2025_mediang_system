// 유저 정보 임시 저장
// 예시: In-memory user storage
const users = new Map();

export function getUser(userId) {
  return users.get(userId);
}

export function setUser(userId, data) {
  users.set(userId, data);
}
