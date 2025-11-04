'use client';

import { useState, useEffect } from 'react';
import { Home, Calendar, Bell, Compass, Plus } from 'lucide-react';
import HomeView from './components/HomeView';
import CalendarView from './components/CalendarView';
import DiscoverView from './components/DiscoverView';
import NotificationsView from './components/NotificationsView';
import { ContentItem, WatchStatus } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [watchList, setWatchList] = useState<ContentItem[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const saved = localStorage.getItem('watchList');
    if (saved) {
      setWatchList(JSON.parse(saved));
    } else {
      // Initialize with sample data
      const sampleData: ContentItem[] = [
        {
          id: '1',
          title: 'Breaking Bad',
          type: 'tv',
          status: 'watched',
          posterUrl: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
          releaseDate: '2008-01-20',
          rating: 9.5,
          genres: ['Crime', 'Drama', 'Thriller'],
          overview: 'A high school chemistry teacher turned meth producer',
        },
        {
          id: '2',
          title: 'The Last of Us',
          type: 'tv',
          status: 'watching',
          posterUrl: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg',
          releaseDate: '2023-01-15',
          rating: 8.8,
          genres: ['Drama', 'Sci-Fi'],
          overview: 'After a global pandemic, a hardened survivor must escort a young girl',
          nextEpisode: '2025-11-15',
        },
        {
          id: '3',
          title: 'Dune: Part Two',
          type: 'movie',
          status: 'watchlist',
          posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
          releaseDate: '2024-03-01',
          rating: 8.7,
          genres: ['Science Fiction', 'Adventure'],
          overview: 'Paul Atreides unites with Chani and the Fremen',
        },
        {
          id: '4',
          title: 'The Bear',
          type: 'tv',
          status: 'watching',
          posterUrl: 'https://image.tmdb.org/t/p/w500/zCc0yA4lx3f0gDsMHFrPiU4jyPv.jpg',
          releaseDate: '2022-06-23',
          rating: 8.5,
          genres: ['Drama', 'Comedy'],
          overview: 'A young chef returns to Chicago to run his family restaurant',
          nextEpisode: '2025-11-20',
        },
        {
          id: '5',
          title: 'Oppenheimer',
          type: 'movie',
          status: 'watched',
          posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
          releaseDate: '2023-07-21',
          rating: 8.4,
          genres: ['Drama', 'History'],
          overview: 'The story of American scientist J. Robert Oppenheimer',
        },
      ];
      setWatchList(sampleData);
      localStorage.setItem('watchList', JSON.stringify(sampleData));
    }

    // Generate notifications
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  useEffect(() => {
    if (watchList.length > 0) {
      localStorage.setItem('watchList', JSON.stringify(watchList));

      // Generate notifications for upcoming content
      const upcomingNotifs = watchList
        .filter(item => item.nextEpisode || (item.status === 'watchlist' && item.releaseDate))
        .map(item => ({
          id: `notif-${item.id}`,
          itemId: item.id,
          title: item.title,
          message: item.nextEpisode
            ? `New episode coming ${new Date(item.nextEpisode).toLocaleDateString()}`
            : `Releases on ${new Date(item.releaseDate).toLocaleDateString()}`,
          date: item.nextEpisode || item.releaseDate,
          type: item.type,
          read: false,
        }));

      setNotifications(upcomingNotifs);
      localStorage.setItem('notifications', JSON.stringify(upcomingNotifs));
    }
  }, [watchList]);

  const addToWatchList = (item: ContentItem) => {
    setWatchList(prev => [...prev, item]);
  };

  const updateStatus = (id: string, status: WatchStatus) => {
    setWatchList(prev =>
      prev.map(item => (item.id === id ? { ...item, status } : item))
    );
  };

  const removeFromWatchList = (id: string) => {
    setWatchList(prev => prev.filter(item => item.id !== id));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  return (
    <main className="min-h-screen pb-20 bg-dark-200">
      {activeTab === 'home' && (
        <HomeView
          watchList={watchList}
          updateStatus={updateStatus}
          removeFromWatchList={removeFromWatchList}
        />
      )}
      {activeTab === 'calendar' && <CalendarView watchList={watchList} />}
      {activeTab === 'discover' && <DiscoverView addToWatchList={addToWatchList} watchList={watchList} />}
      {activeTab === 'notifications' && (
        <NotificationsView
          notifications={notifications}
          markAsRead={markNotificationRead}
        />
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-dark-100 border-t border-gray-800 z-50">
        <div className="flex justify-around items-center h-16 max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === 'home' ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === 'discover' ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <Compass size={24} />
            <span className="text-xs mt-1">Discover</span>
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === 'calendar' ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <Calendar size={24} />
            <span className="text-xs mt-1">Calendar</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors relative ${
              activeTab === 'notifications' ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <Bell size={24} />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute top-2 right-1/4 w-2 h-2 bg-primary rounded-full" />
            )}
            <span className="text-xs mt-1">Alerts</span>
          </button>
        </div>
      </nav>
    </main>
  );
}
