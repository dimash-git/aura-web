import BottomNavbar from ".";

const BottomNavbarProvider = ({ children }: { children: React.ReactNode }) => {
  return <BottomNavbar>{children}</BottomNavbar>;
};

export default BottomNavbarProvider;
