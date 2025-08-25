export default function detail({ params }: { params: { userId: string } }) {
  return <div>page {params.userId}</div>;
}
