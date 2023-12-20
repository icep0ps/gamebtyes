import Remove from '@/components/common/Remove';
import Posts from '@/components/common/Posts/Posts';
import Filter from '@/components/common/Filter/Filter';

export default async function Home() {
  return (
    <>
      <h1 className="text-2xl">Latest news</h1>
      <div className="flex gap-5 items-center">
        <Remove />
        <Filter name="PC Gaming" />
        <Filter name="Mobile Gaming" />
        <Filter name="Console Gaming" />
      </div>
      <Posts />
    </>
  );
}
