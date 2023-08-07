import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <main className="flex items-center justify-center w-[100svw] h-[100svh] bg-blue-700">
      {children}
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
