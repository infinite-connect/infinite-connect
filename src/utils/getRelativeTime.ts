export function getRelativeTime(createdAt: string | Date): string {
  const createdTime = new Date(createdAt).getTime();
  const now = Date.now();
  const diffInSeconds = (now - createdTime) / 1000; // 초 단위 차이

  if (diffInSeconds < 60) {
    return '방금';
  } else if (diffInSeconds < 3600) {
    // 60초 * 60 = 3600초 => 1시간 미만
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  } else if (diffInSeconds < 86400) {
    // 3600 * 24 = 86400초 => 1일 미만
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  } else if (diffInSeconds < 604800) {
    // 86400 * 7 = 604800초 => 1주 미만
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일 전`;
  } else {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks}주 전`;
  }
}
