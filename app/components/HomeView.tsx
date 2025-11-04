import { ContentItem, WatchStatus } from '../types';
import ContentCard from './ContentCard';
import { Tv, Film, Clock, CheckCircle } from 'lucide-react';

interface HomeViewProps {
  watchList: ContentItem[];
  updateStatus: (id: string, status: WatchStatus) => void;
  removeFromWatchList: (id: string) => void;
}

export default function HomeView({ watchList, updateStatus, removeFromWatchList }: HomeViewProps) {
  const watching = watchList.filter(item => item.status === 'watching');
  const watched = watchList.filter(item => item.status === 'watched');
  const watchlist = watchList.filter(item => item.status === 'watchlist');

  const Section = ({ title, items, icon }: { title: string; items: ContentItem[]; icon: React.ReactNode }) => (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4 px-4">
        {icon}
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-gray-400 text-sm">({items.length})</span>
      </div>
      {items.length > 0 ? (
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 px-4 pb-2">
            {items.map(item => (
              <div key={item.id} className="flex-shrink-0 w-40">
                <ContentCard
                  item={item}
                  onStatusChange={updateStatus}
                  onRemove={removeFromWatchList}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm px-4">No items yet</p>
      )}
    </section>
  );

  return (
    <div className="pt-6 pb-6">
      <header className="px-4 mb-8">
        <h1 className="text-3xl font-bold mb-1">
          Show<span className="text-primary">Tracker</span>
        </h1>
        <p className="text-gray-400 text-sm">Track your favorite shows & movies</p>
      </header>

      <Section
        title="Currently Watching"
        items={watching}
        icon={<Clock className="text-primary" size={20} />}
      />

      <Section
        title="Watchlist"
        items={watchlist}
        icon={<Film className="text-primary" size={20} />}
      />

      <Section
        title="Watched"
        items={watched}
        icon={<CheckCircle className="text-primary" size={20} />}
      />
    </div>
  );
}
