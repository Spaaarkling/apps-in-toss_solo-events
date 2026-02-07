interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = '조건에 맞는 이벤트가 없습니다.' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="text-gray-600 mb-4"
      >
        <path
          d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 36c-8.837 0-16-7.163-16-16S15.163 8 24 8s16 7.163 16 16-7.163 16-16 16z"
          fill="currentColor"
          opacity="0.3"
        />
        <path
          d="M16 28c0 0 3 4 8 4s8-4 8-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
        <circle cx="18" cy="20" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="30" cy="20" r="2" fill="currentColor" opacity="0.5" />
      </svg>
      <p className="text-gray-500 text-sm">{message}</p>
      <p className="text-gray-600 text-xs mt-1">필터 조건을 변경해보세요</p>
    </div>
  );
}
