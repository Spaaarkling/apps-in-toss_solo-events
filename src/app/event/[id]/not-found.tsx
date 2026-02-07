import Link from 'next/link';

export default function EventNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-4 text-center">
      <p className="text-5xl mb-4">?</p>
      <h2 className="text-lg font-bold text-white mb-2">이벤트를 찾을 수 없습니다</h2>
      <p className="text-sm text-gray-500 mb-6">
        삭제되었거나 잘못된 링크일 수 있습니다.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-xl text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
