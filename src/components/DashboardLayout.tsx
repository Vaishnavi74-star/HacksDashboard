import { Outlet } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background bg-grid">
      <AppSidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
