import { useState } from 'react';
import { ContentItem, WatchStatus } from '../types';
import { Star, MoreVertical, Trash2, Eye, Clock, Plus } from 'lucide-react';

interface ContentCardProps {
  item: ContentItem;
  onStatusChange?: (id: string, status: WatchStatus) => void;
  onRemove?: (id: string) => void;
  onAdd?: (item: ContentItem) => void;
}

export default function ContentCard({ item, onStatusChange, onRemove, onAdd }: ContentCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleStatusChange = (status: WatchStatus) => {
    if (onStatusChange) {
      onStatusChange(item.id, status);
    }
    setShowMenu(false);
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(item.id);
    }
    setShowMenu(false);
  };

  const handleAdd = () => {
    if (onAdd) {
      onAdd(item);
    }
  };

  return (
    <div className="relative group">
      <div className="bg-dark-100 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
        <div className="relative aspect-[2/3] bg-dark-300">
          {item.posterUrl ? (
            <img
              src={item.posterUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600">
              No Image
            </div>
          )}
          {item.nextEpisode && (
            <div className="absolute top-2 left-2 bg-primary px-2 py-1 rounded text-xs font-semibold">
              NEW
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="font-semibold text-sm mb-1 truncate">{item.title}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <span className="uppercase">{item.type}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Star size={12} className="text-primary fill-primary" />
              <span>{item.rating}</span>
            </div>
          </div>

          {item.nextEpisode && (
            <p className="text-xs text-primary">
              Next: {new Date(item.nextEpisode).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {onAdd ? (
        <button
          onClick={handleAdd}
          className="absolute top-2 right-2 bg-primary p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Plus size={16} />
        </button>
      ) : (
        <>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="absolute top-2 right-2 bg-dark-300/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical size={16} />
          </button>

          {showMenu && (
            <div className="absolute top-12 right-2 bg-dark-100 border border-gray-800 rounded-lg shadow-xl z-10 w-48">
              <button
                onClick={() => handleStatusChange('watching')}
                className="w-full px-4 py-3 text-left hover:bg-dark-300 flex items-center gap-2 text-sm"
              >
                <Clock size={16} className="text-primary" />
                Watching
              </button>
              <button
                onClick={() => handleStatusChange('watchlist')}
                className="w-full px-4 py-3 text-left hover:bg-dark-300 flex items-center gap-2 text-sm"
              >
                <Plus size={16} className="text-primary" />
                Watchlist
              </button>
              <button
                onClick={() => handleStatusChange('watched')}
                className="w-full px-4 py-3 text-left hover:bg-dark-300 flex items-center gap-2 text-sm"
              >
                <Eye size={16} className="text-primary" />
                Watched
              </button>
              <button
                onClick={handleRemove}
                className="w-full px-4 py-3 text-left hover:bg-dark-300 flex items-center gap-2 text-sm text-red-500 border-t border-gray-800"
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
