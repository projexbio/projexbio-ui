export default function CollegePage({
  params,
}: {
  params: { name: string };
}) {
  return (
    <div>
      <h1>College: {params.name}</h1>
    </div>
  );
} 