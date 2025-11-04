import { useState } from 'react';
import { ContentItem } from '../types';
import ContentCard from './ContentCard';
import { Search, Sparkles } from 'lucide-react';

interface DiscoverViewProps {
  addToWatchList: (item: ContentItem) => void;
  watchList: ContentItem[];
}

export default function DiscoverView({ addToWatchList, watchList }: DiscoverViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Curated recommendations based on popular content
  const recommendations: ContentItem[] = [
    {
      id: 'rec-1',
      title: 'Succession',
      type: 'tv',
      status: 'watchlist',
      posterUrl: 'https://image.tmdb.org/t/p/w500/7HW47XbkNQ5fiwQFYGWdw9gs144.jpg',
      releaseDate: '2018-06-03',
      rating: 8.9,
      genres: ['Drama'],
      overview: 'The Roy family fights for control of their media empire',
    },
    {
      id: 'rec-2',
      title: 'The White Lotus',
      type: 'tv',
      status: 'watchlist',
      posterUrl: 'https://image.tmdb.org/t/p/w500/gH5i3JbnLsyTvcImlofNvXtH3i5.jpg',
      releaseDate: '2021-07-11',
      rating: 7.9,
      genres: ['Drama', 'Comedy'],
      overview: 'Social satire set at an exclusive Hawaiian resort',
    },
    {
      id: 'rec-3',
      title: 'Poor Things',
      type: 'movie',
      status: 'watchlist',
      posterUrl: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
      releaseDate: '2023-12-08',
      rating: 7.8,
      genres: ['Science Fiction', 'Comedy'],
      overview: 'A young woman brought back to life embarks on an adventure',
    },
    {
      id: 'rec-4',
      title: 'True Detective',
      type: 'tv',
      status: 'watchlist',
      posterUrl: 'https://image.tmdb.org/t/p/w500/cuTS5zzmGRfaL357ndmJ1G0eBLS.jpg',
      releaseDate: '2014-01-12',
      rating: 8.9,
      genres: ['Crime', 'Drama', 'Mystery'],
      overview: 'Police investigations unfolding across different time periods',
    },
    {
      id: 'rec-5',
      title: 'The Zone of Interest',
      type: 'movie',
      status: 'watchlist',
      posterUrl: 'https://image.tmdb.org/t/p/w500/hUu9ifyZQUfcROfymsARPisMiJ8.jpg',
      releaseDate: '2023-12-15',
      rating: 7.4,
      genres: ['Drama', 'War', 'History'],
      overview: 'A commandant and his family living beside Auschwitz',
    },
    {
      id: 'rec-6',
      title: 'Severance',
      type: 'tv',
      status: 'watchlist',
      posterUrl: 'https://image.tmdb.org/t/p/w500/fTXmc7vPB5LhKr0IfcVaoDTHqKu.jpg',
      releaseDate: '2022-02-18',
      rating: 8.7,
      genres: ['Drama', 'Mystery', 'Sci-Fi'],
      overview: 'Employees have their memories surgically divided between work and home',
      nextEpisode: '2025-11-25',
    },
    {
      id: 'rec-7',
      title: 'Killers of the Flower Moon',
      type: 'movie',
      status: 'watchlist',
      posterUrl: 'https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg',
      releaseDate: '2023-10-20',
      rating: 7.6,
      genres: ['Crime', 'Drama', 'History'],
      overview: 'Members of the Osage tribe are murdered under mysterious circumstances',
    },
    {
      id: 'rec-8',
      title: 'Fallout',
      type: 'tv',
      status: 'watchlist',
      posterUrl: 'https://image.tmdb.org/t/p/w500/AnsSKR9LuK0T9bAOcPVA3PUvyWj.jpg',
      releaseDate: '2024-04-10',
      rating: 8.3,
      genres: ['Sci-Fi', 'Action'],
      overview: 'Post-apocalyptic survivors emerge from underground bunkers',
      nextEpisode: '2025-12-01',
    },
  ];

  const filteredRecommendations = recommendations.filter(item => {
    const alreadyInList = watchList.some(w => w.id === item.id);
    if (alreadyInList) return false;

    if (!searchQuery) return true;
    return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const handleAdd = (item: ContentItem) => {
    const newItem = { ...item, status: 'watchlist' as const };
    addToWatchList(newItem);
  };

  return (
    <div className="pt-6 pb-6">
      <header className="px-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-primary" size={28} />
          <h1 className="text-3xl font-bold">Discover</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search shows & movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-100 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary"
          />
        </div>
      </header>

      <section className="px-4">
        <h2 className="text-lg font-semibold mb-4">Recommended For You</h2>
        <div className="grid grid-cols-2 gap-4">
          {filteredRecommendations.map(item => (
            <div key={item.id}>
              <ContentCard
                item={item}
                onAdd={handleAdd}
              />
            </div>
          ))}
        </div>

        {filteredRecommendations.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            {searchQuery ? 'No results found' : 'All recommendations added!'}
          </p>
        )}
      </section>
    </div>
  );
}
