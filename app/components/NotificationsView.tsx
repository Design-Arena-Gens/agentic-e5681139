import { Bell, Tv, Film } from 'lucide-react';
import { Notification } from '../types';

interface NotificationsViewProps {
  notifications: Notification[];
  markAsRead: (id: string) => void;
}

export default function NotificationsView({ notifications, markAsRead }: NotificationsViewProps) {
  const sortedNotifications = [...notifications].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="pt-6 pb-6">
      <header className="px-4 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Bell className="text-primary" size={28} />
          <h1 className="text-3xl font-bold">Notifications</h1>
        </div>
        <p className="text-gray-400 text-sm">
          Stay updated on your content
        </p>
      </header>

      <div className="px-4 space-y-2">
        {sortedNotifications.length > 0 ? (
          sortedNotifications.map(notif => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`bg-dark-100 rounded-lg p-4 border-l-4 cursor-pointer transition-all ${
                notif.read
                  ? 'border-gray-800 opacity-60'
                  : 'border-primary hover:bg-dark-300'
              }`}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  {notif.type === 'tv' ? (
                    <Tv className="text-primary" size={24} />
                  ) : (
                    <Film className="text-primary" size={24} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1">{notif.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{notif.message}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{new Date(notif.date).toLocaleDateString()}</span>
                    {!notif.read && (
                      <>
                        <span>•</span>
                        <span className="text-primary">New</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Bell className="mx-auto mb-4 text-gray-600" size={48} />
            <p className="text-gray-500">No notifications yet</p>
            <p className="text-sm text-gray-600 mt-2">
              Add shows to your watchlist to get notified
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
