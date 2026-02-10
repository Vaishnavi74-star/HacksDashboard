import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/register': 'Register Participant',
  '/participants': 'Participants',
  '/teams': 'Team Management',
};

const AppHeader = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-8 glass">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground">Hackathon Command Center</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Quick search..."
            className="w-56 h-9 pl-9 pr-4 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            readOnly
          />
        </div>
        <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
          <span className="text-xs font-bold text-primary">AD</span>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
