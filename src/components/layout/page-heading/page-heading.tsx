type PageHeadingProps = Readonly<{
  title: string;
}>;

export default function PageHeading({ title }: PageHeadingProps) {
  return (
    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
      {title}
    </h2>
  );
}
