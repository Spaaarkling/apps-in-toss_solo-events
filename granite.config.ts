import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'solo-events', // 앱인토스 콘솔에서 설정한 앱 이름
  brand: {
    displayName: '솔로이벤트', // 화면에 노출될 앱의 한글 이름
    primaryColor: '#8B5CF6', // 앱의 기본 색상 (보라색)
    icon: '', // 콘솔에서 업로드한 이미지의 URL (나중에 추가)
  },
  web: {
    host: '172.30.1.22', // 실기기에서 접근 가능한 IP 주소
    port: 3000, // Next.js 기본 포트
    commands: {
      dev: 'next dev --hostname 0.0.0.0', // 외부 접근 허용
      build: 'next build',
    },
  },
  permissions: [],
});
