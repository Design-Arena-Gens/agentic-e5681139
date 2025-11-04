import { ContentItem } from '../types';
import { format, addDays, startOfWeek, isSameDay, parseISO } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

interface CalendarViewProps {
  watchList: ContentItem[];
}

export default function CalendarView({ watchList }: CalendarViewProps) {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const days = Array.from({ length: 14 }, (_, i) => addDays(weekStart, i));

  const getItemsForDate = (date: Date) => {
    return watchList.filter(item => {
      if (item.nextEpisode) {
        return isSameDay(parseISO(item.nextEpisode), date);
      }
      if (item.status === 'watchlist' && item.releaseDate) {
        return isSameDay(parseISO(item.releaseDate), date);
      }
      return false;
    });
  };

  return (
    <div className="pt-6 pb-6">
      <header className="px-4 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <CalendarIcon className="text-primary" size={28} />
          <h1 className="text-3xl font-bold">Calendar</h1>
        </div>
        <p className="text-gray-400 text-sm">Upcoming releases & episodes</p>
      </header>

      <div className="px-4 space-y-4">
        {days.map(day => {
          const items = getItemsForDate(day);
          const isToday = isSameDay(day, today);
          const isPast = day < today && !isToday;

          return (
            <div
              key={day.toISOString()}
              className={`border-l-4 pl-4 ${
                isToday
                  ? 'border-primary'
                  : items.length > 0
                  ? 'border-primary/50'
                  : 'border-gray-800'
              } ${isPast ? 'opacity-50' : ''}`}
            >
              <div className="flex items-baseline gap-3 mb-2">
                <h3 className="text-lg font-semibold">
                  {format(day, 'EEEE')}
                </h3>
                <span className="text-sm text-gray-400">
                  {format(day, 'MMM d, yyyy')}
                </span>
                {isToday && (
                  <span className="text-xs bg-primary px-2 py-1 rounded">TODAY</span>
                )}
              </div>

              {items.length > 0 ? (
                <div className="space-y-2">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="bg-dark-100 rounded-lg p-3 flex gap-3"
                    >
                      <div className="w-12 h-16 rounded overflow-hidden bg-dark-300 flex-shrink-0">
                        {item.posterUrl && (
                          <img
                            src={item.posterUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{item.title}</h4>
                        <p className="text-xs text-gray-400 uppercase">{item.type}</p>
                        <p className="text-xs text-primary mt-1">
                          {item.nextEpisode ? 'New Episode' : 'Release Date'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No releases</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
