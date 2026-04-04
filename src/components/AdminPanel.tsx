import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Judge, HackathonEvent } from '@/types/hackathon';
import { useAdmin } from '@/contexts/AdminContext';
import { Settings } from 'lucide-react';

const AdminPanel = () => {
  const { adminName, setAdminName, judges, setJudges, events, setEvents } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);

  const updateJudge = (index: number, field: keyof Judge, value: string) => {
    const newJudges = [...judges];
    newJudges[index] = { ...newJudges[index], [field]: value };
    if (field === 'name') {
      // Update initials based on name
      const initials = value.split(' ').map(n => n[0]).join('').toUpperCase();
      newJudges[index].initials = initials;
    }
    setJudges(newJudges);
  };

  const addJudge = () => {
    setJudges([...judges, { name: '', role: '', bio: '', initials: '' }]);
  };

  const removeJudge = (index: number) => {
    setJudges(judges.filter((_, i) => i !== index));
  };

  const updateEvent = (index: number, field: keyof HackathonEvent, value: string) => {
    const newEvents = [...events];
    newEvents[index] = { ...newEvents[index], [field]: value };
    setEvents(newEvents);
  };

  const addEvent = () => {
    setEvents([...events, { title: '', date: '', desc: '', iconName: 'Calendar' }]);
  };

  const removeEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Admin Panel</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="judges">Judges</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4">
            <div className="border rounded-lg p-4 space-y-2">
              <h4 className="font-semibold">Organization Settings</h4>
              <div>
                <Label htmlFor="admin-name">Organization Name</Label>
                <Input
                  id="admin-name"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="Enter organization name"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="judges" className="space-y-4">
            {judges.map((judge, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Judge {index + 1}</h4>
                  <Button variant="destructive" size="sm" onClick={() => removeJudge(index)}>
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor={`judge-name-${index}`}>Name</Label>
                    <Input
                      id={`judge-name-${index}`}
                      value={judge.name}
                      onChange={(e) => updateJudge(index, 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`judge-role-${index}`}>Role</Label>
                    <Input
                      id={`judge-role-${index}`}
                      value={judge.role}
                      onChange={(e) => updateJudge(index, 'role', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor={`judge-bio-${index}`}>Bio</Label>
                  <Textarea
                    id={`judge-bio-${index}`}
                    value={judge.bio}
                    onChange={(e) => updateJudge(index, 'bio', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <Button onClick={addJudge}>Add Judge</Button>
          </TabsContent>
          <TabsContent value="events" className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Event {index + 1}</h4>
                  <Button variant="destructive" size="sm" onClick={() => removeEvent(index)}>
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor={`event-title-${index}`}>Title</Label>
                    <Input
                      id={`event-title-${index}`}
                      value={event.title}
                      onChange={(e) => updateEvent(index, 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`event-date-${index}`}>Date</Label>
                    <Input
                      id={`event-date-${index}`}
                      value={event.date}
                      onChange={(e) => updateEvent(index, 'date', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor={`event-desc-${index}`}>Description</Label>
                  <Textarea
                    id={`event-desc-${index}`}
                    value={event.desc}
                    onChange={(e) => updateEvent(index, 'desc', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`event-icon-${index}`}>Icon Name</Label>
                  <Input
                    id={`event-icon-${index}`}
                    value={event.iconName}
                    onChange={(e) => updateEvent(index, 'iconName', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <Button onClick={addEvent}>Add Event</Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;