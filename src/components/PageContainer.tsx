type PageContainerProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function PageContainer({
  title,
  description,
  children,
}: PageContainerProps) {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-gray-600">
            {description}
          </p>
        )}
      </header>

      {children}
    </main>
  );
}