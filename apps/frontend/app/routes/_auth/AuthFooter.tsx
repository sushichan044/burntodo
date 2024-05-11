import type { PropsWithChildren } from "react";

const AuthFooter: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <footer className="flex h-20 flex-row items-center justify-center border-t bg-white p-4">
      {children}
    </footer>
  );
};

export default AuthFooter;
