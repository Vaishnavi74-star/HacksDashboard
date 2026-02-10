import { Users, UserCheck, UserX, Layers } from 'lucide-react';
import { Participant, Team } from '@/types/hackathon';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';

const DashboardPage = () => {
  const [participants] = useLocalStorage<Participant[]>('hackathon-participants', []);
  const [teams] = useLocalStorage<Team[]>('hackathon-teams', []);

  const totalParticipants = participants.length;
  const checkedIn = participants.filter(p => p.checkInStatus === 'Checked-In').length;
  const checkedOut = participants.filter(p => p.checkInStatus === 'Checked-Out').length;
  const totalTeams = teams.length;

  const trackCounts = participants.reduce<Record<string, number>>((acc, p) => {
    acc[p.track] = (acc[p.track] || 0) + 1;
    return acc;
  }, {});

  const recentParticipants = [...participants].reverse().slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Hero */}
      <div className="glass-card rounded-2xl p-8 gradient-border overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <h1 className="text-3xl font-bold">
            Welcome to <span className="gradient-text">HackDash</span>
          </h1>
          <p className="text-muted-foreground mt-2 max-w-lg">
            Your command center for managing hackathon participants, teams, and check-ins. Everything updates in real-time.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Participants" value={totalParticipants} icon={Users} accent="primary" />
        <StatCard title="Checked In" value={checkedIn} icon={UserCheck} accent="success" />
        <StatCard title="Checked Out" value={checkedOut} icon={UserX} accent="destructive" />
        <StatCard title="Teams" value={totalTeams} icon={Layers} accent="accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Participants */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Recent Registrations</h3>
          {recentParticipants.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No participants yet. Register your first one!</p>
          ) : (
            <div className="space-y-3">
              {recentParticipants.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.track}</p>
                    </div>
                  </div>
                  <StatusBadge status={p.checkInStatus} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Track Distribution */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Track Distribution</h3>
          {Object.keys(trackCounts).length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No data yet.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(trackCounts).map(([track, count]) => (
                <div key={track}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{track}</span>
                    <span className="font-medium text-foreground">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${totalParticipants > 0 ? (count / totalParticipants) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
