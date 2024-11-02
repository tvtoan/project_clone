import Layout from './components/Layout/Layout';

function App() {
  const title = "My web";
  return (
    <div>
      <Layout title = {title}>
        <main>
          <h1>welcome to my web</h1>
          <p>This is the main content of the page</p>
        </main>
      </Layout>
    </div>
  );
}

export default App;
