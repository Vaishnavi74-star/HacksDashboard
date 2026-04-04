import { motion } from 'framer-motion';
import { HackathonEvent } from '@/types/hackathon';
import { useAdmin } from '@/contexts/AdminContext';
import { iconMap } from '@/lib/icons';

const TimelineSection = () => {
  const { events } = useAdmin();

  return (
    <section className="py-24 px-8 relative" id="timeline">
      <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold gradient-text mb-4">Event Timeline</h2>
        <p className="text-muted-foreground">Key milestones on the road to innovation.</p>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />

        <div className="space-y-8">
          {events.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative pl-20"
            >
              <div className="absolute left-4 w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                {(() => {
                  const IconComponent = iconMap[e.iconName];
                  return IconComponent ? <IconComponent className="w-4 h-4 text-primary" /> : null;
                })()}
              </div>
              <div className="glass-card rounded-2xl p-5 hover:border-primary/20 transition-colors">
                <span className="text-xs text-primary font-medium">{e.date}</span>
                <h3 className="text-foreground font-semibold mt-1">{e.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{e.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

export default TimelineSection;
