import { useState } from 'react';
import { motion } from 'framer-motion';
import { Judge } from '@/types/hackathon';
import { useAdmin } from '@/contexts/AdminContext';

const JudgeCard = ({ judge, index }: { judge: Judge; index: number }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="perspective-1000 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`relative w-full h-64 transition-transform duration-700 preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className="absolute inset-0 backface-hidden glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
            <span className="text-xl font-bold text-primary">{judge.initials}</span>
          </div>
          <h3 className="font-semibold text-foreground">{judge.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{judge.role}</p>
          <p className="text-xs text-primary mt-3">Click to flip</p>
        </div>
        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center gradient-border">
          <p className="text-sm text-muted-foreground leading-relaxed">{judge.bio}</p>
          <p className="text-xs text-primary mt-4">Click to flip back</p>
        </div>
      </div>
    </motion.div>
  );
};

const JudgesSection = () => {
  const { judges } = useAdmin();

  return (
  <section className="py-24 px-8 relative" id="judges">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold gradient-text mb-4">Our Judges</h2>
        <p className="text-muted-foreground">Industry leaders evaluating the next wave of innovation.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {judges.map((j, i) => (
          <JudgeCard key={j.name} judge={j} index={i} />
        ))}
      </div>
    </div>
  </section>
  );
};

export default JudgesSection;
